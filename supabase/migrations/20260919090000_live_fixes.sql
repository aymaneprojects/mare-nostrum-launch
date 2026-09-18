-- Live conférence : corrections issues de la revue du 18/09/2026.
--
-- 1. Anti-flood par activité : poster sur le mur puis répondre à la question
--    dans les 5 s était refusé. Les mots masqués par l'animateur ne comptent
--    plus dans la limite de 3 mots d'un nuage.
-- 2. live_activate : ferme l'activité en cours et lance la suivante dans une
--    seule transaction, verrouillée par événement (deux régies qui lancent en
--    même temps ne se marchent plus dessus).
-- 3. live_now : heure du serveur, pour caler les minuteurs des appareils dont
--    l'horloge dérive.

-- ── 1. Policy d'écriture des messages ───────────────────────────────────────

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
  -- Anti-flood, activité par activité : 5 s entre deux messages, 2 s entre deux mots de nuage.
  AND NOT EXISTS (
    SELECT 1 FROM public.live_messages m
    JOIN public.live_items i2 ON i2.id = live_messages.item_id
    WHERE m.participant_id = live_messages.participant_id
      AND m.item_id = live_messages.item_id
      AND m.created_at > now() - CASE WHEN i2.kind = 'cloud' THEN interval '2 seconds' ELSE interval '5 seconds' END
  )
  -- Nuage : 3 mots visibles maximum par personne.
  AND (
    NOT EXISTS (SELECT 1 FROM public.live_items i3 WHERE i3.id = live_messages.item_id AND i3.kind = 'cloud')
    OR (
      SELECT count(*) FROM public.live_messages m3
      WHERE m3.item_id = live_messages.item_id
        AND m3.participant_id = live_messages.participant_id
        AND m3.hidden = false
    ) < 3
  )
);

-- ── 2. Lancement atomique d'une activité ────────────────────────────────────

CREATE OR REPLACE FUNCTION public.live_activate(p_event_id UUID, p_item_id UUID)
RETURNS public.live_items
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  target public.live_items;
  now_ts TIMESTAMPTZ := now();
BEGIN
  -- Verrou par événement : les lancements concurrents s'exécutent l'un après l'autre.
  PERFORM 1 FROM public.live_events WHERE id = p_event_id FOR UPDATE;

  SELECT * INTO target FROM public.live_items WHERE id = p_item_id AND event_id = p_event_id;
  IF NOT FOUND THEN
    RAISE EXCEPTION 'Activité introuvable.' USING ERRCODE = 'P0002';
  END IF;
  IF target.status = 'active' THEN
    RETURN target;
  END IF;

  -- Une activité hors mur et un mur peuvent tourner ensemble : on ne ferme que la même famille.
  UPDATE public.live_items
     SET status = 'closed', closed_at = now_ts
   WHERE event_id = p_event_id
     AND status = 'active'
     AND ((target.kind = 'wall' AND kind = 'wall') OR (target.kind <> 'wall' AND kind <> 'wall'));

  UPDATE public.live_items
     SET status = 'active', activated_at = now_ts, closed_at = NULL
   WHERE id = p_item_id
  RETURNING * INTO target;

  -- Lancer une question remet l'écran en automatique : il montre la question en cours.
  IF target.kind <> 'wall' THEN
    UPDATE public.live_events SET screen_items = '{}' WHERE id = p_event_id AND cardinality(screen_items) > 0;
  END IF;

  RETURN target;
END;
$$;

REVOKE ALL ON FUNCTION public.live_activate(UUID, UUID) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.live_activate(UUID, UUID) TO service_role;

-- ── 3. Heure du serveur ─────────────────────────────────────────────────────

CREATE OR REPLACE FUNCTION public.live_now()
RETURNS TIMESTAMPTZ
LANGUAGE sql
STABLE
AS $$ SELECT now() $$;

GRANT EXECUTE ON FUNCTION public.live_now() TO anon, authenticated;
