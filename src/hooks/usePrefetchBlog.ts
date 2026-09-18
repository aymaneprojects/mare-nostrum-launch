import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

// Prefetch les articles du blog dès le chargement de l'application
// `enabled` = false sur les pages live : 200 téléphones qui scannent le QR
// n'ont pas à télécharger tout le blog.
export const usePrefetchBlog = (enabled = true) => {
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!enabled) return;
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
  }, [queryClient, enabled]);
};
