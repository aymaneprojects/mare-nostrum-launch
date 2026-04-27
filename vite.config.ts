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
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
