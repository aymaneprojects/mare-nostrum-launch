
# Plan : Resoudre le probleme CORS des webhooks n8n

## Probleme identifie
Les appels directs depuis le navigateur vers les webhooks n8n sont bloques par la politique CORS du navigateur car le serveur n8n ne renvoie pas l'en-tete `Access-Control-Allow-Origin`.

## Solution recommandee : Edge Function Proxy

Creer une edge function qui agira comme intermediaire (proxy) entre le frontend et n8n. Les appels serveur-a-serveur ne sont pas soumis aux restrictions CORS.

## Modifications a effectuer

### 1. Creer l'edge function `webhook-proxy`

**Fichier** : `supabase/functions/webhook-proxy/index.ts`

Cette fonction :
- Recoit les donnees du frontend
- Identifie le type de webhook (contact ou livre-blanc)
- Transmet les donnees au webhook n8n correspondant
- Retourne le statut de l'operation

```text
+-------------+         +-----------------+         +------------------+
|  Frontend   | ------> |  Edge Function  | ------> |  n8n Webhook     |
|  (Browser)  |  CORS   |  (webhook-proxy)|  HTTP   |  (No CORS issue) |
+-------------+  OK     +-----------------+         +------------------+
```

### 2. Mettre a jour `supabase/config.toml`

Ajouter la configuration pour la nouvelle fonction avec `verify_jwt = false` pour permettre les appels publics.

### 3. Modifier `src/pages/Contact.tsx`

Remplacer l'appel fetch direct vers n8n par un appel a l'edge function :
```javascript
await supabase.functions.invoke('webhook-proxy', {
  body: { type: 'contact', data: formData }
});
```

### 4. Modifier `src/pages/LivreEntrepreneuriat.tsx`

Remplacer l'appel fetch direct vers n8n par un appel a l'edge function :
```javascript
await supabase.functions.invoke('webhook-proxy', {
  body: { type: 'livre-blanc', data: webhookData }
});
```

## Avantages de cette solution

- Contourne completement les restrictions CORS
- Centralise la logique des webhooks
- Permet d'ajouter facilement de nouveaux webhooks
- Possibilite d'ajouter des logs pour le debugging
- Meilleure gestion des erreurs

## Fichiers concernes

| Fichier | Action |
|---------|--------|
| `supabase/functions/webhook-proxy/index.ts` | Creer |
| `supabase/config.toml` | Modifier |
| `src/pages/Contact.tsx` | Modifier |
| `src/pages/LivreEntrepreneuriat.tsx` | Modifier |
