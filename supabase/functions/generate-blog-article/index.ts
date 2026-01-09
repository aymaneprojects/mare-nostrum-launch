import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface RequestBody {
  title?: string;
  topic?: string; // Alternative à title pour n8n
  category: string;
  image?: string;
  cover_image_url?: string; // Alternative à image pour n8n
  publish?: boolean;
  keywords?: string[] | string;
  keyword?: string; // Mot-clé unique pour n8n
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
    ? `Mots-clés SEO : ${keywords.join(", ")}.` 
    : "";

  const systemPrompt = `Rédacteur web expert en entrepreneuriat pour Mare Nostrum (Toulouse, Paris, Casablanca). Style chaleureux, tutoiement.`;

  const userPrompt = `Article blog 1500-2000 mots : "${title}" (${category})
${keywordsText}

FORMAT : HTML pur (h2, h3, p, ul, li, strong, em). Pas de markdown, pas de titre H1.

STRUCTURE :
- Intro accrocheuse (2 paragraphes)
- 4-5 sections H2
- Conseils pratiques avec exemples
- Conclusion avec CTA Mare Nostrum

STYLE : Tutoiement, phrases courtes, questions rhétoriques, encourageant.
Mentionne Mare Nostrum 2 fois naturellement.

HTML :`;

  console.log("Calling Mistral API...");

  const response = await fetch("https://api.mistral.ai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "mistral-large-2512",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt }
      ],
      max_tokens: 5000,
      temperature: 0.8,
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
    
    // Support both formats: title/topic et image/cover_image_url
    const title = body.title || body.topic;
    const category = body.category;
    const imageUrl = body.cover_image_url || body.image || "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800";
    const publish = body.publish !== false; // true par défaut

    // Parse keywords - support array, string, ou single keyword
    let keywords: string[] = [];
    if (body.keywords) {
      if (Array.isArray(body.keywords)) {
        keywords = body.keywords;
      } else if (typeof body.keywords === 'string') {
        keywords = body.keywords.split(',').map(k => k.trim()).filter(Boolean);
      }
    } else if (body.keyword) {
      keywords = [body.keyword];
    }

    console.log(`Title/Topic: ${title}`);
    console.log(`Category: ${category}`);
    console.log(`Image: ${imageUrl}`);
    console.log(`Keywords: ${keywords.join(', ')}`);

    if (!title || !category) {
      return new Response(
        JSON.stringify({ success: false, error: "title/topic and category required" }),
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
        image: imageUrl,
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
