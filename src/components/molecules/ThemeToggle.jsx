import { Moon, Sun } from "lucide-react";
import { useGlobal } from "../../context/GlobalContext";
import { ButtonRing } from "../atoms/ButtonRing";

export const ThemeToggle = () => {
  const { isDarkMode, toggleTheme, lang, toggleLang } = useGlobal();

  return (
    <div className="flex items-center gap-1.5 bg-white/90 dark:bg-slate-800/90 backdrop-blur-md p-1 rounded-full border border-slate-200 dark:border-slate-700 shadow-sm">
      <div className="relative group flex items-center justify-center cursor-pointer">
        <ButtonRing rounded="rounded-full" />
        <button
          onClick={toggleLang}
          className="cursor-pointer relative h-8 px-2.5 flex items-center justify-center gap-1.5 text-xs font-bold rounded-full bg-slate-100 dark:bg-slate-900/60 shadow-sm hover:bg-slate-200 dark:hover:bg-slate-800 active:scale-95 transition-all border border-slate-200/80 dark:border-slate-700/80"
        >
          <div className="w-[18px] h-[13px] rounded-[2px] overflow-hidden border border-slate-300 dark:border-slate-600 flex-shrink-0 shadow-2xs flex items-center justify-center">
            <img
              src={lang === "id" ? "https://flagcdn.com/w20/id.png" : "https://flagcdn.com/w20/gb.png"}
              alt={lang}
              className="w-full h-full object-cover block"
            />
          </div>
          <span className="text-slate-700 dark:text-slate-200 group-hover:text-slate-900 dark:group-hover:text-white transition-colors leading-none tracking-wide flex items-center">
            {lang.toUpperCase()}
          </span>
        </button>
      </div>

      <div className="w-px h-4 bg-slate-200 dark:bg-slate-700 mx-0.5" />

      <div className="relative group flex items-center justify-center cursor-pointer">
        <ButtonRing rounded="rounded-full" />
        <button
          onClick={toggleTheme}
          aria-label="Toggle Theme"
          className="cursor-pointer relative p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 active:scale-90 transition-all flex items-center justify-center w-8 h-8"
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
    </div>
  );
};
