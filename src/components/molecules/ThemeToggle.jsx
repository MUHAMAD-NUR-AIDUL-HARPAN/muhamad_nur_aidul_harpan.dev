import { Moon, Sun, Globe } from "lucide-react";
import { useGlobal } from "../../context/GlobalContext";
import { motion } from "framer-motion";

export const ThemeToggle = () => {
  const { darkMode, toggleTheme, lang, toggleLang } = useGlobal();

  return (
    <div className="flex gap-2 bg-gray-100 dark:bg-gray-800 p-1.5 rounded-full border border-gray-200 dark:border-gray-700">
      <motion.button
        whileTap={{ scale: 0.9 }}
        onClick={toggleLang}
        className="px-3 py-1 text-xs font-bold rounded-full bg-white dark:bg-black shadow-sm"
      >
        {lang.toUpperCase()}
      </motion.button>
      <div className="w-px bg-gray-300 dark:bg-gray-600 my-1" />
      <motion.button
        whileTap={{ rotate: 180 }}
        onClick={toggleTheme}
        className="p-1.5 text-gray-600 dark:text-yellow-400"
      >
        {darkMode ? <Sun size={18} /> : <Moon size={18} />}
      </motion.button>
    </div>
  );
};
