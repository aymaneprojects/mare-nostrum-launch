// Niteo Toulouse 2026 — program data
// Parsed from the client's calendar; normalized dates to YYYY-MM-DD.
// Type mapping: "module" = e-learning, "session" = collectif, "tutorat" = individuel.

const PROGRAM = {
  name: 'Niteo Toulouse 2026',
  subtitle: 'Programme d\u2019incubation entrepreneuriale',
  cohort: 'Promotion 2026',
  start: '2026-04-10',
  end:   '2026-06-13',
  description: 'Un parcours de dix semaines pour transformer une intuition entrepreneuriale en projet crédible et finançable. Onze modules e-learning, quatre sessions collectives de validation, trois tutorats individuels — rythmés autour de quatre étapes majeures&nbsp;: problématique, modèle économique, lancement, pitch.',
};

// Short labels + full descriptions.
const ITEMS = [
  // ═══ SESSION 1 — Problématique ═══
  { id: 'M1', type: 'module', num: 1, title: 'Identifier une problématique entrepreneuriale réelle',
    obj: 'Être capable de formuler une problématique claire, spécifique et observable du point de vue du client.',
    date: '2026-04-10', phase: 1, duration: '3 h' },
  { id: 'M2', type: 'module', num: 2, title: 'Mener une étude de marché terrain efficace',
    obj: 'Être capable de mener et analyser au moins 8 à 10 entretiens clients exploitables.',
    date: '2026-04-10', phase: 1, duration: '3 h' },
  { id: 'M3', type: 'module', num: 3, title: 'Analyse macro-économique & contexte de marché',
    obj: 'Être capable d\u2019analyser l\u2019environnement macro-économique d\u2019un projet entrepreneurial afin d\u2019identifier les opportunités, risques et tendances impactant le marché cible.',
    date: '2026-04-13', phase: 1, duration: '3 h' },
  { id: 'S1', type: 'session', num: 1, title: 'Problématique, client & validation terrain',
    obj: 'Être capable de présenter un client cible réel, de formuler une problématique claire et de mener une étude de terrain exploitable pour valider ou invalider son hypothèse de départ.',
    date: '2026-04-11', phase: 1, duration: '1 journée' },

  // ═══ SESSION 2 — Proposition de valeur & modèle ═══
  { id: 'M4a', type: 'module', num: 4, title: 'Construire une proposition de valeur différenciante',
    obj: 'Être capable de formuler une proposition de valeur claire, compréhensible et différenciante.',
    date: '2026-04-13', phase: 2, duration: '3 h' },
  { id: 'M4b', type: 'module', num: 4, title: 'Entrepreneuriat à impact',
    obj: 'Être capable d\u2019intégrer une démarche d\u2019impact social et environnemental au cœur de son modèle d\u2019affaires entrepreneurial.',
    date: '2026-04-13', phase: 2, duration: '2 h', tag: 'bis' },
  { id: 'M5', type: 'module', num: 5, title: 'Diagnostic stratégique',
    obj: 'Être capable de réaliser un premier diagnostic stratégique dans la continuité du travail de désirabilité.',
    date: '2026-04-13', phase: 2, duration: '3 h' },
  { id: 'T1', type: 'tutorat', num: 1, title: 'Validation problématique & terrain',
    obj: 'Tutorat individuel — validation de la problématique et des enseignements du terrain.',
    date: '2026-04-13', dateEnd: '2026-04-30', phase: 1, duration: 'jours ouvrés', span: true },
  { id: 'S2', type: 'session', num: 2, title: 'Proposition de valeur & modèle économique',
    obj: 'Être capable de construire une proposition de valeur claire et différenciante, adossée à un modèle économique cohérent et réaliste.',
    date: '2026-05-02', phase: 2, duration: '1 journée' },
  { id: 'M6', type: 'module', num: 6, title: 'Business Model Canvas & sources de revenus',
    obj: 'Être capable de structurer un Business Model Canvas complet et cohérent.',
    date: '2026-04-13', phase: 2, duration: '3 h' },
  { id: 'M7', type: 'module', num: 7, title: 'Maquette & preuve de concept',
    obj: 'Être capable de produire une maquette visuelle et une preuve de concept crédible.',
    date: '2026-04-10', phase: 2, duration: '2 h' },

  // ═══ SESSION 3 — Lancement & commercial ═══
  { id: 'M8', type: 'module', num: 8, title: 'Financement & prévisionnel financier',
    obj: 'Être capable de construire un plan de financement initial et un budget prévisionnel à 3 ans.',
    date: '2026-05-05', phase: 3, duration: '3 h' },
  { id: 'M9', type: 'module', num: 9, title: 'Stratégie de lancement & acquisition des premiers clients',
    obj: 'Être capable de définir une stratégie de lancement réaliste orientée action.',
    date: '2026-04-13', phase: 3, duration: '3 h' },
  { id: 'T2', type: 'tutorat', num: 2, title: 'Validation du modèle économique',
    obj: 'Tutorat individuel — arbitrages sur le modèle économique et les hypothèses financières.',
    date: '2026-05-05', dateEnd: '2026-05-29', phase: 2, duration: 'jours ouvrés', span: true },
  { id: 'S3', type: 'session', num: 3, title: 'Stratégie de lancement & commercial',
    obj: 'Être capable de définir une stratégie de lancement opérationnelle et de construire un plan de financement initial crédible.',
    date: '2026-05-30', phase: 3, duration: '1 journée' },

  // ═══ SESSION 4 — Pitch & jury ═══
  { id: 'M10', type: 'module', num: 10, title: 'Module juridique',
    obj: 'Choisir une structure adaptée, sécuriser ses contrats clés, mettre en place un plan d\u2019action RGPD et structurer une gouvernance alignée avec l\u2019impact recherché.',
    date: '2026-05-05', phase: 4, duration: '3 h' },
  { id: 'M11', type: 'module', num: 11, title: 'Pitch deck & storytelling entrepreneurial',
    obj: 'Être capable de structurer un pitch deck clair, convaincant et orienté jury.',
    date: '2026-06-01', phase: 4, duration: '2 h' },
  { id: 'T3', type: 'tutorat', num: 3, title: 'Préparation pitch & posture entrepreneuriale',
    obj: 'Tutorat individuel — répétitions de pitch et travail de la posture.',
    date: '2026-06-01', dateEnd: '2026-06-12', phase: 4, duration: 'jours ouvrés', span: true },
  { id: 'S4', type: 'session', num: 4, title: 'Pitch blanc & préparation au jury',
    obj: 'Être capable de pitcher un projet entrepreneurial crédible, structuré et convaincant devant des interlocuteurs experts.',
    date: '2026-06-13', phase: 4, duration: '1 journée' },
];

