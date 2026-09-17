-- ============================================================================
-- Live conférence — v2
--   · nuage de mots (cloud) et note de satisfaction 1 à 5 (rating)
--   · mur de questions permanent, actif en parallèle des autres activités
--   · messages anonymes sur le mur
--   · pilotage de l'écran de salle (une activité, ou deux côte à côte)
--   · minuteur d'activité, prénoms visibles en régie, notes privées d'animateur
-- ============================================================================

-- ── Types d'activité ────────────────────────────────────────────────────────

ALTER TABLE public.live_items DROP CONSTRAINT live_items_kind_check;
ALTER TABLE public.live_items ADD CONSTRAINT live_items_kind_check
  CHECK (kind IN ('open', 'poll', 'wall', 'cloud', 'rating'));

ALTER TABLE public.live_items DROP CONSTRAINT live_items_check;
ALTER TABLE public.live_items ADD CONSTRAINT live_items_options_check CHECK (
  (kind <> 'poll' OR cardinality(options) BETWEEN 2 AND 10)
  AND (kind <> 'rating' OR cardinality(options) = 5)
);

-- Minuteur affiché (l'activité n'est pas fermée automatiquement : l'animateur garde la main).
ALTER TABLE public.live_items ADD COLUMN duration_seconds INTEGER
  CHECK (duration_seconds IS NULL OR duration_seconds BETWEEN 10 AND 3600);

-- Pour un nuage : la régie voit qui a proposé chaque mot (pour appeler par le prénom).
ALTER TABLE public.live_items ADD COLUMN show_authors BOOLEAN NOT NULL DEFAULT false;

-- ── Activités simultanées ───────────────────────────────────────────────────
-- Une seule activité active hors mur, et un seul mur actif : le mur peut rester
-- ouvert pendant toute la séquence.

DROP INDEX public.idx_live_items_one_active;
CREATE UNIQUE INDEX idx_live_items_one_active ON public.live_items(event_id)
  WHERE status = 'active' AND kind <> 'wall';
CREATE UNIQUE INDEX idx_live_items_one_active_wall ON public.live_items(event_id)
  WHERE status = 'active' AND kind = 'wall';

-- ── Notes privées de l'animateur ────────────────────────────────────────────
-- Table séparée, sans policy : live_items est lisible publiquement, les notes non.

CREATE TABLE public.live_item_notes (
  item_id UUID PRIMARY KEY REFERENCES public.live_items(id) ON DELETE CASCADE,
  note TEXT NOT NULL CHECK (char_length(note) <= 4000),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);
ALTER TABLE public.live_item_notes ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON public.live_item_notes FROM anon, authenticated;

-- ── Écran de salle ──────────────────────────────────────────────────────────
-- Vide = automatique (l'activité en cours). Une ou deux activités = affichage imposé
-- par la régie (deux = côte à côte).

ALTER TABLE public.live_events ADD COLUMN screen_items UUID[] NOT NULL DEFAULT '{}'
  CHECK (cardinality(screen_items) <= 2);

-- ── Anonymat sur le mur ─────────────────────────────────────────────────────

ALTER TABLE public.live_messages ADD COLUMN anonymous BOOLEAN NOT NULL DEFAULT false;
CREATE INDEX idx_live_messages_item_participant ON public.live_messages(item_id, participant_id);

-- ── Policies d'écriture du public (recréées) ────────────────────────────────

DROP POLICY "Anyone can post to an active live item" ON public.live_messages;
CREATE POLICY "Anyone can post to an active live item" ON public.live_messages
FOR INSERT TO anon, authenticated
WITH CHECK (
  hidden = false
  AND like_count = 0
  AND EXISTS (
    SELECT 1
    FROM public.live_items i
    JOIN public.live_participants p ON p.event_id = i.event_id
    WHERE i.id = live_messages.item_id
      AND p.id = live_messages.participant_id
      AND i.status = 'active'
      AND i.kind IN ('open', 'wall', 'cloud')
      -- Nuage : quelques mots, pas une phrase.
      AND (i.kind <> 'cloud' OR char_length(live_messages.body) <= 40)
      -- Anonyme : uniquement sur le mur, et sans nom stocké. Signé : nom cohérent.
      AND (
        (live_messages.anonymous = false
          AND p.first_name = live_messages.author_name
          AND p.emoji = live_messages.author_emoji)
        OR (live_messages.anonymous = true
          AND i.kind = 'wall'
          AND live_messages.author_name = ''
          AND live_messages.author_emoji = '')
      )
  )
  -- Anti-flood : 5 s entre deux messages, 2 s pour enchaîner des mots de nuage.
  AND NOT EXISTS (
    SELECT 1 FROM public.live_messages m
    JOIN public.live_items i2 ON i2.id = live_messages.item_id
    WHERE m.participant_id = live_messages.participant_id
      AND m.created_at > now() - CASE WHEN i2.kind = 'cloud' THEN interval '2 seconds' ELSE interval '5 seconds' END
  )
  -- Nuage : 3 mots maximum par personne.
  AND (
    NOT EXISTS (SELECT 1 FROM public.live_items i3 WHERE i3.id = live_messages.item_id AND i3.kind = 'cloud')
    OR (
      SELECT count(*) FROM public.live_messages m3
      WHERE m3.item_id = live_messages.item_id AND m3.participant_id = live_messages.participant_id
    ) < 3
  )
);

DROP POLICY "Anyone can vote on an active live poll" ON public.live_votes;
CREATE POLICY "Anyone can vote on an active live poll" ON public.live_votes
FOR INSERT TO anon, authenticated
WITH CHECK (
  EXISTS (
    SELECT 1
    FROM public.live_items i
    JOIN public.live_participants p ON p.event_id = i.event_id
    WHERE i.id = live_votes.item_id
      AND p.id = live_votes.participant_id
      AND i.status = 'active'
      AND i.kind IN ('poll', 'rating')
      AND live_votes.option_index < cardinality(i.options)
  )
);

DROP POLICY "Anyone can like a visible live message" ON public.live_likes;
CREATE POLICY "Anyone can like a visible live message" ON public.live_likes
FOR INSERT TO anon, authenticated
WITH CHECK (
  EXISTS (
    SELECT 1
    FROM public.live_messages m
    JOIN public.live_items i ON i.id = m.item_id
    JOIN public.live_participants p ON p.event_id = i.event_id
    WHERE m.id = live_likes.message_id
      AND p.id = live_likes.participant_id
      AND m.hidden = false
      AND i.status = 'active'
      AND i.kind = 'wall'
  )
);

-- ── Temps réel ──────────────────────────────────────────────────────────────
-- L'écran suit les changements d'affichage imposés par la régie.

ALTER TABLE public.live_events REPLICA IDENTITY FULL;
ALTER PUBLICATION supabase_realtime ADD TABLE public.live_events;

-- Double verrou, comme pour les autres tables live.
REVOKE UPDATE, DELETE, TRUNCATE ON public.live_events FROM anon, authenticated;
