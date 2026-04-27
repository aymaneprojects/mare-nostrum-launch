# Mare Nostrum — Site Web

Site web de Mare Nostrum, cabinet de conseil en entrepreneuriat (Toulouse / Paris / Casablanca).

## Stack

- Vite + React + TypeScript
- Tailwind CSS + shadcn/ui
- Supabase (base de données + edge functions)
- Déployé sur Render (site statique)

## Démarrage

```sh
# Installer les dépendances
npm install

# Lancer le serveur de développement (port 8080)
npm run dev

# Build de production
npm run build

# Prévisualiser le build
npm run preview
```

## Déploiement

Le site est déployé automatiquement sur Render à chaque push sur `main`.  
Configuration : `render.yaml` — build `npm install && npm run build`, dossier `./dist`.