const PHASES = [
  { n: 1, key: 'problematique', title: 'Problématique',       sub: 'Client, terrain, validation',        start: '2026-04-10', end: '2026-04-30' },
  { n: 2, key: 'modele',        title: 'Modèle',              sub: 'Proposition de valeur & économie',   start: '2026-05-01', end: '2026-05-15' },
  { n: 3, key: 'lancement',     title: 'Lancement',           sub: 'Commercial & financement',           start: '2026-05-16', end: '2026-05-31' },
  { n: 4, key: 'pitch',         title: 'Pitch',               sub: 'Jury & posture',                     start: '2026-06-01', end: '2026-06-13' },
];

// Type metadata (colors derived from MN palette)
const TYPES = {
  module:  { label: 'Module e-learning',   short: 'Module',   color: '#3BD9DB', text: '#24335D', ring: 'rgba(59,217,219,0.5)',  icon: 'module'  },
  session: { label: 'Session collective',  short: 'Session',  color: '#24335D', text: '#ffffff', ring: 'rgba(36,51,93,0.5)',   icon: 'session' },
  tutorat: { label: 'Tutorat individuel',  short: 'Tutorat',  color: '#F2C56B', text: '#2A1F05', ring: 'rgba(242,197,107,0.5)', icon: 'tutorat' },
};

Object.assign(window, { PROGRAM, ITEMS, PHASES, TYPES });
