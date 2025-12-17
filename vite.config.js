import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  base: "/muhamad_nur_aidul_harpan.dev/", // 🔥 PENTING
  plugins: [react(), tailwindcss()],
});
