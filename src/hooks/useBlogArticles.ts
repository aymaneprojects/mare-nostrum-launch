import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface BlogArticle {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  category: string;
  image: string;
  published_at: string;
  is_published: boolean;
  created_at: string;
  updated_at: string;
}

// Récupérer tous les articles publiés
export const useBlogArticles = () => {
  return useQuery({
    queryKey: ["blog-articles"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("blog_articles")
        .select("id, title, slug, excerpt, author, category, image, published_at, is_published")
        .eq("is_published", true)
        .order("published_at", { ascending: false });

      if (error) {
        console.error("Error fetching blog articles:", error);
        throw error;
      }

      return data as BlogArticle[];
    },
    staleTime: 5 * 60 * 1000,
  });
};

// Récupérer un article par son slug
export const useBlogArticle = (slug: string | undefined) => {
  return useQuery({
    queryKey: ["blog-article", slug],
    queryFn: async () => {
      if (!slug) return null;

      const { data, error } = await supabase
        .from("blog_articles")
        .select("*")
        .eq("slug", slug)
        .eq("is_published", true)
        .maybeSingle();

      if (error) {
        console.error("Error fetching blog article:", error);
        throw error;
      }

      return data as BlogArticle | null;
    },
    enabled: !!slug,
  });
};

// Récupérer les articles similaires : même catégorie en priorité, complété par d'autres catégories
export const useRelatedArticles = (category: string | undefined, excludeId: string | undefined) => {
  return useQuery({
    queryKey: ["related-articles", category, excludeId],
    queryFn: async () => {
      if (!category) return [];

      // 1. Articles de la même catégorie
      const { data: sameCategory } = await supabase
        .from("blog_articles")
        .select("id, title, slug, excerpt, category, image, published_at")
        .eq("category", category)
        .eq("is_published", true)
        .neq("id", excludeId || "")
        .order("published_at", { ascending: false })
        .limit(3);

      const results = sameCategory ?? [];
      if (results.length >= 3) return results as BlogArticle[];

      // 2. Compléter avec d'autres catégories si moins de 3
      const existingIds = [excludeId || "", ...results.map(a => a.id)];
      const { data: others } = await supabase
        .from("blog_articles")
        .select("id, title, slug, excerpt, category, image, published_at")
        .eq("is_published", true)
        .neq("category", category)
        .not("id", "in", `(${existingIds.join(",")})`)
        .order("published_at", { ascending: false })
        .limit(3 - results.length);

      return [...results, ...(others ?? [])] as BlogArticle[];
    },
    enabled: !!category,
  });
};
