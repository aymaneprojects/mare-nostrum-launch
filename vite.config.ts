import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(() => ({
  server: {
    host: true,
    port: 8080,
    strictPort: false,
  },
  preview: {
    host: true,
    port: 8080,
    strictPort: false,
    allowedHosts: ["mare-nostrum-launch-1.onrender.com", ".onrender.com"],
  },
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        // Bibliothèques en fichiers séparés : elles changent rarement, donc elles restent en
        // cache chez les visiteurs même quand le site est republié (Hermes publie souvent).
        manualChunks(id: string) {
          if (!id.includes("node_modules")) return undefined;
          // Noyau React seul : le reste (radix, icônes, routeur…) est laissé à Vite, car un
          // découpage plus fin provoquait « Cannot read properties of undefined (reading 'forwardRef') »
          // (dépendance circulaire entre fichiers de bibliothèques, écran blanc au démarrage).
          if (/node_modules\/(react|react-dom|scheduler)\//.test(id)) return "vendor-react";
          if (id.includes("@supabase")) return "vendor-supabase";
          return undefined;
        },
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
