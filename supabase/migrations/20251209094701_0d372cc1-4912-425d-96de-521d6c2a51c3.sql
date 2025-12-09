-- Création de la table blog_articles pour l'automatisation avec n8n
CREATE TABLE public.blog_articles (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    excerpt TEXT NOT NULL,
    content TEXT NOT NULL,
    author TEXT NOT NULL DEFAULT 'Mare Nostrum',
    category TEXT NOT NULL,
    image TEXT NOT NULL,
    published_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    is_published BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Index pour les recherches par slug et par date de publication
CREATE INDEX idx_blog_articles_slug ON public.blog_articles(slug);
CREATE INDEX idx_blog_articles_published_at ON public.blog_articles(published_at DESC);
CREATE INDEX idx_blog_articles_is_published ON public.blog_articles(is_published);

-- Enable Row Level Security
ALTER TABLE public.blog_articles ENABLE ROW LEVEL SECURITY;

-- Politique de lecture publique pour les articles publiés
CREATE POLICY "Anyone can read published articles"
ON public.blog_articles
FOR SELECT
USING (is_published = true);

-- Politique de lecture admin pour tous les articles
CREATE POLICY "Admins can read all articles"
ON public.blog_articles
FOR SELECT
USING (has_role(auth.uid(), 'admin'::app_role));

-- Politique d'insertion admin
CREATE POLICY "Admins can insert articles"
ON public.blog_articles
FOR INSERT
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

-- Politique de mise à jour admin
CREATE POLICY "Admins can update articles"
ON public.blog_articles
FOR UPDATE
USING (has_role(auth.uid(), 'admin'::app_role));

-- Politique de suppression admin
CREATE POLICY "Admins can delete articles"
ON public.blog_articles
FOR DELETE
USING (has_role(auth.uid(), 'admin'::app_role));

-- Trigger pour mettre à jour updated_at
CREATE OR REPLACE FUNCTION public.update_blog_articles_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_blog_articles_updated_at
BEFORE UPDATE ON public.blog_articles
FOR EACH ROW
EXECUTE FUNCTION public.update_blog_articles_updated_at();

-- Politique d'insertion publique via clé API (pour n8n)
CREATE POLICY "Service role can insert articles"
ON public.blog_articles
FOR INSERT
WITH CHECK (true);

-- Politique de mise à jour via clé API (pour n8n)
CREATE POLICY "Service role can update articles"
ON public.blog_articles
FOR UPDATE
USING (true);