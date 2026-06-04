-- ─────────────────────────────────────────────────────────────────────────────
-- SEO CRON INFRASTRUCTURE
-- • Table seo_cron_log  — historique des runs
-- • pg_net extension    — HTTP calls depuis pg_cron
-- • pg_cron job         — toutes les 4h → Edge Function seo-cron
-- ─────────────────────────────────────────────────────────────────────────────

-- Extensions requises (activées dans Supabase dashboard si absent)
CREATE EXTENSION IF NOT EXISTS pg_net  WITH SCHEMA extensions;
CREATE EXTENSION IF NOT EXISTS pg_cron WITH SCHEMA extensions;

-- Log table
CREATE TABLE IF NOT EXISTS public.seo_cron_log (
  id               uuid        DEFAULT gen_random_uuid() PRIMARY KEY,
  ran_at           timestamptz DEFAULT now(),
  article_id       uuid        REFERENCES public.blog_articles(id) ON DELETE SET NULL,
  article_title    text,
  article_slug     text,
  keyword_cluster  text,
  pillar           text,
  word_count       integer,
  indexnow_status  text,
  status           text        NOT NULL DEFAULT 'success',
  error_message    text
);

CREATE INDEX IF NOT EXISTS idx_seo_cron_log_ran_at  ON public.seo_cron_log(ran_at DESC);
CREATE INDEX IF NOT EXISTS idx_seo_cron_log_status  ON public.seo_cron_log(status);

-- RLS off (accès service role uniquement)
ALTER TABLE public.seo_cron_log DISABLE ROW LEVEL SECURITY;

-- ─── pg_cron : toutes les 4h (0h, 4h, 8h, 12h, 16h, 20h UTC) ────────────────
-- Nécessite que pg_cron soit activé dans Extensions Supabase Dashboard.
-- net.http_post est fourni par pg_net.

SELECT cron.schedule(
  'seo-content-cron-4h',
  '0 */4 * * *',
  $$
  SELECT extensions.http_post(
    url     := 'https://oivxznyzijtoylwfigyq.supabase.co/functions/v1/seo-cron',
    headers := jsonb_build_object(
      'Content-Type',  'application/json',
      'Authorization', 'Bearer ' || current_setting('app.service_role_key', true)
    ),
    body    := '{}'::jsonb
  );
  $$
);
