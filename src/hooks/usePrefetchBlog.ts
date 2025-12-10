import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

// Prefetch les articles du blog dès le chargement de l'application
export const usePrefetchBlog = () => {
  const queryClient = useQueryClient();

  useEffect(() => {
    queryClient.prefetchQuery({
      queryKey: ["blog-articles"],
      queryFn: async () => {
        const { data, error } = await supabase
          .from("blog_articles")
          .select("*")
          .eq("is_published", true)
          .order("published_at", { ascending: false });

        if (error) {
          console.error("Error prefetching blog articles:", error);
          throw error;
        }

        return data;
      },
      staleTime: 5 * 60 * 1000, // 5 minutes
    });
  }, [queryClient]);
};
