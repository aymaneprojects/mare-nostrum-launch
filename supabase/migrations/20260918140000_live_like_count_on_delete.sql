-- ============================================================================
-- Live conférence — le compteur de likes doit redescendre
--
-- L'animateur peut supprimer un participant : ses messages, ses votes et ses
-- « j'aime » partent en cascade. Sans ce déclencheur, live_messages.like_count
-- resterait figé à sa valeur d'avant la suppression.
-- ============================================================================

CREATE OR REPLACE FUNCTION public.live_drop_like_count()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Si le message lui-même est en cours de suppression, l'UPDATE ne touche
  -- aucune ligne : c'est sans effet et sans erreur.
  UPDATE public.live_messages
  SET like_count = GREATEST(like_count - 1, 0)
  WHERE id = OLD.message_id;
  RETURN OLD;
END;
$$;

CREATE TRIGGER trg_live_likes_drop
AFTER DELETE ON public.live_likes
FOR EACH ROW EXECUTE FUNCTION public.live_drop_like_count();
