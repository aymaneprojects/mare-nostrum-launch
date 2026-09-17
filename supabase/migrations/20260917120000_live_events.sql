-- ============================================================================
-- Live conférence : interaction avec la salle en temps réel
--   question ouverte · sondage (QCM) · mur de questions avec likes
-- Écritures du public en direct (PostgREST sous RLS), actions animateur via
-- l'edge function live-admin (service role). Voir BRIEF-CHRISTOPHE.md.
-- ============================================================================

-- ── Tables ──────────────────────────────────────────────────────────────────

CREATE TABLE public.live_events (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  public_code TEXT NOT NULL UNIQUE CHECK (public_code ~ '^MN-[A-Z0-9]{4}$'),
  title TEXT NOT NULL CHECK (char_length(title) BETWEEN 1 AND 120),
  status TEXT NOT NULL DEFAULT 'open' CHECK (status IN ('open', 'closed')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Le code animateur vit dans une table à part : RLS activée, aucune policy,
-- privilèges révoqués → jamais lisible par anon, jamais diffusé en realtime.
CREATE TABLE public.live_event_secrets (
  event_id UUID PRIMARY KEY REFERENCES public.live_events(id) ON DELETE CASCADE,
  admin_code_hash TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

CREATE TABLE public.live_items (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  event_id UUID NOT NULL REFERENCES public.live_events(id) ON DELETE CASCADE,
  kind TEXT NOT NULL CHECK (kind IN ('open', 'poll', 'wall')),
  prompt TEXT NOT NULL CHECK (char_length(prompt) BETWEEN 1 AND 300),
  options TEXT[] NOT NULL DEFAULT '{}',
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'active', 'closed')),
  position INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  activated_at TIMESTAMP WITH TIME ZONE,
  closed_at TIMESTAMP WITH TIME ZONE,
  CHECK (kind <> 'poll' OR cardinality(options) BETWEEN 2 AND 10)
);

CREATE TABLE public.live_participants (
  id UUID PRIMARY KEY,                       -- généré côté client, conservé en localStorage
  event_id UUID NOT NULL REFERENCES public.live_events(id) ON DELETE CASCADE,
  first_name TEXT NOT NULL CHECK (char_length(first_name) BETWEEN 1 AND 30),
  emoji TEXT NOT NULL CHECK (char_length(emoji) BETWEEN 1 AND 8),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Réponses aux questions ouvertes ET messages du mur (le kind de l'item tranche).
-- Auteur dénormalisé : les payloads realtime n'ont pas de jointure.
CREATE TABLE public.live_messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  item_id UUID NOT NULL REFERENCES public.live_items(id) ON DELETE CASCADE,
  participant_id UUID NOT NULL REFERENCES public.live_participants(id) ON DELETE CASCADE,
  author_name TEXT NOT NULL,
  author_emoji TEXT NOT NULL,
  body TEXT NOT NULL CHECK (char_length(body) BETWEEN 1 AND 280),
  hidden BOOLEAN NOT NULL DEFAULT false,
  like_count INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

CREATE TABLE public.live_votes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  item_id UUID NOT NULL REFERENCES public.live_items(id) ON DELETE CASCADE,
  participant_id UUID NOT NULL REFERENCES public.live_participants(id) ON DELETE CASCADE,
  option_index SMALLINT NOT NULL CHECK (option_index >= 0),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE (item_id, participant_id)
);

CREATE TABLE public.live_likes (
  message_id UUID NOT NULL REFERENCES public.live_messages(id) ON DELETE CASCADE,
  participant_id UUID NOT NULL REFERENCES public.live_participants(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  PRIMARY KEY (message_id, participant_id)
);

-- ── Index ───────────────────────────────────────────────────────────────────

CREATE UNIQUE INDEX idx_live_items_one_active ON public.live_items(event_id) WHERE status = 'active';
CREATE INDEX idx_live_items_event_id ON public.live_items(event_id, position);
CREATE INDEX idx_live_participants_event_id ON public.live_participants(event_id);
CREATE INDEX idx_live_messages_item_id ON public.live_messages(item_id, created_at DESC);
CREATE INDEX idx_live_messages_item_likes ON public.live_messages(item_id, like_count DESC);
CREATE INDEX idx_live_messages_participant_recent ON public.live_messages(participant_id, created_at DESC);
CREATE INDEX idx_live_votes_item_id ON public.live_votes(item_id);

-- ── Compteur de likes ───────────────────────────────────────────────────────
-- SECURITY DEFINER : l'UPDATE tourne avec les droits du propriétaire, anon n'a
-- aucune policy UPDATE.

CREATE OR REPLACE FUNCTION public.live_bump_like_count()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  UPDATE public.live_messages SET like_count = like_count + 1 WHERE id = NEW.message_id;
  RETURN NEW;
END;
$$;

CREATE TRIGGER trg_live_likes_bump
AFTER INSERT ON public.live_likes
FOR EACH ROW EXECUTE FUNCTION public.live_bump_like_count();

-- ── Sécurité (RLS) ──────────────────────────────────────────────────────────

ALTER TABLE public.live_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.live_event_secrets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.live_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.live_participants ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.live_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.live_votes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.live_likes ENABLE ROW LEVEL SECURITY;

REVOKE ALL ON public.live_event_secrets FROM anon, authenticated;

-- Lecture publique de tout ce qui s'affiche (les masqués restent lisibles :
-- sinon l'UPDATE hidden → true n'est jamais délivré en realtime ; filtrés côté client).
CREATE POLICY "Anyone can read live events" ON public.live_events FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Anyone can read live items" ON public.live_items FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Anyone can read live participants" ON public.live_participants FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Anyone can read live messages" ON public.live_messages FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Anyone can read live votes" ON public.live_votes FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Anyone can read live likes" ON public.live_likes FOR SELECT TO anon, authenticated USING (true);

-- Inscription tant que l'événement est ouvert.
CREATE POLICY "Anyone can join an open live event" ON public.live_participants
FOR INSERT TO anon, authenticated
WITH CHECK (
  EXISTS (SELECT 1 FROM public.live_events e WHERE e.id = live_participants.event_id AND e.status = 'open')
);

-- Message : item actif de type ouvert ou mur, auteur cohérent avec le participant,
-- compteurs à zéro, un message toutes les 5 secondes par participant.
CREATE POLICY "Anyone can post to an active live item" ON public.live_messages
FOR INSERT TO anon, authenticated
WITH CHECK (
  hidden = false
  AND like_count = 0
  AND EXISTS (
    SELECT 1 FROM public.live_items i
    WHERE i.id = live_messages.item_id AND i.status = 'active' AND i.kind IN ('open', 'wall')
  )
  AND EXISTS (
    SELECT 1 FROM public.live_participants p
    WHERE p.id = live_messages.participant_id
      AND p.first_name = live_messages.author_name
      AND p.emoji = live_messages.author_emoji
  )
  AND NOT EXISTS (
    SELECT 1 FROM public.live_messages m
    WHERE m.participant_id = live_messages.participant_id
      AND m.created_at > now() - interval '5 seconds'
  )
);

-- Vote : sondage actif, option valide, participant connu. Un vote par participant (UNIQUE).
CREATE POLICY "Anyone can vote on an active live poll" ON public.live_votes
FOR INSERT TO anon, authenticated
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.live_items i
    WHERE i.id = live_votes.item_id AND i.status = 'active' AND i.kind = 'poll'
      AND live_votes.option_index < cardinality(i.options)
  )
  AND EXISTS (SELECT 1 FROM public.live_participants p WHERE p.id = live_votes.participant_id)
);

