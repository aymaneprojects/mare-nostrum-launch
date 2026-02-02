import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Fetch all published blog articles
    const { data: articles, error } = await supabase
      .from("blog_articles")
      .select("slug, updated_at")
      .eq("is_published", true)
      .order("published_at", { ascending: false });

    if (error) {
      console.error("Error fetching articles:", error);
    }

    const today = new Date().toISOString().split("T")[0];

    // Static pages
    const staticPages = [
      { loc: "https://marenostrum.tech/", priority: "1.0", changefreq: "weekly" },
      { loc: "https://marenostrum.tech/education", priority: "0.9", changefreq: "weekly" },
      { loc: "https://marenostrum.tech/croissance", priority: "0.9", changefreq: "weekly" },
      { loc: "https://marenostrum.tech/offre-ia", priority: "0.8", changefreq: "weekly" },
      { loc: "https://marenostrum.tech/contact", priority: "0.8", changefreq: "monthly" },
      { loc: "https://marenostrum.tech/a-propos", priority: "0.7", changefreq: "monthly" },
      { loc: "https://marenostrum.tech/blog", priority: "0.8", changefreq: "weekly" },
      { loc: "https://marenostrum.tech/livre-blanc-entrepreneuriat", priority: "0.8", changefreq: "monthly" },
      { loc: "https://marenostrum.tech/engagement-rse", priority: "0.6", changefreq: "monthly" },
      // Silo 1: Écoles
      { loc: "https://marenostrum.tech/ecoles/transformation-entrepreneuriale", priority: "0.9", changefreq: "weekly" },
      { loc: "https://marenostrum.tech/ecoles/diagnostic-gratuit", priority: "0.8", changefreq: "monthly" },
      // Silo 2: Entrepreneurs
      { loc: "https://marenostrum.tech/entrepreneurs/accompagnement-francophonie-afrique", priority: "0.9", changefreq: "weekly" },
      { loc: "https://marenostrum.tech/entrepreneurs/test-maturite-projet", priority: "0.8", changefreq: "monthly" },
      { loc: "https://marenostrum.tech/entrepreneurs/mentorat-individuel", priority: "0.8", changefreq: "monthly" },
      // Silo 3: Magazine
      { loc: "https://marenostrum.tech/mag/entrepreneuriat-social-francophonie", priority: "0.7", changefreq: "monthly" },
      { loc: "https://marenostrum.tech/mag/innovation-pedagogique-entrepreneuriat", priority: "0.7", changefreq: "monthly" },
      { loc: "https://marenostrum.tech/mag/impact-mesure-startup", priority: "0.7", changefreq: "monthly" },
      // Legal
      { loc: "https://marenostrum.tech/mentions-legales", priority: "0.3", changefreq: "yearly" },
      { loc: "https://marenostrum.tech/confidentialite", priority: "0.3", changefreq: "yearly" },
      { loc: "https://marenostrum.tech/cgu", priority: "0.3", changefreq: "yearly" },
    ];

    // Build XML
    let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
`;

    // Add static pages
    for (const page of staticPages) {
      xml += `  <url>
    <loc>${page.loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>
`;
    }

    // Add blog articles dynamically
    if (articles && articles.length > 0) {
      for (const article of articles) {
        const lastmod = article.updated_at 
          ? new Date(article.updated_at).toISOString().split("T")[0]
          : today;
        xml += `  <url>
    <loc>https://marenostrum.tech/blog/${article.slug}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
`;
      }
    }

    xml += `</urlset>`;

    return new Response(xml, {
      status: 200,
      headers: {
        ...corsHeaders,
        "Content-Type": "application/xml; charset=utf-8",
        "Cache-Control": "public, max-age=3600",
      },
    });
  } catch (error) {
    console.error("Sitemap generation error:", error);
    return new Response("Error generating sitemap", {
      status: 500,
      headers: corsHeaders,
    });
  }
});
