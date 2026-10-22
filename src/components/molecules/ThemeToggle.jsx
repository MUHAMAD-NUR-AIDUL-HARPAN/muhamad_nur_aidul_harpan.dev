import { Moon, Sun } from "lucide-react";
import { useGlobal } from "../../context/GlobalContext";
import { motion, AnimatePresence } from "framer-motion";

export const ThemeToggle = () => {
  const { isDarkMode, toggleTheme, lang, toggleLang } = useGlobal();

  return (
    <div className="flex gap-2 bg-white dark:bg-slate-800 p-1.5 rounded-full border border-slate-200 dark:border-slate-700 shadow-sm">
      <motion.button
        whileTap={{ scale: 0.9 }}
        onClick={toggleLang}
        className="cursor-pointer group px-3 py-1 flex items-center gap-2 text-xs font-bold rounded-full bg-slate-100 dark:bg-slate-900/50 shadow-sm hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors border border-slate-200 dark:border-slate-700"
      >
        <div className="w-4 h-3 rounded-[2px] overflow-hidden border border-slate-300 dark:border-slate-600 flex-shrink-0 shadow-sm">
          <img
            src={lang === "id" ? "https://flagcdn.com/w20/id.png" : "https://flagcdn.com/w20/gb.png"}
            alt={lang}
            className="w-full h-full object-cover"
          />
        </div>
        <span className="text-slate-600 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">
          {lang.toUpperCase()}
        </span>
      </motion.button>
      
      <div className="w-px bg-slate-200 dark:bg-slate-700 my-1.5" />
      
      <button
        onClick={toggleTheme}
        className="cursor-pointer group relative p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors overflow-hidden flex items-center justify-center w-8 h-8"
      >
        <AnimatePresence mode="wait">
          {isDarkMode ? (
            <motion.div
              key="moon"
              initial={{ y: -20, opacity: 0, rotate: -90 }}
              animate={{ y: 0, opacity: 1, rotate: 0 }}
              exit={{ y: 20, opacity: 0, rotate: 90 }}
              transition={{ duration: 0.2 }}
              className="absolute"
            >
              <Moon size={18} className="text-blue-500 group-hover:text-blue-400 transition-colors" />
            </motion.div>
          ) : (
            <motion.div
              key="sun"
              initial={{ y: -20, opacity: 0, rotate: -90 }}
              animate={{ y: 0, opacity: 1, rotate: 0 }}
              exit={{ y: 20, opacity: 0, rotate: 90 }}
              transition={{ duration: 0.2 }}
              className="absolute"
            >
              <Sun size={18} className="text-yellow-500 group-hover:text-yellow-600 transition-colors" />
            </motion.div>
          )}
        </AnimatePresence>
      </button>
    </div>
  );
};
