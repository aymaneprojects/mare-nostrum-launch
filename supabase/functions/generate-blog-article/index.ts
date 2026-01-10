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
    ? `Mots-clés SEO à intégrer naturellement : ${keywords.join(", ")}.` 
    : "";

  const systemPrompt = `Tu es un rédacteur web expert en création de contenu éducatif et informatif de haute qualité. 
Tu rédiges des articles de blog professionnels, objectifs et pédagogiques.
Tu ne fais JAMAIS de promotion commerciale ni de mention d'entreprise.
Tu te concentres uniquement sur apporter de la valeur au lecteur avec des informations pratiques et actionnables.
Style : professionnel mais accessible, vouvoiement, phrases claires et structurées.`;

  const userPrompt = `Rédige un article de blog complet et optimisé SEO sur le sujet : "${title}"
Catégorie : ${category}
${keywordsText}

CONSIGNES SEO IMPORTANTES :
- L'article doit faire entre 2000 et 3000 mots
- Utilise le mot-clé principal dans les 100 premiers mots
- Inclus des sous-titres H2 et H3 avec des mots-clés pertinents
- Ajoute des listes à puces pour améliorer la lisibilité
- Utilise des paragraphes courts (3-4 phrases max)
- Intègre des questions que les lecteurs pourraient poser (format FAQ)
- Ajoute des statistiques ou données chiffrées quand pertinent
- Termine par une conclusion avec un résumé des points clés

FORMAT : HTML pur uniquement (h2, h3, p, ul, li, ol, strong, em, blockquote). 
PAS de markdown, PAS de balises code, PAS de titre H1 (il sera ajouté automatiquement).

STRUCTURE REQUISE :
1. Introduction engageante qui pose le problème/sujet (2-3 paragraphes)
2. Section "Comprendre [le sujet]" avec définitions et contexte
3. Section principale avec 4-6 sous-sections détaillées (H2 avec H3 si nécessaire)
4. Section "Conseils pratiques" ou "Étapes à suivre" avec liste numérotée
5. Section FAQ avec 3-4 questions fréquentes
6. Conclusion avec récapitulatif et ouverture

RÈGLES STRICTES :
- NE MENTIONNE AUCUNE entreprise, marque ou service commercial
- NE fais AUCUNE promotion ou call-to-action commercial
- Reste 100% informatif, éducatif et objectif
- Cite des sources génériques (études, experts du domaine) mais pas de marques
- Le contenu doit être utile même sans contexte commercial

Commence directement avec le contenu HTML :`;

  console.log("Calling Mistral API for SEO-optimized article...");

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

  // Clean up any markdown code blocks that might have slipped through
  const cleanedContent = content
    .replace(/```html\n?/g, "")
    .replace(/```\n?/g, "")
    .trim();

  console.log(`Generated ${cleanedContent.length} chars (SEO-optimized, non-commercial)`);
  return cleanedContent;
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
