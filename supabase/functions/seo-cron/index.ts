/**
 * SEO CRON — Mare Nostrum
 * Runs every 4h via pg_cron → net.http_post
 *
 * Each run:
 *  1. Picks the next keyword cluster (rotating across 6 pillars, ~110 topics)
 *  2. Generates a 2 500-word SEO article via Mistral
 *  3. Injects internal links to 3 existing articles
 *  4. Saves to blog_articles (published immediately)
 *  5. Pings IndexNow (Google + Bing indexation temps réel)
 *  6. Logs to seo_cron_log
 */

import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const SITE_URL        = "https://marenostrum.tech";
const INDEXNOW_KEY    = "mn7f3a2b1c4d5e6f789012345678abcd";  // doit correspondre à /mn7f3a2b1c4d5e6f789012345678abcd.txt
const CRON_SECRET     = Deno.env.get("CRON_SECRET") ?? "";
const MISTRAL_API_KEY = Deno.env.get("MISTRAL_API_KEY") ?? "";

const cors = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// ─────────────────────────────────────────────────────────────────────────────
// KEYWORD BANK  (~110 clusters • 6 pillars)
// Pilier A → Entrepreneuriat francophone
// Pilier B → Création d'entreprise France
// Pilier C → Accompagnement & club entrepreneur
// Pilier D → Entrepreneuriat Afrique / Congo / Maroc
// Pilier E → Formation professionnelle entrepreneur
// Pilier F → Financement, levée de fonds, subventions
// ─────────────────────────────────────────────────────────────────────────────
interface Cluster {
  title:    string;
  keywords: string[];
  category: string;
  pillar:   "A"|"B"|"C"|"D"|"E"|"F";
  image:    string;
}

