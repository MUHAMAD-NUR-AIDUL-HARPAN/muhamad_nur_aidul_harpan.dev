import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ThemeToggle } from "../molecules/ThemeToggle";
import { navItems } from "../../data/content";

export const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("home");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (location.pathname !== "/" || ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const sections = navItems
          .filter((item) => item.type === "scroll")
          .map((item) => item.id);
        const current = sections.find((section) => {
          const element = document.getElementById(section);
          if (element) {
            const rect = element.getBoundingClientRect();
            return rect.top >= -120 && rect.top <= 250;
          }
          return false;
        });
        if (current) setActiveSection(current);
        ticking = false;
      });
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [location.pathname]);

  const scrollToTarget = (targetId) => {
    const targetElement = targetId === "home" ? 0 : document.getElementById(targetId);
    if (window.lenis) {
      window.lenis.scrollTo(targetElement, {
        offset: targetId === "home" ? 0 : -80,
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });
    } else {
      if (targetId === "home") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else if (targetElement) {
        const top = targetElement.getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo({ top, behavior: "smooth" });
      }
    }
  };

  const handleNavClick = (item) => {
    if (item.type === "route") {
      navigate(item.path);
    } else {
      if (location.pathname !== "/") {
        navigate("/");
        setTimeout(() => {
          scrollToTarget(item.id);
        }, 150);
      } else {
        scrollToTarget(item.id);
      }
      setActiveSection(item.id);
    }
    setIsMobileMenuOpen(false);
  };

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      {/* === AWESOME FULL-SCREEN MOBILE MENU OVERLAY === */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ clipPath: "circle(0% at calc(100% - 40px) 40px)", opacity: 0 }}
            animate={{ clipPath: "circle(150% at calc(100% - 40px) 40px)", opacity: 1 }}
            exit={{ clipPath: "circle(0% at calc(100% - 40px) 40px)", opacity: 0 }}
            transition={{ type: "spring", stiffness: 30, damping: 15, mass: 1 }}
            className="fixed inset-0 w-full h-[100dvh] bg-slate-50 dark:bg-slate-900 z-40 pointer-events-auto flex flex-col justify-center items-center md:hidden"
          >
            {/* Background Decor */}
            <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] dark:bg-[radial-gradient(#333_1px,transparent_1px)] [background-size:20px_20px] opacity-40 pointer-events-none" />
            
            <div className="flex flex-col items-center gap-8 z-10 w-full px-8">
              {navItems.map((item, i) => {
                const isActive =
                  location.pathname === "/"
                    ? activeSection === item.id
                    : location.pathname === item.path;

                return (
                  <motion.button
                    key={item.id}
                    initial={{ opacity: 0, y: 50, rotateX: -20 }}
                    animate={{ opacity: 1, y: 0, rotateX: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ delay: 0.1 + i * 0.1, type: "spring", stiffness: 200, damping: 20 }}
                    onClick={() => handleNavClick(item)}
                    className="group relative flex items-center justify-center w-full"
                  >
                    {isActive && (
                      <motion.div
                        layoutId="mobileActiveBg"
                        className="absolute inset-0 bg-blue-100/50 dark:bg-blue-900/20 rounded-2xl -z-10"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                    <span className={`text-4xl font-black tracking-tight transition-colors py-3 ${isActive ? 'text-blue-600' : 'text-slate-900 dark:text-slate-200'}`}>
                      {item.label}
                    </span>
                  </motion.button>
                );
              })}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="absolute bottom-12 z-10"
            >
              <ThemeToggle />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* === NAVBAR CONTAINER === */}
      <nav className="fixed top-6 md:top-8 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none">
        
        {/* DESKTOP PILL */}
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          className="hidden md:block pointer-events-auto relative rounded-full w-max group/navbar shadow-[0_8px_32px_rgba(0,0,0,0.08)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
        >
          {/* === ANIMATED RING GLOW (Soft Outer Ambient Glow) === */}
          <div 
            className="absolute -inset-[3px] rounded-full p-[3px] overflow-hidden opacity-60 group-hover/navbar:opacity-90 blur-[6px] transition-opacity duration-500 pointer-events-none"
            style={{
              WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
              WebkitMaskComposite: "xor",
              maskComposite: "exclude",
            }}
          >
            <div className="absolute top-1/2 left-1/2 aspect-square w-[300%] -translate-x-1/2 -translate-y-1/2 bg-[conic-gradient(from_0deg,transparent_60%,#1d4ed8_75%,#3b82f6_85%,#93c5fd_95%,transparent_100%)] animate-[spin_7s_linear_infinite]" />
          </div>

          {/* === ANIMATED PROFESSIONAL RING (Crisp Border Beam) === */}
          <div 
            className="absolute -inset-[2px] rounded-full p-[2px] overflow-hidden pointer-events-none shadow-2xl shadow-blue-500/10 z-10"
            style={{
              WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
              WebkitMaskComposite: "xor",
              maskComposite: "exclude",
            }}
          >
            {/* Conic Gradient Traveling Light Beam */}
            <div className="absolute top-1/2 left-1/2 aspect-square w-[300%] -translate-x-1/2 -translate-y-1/2 bg-[conic-gradient(from_0deg,transparent_60%,#2563eb_75%,#38bdf8_88%,#ffffff_96%,transparent_100%)] animate-[spin_7s_linear_infinite]" />
          </div>

          {/* Base Border Structure (Subtle outline when beam passes) */}
          <div className="absolute -inset-[2px] rounded-full border border-slate-300/40 dark:border-slate-700/40 pointer-events-none z-10" />
          
          {/* Desktop Glass Container */}
          <div className="relative bg-white/90 dark:bg-slate-900/90 backdrop-blur-2xl border border-white/30 dark:border-white/10 p-1.5 rounded-full flex items-center justify-between w-full shadow-sm z-20">
            {/* LOGO */}
            <div
              onClick={() => handleNavClick({ id: "home", type: "scroll" })}
              className="flex-shrink-0 flex items-center justify-center w-10 h-10 bg-gradient-to-tr from-blue-600 to-indigo-600 text-white rounded-full font-bold cursor-pointer shadow-lg hover:shadow-blue-500/30 transition-all hover:scale-105"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                <polyline points="16 18 22 12 16 6" />
                <polyline points="8 6 2 12 8 18" />
              </svg>
            </div>

            {/* Separator */}
            <div className="w-px h-6 bg-slate-300/60 dark:bg-slate-700/60 mx-2 flex-shrink-0" />

            {/* SCROLLABLE MENU ITEMS */}
            <div className="flex flex-1 items-center justify-center gap-1 px-1 mx-1">
              {navItems.map((item) => {
                const isActive = location.pathname === "/" ? activeSection === item.id : location.pathname === item.path;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item)}
                    className="cursor-pointer relative group/item px-2 py-2 rounded-full flex items-center justify-center transition-all flex-shrink-0"
                  >
                    <div className="relative z-10 flex items-center gap-1.5">
                      <div className="relative flex items-center justify-center w-8 h-8 rounded-full">
                        <div className="absolute -inset-1 rounded-full border-[1.5px] border-dashed border-blue-500 dark:border-blue-400 opacity-0 group-hover/item:opacity-100 group-hover/item:animate-[spin_4s_linear_infinite] transition-all duration-300" />
                        {isActive && (
                          <motion.div layoutId="active-icon-border" className="absolute -inset-0.5 rounded-full border-2 border-blue-600 dark:border-blue-400 shadow-[0_0_10px_rgba(37,99,235,0.4)]" transition={{ type: "spring", stiffness: 300, damping: 20 }} />
                        )}
                        <item.icon size={15} className={`relative z-10 transition-colors duration-300 ${isActive ? "text-blue-600 dark:text-blue-400" : "text-slate-500 dark:text-slate-400 group-hover/item:text-blue-600 dark:group-hover/item:text-blue-400"}`} />
                      </div>
                      <span className={`hidden lg:block text-sm font-semibold transition-colors duration-300 ${isActive ? "text-blue-600 dark:text-blue-400" : "text-slate-500 dark:text-slate-400 group-hover/item:text-blue-600 dark:group-hover/item:text-blue-400"}`}>
                        {item.label}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Separator */}
            <div className="w-px h-6 bg-slate-300/60 dark:bg-slate-700/60 mx-2 flex-shrink-0" />

            {/* TOGGLE */}
            <div className="flex-shrink-0">
              <ThemeToggle />
            </div>
          </div>
        </motion.div>

        {/* MOBILE LUXURY NAVBAR (Only visible on small screens) */}
        <div className="md:hidden pointer-events-none fixed top-4 left-4 right-4 flex justify-between z-50">
          
          {/* Floating Logo (Left) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="pointer-events-auto"
          >
            <div
              onClick={() => { handleNavClick({ id: "home", type: "scroll" }); setIsMobileMenuOpen(false); }}
              className="flex items-center justify-center w-12 h-12 rounded-full cursor-pointer shadow-lg transition-colors duration-500 backdrop-blur-xl border bg-white/90 dark:bg-slate-900/90 border-white/50 dark:border-white/10 hover:bg-slate-50 dark:hover:bg-[#111111]"
            >
              <div className="flex items-center justify-center w-9 h-9 bg-gradient-to-tr from-blue-600 to-indigo-600 text-white rounded-full font-bold">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                  <polyline points="16 18 22 12 16 6" />
                  <polyline points="8 6 2 12 8 18" />
                </svg>
              </div>
            </div>
          </motion.div>

          {/* Floating Symmetric Hamburger (Right) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="pointer-events-auto"
          >
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="group relative flex flex-col justify-center items-center w-12 h-12 gap-[5px] rounded-full cursor-pointer shadow-lg transition-all duration-500 backdrop-blur-xl border bg-white/90 dark:bg-slate-900/90 border-white/50 dark:border-white/10 hover:bg-slate-50 dark:hover:bg-[#111111]"
            >
              {/* Top Line */}
              <motion.span
                animate={isMobileMenuOpen ? { width: 0, opacity: 0 } : { width: 20, opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="h-[2px] bg-slate-900 dark:bg-white rounded-full"
              />
              {/* Middle Line */}
              <motion.span
                animate={isMobileMenuOpen ? { width: 22 } : { width: 20 }}
                transition={{ duration: 0.3 }}
                className="h-[2px] bg-slate-900 dark:bg-white rounded-full"
              />
              {/* Bottom Line */}
              <motion.span
                animate={isMobileMenuOpen ? { width: 0, opacity: 0 } : { width: 20, opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="h-[2px] bg-slate-900 dark:bg-white rounded-full"
              />
            </button>
          </motion.div>
        </div>

      </nav>
    </>
  );
};
