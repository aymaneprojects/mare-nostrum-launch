-- ─────────────────────────────────────────────────────────────────────────────
-- INES CHATBOT INFRASTRUCTURE
• Table chat_sessions  — mémoire des conversations par sessionId
• Table chat_contacts  — contacts qualifiés récupérés par le chatbot
-- ─────────────────────────────────────────────────────────────────────────────

-- Table des sessions de chat (mémoire conversationnelle)
CREATE TABLE IF NOT EXISTS public.chat_sessions (
  id              uuid        DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id      text        NOT NULL UNIQUE,
  messages        jsonb       NOT NULL DEFAULT '[]'::jsonb,
  contact_email   text,
  contact_phone   text,
  contact_name    text,
  lead_type       text        DEFAULT 'en_cours',
  created_at      timestamptz DEFAULT now(),
  updated_at      timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_chat_sessions_session_id ON public.chat_sessions(session_id);
CREATE INDEX IF NOT EXISTS idx_chat_sessions_updated_at ON public.chat_sessions(updated_at DESC);

-- RLS : accès service role uniquement (le front passe par l'edge function)
ALTER TABLE public.chat_sessions DISABLE ROW LEVEL SECURITY;

-- Table des contacts qualifiés (ceux qui ont donné email/téléphone)
CREATE TABLE IF NOT EXISTS public.chat_contacts (
  id              uuid        DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id      text        REFERENCES public.chat_sessions(session_id) ON DELETE SET NULL,
  name            text,
  email           text,
  phone           text,
  segment         text,
  conversation    jsonb,
  airtable_synced boolean     DEFAULT false,
  created_at      timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_chat_contacts_email ON public.chat_contacts(email);
CREATE INDEX IF NOT EXISTS idx_chat_contacts_created_at ON public.chat_contacts(created_at DESC);

ALTER TABLE public.chat_contacts DISABLE ROW LEVEL SECURITY;
