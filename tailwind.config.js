/** @type {import('tailwindcss').Config} */
export default {
  // Pastikan path ini benar-benar mencakup semua file Anda
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  // INI KUNCINYA:
  darkMode: "selector",
  theme: {
    extend: {},
  },
  plugins: [],
};