const KEYWORD_BANK: Cluster[] = [
  // ── PILIER A — Francophonie ───────────────────────────────────────────────
  {
    pillar: "A", category: "Entrepreneuriat",
    title:    "Entrepreneuriat francophone : état des lieux et opportunités en 2025",
    keywords: ["entrepreneuriat francophone","espace francophone entrepreneur","startup francophonie"],
    image:    "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=1200",
  },
  {
    pillar: "A", category: "Entrepreneuriat",
    title:    "Comment développer son réseau d'affaires dans l'espace francophone",
    keywords: ["réseau entrepreneur francophone","networking francophone","club entrepreneur international"],
    image:    "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1200",
  },
  {
    pillar: "A", category: "Entrepreneuriat",
    title:    "Les 10 secteurs porteurs pour entreprendre dans la francophonie en 2025",
    keywords: ["secteurs porteurs francophonie","opportunités entrepreneuriales","marché francophone"],
    image:    "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200",
  },
  {
    pillar: "A", category: "Entrepreneuriat",
    title:    "Entrepreneuriat et diversité culturelle : atout majeur des entrepreneurs francophones",
    keywords: ["diversité culturelle entrepreneuriat","entrepreneur multiculturel","diaspora entrepreneurs"],
    image:    "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200",
  },
  {
    pillar: "A", category: "Entrepreneuriat",
    title:    "Réussir à l'international depuis la France : guide pour entrepreneurs francophones",
    keywords: ["internationalisation PME France","développement international entrepreneur","export francophone"],
    image:    "https://images.unsplash.com/photo-1488229297570-58520851e868?w=1200",
  },
  {
    pillar: "A", category: "Entrepreneuriat",
    title:    "Les communautés d'entrepreneurs francophones les plus influentes du monde",
    keywords: ["communauté entrepreneur francophone","réseau affaires francophonie","associations entrepreneurs"],
    image:    "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200",
  },
  {
    pillar: "A", category: "Innovation",
    title:    "Innovation sociale et entrepreneuriat dans les pays francophones",
    keywords: ["innovation sociale francophonie","entrepreneuriat social francophone","impact social entrepreneur"],
    image:    "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=1200",
  },
  {
    pillar: "A", category: "Entrepreneuriat",
    title:    "Pourquoi la francophonie est un avantage compétitif pour les entrepreneurs",
    keywords: ["avantage compétitif francophonie","marché francophone 300 millions","langue française business"],
    image:    "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=1200",
  },

  // ── PILIER B — Création entreprise France ────────────────────────────────
  {
    pillar: "B", category: "Création d'entreprise",
    title:    "Comment créer une entreprise en France en 2025 : guide complet étape par étape",
    keywords: ["créer entreprise France 2025","création société France","immatriculer entreprise"],
    image:    "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200",
  },
  {
    pillar: "B", category: "Création d'entreprise",
    title:    "SAS ou SARL : quel statut juridique choisir pour votre startup en 2025",
    keywords: ["SAS SARL comparaison","statut juridique startup","choisir forme juridique entreprise"],
    image:    "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1200",
  },
  {
    pillar: "B", category: "Création d'entreprise",
    title:    "Auto-entrepreneur vs société : quelle structure pour lancer votre activité",
    keywords: ["auto-entrepreneur ou société","micro-entreprise SASU","statut entrepreneur débutant"],
    image:    "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=1200",
  },
  {
    pillar: "B", category: "Création d'entreprise",
    title:    "Créer une startup à Toulouse : écosystème, aides et opportunités",
    keywords: ["créer startup Toulouse","écosystème startup Toulouse","entrepreneuriat Toulouse"],
    image:    "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=1200",
  },
  {
    pillar: "B", category: "Création d'entreprise",
    title:    "Business plan : comment rédiger un document convaincant pour vos investisseurs",
    keywords: ["rédiger business plan","business plan investisseur","exemple business plan startup"],
    image:    "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200",
  },
  {
    pillar: "B", category: "Création d'entreprise",
    title:    "Valider son idée de startup avant de se lancer : méthodes et outils pratiques",
    keywords: ["valider idée startup","MVP produit minimum viable","test marché avant lancement"],
    image:    "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1200",
  },
  {
    pillar: "B", category: "Création d'entreprise",
    title:    "Étude de marché pour entrepreneur : guide pratique et modèle gratuit",
    keywords: ["étude de marché entrepreneur","réaliser étude marché startup","analyse concurrentielle PME"],
    image:    "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200",
  },
  {
    pillar: "B", category: "Création d'entreprise",
    title:    "Pitch deck : les 12 slides indispensables pour convaincre des investisseurs",
    keywords: ["pitch deck startup","présentation investisseur","slides pitch levée fonds"],
    image:    "https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200",
  },
  {
    pillar: "B", category: "Création d'entreprise",
    title:    "Les erreurs fatales à éviter quand on crée son entreprise pour la première fois",
    keywords: ["erreurs création entreprise","pièges entrepreneur débutant","échec startup raisons"],
    image:    "https://images.unsplash.com/photo-1523287562758-66c7fc58967f?w=1200",
  },

  // ── PILIER C — Accompagnement & Club ────────────────────────────────────
  {
    pillar: "C", category: "Accompagnement",
    title:    "Pourquoi rejoindre un club d'entrepreneurs change vraiment la trajectoire de votre projet",
    keywords: ["club entrepreneur France","rejoindre réseau entrepreneurs","avantages club affaires"],
    image:    "https://images.unsplash.com/photo-1543269865-cbf427effbad?w=1200",
  },
  {
    pillar: "C", category: "Accompagnement",
    title:    "Mentorat entrepreneurial : comment trouver le bon mentor et maximiser la relation",
    keywords: ["mentorat entrepreneur","trouver mentor startup","programme mentorat entreprise"],
    image:    "https://images.unsplash.com/photo-1551836022-4c4c79ecde51?w=1200",
  },
  {
    pillar: "C", category: "Accompagnement",
    title:    "Accompagnement entrepreneur : les différentes formes et comment choisir",
    keywords: ["accompagnement entrepreneur","coaching entrepreneur","incubateur vs accélérateur"],
    image:    "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=1200",
  },
  {
    pillar: "C", category: "Accompagnement",
    title:    "Intelligence collective entre pairs : le levier souvent ignoré des entrepreneurs qui réussissent",
    keywords: ["intelligence collective entrepreneurs","peer learning startup","groupe de pairs entrepreneur"],
    image:    "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=1200",
  },
  {
    pillar: "C", category: "Accompagnement",
    title:    "Comment structurer une communauté d'entrepreneurs efficace en 2025",
    keywords: ["communauté entrepreneurs","construire réseau entrepreneurial","community building startup"],
    image:    "https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=1200",
  },
  {
    pillar: "C", category: "Accompagnement",
    title:    "Mastermind entrepreneur : qu'est-ce que c'est et comment en créer un qui fonctionne",
    keywords: ["mastermind entrepreneur","groupe mastermind startup","cercle décideurs entrepreneur"],
    image:    "https://images.unsplash.com/photo-1570126618953-d437176e8c79?w=1200",
  },
  {
    pillar: "C", category: "Accompagnement",
    title:    "Incubateur, accélérateur ou programme d'accompagnement : quelles différences en 2025",
    keywords: ["incubateur accélérateur différence","programme startup France","accompagnement startup choisir"],
    image:    "https://images.unsplash.com/photo-1497366412874-3415097a27e7?w=1200",
  },
  {
    pillar: "C", category: "Accompagnement",
    title:    "Veille stratégique pour entrepreneurs : méthodes simples pour rester informé",
    keywords: ["veille stratégique entrepreneur","outils veille startup","intelligence économique PME"],
    image:    "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=1200",
  },

  // ── PILIER D — Afrique / Congo / Maroc ──────────────────────────────────
  {
    pillar: "D", category: "Entrepreneuriat Afrique",
    title:    "Entrepreneuriat en Afrique francophone : les secteurs qui explosent en 2025",
    keywords: ["entrepreneuriat Afrique francophone","startup Afrique 2025","secteurs porteurs Afrique"],
    image:    "https://images.unsplash.com/photo-1515169067868-5387ec356754?w=1200",
  },
  {
    pillar: "D", category: "Entrepreneuriat Afrique",
    title:    "Créer une entreprise au Congo-Brazzaville : guide pratique pour entrepreneurs",
    keywords: ["créer entreprise Congo Brazzaville","entrepreneuriat Congo","business Congo francophone"],
    image:    "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1200",
  },
  {
    pillar: "D", category: "Entrepreneuriat Afrique",
    title:    "Entrepreneuriat au Maroc : opportunités, aides et programme d'accompagnement",
    keywords: ["entrepreneuriat Maroc","startup Casablanca","créer entreprise Maroc"],
    image:    "https://images.unsplash.com/photo-1489392191049-fc10c97e64b6?w=1200",
  },
  {
    pillar: "D", category: "Entrepreneuriat Afrique",
    title:    "Diaspora africaine et entrepreneuriat : comment entreprendre entre deux continents",
    keywords: ["diaspora africaine entrepreneur","entrepreneur africain France","business diaspora Afrique"],
    image:    "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1200",
  },
  {
    pillar: "D", category: "Entrepreneuriat Afrique",
    title:    "Financement des startups africaines : panorama complet des sources disponibles",
    keywords: ["financement startup africaine","investissement Afrique startup","fonds capital risque Afrique"],
    image:    "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1200",
  },
  {
    pillar: "D", category: "Entrepreneuriat Afrique",
    title:    "Les meilleures villes africaines pour lancer une startup en 2025",
    keywords: ["meilleures villes startup Afrique","écosystème startup Afrique","hub innovation Afrique"],
    image:    "https://images.unsplash.com/photo-1561049501-e1f96bdd98fd?w=1200",
  },
  {
    pillar: "D", category: "Entrepreneuriat Afrique",
    title:    "Impact des technologies mobiles sur l'entrepreneuriat en Afrique centrale",
    keywords: ["fintech Afrique centrale","mobile money Congo","technologie mobile entrepreneur Afrique"],
    image:    "https://images.unsplash.com/photo-1512374382149-233c42b6a83b?w=1200",
  },
  {
    pillar: "D", category: "Entrepreneuriat Afrique",
    title:    "Entrepreneuriat sénégalais : les success stories qui inspirent toute l'Afrique",
    keywords: ["entrepreneur sénégalais succès","startup Sénégal","Dakar hub entrepreneuriat"],
    image:    "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=1200",
  },
  {
    pillar: "D", category: "Entrepreneuriat Afrique",
    title:    "Entrepreneur ivoirien : opportunités et défis de l'écosystème startup en Côte d'Ivoire",
    keywords: ["startup Côte d'Ivoire","entrepreneur Abidjan","écosystème startup Ivoirien"],
    image:    "https://images.unsplash.com/photo-1594980596870-8aa52a78d8cd?w=1200",
  },
  {
    pillar: "D", category: "Entrepreneuriat Afrique",
    title:    "Commerce entre la France et l'Afrique : comment les entrepreneurs peuvent en profiter",
    keywords: ["commerce France Afrique entrepreneur","import export France Afrique","opportunité affaires franco-africaine"],
    image:    "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1200",
  },

  // ── PILIER E — Formation ─────────────────────────────────────────────────
  {
    pillar: "E", category: "Formation",
    title:    "Formation entrepreneuriat : les programmes qui font vraiment la différence en 2025",
    keywords: ["formation entrepreneuriat 2025","programme formation entrepreneur","se former en entrepreneuriat"],
    image:    "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1200",
  },
  {
    pillar: "E", category: "Formation",
    title:    "Compétences essentielles pour réussir en tant qu'entrepreneur en 2025",
    keywords: ["compétences entrepreneur 2025","soft skills entrepreneur","qualités entrepreneur succès"],
    image:    "https://images.unsplash.com/photo-1606761568499-6d2451b23c66?w=1200",
  },
  {
    pillar: "E", category: "Formation",
    title:    "Formation continue pour dirigeants : pourquoi c'est indispensable et comment choisir",
    keywords: ["formation continue dirigeant","formation manager PME","se former dirigeant entreprise"],
    image:    "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=1200",
  },
  {
    pillar: "E", category: "Formation",
    title:    "Les meilleures ressources gratuites pour apprendre l'entrepreneuriat en 2025",
    keywords: ["apprendre entrepreneuriat gratuit","ressources entrepreneur ligne","MOOCs entrepreneuriat"],
    image:    "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=1200",
  },
  {
    pillar: "E", category: "Formation",
    title:    "Leadership et entrepreneuriat : comment développer sa posture de dirigeant",
    keywords: ["leadership entrepreneur","développer leadership startup","posture dirigeant entrepreneur"],
    image:    "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1200",
  },
  {
    pillar: "E", category: "Formation",
    title:    "Intelligence émotionnelle pour entrepreneurs : guide pratique et exercices",
    keywords: ["intelligence émotionnelle entrepreneur","gestion émotions entrepreneur","IE startup dirigeant"],
    image:    "https://images.unsplash.com/photo-1573497491765-dccce02b29df?w=1200",
  },
  {
    pillar: "E", category: "Formation",
    title:    "Comment décrocher un CPF pour financer votre formation entrepreneuriale",
    keywords: ["CPF formation entrepreneur","financer formation CPF","CPF entrepreneuriat 2025"],
    image:    "https://images.unsplash.com/photo-1507537297725-24a1c029d3ca?w=1200",
  },
  {
    pillar: "E", category: "Formation",
    title:    "École de commerce vs entrepreneuriat auto-didacte : quel chemin en 2025",
    keywords: ["école commerce entrepreneuriat","autodidacte vs diplôme entrepreneur","formation entrepreneur diplôme"],
    image:    "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1200",
  },
  {
    pillar: "E", category: "Formation",
    title:    "Les livres incontournables pour tout entrepreneur ambitieux",
    keywords: ["meilleurs livres entrepreneur","bibliothèque entrepreneur startup","livres entrepreneuriat recommandés"],
    image:    "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=1200",
  },

  // ── PILIER F — Financement ───────────────────────────────────────────────
  {
    pillar: "F", category: "Financement",
    title:    "Financer sa startup en France en 2025 : toutes les options disponibles",
    keywords: ["financement startup France 2025","sources financement entrepreneur","capital démarrage entreprise"],
    image:    "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=1200",
  },
  {
    pillar: "F", category: "Financement",
    title:    "Love Money : comment lever des fonds auprès de votre entourage efficacement",
    keywords: ["love money financement startup","lever fonds entourage","financement amorçage famille"],
    image:    "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=1200",
  },
  {
    pillar: "F", category: "Financement",
    title:    "Business Angels en France : comment les trouver et les convaincre",
    keywords: ["business angels France","convaincre business angel","réseau business angels startup"],
    image:    "https://images.unsplash.com/photo-1553729459-efe14ef6055d?w=1200",
  },
  {
    pillar: "F", category: "Financement",
    title:    "Crowdfunding pour entrepreneurs : plateformes, stratégies et taux de réussite",
    keywords: ["crowdfunding entrepreneur","financement participatif startup","plateformes crowdfunding France"],
    image:    "https://images.unsplash.com/photo-1559526324-593bc073d938?w=1200",
  },
  {
    pillar: "F", category: "Financement",
    title:    "BPI France : guide complet des aides, prêts et dispositifs pour entrepreneurs",
    keywords: ["BPI France aide entrepreneur","prêt BPI startup","financement BPI PME"],
    image:    "https://images.unsplash.com/photo-1541873676-a18131494184?w=1200",
  },
  {
    pillar: "F", category: "Financement",
    title:    "Levée de fonds : les 5 erreurs que font les fondateurs lors de leur premier tour",
    keywords: ["erreurs levée fonds","premier tour financement","série A startup erreurs"],
    image:    "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200",
  },
  {
    pillar: "F", category: "Financement",
    title:    "Subventions et aides publiques pour startups : panorama 2025",
    keywords: ["subventions startup 2025","aides publiques entrepreneur","aides création entreprise France"],
    image:    "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1200",
  },
  {
    pillar: "F", category: "Financement",
    title:    "Bootstrap vs levée de fonds : quelle stratégie pour votre startup en 2025",
    keywords: ["bootstrap startup","bootstrapper vs lever fonds","autofinancement startup avantages"],
    image:    "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=1200",
  },

  // ── Extra clusters haute valeur ─────────────────────────────────────────
  {
    pillar: "A", category: "Entrepreneuriat",
    title:    "L'entrepreneuriat étudiant en France : tremplins, concours et dispositifs 2025",
    keywords: ["entrepreneuriat étudiant France","concours startup étudiant","programme entrepreneur étudiant"],
    image:    "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1200",
  },
  {
    pillar: "B", category: "Création d'entreprise",
    title:    "Propriété intellectuelle pour startups : protéger son idée dès le départ",
    keywords: ["propriété intellectuelle startup","protéger idée entrepreneur","brevet marque startup"],
    image:    "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=1200",
  },
  {
    pillar: "C", category: "Accompagnement",
    title:    "Comment bien s'entourer quand on crée son entreprise : conseil, experts, réseau",
    keywords: ["s'entourer entrepreneur","équipe fondateurs startup","conseil administration startup"],
    image:    "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=1200",
  },
  {
    pillar: "B", category: "Création d'entreprise",
    title:    "Marketing digital pour entrepreneur débutant : les fondamentaux à maîtriser",
    keywords: ["marketing digital entrepreneur débutant","stratégie digitale PME","présence web startup"],
    image:    "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=1200",
  },
  {
    pillar: "E", category: "Formation",
    title:    "Gestion du temps pour entrepreneurs : techniques éprouvées pour être plus productif",
    keywords: ["gestion temps entrepreneur","productivité startup","techniques organisation entrepreneur"],
    image:    "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=1200",
  },
  {
    pillar: "F", category: "Financement",
    title:    "Valoriser sa startup : méthodes et pièges à éviter lors d'une négociation",
    keywords: ["valorisation startup méthodes","valeur entreprise startup","évaluer startup investissement"],
    image:    "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1200",
  },
  {
    pillar: "D", category: "Entrepreneuriat Afrique",
    title:    "Fintech et paiement mobile en Afrique francophone : opportunités pour entrepreneurs",
    keywords: ["fintech Afrique francophone","mobile money entrepreneur","paiement numérique Afrique"],
    image:    "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200",
  },
  {
    pillar: "C", category: "Accompagnement",
    title:    "Comment pitcher son projet en 3 minutes et marquer les esprits",
    keywords: ["pitcher projet 3 minutes","elevator pitch entrepreneur","technique pitch startup efficace"],
    image:    "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=1200",
  },
  {
    pillar: "A", category: "Innovation",
    title:    "Entrepreneuriat vert : les opportunités dans la transition écologique francophone",
    keywords: ["entrepreneuriat vert francophone","startup écologie","transition écologique entrepreneur"],
    image:    "https://images.unsplash.com/photo-1497440001374-f26997328c1b?w=1200",
  },
  {
    pillar: "B", category: "Création d'entreprise",
    title:    "Recruter ses premiers collaborateurs : erreurs fréquentes et bonnes pratiques",
    keywords: ["recruter premiers employés startup","premier recrutement entrepreneur","RH startup débutant"],
    image:    "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=1200",
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────────────────────────────────────

function slugify(title: string): string {
  return title
    .toLowerCase()
    .normalize("NFD").replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim()
    .substring(0, 80);
}

function htmlToText(html: string): string {
  return html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

/** Choose next cluster that doesn't have an existing article slug clash */
function pickCluster(existingSlugs: string[], runCount: number): Cluster {
  // Rotate pillar: A→B→C→D→E→F→A…
  const pillars: Array<"A"|"B"|"C"|"D"|"E"|"F"> = ["A","B","C","D","E","F"];
  const targetPillar = pillars[runCount % 6];

  const pool = KEYWORD_BANK.filter(c => {
    if (c.pillar !== targetPillar) return false;
    const s = slugify(c.title);
    return !existingSlugs.some(es => es === s || es.startsWith(s.substring(0, 30)));
  });

  // If current pillar exhausted, pick from any available
  const candidates = pool.length > 0
    ? pool
    : KEYWORD_BANK.filter(c => {
        const s = slugify(c.title);
        return !existingSlugs.some(es => es === s || es.startsWith(s.substring(0, 30)));
      });

  if (candidates.length === 0) return KEYWORD_BANK[runCount % KEYWORD_BANK.length];

  return candidates[Math.floor(Math.random() * candidates.length)];
}

/** Build the SEO prompt for Mistral */
function buildPrompt(cluster: Cluster, relatedTitles: string[]): string {
  const kw = cluster.keywords.join(", ");
  const related = relatedTitles.length > 0
    ? `\n\nARTICLES CONNEXES (intègre des liens internes naturels vers ces sujets dans le corps du texte) :\n${relatedTitles.map(t => `- ${t}`).join("\n")}`
    : "";

  return `Tu es un expert SEO et rédacteur web senior spécialisé en entrepreneuriat francophone.

Rédige un article de blog complet et optimisé SEO sur le sujet : "${cluster.title}"
Catégorie : ${cluster.category}
Mots-clés principaux à intégrer naturellement : ${kw}
${related}

CONSIGNES SEO STRICTES :
- 2 200 à 2 800 mots au total
- Mot-clé principal dans les 120 premiers mots ET dans un H2
- Densité mots-clés : 1,5 à 2,5% (naturelle, jamais forcée)
- Au moins 5 balises H2, 3 balises H3 minimum
- Listes à puces pour 30% du contenu
- Paragraphes courts : 3 phrases maximum
- 1 blockquote avec une statistique ou citation d'expert
- Section FAQ avec 4 questions (balises Q+R)
- Introduction en 3 paragraphes max qui pose l'enjeu
- Conclusion de 2 paragraphes avec synthèse + ouverture

FORMAT : HTML pur UNIQUEMENT (h2, h3, p, ul, li, ol, strong, em, blockquote).
JAMAIS de markdown, JAMAIS de balises \`\`\`, JAMAIS de H1.
NE mentionne AUCUNE entreprise, marque ou service commercial.
Contenu 100% éducatif, objectif et actionnable.
Langue : français, vouvoiement, registre professionnel.

Commence DIRECTEMENT avec le premier paragraphe HTML :`;
}

/** Ping IndexNow endpoints */
async function pingIndexNow(urls: string[]): Promise<string> {
  const body = {
    host:    "marenostrum.tech",
    key:     INDEXNOW_KEY,
    keyLocation: `${SITE_URL}/${INDEXNOW_KEY}.txt`,
    urlList: urls,
  };

  const endpoints = [
    "https://api.indexnow.org/indexnow",
    "https://www.bing.com/indexnow",
  ];

  const results: string[] = [];
  for (const ep of endpoints) {
    try {
      const r = await fetch(ep, {
        method:  "POST",
        headers: { "Content-Type": "application/json; charset=utf-8" },
        body:    JSON.stringify(body),
      });
      results.push(`${ep} → ${r.status}`);
    } catch (e) {
      results.push(`${ep} → error: ${e}`);
    }
  }
  return results.join(" | ");
}

/** Inject internal links: replace occurrences of keyword-like phrases with <a> */
function injectInternalLinks(html: string, articles: { slug: string; title: string }[]): string {
  let result = html;
  const injected = new Set<string>();

  for (const art of articles.slice(0, 4)) {
    if (injected.has(art.slug)) continue;

    // Extract a short phrase from the title (2-3 words) to look for in text
    const words = art.title.split(" ").filter(w => w.length > 4).slice(0, 3);
    if (words.length < 2) continue;
    const phrase = words.join(" ");
    const regex  = new RegExp(`(?<![<"])${phrase}`, "i");

    if (regex.test(result)) {
      result = result.replace(regex, `<a href="/blog/${art.slug}">${phrase}</a>`);
      injected.add(art.slug);
    }
  }
  return result;
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN HANDLER
// ─────────────────────────────────────────────────────────────────────────────

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: cors });

  // Optionnal shared secret check (set CRON_SECRET env var)
  if (CRON_SECRET) {
    const auth = req.headers.get("authorization") ?? "";
    if (!auth.includes(CRON_SECRET)) {
      return new Response(JSON.stringify({ error: "unauthorized" }), {
        status: 401, headers: { ...cors, "Content-Type": "application/json" },
      });
    }
  }

  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
  );

  const runStart = new Date().toISOString();
  console.log(`[SEO-CRON] run started at ${runStart}`);

  try {
    // ── 1. Fetch context: existing articles ─────────────────────────────────
    const { data: articles } = await supabase
      .from("blog_articles")
      .select("id, slug, title, category")
      .order("published_at", { ascending: false });

    const existing     = articles ?? [];
    const existingSlugs = existing.map(a => a.slug);

    // ── 2. How many runs happened today (to pick the right cluster rotation) ─
    const { count: runCount } = await supabase
      .from("seo_cron_log")
      .select("*", { count: "exact", head: true });

    const totalRuns = runCount ?? 0;

    // ── 3. Pick cluster ──────────────────────────────────────────────────────
    const cluster = pickCluster(existingSlugs, totalRuns);
    console.log(`[SEO-CRON] cluster: "${cluster.title}" (pillar ${cluster.pillar})`);

    // ── 4. Build Mistral prompt ──────────────────────────────────────────────
    const relatedTitles = existing
      .filter(a => a.category === cluster.category || (Math.random() > 0.5))
      .slice(0, 5)
      .map(a => a.title);

    const prompt = buildPrompt(cluster, relatedTitles);

    // ── 5. Generate article via Mistral ──────────────────────────────────────
    console.log("[SEO-CRON] calling Mistral...");
    const mistralRes = await fetch("https://api.mistral.ai/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${MISTRAL_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model:       "mistral-large-2512",
        messages:    [{ role: "user", content: prompt }],
        max_tokens:  7000,
        temperature: 0.65,
      }),
    });

    if (!mistralRes.ok) {
      const err = await mistralRes.text();
      throw new Error(`Mistral ${mistralRes.status}: ${err}`);
    }

    const mistralData = await mistralRes.json();
    let rawContent: string = mistralData.choices?.[0]?.message?.content ?? "";

    // Clean code fences
    rawContent = rawContent.replace(/```html?\n?/gi, "").replace(/```\n?/g, "").trim();

    // ── 6. Inject internal links ─────────────────────────────────────────────
    const content = injectInternalLinks(rawContent, existing);
    const wordCount = htmlToText(content).split(/\s+/).length;
    console.log(`[SEO-CRON] generated ${wordCount} words`);

    // ── 7. Build metadata ────────────────────────────────────────────────────
    const slug    = slugify(cluster.title);
    const plain   = htmlToText(content);
    const excerpt = plain.substring(0, 155).trim() + (plain.length > 155 ? "…" : "");

    // ── 8. Save to DB ────────────────────────────────────────────────────────
    const { data: article, error: dbErr } = await supabase
      .from("blog_articles")
      .insert({
        title:        cluster.title,
        slug,
        excerpt,
        content,
        category:     cluster.category,
        image:        cluster.image,
        author:       "Mare Nostrum",
        is_published: true,
        published_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (dbErr) throw new Error(`DB: ${dbErr.message}`);
    console.log(`[SEO-CRON] saved article ${article.id}`);

    // ── 9. Ping IndexNow ─────────────────────────────────────────────────────
    const newUrl          = `${SITE_URL}/blog/${slug}`;
    const indexnowStatus  = await pingIndexNow([newUrl]);
    console.log(`[SEO-CRON] IndexNow: ${indexnowStatus}`);

    // ── 10. Log the run ──────────────────────────────────────────────────────
    await supabase.from("seo_cron_log").insert({
      article_id:       article.id,
      article_title:    cluster.title,
      article_slug:     slug,
      keyword_cluster:  cluster.keywords.join(", "),
      pillar:           cluster.pillar,
      word_count:       wordCount,
      indexnow_status:  indexnowStatus,
      status:           "success",
    });

    return new Response(JSON.stringify({
      success:    true,
      article_id: article.id,
      url:        newUrl,
      pillar:     cluster.pillar,
      keywords:   cluster.keywords,
      wordCount,
      indexnow:   indexnowStatus,
    }), { status: 200, headers: { ...cors, "Content-Type": "application/json" } });

  } catch (err: any) {
    console.error("[SEO-CRON] error:", err);

    // Log failure
    await supabase.from("seo_cron_log").insert({
      status:        "error",
      error_message: err.message ?? String(err),
    }).catch(() => null);

    return new Response(JSON.stringify({ success: false, error: err.message }), {
      status: 500, headers: { ...cors, "Content-Type": "application/json" },
    });
  }
});
