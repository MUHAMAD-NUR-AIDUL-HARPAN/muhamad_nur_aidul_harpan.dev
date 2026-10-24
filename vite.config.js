import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: [
      { find: "lucide-react", replacement: path.resolve(__dirname, "src/mock-icons.jsx") },
      { find: /^react-icons(\/.*)?$/, replacement: path.resolve(__dirname, "src/mock-icons.jsx") },
    ],
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          'vendor-gsap': ['gsap', 'lenis'],
          'vendor-supabase': ['@supabase/supabase-js']
        }
      }
    }
  }
});
