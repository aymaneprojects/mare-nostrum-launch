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
  keywords?: string[];
}

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // Remove accents
    .replace(/[^a-z0-9\s-]/g, "") // Remove special chars
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/-+/g, "-") // Replace multiple hyphens with single
    .trim()
    .substring(0, 80);
}

function extractExcerpt(htmlContent: string): string {
  // Remove HTML tags and get plain text
  const plainText = htmlContent
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  
  // Return first 200 characters
  return plainText.substring(0, 200) + (plainText.length > 200 ? "..." : "");
}

async function generateArticleWithGemini(
  title: string,
  category: string,
  keywords: string[] = []
): Promise<string> {
  const apiKey = Deno.env.get("GOOGLE_API_KEY");
  if (!apiKey) {
    throw new Error("GOOGLE_API_KEY not configured");
  }

  const keywordsText = keywords.length > 0 
    ? `Mots-clés SEO à intégrer naturellement : ${keywords.join(", ")}.` 
    : "";

  const prompt = `Tu es un expert en rédaction SEO pour Mare Nostrum, cabinet de conseil en entrepreneuriat à impact basé à Toulouse, Paris et Casablanca.

Rédige un article de blog complet de 2000 à 3000 mots sur le sujet suivant :

Titre : ${title}
Catégorie : ${category}
${keywordsText}

INSTRUCTIONS CRITIQUES DE FORMAT :
- Génère UNIQUEMENT du code HTML valide, prêt à être injecté dans une page web
- NE PAS inclure de blocs de code markdown (pas de \`\`\`html)
- NE PAS échapper les balises HTML
- Commence DIRECTEMENT par une balise <h2> contenant le titre de l'article
- Utilise les balises : <h2>, <h3>, <p>, <ul>, <li>, <ol>, <blockquote>, <strong>, <em>
- PAS de balises <html>, <head>, <body>, <article>

STRUCTURE DE L'ARTICLE :
1. <h2> avec le titre principal
2. Introduction (2-3 paragraphes <p>)
3. Sections avec <h3> pour les sous-titres
4. Listes <ul> ou <ol> pour les points clés
5. <blockquote> pour les citations inspirantes
6. Conclusion avec appel à l'action

STYLE DE RÉDACTION :
- Professionnel mais accessible
- Tutoiement du lecteur
- Conseils pratiques et exemples concrets
- Mentionne subtilement Mare Nostrum comme ressource d'accompagnement
- Termine par un appel à l'action vers Mare Nostrum

SEO :
- Intègre naturellement les mots-clés dans le contenu
- Sous-titres H3 descriptifs avec mots-clés
- Paragraphes de 3-5 phrases maximum

Longueur : Entre 2000 et 3000 mots.

RAPPEL : Génère du HTML pur sans aucun wrapper markdown.`;

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [{ text: prompt }],
          },
        ],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 8192,
        },
      }),
    }
  );

  if (!response.ok) {
    const error = await response.text();
    console.error("Gemini API error:", error);
    // Inclure le détail de l'erreur Google dans le message pour faciliter le debug
    throw new Error(`Gemini API error: ${response.status} - ${error}`);
  }

  const data = await response.json();
  const content = data.candidates?.[0]?.content?.parts?.[0]?.text;

  if (!content) {
    throw new Error("No content generated from Gemini");
  }

  return content;
}

Deno.serve(async (req) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const body: RequestBody = await req.json();
    const { title, category, image, publish = true, keywords = [] } = body;

    console.log(`Generating article: "${title}" in category "${category}"`);

    if (!title || !category) {
      return new Response(
        JSON.stringify({ success: false, error: "title and category are required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Generate article content with Gemini
    console.log("Calling Gemini API...");
    const content = await generateArticleWithGemini(title, category, keywords);
    console.log(`Generated content length: ${content.length} characters`);

    // Generate slug and excerpt
    const slug = generateSlug(title);
    const excerpt = extractExcerpt(content);

    console.log(`Generated slug: ${slug}`);
    console.log(`Generated excerpt: ${excerpt.substring(0, 50)}...`);

    // Initialize Supabase client with service role
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Insert article into database
    const { data: article, error: insertError } = await supabase
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

    if (insertError) {
      console.error("Database insert error:", insertError);
      throw new Error(`Database error: ${insertError.message}`);
    }

    console.log(`Article created successfully with ID: ${article.id}`);

    return new Response(
      JSON.stringify({
        success: true,
        article: {
          id: article.id,
          slug: article.slug,
          title: article.title,
          excerpt: article.excerpt,
          category: article.category,
          is_published: article.is_published,
        },
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error generating article:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    const status = errorMessage.includes("429") ? 429 : 500;
    return new Response(
      JSON.stringify({ success: false, error: errorMessage }),
      { status, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
