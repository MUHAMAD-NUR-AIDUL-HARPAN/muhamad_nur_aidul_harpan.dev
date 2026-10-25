import { createContext, useContext, useState, useEffect } from "react";

const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {

  const [lang, setLang] = useState("en");

  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isPreloaderDone, setIsPreloaderDone] = useState(() => {
    return !!sessionStorage.getItem("visited");
  });

  const toggleLang = () => {
    setLang((prev) => (prev === "en" ? "id" : "en"));
  };

  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };

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
        lang, 
        toggleLang, 
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
