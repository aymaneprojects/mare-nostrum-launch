-- ============================================================================
-- Club Mare Nostrum : offre freemium (inscription gratuite, sans paiement)
-- Alimentée uniquement par l'edge function club-freemium-signup (service role).
-- Table distincte de club_adhesions : celle-ci exige une session Stripe, et les
-- membres gratuits ne doivent pas se mélanger aux abonnés dans les comptages.
-- Source : retranscription « Priorités commerciales - Temps Forts » (offre
-- freemium : contacts récupérés, accès Slack, aucun paiement).
-- ============================================================================

CREATE TABLE public.club_freemium (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  -- Un e-mail = un membre (enregistré en minuscules par la fonction) : une
  -- nouvelle saisie ne crée jamais de doublon.
  email TEXT NOT NULL UNIQUE,
  first_name TEXT,
  company TEXT,
  location TEXT,
  status TEXT NOT NULL DEFAULT 'active'
);

-- RLS activée, aucune policy, privilèges révoqués : jamais lisible ni modifiable
-- par anon ou authenticated. Seul le rôle de service (edge function) écrit.
ALTER TABLE public.club_freemium ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON public.club_freemium FROM anon, authenticated;