-- Like : message visible d'un mur actif, participant connu. Un like par participant (PK).
CREATE POLICY "Anyone can like a visible live message" ON public.live_likes
FOR INSERT TO anon, authenticated
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.live_messages m
    JOIN public.live_items i ON i.id = m.item_id
    WHERE m.id = live_likes.message_id AND m.hidden = false
      AND i.status = 'active' AND i.kind = 'wall'
  )
  AND EXISTS (SELECT 1 FROM public.live_participants p WHERE p.id = live_likes.participant_id)
);

-- Aucune policy UPDATE / DELETE : seule l'edge function (service role) modifie.
-- Double verrou : on retire aussi le privilège SQL, au cas où une policy
-- permissive serait ajoutée par erreur plus tard.
REVOKE UPDATE, DELETE, TRUNCATE ON
  public.live_events, public.live_items, public.live_participants,
  public.live_messages, public.live_votes, public.live_likes
FROM anon, authenticated;

-- ── Temps réel ──────────────────────────────────────────────────────────────
-- REPLICA IDENTITY FULL sur les tables mises à jour (statut, hidden, like_count)
-- pour que les filtres eq. s'évaluent aussi sur les UPDATE.

ALTER TABLE public.live_items REPLICA IDENTITY FULL;
ALTER TABLE public.live_messages REPLICA IDENTITY FULL;

ALTER PUBLICATION supabase_realtime ADD TABLE public.live_items, public.live_messages, public.live_votes;
