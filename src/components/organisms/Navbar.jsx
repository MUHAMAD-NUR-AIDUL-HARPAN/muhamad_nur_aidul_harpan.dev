import { useState, useEffect, useLayoutEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import AOS from "aos";
import { ThemeToggle } from "../molecules/ThemeToggle";
import { navItems } from "../../data/content";

gsap.registerPlugin(ScrollToPlugin);

const maskStyle = {
  WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
  WebkitMaskComposite: "xor",
  maskComposite: "exclude",
};

const LogoIcon = ({ sizeClass = "w-5 h-5" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={sizeClass}
  >
    <polyline points="16 18 22 12 16 6" />
    <polyline points="8 6 2 12 8 18" />
  </svg>
);

export const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("home");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const desktopNavRef = useRef(null);
  const isTransitioningRef = useRef(false);

  useEffect(() => {
    if (!desktopNavRef.current) return;
    gsap.fromTo(
      desktopNavRef.current,
      { y: -60, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
    );

    const rings = desktopNavRef.current.querySelectorAll(".navbar-spin-ring");
    const spinTween = gsap.to(rings, {
      rotation: 360,
      repeat: -1,
      duration: 7,
      ease: "none",
    });

    return () => spinTween.kill();
  }, []);

  useEffect(() => {
    if (location.pathname !== "/") return;

    const sections = navItems
      .filter((item) => item.type === "scroll")
      .map((item) => document.getElementById(item.id))
      .filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        if (isTransitioningRef.current) return;
        const visibleSection = entries.find((entry) => entry.isIntersecting);
        if (visibleSection) {
          setActiveSection(visibleSection.target.id);
        }
      },
      { rootMargin: "-20% 0px -55% 0px", threshold: 0 }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [location.pathname]);

  const scrollToTarget = (targetId) => {
    isTransitioningRef.current = true;
    setActiveSection(targetId);

    if (targetId === "home") {
      if (window.lenis) {
        window.lenis.scrollTo(0, { duration: 1.0 });
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
      setTimeout(() => {
        isTransitioningRef.current = false;
      }, 1000);
      return;
    }

    const targetElement = document.getElementById(targetId);
    if (!targetElement) {
      isTransitioningRef.current = false;
      return;
    }

    window.lenis?.resize();

    if (window.lenis) {
      window.lenis.scrollTo(targetElement, {
        offset: -80,
        duration: 1.0,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });
    } else {
      const top = targetElement.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: "smooth" });
    }

    setTimeout(() => {
      isTransitioningRef.current = false;
    }, 1000);
  };

  const handleNavClick = (item) => {
    if (item.type === "route") {
      navigate(item.path);
    } else {
      if (location.pathname !== "/") {
        navigate("/", { state: { scrollTo: item.id } });
      } else {
        scrollToTarget(item.id);
      }
      setActiveSection(item.id);
    }
    setIsMobileMenuOpen(false);
  };

  useLayoutEffect(() => {
    if (location.pathname === "/" && location.state?.scrollTo) {
      const targetId = location.state.scrollTo;
      isTransitioningRef.current = true;

      const performCrossPageScroll = () => {
        if (targetId === "home") {
          window.scrollTo(0, 0);
          window.lenis?.scrollTo(0, { immediate: true });
          return true;
        }

        const targetElement = document.getElementById(targetId);
        if (!targetElement) return false;

        window.lenis?.resize();

        if (window.lenis) {
          window.lenis.scrollTo(targetElement, {
            offset: -120,
            immediate: true,
          });
          window.lenis.scrollTo(targetElement, {
            offset: -80,
            duration: 0.6,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          });
        } else {
          const top = targetElement.getBoundingClientRect().top + window.scrollY - 80;
          window.scrollTo(0, Math.max(0, top));
        }

        if (typeof AOS !== "undefined" && AOS?.refresh) {
          AOS.refresh();
        }

        return true;
      };

      let rafId;
      const tryScroll = (attempts = 0) => {
        const success = performCrossPageScroll();
        if (success) {
          setActiveSection(targetId);
        } else if (attempts < 10) {
          rafId = requestAnimationFrame(() => tryScroll(attempts + 1));
        }
      };

      tryScroll();

      const timer = setTimeout(() => {
        isTransitioningRef.current = false;
      }, 700);

      window.history.replaceState({}, document.title);

      return () => {
        if (rafId) cancelAnimationFrame(rafId);
        clearTimeout(timer);
      };
    }
  }, [location.pathname, location.state]);

  useEffect(() => {
    if (isMobileMenuOpen) {
      window.lenis?.stop();
      document.body.style.overflow = "hidden";
    } else {
      window.lenis?.start();
      document.body.style.overflow = "";
    }
    return () => {
      window.lenis?.start();
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      <div
        className={`fixed inset-0 w-full h-[100dvh] bg-slate-50/95 dark:bg-slate-900/95 backdrop-blur-2xl z-40 flex flex-col justify-center items-center md:hidden transition-all duration-400 ease-out transform-gpu ${
          isMobileMenuOpen ? "opacity-100 scale-100 pointer-events-auto" : "opacity-0 scale-95 pointer-events-none"
        }`}
      >
        <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] dark:bg-[radial-gradient(#333_1px,transparent_1px)] [background-size:20px_20px] opacity-40 pointer-events-none" />

        <div className="flex flex-col items-center gap-3 z-10 w-full px-6">
          {navItems.map((item, i) => {
            const isActive = location.pathname === "/" ? activeSection === item.id : location.pathname === item.path;
            return (
              <button
                key={item.id}
                style={{ transitionDelay: isMobileMenuOpen ? `${40 + i * 30}ms` : "0ms" }}
                onClick={() => handleNavClick(item)}
                className={`group relative flex items-center justify-between w-full max-w-xs px-5 py-3 rounded-2xl transition-all duration-300 transform active:scale-95 cursor-pointer ${
                  isMobileMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                } ${
                  isActive
                    ? "bg-blue-600/15 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 border border-blue-500/30 shadow-[0_0_15px_rgba(37,99,235,0.15)]"
                    : "text-slate-800 dark:text-slate-200 hover:bg-slate-100/80 dark:hover:bg-slate-800/60 hover:text-blue-600 dark:hover:text-blue-400 border border-transparent"
                }`}
              >
                <div className="flex items-center gap-3.5">
                  <div
                    className={`p-2 rounded-xl transition-all duration-300 ${
                      isActive
                        ? "bg-blue-600 text-white shadow-md shadow-blue-500/30 scale-105"
                        : "bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 group-hover:bg-blue-600 group-hover:text-white group-hover:scale-105"
                    }`}
                  >
                    <item.icon size={18} />
                  </div>
                  <span className="text-lg font-bold tracking-tight">{item.label}</span>
                </div>
                <div
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    isActive
                      ? "bg-blue-600 dark:bg-blue-400 shadow-[0_0_8px_#3b82f6] scale-100"
                      : "bg-transparent scale-0 group-hover:bg-blue-500 group-hover:scale-100"
                  }`}
                />
              </button>
            );
          })}

          <div className="flex items-center gap-3 mt-4 pt-4 border-t border-slate-200/60 dark:border-slate-800/80 w-full max-w-xs justify-center">
            <a
              href="/CV MUHAMAD NUR AIDUL HARPAN.pdf"
              target="_blank"
              rel="noreferrer"
              className="flex-1 text-center py-2.5 px-4 rounded-xl text-xs font-bold bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 border border-blue-200/60 dark:border-blue-800/60 hover:scale-105 active:scale-95 transition-all shadow-xs"
            >
              Lihat CV
            </a>
            <a
              href="/CV MUHAMAD NUR AIDUL HARPAN.pdf"
              download="CV MUHAMAD NUR AIDUL HARPAN.pdf"
              className="flex-1 text-center py-2.5 px-4 rounded-xl text-xs font-bold bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 border border-emerald-200/60 dark:border-emerald-800/60 hover:scale-105 active:scale-95 transition-all shadow-xs"
            >
              Unduh CV
            </a>
          </div>
        </div>

        <div className={`absolute bottom-10 z-10 transition-all duration-500 delay-300 transform ${isMobileMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
          <ThemeToggle />
        </div>
      </div>

      <nav className="fixed top-6 md:top-8 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none">
        <div
          ref={desktopNavRef}
          className="hidden md:block pointer-events-auto relative rounded-full w-max group/navbar shadow-[0_8px_32px_rgba(0,0,0,0.08)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.4)] will-change-transform"
        >
          <div
            className="absolute -inset-[3px] rounded-full p-[3px] overflow-hidden opacity-60 group-hover/navbar:opacity-90 blur-[6px] transition-opacity duration-500 pointer-events-none"
            style={maskStyle}
          >
            <div className="navbar-spin-ring absolute top-1/2 left-1/2 aspect-square w-[300%] -translate-x-1/2 -translate-y-1/2 bg-[conic-gradient(from_0deg,transparent_60%,#1d4ed8_75%,#3b82f6_85%,#93c5fd_95%,transparent_100%)]" />
          </div>

          <div
            className="absolute -inset-[2px] rounded-full p-[2px] overflow-hidden pointer-events-none shadow-2xl shadow-blue-500/10 z-10"
            style={maskStyle}
          >
            <div className="navbar-spin-ring absolute top-1/2 left-1/2 aspect-square w-[300%] -translate-x-1/2 -translate-y-1/2 bg-[conic-gradient(from_0deg,transparent_60%,#2563eb_75%,#38bdf8_88%,#ffffff_96%,transparent_100%)]" />
          </div>

          <div className="absolute -inset-[2px] rounded-full border border-slate-300/40 dark:border-slate-700/40 pointer-events-none z-10" />

          <div className="relative bg-white/90 dark:bg-slate-900/90 backdrop-blur-2xl border border-white/30 dark:border-white/10 p-1.5 rounded-full flex items-center justify-between w-full shadow-sm z-20">
            <div
              onClick={() => handleNavClick({ id: "home", type: "scroll" })}
              className="flex-shrink-0 flex items-center justify-center w-10 h-10 bg-gradient-to-tr from-blue-600 to-indigo-600 text-white rounded-full font-bold cursor-pointer shadow-lg hover:shadow-blue-500/40 transition-all duration-300 hover:scale-110 hover:rotate-6 active:scale-95"
            >
              <LogoIcon sizeClass="w-5 h-5" />
            </div>

            <div className="w-px h-6 bg-slate-300/60 dark:bg-slate-700/60 mx-2 flex-shrink-0" />

            <div className="relative flex flex-1 items-center justify-center gap-1.5 px-1 mx-1">
              {navItems.map((item) => {
                const isActive = location.pathname === "/" ? activeSection === item.id : location.pathname === item.path;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item)}
                    className={`group/item cursor-pointer relative px-3 py-1.5 rounded-full flex items-center justify-center transition-all duration-300 ease-out flex-shrink-0 active:scale-95 ${
                      isActive
                        ? "bg-blue-600/10 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 border border-blue-500/30 dark:border-blue-400/30 shadow-[0_0_12px_rgba(37,99,235,0.15)]"
                        : "text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-100/80 dark:hover:bg-slate-800/80 border border-transparent"
                    }`}
                  >
                    <div className="relative z-10 flex items-center gap-2">
                      <item.icon
                        size={15}
                        className={`transition-all duration-300 transform group-hover/item:scale-110 group-hover/item:-translate-y-0.5 ${
                          isActive
                            ? "text-blue-600 dark:text-blue-400"
                            : "text-slate-500 dark:text-slate-400 group-hover/item:text-blue-600 dark:group-hover/item:text-blue-400"
                        }`}
                      />
                      <span
                        className={`hidden lg:block text-sm transition-colors duration-300 tracking-tight ${
                          isActive ? "font-bold" : "font-medium"
                        }`}
                      >
                        {item.label}
                      </span>
                      {isActive && (
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-blue-400 shadow-[0_0_8px_#3b82f6] animate-pulse" />
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="w-px h-6 bg-slate-300/60 dark:bg-slate-700/60 mx-2 flex-shrink-0" />

            <div className="flex-shrink-0">
              <ThemeToggle />
            </div>
          </div>
        </div>

        <div className="md:hidden pointer-events-none fixed top-4 left-4 right-4 flex justify-between z-50">
          <div className="pointer-events-auto">
            <div
              onClick={() => {
                handleNavClick({ id: "home", type: "scroll" });
                setIsMobileMenuOpen(false);
              }}
              className="flex items-center justify-center w-12 h-12 rounded-full cursor-pointer shadow-lg transition-all duration-300 backdrop-blur-xl border bg-white/90 dark:bg-slate-900/90 border-white/50 dark:border-white/10 hover:bg-slate-50 dark:hover:bg-[#111111] hover:scale-105 active:scale-95"
            >
              <div className="flex items-center justify-center w-9 h-9 bg-gradient-to-tr from-blue-600 to-indigo-600 text-white rounded-full font-bold shadow-md shadow-blue-500/20">
                <LogoIcon sizeClass="w-4 h-4" />
              </div>
            </div>
          </div>

          <div className="pointer-events-auto">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle Menu"
              className="group relative flex flex-col justify-center items-center w-12 h-12 gap-[5px] rounded-full cursor-pointer shadow-lg transition-all duration-300 backdrop-blur-xl border bg-white/90 dark:bg-slate-900/90 border-white/50 dark:border-white/10 hover:bg-slate-50 dark:hover:bg-[#111111] hover:scale-105 active:scale-95"
            >
              <span className={`h-[2px] bg-slate-900 dark:bg-white rounded-full transition-all duration-300 origin-center ${isMobileMenuOpen ? "w-5 rotate-45 translate-y-[7px]" : "w-5"}`} />
              <span className={`h-[2px] bg-slate-900 dark:bg-white rounded-full transition-all duration-300 ${isMobileMenuOpen ? "w-0 opacity-0" : "w-5 opacity-100"}`} />
              <span className={`h-[2px] bg-slate-900 dark:bg-white rounded-full transition-all duration-300 origin-center ${isMobileMenuOpen ? "w-5 -rotate-45 -translate-y-[7px]" : "w-5"}`} />
            </button>
          </div>
        </div>
      </nav>
    </>
  );
};
