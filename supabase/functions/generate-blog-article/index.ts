import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface RequestBody {
  title: string;
  category: string;
  image?: string;
  publish?: boolean;
  keywords?: string[] | string;
}

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim()
    .substring(0, 80);
}

function extractExcerpt(htmlContent: string): string {
  const plainText = htmlContent
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  return plainText.substring(0, 200) + (plainText.length > 200 ? "..." : "");
}

async function generateArticleWithMistral(
  title: string,
  category: string,
  keywords: string[] = []
): Promise<string> {
  const apiKey = Deno.env.get("MISTRAL_API_KEY");
  if (!apiKey) {
    throw new Error("MISTRAL_API_KEY not configured");
  }

  const keywordsText = keywords.length > 0 
    ? `Mots-clés SEO à intégrer naturellement : ${keywords.join(", ")}.` 
    : "";

  const systemPrompt = `Tu es un expert en rédaction SEO pour Mare Nostrum, cabinet de conseil en entrepreneuriat à impact basé à Toulouse, Paris et Casablanca.`;

  const userPrompt = `Rédige un article de blog complet et optimisé SEO de 2000-3000 mots sur :

**Titre** : ${title}
**Catégorie** : ${category}
${keywordsText}

**Instructions** :
- Structure HTML : h2, h3, p, ul, li, ol, blockquote, strong, em (pas de html/head/body)
- 5-6 sections principales avec introduction et conclusion
- Paragraphes de 3-4 phrases max
- Tutoiement du lecteur
- Ton professionnel mais accessible
- Mentionne Mare Nostrum 2-3 fois naturellement
- Termine par un appel à l'action vers Mare Nostrum

Génère UNIQUEMENT le contenu HTML.`;

  console.log("Calling Mistral API...");

  const response = await fetch("https://api.mistral.ai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "mistral-large-latest",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt }
      ],
      max_tokens: 8000,
      temperature: 0.7,
    }),
  });

  console.log(`Mistral API status: ${response.status}`);

  if (!response.ok) {
    const error = await response.text();
    console.error("Mistral error:", error);
    throw new Error(`Mistral API error: ${response.status}`);
  }

  const data = await response.json();
  const content = data.choices?.[0]?.message?.content;

  if (!content) {
    throw new Error("No content from Mistral");
  }

  console.log(`Generated ${content.length} chars`);
  return content;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  console.log("=== NEW REQUEST ===");

  try {
    const body: RequestBody = await req.json();
    const { title, category, image, publish = true } = body;

    // Parse keywords
    let keywords: string[] = [];
    if (body.keywords) {
      if (Array.isArray(body.keywords)) {
        keywords = body.keywords;
      } else if (typeof body.keywords === 'string') {
        keywords = body.keywords.split(',').map(k => k.trim()).filter(Boolean);
      }
    }

    console.log(`Title: ${title}`);
    console.log(`Category: ${category}`);

    if (!title || !category) {
      return new Response(
        JSON.stringify({ success: false, error: "title and category required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Generate article synchronously
    const content = await generateArticleWithMistral(title, category, keywords);
    const slug = generateSlug(title);
    const excerpt = extractExcerpt(content);

    // Save to database
    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    
    if (!supabaseUrl || !supabaseKey) {
      throw new Error("Missing Supabase config");
    }
    
    const supabase = createClient(supabaseUrl, supabaseKey);

    const { data: article, error: dbError } = await supabase
      .from("blog_articles")
      .insert({
        title,
        slug,
        excerpt,
        content,
        category,
        image: image || "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800",
        author: "Mare Nostrum",
        is_published: publish,
        published_at: publish ? new Date().toISOString() : null,
      })
      .select()
      .single();

    if (dbError) {
      console.error("DB error:", dbError);
      throw new Error(`Database error: ${dbError.message}`);
    }

    console.log(`SUCCESS - Article ID: ${article.id}`);
    
    return new Response(
      JSON.stringify({
        success: true,
        article: {
          id: article.id,
          title: article.title,
          slug: article.slug,
          url: `/blog/${article.slug}`,
        },
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );

  } catch (error) {
    console.error("Error:", error);
    const message = error instanceof Error ? error.message : "Unknown error";
    return new Response(
      JSON.stringify({ success: false, error: message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
