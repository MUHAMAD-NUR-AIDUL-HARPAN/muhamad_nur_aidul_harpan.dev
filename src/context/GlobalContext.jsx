import { createContext, useContext, useState, useEffect } from "react";

const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  // 1. Setup State Bahasa (Default: English 'en')
  const [lang, setLang] = useState("en");

  // 2. Setup State Dark Mode
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isPreloaderDone, setIsPreloaderDone] = useState(() => {
    return !!sessionStorage.getItem("visited");
  });

  // Logic Toggle Bahasa
  const toggleLang = () => {
    setLang((prev) => (prev === "en" ? "id" : "en"));
  };

  // Logic Toggle Dark Mode
  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };

  // Effect untuk menerapkan class 'dark' ke HTML tag
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  return (
    <GlobalContext.Provider
      value={{
        lang, // State bahasa
        toggleLang, // Fungsi ganti bahasa
        isDarkMode,
        toggleTheme,
        isPreloaderDone,
        setIsPreloaderDone,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobal = () => useContext(GlobalContext);
