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
  keywords: string[] = [],
  taskId: string
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

  console.log(`[${taskId}] Sending request to Mistral API...`);
  const startTime = Date.now();

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 120000); // 2 minute timeout

  try {
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
      signal: controller.signal,
    });

    clearTimeout(timeoutId);
    const elapsed = Date.now() - startTime;
    console.log(`[${taskId}] Mistral API responded in ${elapsed}ms with status ${response.status}`);

    if (!response.ok) {
      const error = await response.text();
      console.error(`[${taskId}] Mistral API error response:`, error);
      throw new Error(`Mistral API error: ${response.status} - ${error}`);
    }

    const data = await response.json();
    console.log(`[${taskId}] Mistral API response received, parsing content...`);
    
    const content = data.choices?.[0]?.message?.content;

    if (!content) {
      console.error(`[${taskId}] No content in Mistral response:`, JSON.stringify(data).substring(0, 500));
      throw new Error("No content generated from Mistral");
    }

    console.log(`[${taskId}] Content extracted successfully, length: ${content.length} chars`);
    return content;

  } catch (error) {
    clearTimeout(timeoutId);
    const err = error as Error;
    if (err.name === 'AbortError') {
      console.error(`[${taskId}] Mistral API request timed out after 120 seconds`);
      throw new Error("Mistral API timeout");
    }
    throw error;
  }
}

// Background task to generate and save article
async function processArticleGeneration(
  title: string,
  category: string,
  keywords: string[],
  image: string | undefined,
  publish: boolean
) {
  const taskId = crypto.randomUUID().substring(0, 8);
  console.log(`[${taskId}] ========== STARTING BACKGROUND TASK ==========`);
  console.log(`[${taskId}] Title: "${title}"`);
  console.log(`[${taskId}] Category: ${category}`);
  console.log(`[${taskId}] Keywords: ${keywords.join(', ')}`);

  try {
    // Generate article content with Mistral
    const content = await generateArticleWithMistral(title, category, keywords, taskId);
    console.log(`[${taskId}] Generated content: ${content.length} characters`);

    // Generate slug and excerpt
    const slug = generateSlug(title);
    const excerpt = extractExcerpt(content);
    console.log(`[${taskId}] Slug: ${slug}`);
    console.log(`[${taskId}] Excerpt: ${excerpt.substring(0, 100)}...`);

    // Initialize Supabase client with service role
    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    
    if (!supabaseUrl || !supabaseServiceKey) {
      throw new Error("Missing Supabase credentials");
    }
    
    console.log(`[${taskId}] Connecting to Supabase...`);
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Insert article into database
    console.log(`[${taskId}] Inserting article into database...`);
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
      console.error(`[${taskId}] Database insert error:`, insertError);
      throw new Error(`Database error: ${insertError.message}`);
    }

    console.log(`[${taskId}] ========== SUCCESS ==========`);
    console.log(`[${taskId}] Article ID: ${article.id}`);
    console.log(`[${taskId}] Article URL: /blog/${slug}`);
    
  } catch (error) {
    const err = error as Error;
    console.error(`[${taskId}] ========== ERROR ==========`);
    console.error(`[${taskId}] Error type: ${err.name || 'Unknown'}`);
    console.error(`[${taskId}] Error message: ${err.message || String(error)}`);
    console.error(`[${taskId}] Full error:`, error);
  }
}

// Handle shutdown gracefully
addEventListener('beforeunload', (ev) => {
  // @ts-ignore - Deno specific
  const reason = ev.detail?.reason || 'unknown';
  console.log(`[SHUTDOWN] Function shutting down. Reason: ${reason}`);
});

Deno.serve(async (req) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  const requestId = crypto.randomUUID().substring(0, 8);
  console.log(`[${requestId}] ========== NEW REQUEST ==========`);

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
          keywords = body.keywords.split(',').map((k: string) => k.trim()).filter(Boolean);
        }
      }
    }

    console.log(`[${requestId}] Title: "${title}"`);
    console.log(`[${requestId}] Category: ${category}`);
    console.log(`[${requestId}] Keywords: ${JSON.stringify(keywords)}`);
    console.log(`[${requestId}] Publish: ${publish}`);

    if (!title || !category) {
      console.log(`[${requestId}] Missing required fields`);
      return new Response(
        JSON.stringify({ success: false, error: "title and category are required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Start background task for article generation
    console.log(`[${requestId}] Starting background task...`);
    // @ts-ignore - EdgeRuntime is available in Supabase Edge Functions
    EdgeRuntime.waitUntil(processArticleGeneration(title, category, keywords, image, publish));

    console.log(`[${requestId}] Background task initiated, returning response`);
    
    // Return immediate response
    return new Response(
      JSON.stringify({
        success: true,
        message: "Article generation started in background",
        status: "processing",
        requestId,
        title,
        category,
        slug: generateSlug(title),
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );

  } catch (error) {
    console.error(`[${requestId}] Request error:`, error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return new Response(
      JSON.stringify({ success: false, error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
