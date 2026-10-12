-- Relecture des articles : champs facultatifs, affichés seulement s'ils sont renseignés.
ALTER TABLE public.blog_articles
  ADD COLUMN IF NOT EXISTS reviewed_by text,
  ADD COLUMN IF NOT EXISTS reviewed_by_title text;
