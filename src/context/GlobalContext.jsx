// src/context/GlobalContext.jsx

import React, { createContext, useContext, useState, useEffect } from "react";

const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  // Cek localStorage agar pilihan user tersimpan meski di-refresh
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem("theme");
    // Jika ada simpanan, pakai itu. Jika tidak, cek sistem.
    if (saved) return saved === "dark";
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  const [lang, setLang] = useState("en");

  // Efek untuk update Class di HTML & LocalStorage
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  const toggleTheme = () => setDarkMode(!darkMode);
  const toggleLang = () => setLang((prev) => (prev === "en" ? "id" : "en"));

  return (
    <GlobalContext.Provider value={{ darkMode, toggleTheme, lang, toggleLang }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobal = () => useContext(GlobalContext);
