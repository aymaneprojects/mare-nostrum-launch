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
        .select("*")
        .eq("is_published", true)
        .order("published_at", { ascending: false });

      if (error) {
        console.error("Error fetching blog articles:", error);
        throw error;
      }

      return data as BlogArticle[];
    },
    staleTime: 5 * 60 * 1000, // 5 minutes - évite les rechargements inutiles
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

// Récupérer les articles similaires (même catégorie)
export const useRelatedArticles = (category: string | undefined, excludeId: string | undefined) => {
  return useQuery({
    queryKey: ["related-articles", category, excludeId],
    queryFn: async () => {
      if (!category) return [];

      const { data, error } = await supabase
        .from("blog_articles")
        .select("*")
        .eq("category", category)
        .eq("is_published", true)
        .neq("id", excludeId || "")
        .order("published_at", { ascending: false })
        .limit(3);

      if (error) {
        console.error("Error fetching related articles:", error);
        throw error;
      }

      return data as BlogArticle[];
    },
    enabled: !!category,
  });
};
