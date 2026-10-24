import { Moon, Sun } from "lucide-react";
import { useGlobal } from "../../context/GlobalContext";

export const ThemeToggle = () => {
  const { isDarkMode, toggleTheme, lang, toggleLang } = useGlobal();

  return (
    <div className="flex gap-2 bg-white dark:bg-slate-800 p-1.5 rounded-full border border-slate-200 dark:border-slate-700 shadow-sm">
      <button
        onClick={toggleLang}
        className="cursor-pointer group px-3 py-1 flex items-center gap-2 text-xs font-bold rounded-full bg-slate-100 dark:bg-slate-900/50 shadow-sm hover:bg-slate-200 dark:hover:bg-slate-800 active:scale-95 transition-all border border-slate-200 dark:border-slate-700"
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
      </button>
      
      <div className="w-px bg-slate-200 dark:bg-slate-700 my-1.5" />
      
      <button
        onClick={toggleTheme}
        aria-label="Toggle Theme"
        className="cursor-pointer group relative p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 active:scale-90 transition-all overflow-hidden flex items-center justify-center w-8 h-8"
      >
        <div className="relative w-5 h-5 flex items-center justify-center">
          <Moon
            size={18}
            className={`absolute text-blue-500 group-hover:text-blue-400 transition-all duration-300 transform ${
              isDarkMode
                ? "opacity-100 rotate-0 scale-100"
                : "opacity-0 -rotate-90 scale-50 pointer-events-none"
            }`}
          />
          <Sun
            size={18}
            className={`absolute text-yellow-500 group-hover:text-yellow-600 transition-all duration-300 transform ${
              !isDarkMode
                ? "opacity-100 rotate-0 scale-100"
                : "opacity-0 rotate-90 scale-50 pointer-events-none"
            }`}
          />
        </div>
      </button>
    </div>
  );
};
