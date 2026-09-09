/**
 * Équipe Mare Nostrum — source unique pour les pages /equipe, /equipe/:slug
 * et le script scripts/generate-cards.mjs (vCards + QR codes).
 *
 * Les données vivent dans team.json. Ce fichier n'ajoute que les types et
 * les helpers.
 */
import teamJson from "./team.json";

export type Bureau = "Toulouse" | "Paris" | "Casablanca";

export interface TeamMember {
  /** Identifiant d'URL de la fiche, en pratique le prénom : "alexis" → marenostrum.tech/equipe/alexis. Minuscules, chiffres, tirets, unique. */
  slug: string;
  prenom: string;
  nom: string;
  titre: string;
  bureau: Bureau;
  /** Vide si inconnu — le champ est alors masqué. */
  email: string;
  /** Format international sans espaces, ex. "+33612345678". Vide si inconnu. */
  telephone: string;
  /** Numéro WhatsApp, même format. Vide si pas de WhatsApp. */
  whatsapp: string;
  /** URL complète du profil. Vide si inconnue. */
  linkedin: string;
  /** Nom du fichier portrait sans extension, dans src/assets/team/. */
  photo: string;
  /** Une ou deux phrases, optionnel. */
  bio: string;
}

export const SITE_URL = "https://www.marenostrum.tech";

export const team: TeamMember[] = teamJson as TeamMember[];

// Portraits résolus par Vite (hashés, optimisés) — pas de duplication dans public/.
const portraits = import.meta.glob<string>("@/assets/team/*.png", { eager: true, import: "default" });

export function getPortrait(photo: string): string | undefined {
  if (!photo) return undefined;
  const hit = Object.entries(portraits).find(([path]) => path.endsWith(`/${photo}.png`));
  return hit?.[1];
}

export const getMember = (slug: string): TeamMember | undefined =>
  team.find((m) => m.slug === slug.toLowerCase());

export const fullName = (m: TeamMember) => `${m.prenom} ${m.nom}`;

export const initials = (m: TeamMember) => `${m.prenom.charAt(0)}${m.nom.charAt(0)}`.toUpperCase();

/** Adresse de la fiche — partagée, encodée dans le QR, utilisée dans les schémas. */
export const cardUrl = (m: TeamMember) => `${SITE_URL}/equipe/${m.slug}`;
export const vcardPath = (m: TeamMember) => `/vcards/${m.slug}.vcf`;
export const qrPath = (m: TeamMember, ext: "png" | "svg" = "png") => `/qr/${m.slug}.${ext}`;

export const TEAM_VCARD_PATH = "/vcards/equipe.vcf";
export const TEAM_QR_PATH = "/qr/equipe.png";

/** "+33612345678" → "+33 6 12 34 56 78" (affichage). Autres pays : groupes de 2 après l'indicatif. */
export function formatPhone(tel: string): string {
  const d = tel.replace(/[^\d+]/g, "");
  const fr = d.match(/^\+33(\d)(\d{2})(\d{2})(\d{2})(\d{2})$/);
  if (fr) return `+33 ${fr[1]} ${fr[2]} ${fr[3]} ${fr[4]} ${fr[5]}`;
  const intl = d.match(/^(\+\d{2,3})(\d+)$/);
  if (intl) return `${intl[1]} ${intl[2].replace(/(\d{2})(?=\d)/g, "$1 ")}`;
  return tel;
}

export const telHref = (tel: string) => `tel:${tel.replace(/[^\d+]/g, "")}`;
export const whatsappHref = (tel: string) => `https://wa.me/${tel.replace(/\D/g, "")}`;
