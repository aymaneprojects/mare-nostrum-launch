-- Fermeture de quatre tables laissées ouvertes en lecture et en écriture
-- publiques. Avec la seule clé publique présente dans le code du site, on
-- pouvait lire les conversations du chatbot ainsi que des noms, e-mails et
-- téléphones de visiteurs (audit du 2 octobre 2026).
--
-- Aucune de ces tables n'est lue par le site : seules les edge functions y
-- accèdent, avec la clé de service, qui ignore ces protections. Les fermer n'a
-- donc aucun effet sur le fonctionnement du chatbot ni sur la publication
-- automatique d'articles.
--
-- Même motif que live_event_secrets : protection activée, AUCUNE policy, et
-- privilèges retirés au rôle public.

ALTER TABLE public.chat_contacts     ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chat_sessions     ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chatbot_messages  ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.seo_cron_log      ENABLE ROW LEVEL SECURITY;

REVOKE ALL ON public.chat_contacts    FROM anon, authenticated;
REVOKE ALL ON public.chat_sessions    FROM anon, authenticated;
REVOKE ALL ON public.chatbot_messages FROM anon, authenticated;
REVOKE ALL ON public.seo_cron_log     FROM anon, authenticated;
