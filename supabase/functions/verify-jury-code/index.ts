import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const AIRTABLE_API_KEY = Deno.env.get("AIRTABLE_API_KEY")!;
const BASE_ID          = "appZ8ykNuUOv89ou0";
const TABLE_ID         = "tblocqquF4OXgXveO"; // BASE DE PRODUCTION

const cors = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: cors });

  try {
    const { action, code, recordId, nom, prenom, email, telephone } = await req.json();

    // ── Action 1 : valider un code jury → retourner tous les jurés qui l'ont
    if (action === "validate") {
      const codeUpper = (code ?? "").trim().toUpperCase();
      if (!codeUpper) throw new Error("Code manquant.");

      const formula = encodeURIComponent(`{CODE JURY NITEO } = "${codeUpper}"`);
      const fields  = `fields[]=Pr%C3%A9nom%20%2F%20Nom&fields[]=CODE+JURY+NITEO+`;
      const res     = await fetch(
        `https://api.airtable.com/v0/${BASE_ID}/${TABLE_ID}?filterByFormula=${formula}&${fields}&maxRecords=200`,
        { headers: { Authorization: `Bearer ${AIRTABLE_API_KEY}` } }
      );
      const data = await res.json();

      if (!data.records?.length) {
        return new Response(JSON.stringify({ valid: false }), {
          status: 200, headers: { ...cors, "Content-Type": "application/json" },
        });
      }

      const jures = data.records
        .map((r: any) => ({
          id:   r.id,
          nom:  (r.fields["Prénom / Nom"] ?? "").trim(),
          code: (r.fields["CODE JURY NITEO "] ?? "").trim(),
        }))
        .filter((j: any) => j.nom);

      return new Response(JSON.stringify({ valid: true, jures }), {
        status: 200, headers: { ...cors, "Content-Type": "application/json" },
      });
    }

    // ── Action 2 : sélection d'un juré existant par son recordId
    if (action === "select") {
      const res  = await fetch(
        `https://api.airtable.com/v0/${BASE_ID}/${TABLE_ID}/${recordId}`,
        { headers: { Authorization: `Bearer ${AIRTABLE_API_KEY}` } }
      );
      const data = await res.json();
      if (data.error) throw new Error("Juré introuvable.");

      const nomJure  = (data.fields["Prénom / Nom"] ?? "").trim();
      const codeJure = (data.fields["CODE JURY NITEO "] ?? "").trim();

      return new Response(JSON.stringify({ ok: true, nomJure, codeJure }), {
        status: 200, headers: { ...cors, "Content-Type": "application/json" },
      });
    }

    // ── Action 3 : créer un nouveau juré avec le même code que le groupe
    if (action === "register") {
      const nomComplet = `${(prenom ?? "").trim()} ${(nom ?? "").trim()}`.trim();
      const codeJure   = (code ?? "").trim().toUpperCase();
      if (!nomComplet) throw new Error("Nom et prénom obligatoires.");
      if (!codeJure)   throw new Error("Code manquant.");

      const createRes = await fetch(`https://api.airtable.com/v0/${BASE_ID}/${TABLE_ID}`, {
        method: "POST",
        headers: { Authorization: `Bearer ${AIRTABLE_API_KEY}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          fields: {
            "Prénom / Nom":     nomComplet,
            "Mail":             email ?? "",
            "Téléphone":        telephone ?? "",
            "CODE JURY NITEO ": codeJure,
          },
        }),
      });
      const created = await createRes.json();
      if (created.error) throw new Error(created.error.message ?? "Erreur création.");

      return new Response(JSON.stringify({ ok: true, nomJure: nomComplet, codeJure }), {
        status: 200, headers: { ...cors, "Content-Type": "application/json" },
      });
    }

    throw new Error("Action inconnue.");

  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 400, headers: { ...cors, "Content-Type": "application/json" },
    });
  }
});
