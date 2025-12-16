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
  keywords?: string[] | string; // Accept both array and string from n8n
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

  const userPrompt = `Rédige un article de blog TRÈS LONG et EXHAUSTIF de minimum 2500 mots à 5000 mots sur le sujet suivant :

**Titre** : ${title}
**Catégorie** : ${category}
${keywordsText}

**Instructions de rédaction** :

1. **Structure HTML obligatoire** :
   - Utilise UNIQUEMENT des balises HTML pour la mise en forme : h2, h3, p, ul, li, ol, blockquote, strong, em
   - NE PAS inclure de balises html, head, body - commence directement par le contenu
   - Structure logique : introduction engageante, 6 à 8 sections principales avec sous-sections, conclusion avec appel à l'action
   - Chaque section H2 doit avoir au moins 300-400 mots de contenu

2. **SEO & LLM Optimization** :
   - Intègre naturellement le titre et les mots-clés dans le contenu
   - Utilise des sous-titres H2 et H3 descriptifs contenant des mots-clés
   - Rédige des paragraphes de 3-5 phrases maximum
   - Inclus des listes à puces et numérotées pour améliorer la lisibilité
   - Ajoute des citations inspirantes en rapport avec le sujet (en blockquote)

3. **Ton et style** :
   - Professionnel mais accessible et engageant
   - Tutoiement du lecteur (tu, toi, ton, ta)
   - Orienté action et conseils pratiques concrets
   - Exemples concrets, cas d'usage réels, statistiques pertinentes
   - Utilise des mots forts : découvre, maîtrise, transforme, optimise

4. **Contenu Mare Nostrum** :
   - Mentionne Mare Nostrum 2-3 fois de manière subtile et naturelle
   - Termine par un appel à l'action clair vers les services de Mare Nostrum
   - Inclus l'expertise en entrepreneuriat à impact et accompagnement personnalisé

5. **LONGUEUR CRITIQUE** : 
   - MINIMUM 2500 mots, idéalement 3500-4500 mots
   - Développe chaque section en profondeur avec des exemples détaillés
   - N'hésite pas à être exhaustif sur le sujet
   - C'est un article de fond, pas un résumé

6. **Formatage** :
   - Utilise <strong> pour les termes importants
   - Utilise <em> pour les mises en valeur subtiles
   - Les blockquote pour les citations ou conseils clés
   - Alterne entre paragraphes, listes et sous-sections pour le rythme

Génère UNIQUEMENT le contenu HTML de l'article, sans wrapper ni métadonnées.`;

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
      max_tokens: 16384,
      temperature: 0.7,
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    console.error("Mistral API error:", error);
    throw new Error(`Mistral API error: ${response.status} - ${error}`);
  }

  const data = await response.json();
  const content = data.choices?.[0]?.message?.content;

  if (!content) {
    throw new Error("No content generated from Mistral");
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
    const { title, category, image, publish = true } = body;

    // Parse keywords - handle both string and array formats from n8n
    let keywords: string[] = [];
    if (body.keywords) {
      if (Array.isArray(body.keywords)) {
        keywords = body.keywords;
      } else if (typeof body.keywords === 'string') {
        try {
          const parsed = JSON.parse(body.keywords);
          keywords = Array.isArray(parsed) ? parsed : [];
        } catch {
          // If not valid JSON, treat as comma-separated string
          keywords = body.keywords.split(',').map((k: string) => k.trim()).filter(Boolean);
        }
      }
    }

    console.log(`Generating article: "${title}" in category "${category}"`);
    console.log(`Parsed keywords:`, keywords);

    if (!title || !category) {
      return new Response(
        JSON.stringify({ success: false, error: "title and category are required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Generate article content with Mistral
    console.log("Calling Mistral API...");
    const content = await generateArticleWithMistral(title, category, keywords);
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
