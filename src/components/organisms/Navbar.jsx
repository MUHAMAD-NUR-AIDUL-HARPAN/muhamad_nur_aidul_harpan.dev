import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Link as ScrollLink, scroller } from "react-scroll";
import { motion, AnimatePresence } from "framer-motion";
import { ThemeToggle } from "../molecules/ThemeToggle";
import { navItems } from "../../data/content";

export const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("home");

  // Logic: Deteksi section (Sama seperti sebelumnya)
  useEffect(() => {
    const handleScroll = () => {
      if (location.pathname !== "/") return;
      const sections = navItems
        .filter((item) => item.type === "scroll")
        .map((item) => item.id);
      const current = sections.find((section) => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top >= -100 && rect.top <= 300;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [location.pathname]);

  const handleNavClick = (item) => {
    if (item.type === "route") {
      navigate(item.path);
    } else {
      if (location.pathname !== "/") {
        navigate("/");
        setTimeout(() => {
          scroller.scrollTo(item.id, {
            smooth: true,
            duration: 800,
            offset: -100,
          });
        }, 100);
      } else {
        scroller.scrollTo(item.id, {
          smooth: true,
          duration: 800,
          offset: -100,
        });
      }
      setActiveSection(item.id);
    }
  };

  return (
    <nav className="fixed top-4 md:top-6 left-0 right-0 z-50 flex justify-center px-2 md:px-4 pointer-events-none">
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        className="pointer-events-auto bg-white/90 dark:bg-black/80 backdrop-blur-xl border border-gray-200/50 dark:border-white/10 p-1.5 md:p-2 rounded-full shadow-2xl flex items-center max-w-[95vw] md:max-w-none"
      >
        {/* === LOGO (Tetap diam di kiri) === */}
        <div
          onClick={() => handleNavClick({ id: "home", type: "scroll" })}
          className="flex-shrink-0 flex items-center justify-center w-8 h-8 md:w-10 md:h-10 bg-gray-900 dark:bg-white text-white dark:text-black rounded-full font-bold cursor-pointer hover:scale-110 transition-transform text-xs md:text-sm"
        >
          S.
        </div>

        {/* Separator Kecil */}
        <div className="w-px h-4 md:h-6 bg-gray-300 dark:bg-gray-700 mx-1 md:mx-2 flex-shrink-0" />

        {/* === SCROLLABLE MENU ITEMS (Tengah) === */}
        {/* Tambahkan: overflow-x-auto, no-scrollbar, mask-image */}
        <div className="flex items-center gap-1 overflow-x-auto no-scrollbar max-w-[200px] xs:max-w-[240px] sm:max-w-[350px] md:max-w-none px-1">
          {navItems.map((item) => {
            const isActive =
              location.pathname === "/"
                ? activeSection === item.id
                : location.pathname === item.path;

            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item)}
                className="relative group p-2 md:px-4 md:py-3 rounded-full flex items-center justify-center transition-all flex-shrink-0"
              >
                {/* Background Pill */}
                {isActive && (
                  <motion.div
                    layoutId="nav-pill"
                    className="absolute inset-0 bg-blue-100 dark:bg-blue-900/30 rounded-full"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}

                {/* Icon (Ukuran Responsif) */}
                <item.icon
                  size={18} // Mobile size 18px
                  className={`md:w-5 md:h-5 relative z-10 transition-colors duration-300 ${
                    isActive
                      ? "text-blue-600 dark:text-blue-400"
                      : "text-gray-500 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-gray-200"
                  }`}
                />

                {/* Tooltip (Hanya muncul di Desktop biar mobile ga ribet) */}
                <AnimatePresence>
                  <span className="hidden md:block absolute top-full mt-3 left-1/2 -translate-x-1/2 px-2 py-1 bg-black dark:bg-white text-white dark:text-black text-xs font-bold rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap shadow-lg">
                    {item.label}
                    <span className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-black dark:bg-white rotate-45"></span>
                  </span>
                </AnimatePresence>
              </button>
            );
          })}
        </div>

        {/* Separator Kecil */}
        <div className="w-px h-4 md:h-6 bg-gray-300 dark:bg-gray-700 mx-1 md:mx-2 flex-shrink-0" />

        {/* === TOGGLE (Tetap diam di kanan) === */}
        <div className="flex-shrink-0">
          <ThemeToggle />
        </div>
      </motion.div>
    </nav>
  );
};
