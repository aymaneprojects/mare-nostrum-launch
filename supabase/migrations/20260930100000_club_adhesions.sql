-- ============================================================================
-- Club Mare Nostrum : filet de sécurité serveur des adhésions
-- Alimenté uniquement par l'edge function stripe-payment-webhook (service role).
-- Sert de source de vérité qui ne dépend ni du navigateur du client, ni du
-- consentement aux cookies, ni d'un bloqueur de publicité.
-- Aucune donnée de carte bancaire : Stripe n'en envoie pas, on n'en stocke pas.
-- ============================================================================

-- ── Tables ──────────────────────────────────────────────────────────────────

CREATE TABLE public.club_adhesions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  -- UNIQUE : un rejeu de checkout.session.completed ne doit jamais créer de doublon.
  stripe_session_id TEXT NOT NULL UNIQUE,
  stripe_customer_id TEXT,
  stripe_subscription_id TEXT,
  email TEXT,
  first_name TEXT,
  company TEXT,
  offer TEXT,
  location TEXT,
  billing TEXT,
  amount_total INTEGER,                      -- plus petite unité de la devise (XOF : sans décimales)
  currency TEXT,
  status TEXT NOT NULL DEFAULT 'active'
);

CREATE INDEX idx_club_adhesions_subscription ON public.club_adhesions(stripe_subscription_id);

-- Registre des évènements Stripe déjà traités : Stripe réessaie pendant 3 jours,
-- l'identifiant en clé primaire permet d'ignorer les rejeux.
CREATE TABLE public.stripe_webhook_events (
  id TEXT PRIMARY KEY,
  type TEXT NOT NULL,
  received_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- ── Sécurité (RLS) ──────────────────────────────────────────────────────────
-- RLS activée, aucune policy, privilèges révoqués : jamais lisible ni modifiable
-- par anon ou authenticated. Seul le rôle de service (edge function) écrit.

ALTER TABLE public.club_adhesions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.stripe_webhook_events ENABLE ROW LEVEL SECURITY;

REVOKE ALL ON public.club_adhesions FROM anon, authenticated;
REVOKE ALL ON public.stripe_webhook_events FROM anon, authenticated;
