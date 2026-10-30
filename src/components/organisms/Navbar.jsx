import { useState, useEffect, useLayoutEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import AOS from "aos";
import { ThemeToggle } from "../molecules/ThemeToggle";
import { navItems } from "../../data/content";
import { ButtonRing } from "../atoms/ButtonRing";

gsap.registerPlugin(ScrollToPlugin);

const maskStyle = {
  WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
  WebkitMaskComposite: "xor",
  maskComposite: "exclude",
};

const LogoIcon = ({ sizeClass = "w-6 h-6" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 64 64"
    className={`${sizeClass} select-none`}
    fill="none"
  >
    <circle cx="32" cy="32" r="32" fill="#0f172a" />
    <path
      d="M24 22 L14 32 L24 42 M40 22 L50 32 L40 42"
      stroke="#ffffff"
      strokeWidth="5"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
    <line
      x1="36"
      y1="18"
      x2="28"
      y2="46"
      stroke="#3b82f6"
      strokeWidth="5"
      strokeLinecap="round"
    />
  </svg>
);

export const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("home");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const desktopNavRef = useRef(null);
  const isTransitioningRef = useRef(false);

  const shouldShow = isVisible || isMobileMenuOpen;

  useEffect(() => {
    if (!desktopNavRef.current) return;
    gsap.fromTo(
      desktopNavRef.current,
      { y: -60, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", clearProps: "transform,opacity" }
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

  const [prevPath, setPrevPath] = useState(location.pathname);
  if (prevPath !== location.pathname) {
    setPrevPath(location.pathname);
    setIsVisible(true);
  }

  useEffect(() => {
    let lastY = window.scrollY;
    let accumulatedDelta = 0;
    let isScrollingDown = false;
    let ticking = false;

    const updateScroll = () => {
      const currentY = Math.max(0, window.scrollY);
      const delta = currentY - lastY;

      if (isTransitioningRef.current) {
        lastY = currentY;
        accumulatedDelta = 0;
        ticking = false;
        return;
      }

      if (currentY <= 50) {
        setIsVisible(true);
        accumulatedDelta = 0;
        lastY = currentY;
        ticking = false;
        return;
      }

      if (delta > 0) {
        if (!isScrollingDown) {
          isScrollingDown = true;
          accumulatedDelta = 0;
        }
        accumulatedDelta += delta;
        if (accumulatedDelta > 10) {
          setIsVisible(false);
        }
      } else if (delta < 0) {
        if (isScrollingDown) {
          isScrollingDown = false;
          accumulatedDelta = 0;
        }
        accumulatedDelta += Math.abs(delta);
        if (accumulatedDelta > 6) {
          setIsVisible(true);
        }
      }

      lastY = currentY;
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScroll);
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });

    let unsubLenis = null;
    let timer = null;
    const bindLenis = () => {
      if (window.lenis) {
        unsubLenis = window.lenis.on("scroll", onScroll);
      } else {
        timer = setTimeout(bindLenis, 150);
      }
    };
    bindLenis();

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (unsubLenis) unsubLenis();
      if (timer) clearTimeout(timer);
    };
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
    setIsVisible(true);

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
    setIsVisible(true);
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
        className={`fixed inset-0 w-full h-[100dvh] bg-slate-50/95 dark:bg-slate-900/95 backdrop-blur-2xl z-40 flex flex-col justify-center items-center md:hidden transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] transform-gpu ${
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
                style={{ transitionDelay: isMobileMenuOpen ? `${35 + i * 25}ms` : "0ms" }}
                onClick={() => handleNavClick(item)}
                className={`group relative flex items-center w-full max-w-xs px-5 py-3.5 rounded-2xl transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] active:scale-95 cursor-pointer ${
                  isMobileMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                }`}
              >
                <div className="flex items-center gap-3.5 relative z-10">
                  <div className="relative flex items-center justify-center w-10 h-10 rounded-full">
                    <div
                      className={`absolute -inset-[2px] rounded-full p-[1.5px] overflow-hidden pointer-events-none transition-opacity duration-300 ${
                        isActive ? "opacity-0" : "opacity-0 group-hover:opacity-100"
                      }`}
                      style={maskStyle}
                    >
                      <div className="absolute top-1/2 left-1/2 aspect-square w-[300%] -translate-x-1/2 -translate-y-1/2 bg-[conic-gradient(from_0deg,transparent_30%,#2563eb_65%,#38bdf8_85%,#ffffff_96%,transparent_100%)] animate-[spin_2.5s_linear_infinite]" />
                    </div>
                    <div
                      className={`absolute -inset-[3px] rounded-full p-[2px] overflow-hidden blur-[3px] pointer-events-none transition-opacity duration-300 ${
                        isActive ? "opacity-0" : "opacity-0 group-hover:opacity-75"
                      }`}
                      style={maskStyle}
                    >
                      <div className="absolute top-1/2 left-1/2 aspect-square w-[300%] -translate-x-1/2 -translate-y-1/2 bg-[conic-gradient(from_0deg,transparent_30%,#3b82f6_70%,#60a5fa_90%,transparent_100%)] animate-[spin_2.5s_linear_infinite]" />
                    </div>

                    <div
                      className={`absolute -inset-[2px] rounded-full p-[1.5px] overflow-hidden pointer-events-none transition-all duration-300 shadow-[0_0_10px_rgba(56,189,248,0.5)] ${
                        isActive ? "opacity-100 scale-100" : "opacity-0 scale-90"
                      }`}
                      style={maskStyle}
                    >
                      <div className="absolute inset-0 bg-gradient-to-tr from-blue-600 via-sky-400 to-indigo-500" />
                    </div>
                    <div
                      className={`absolute -inset-[3px] rounded-full p-[2px] overflow-hidden blur-[3px] pointer-events-none transition-all duration-300 ${
                        isActive ? "opacity-80 scale-100" : "opacity-0 scale-90"
                      }`}
                      style={maskStyle}
                    >
                      <div className="absolute inset-0 bg-gradient-to-tr from-blue-600 via-sky-400 to-indigo-500" />
                    </div>

                    <div
                      className={`w-full h-full flex items-center justify-center rounded-full transition-all duration-300 ${
                        isActive
                          ? "bg-gradient-to-tr from-blue-600/20 via-sky-400/15 to-indigo-600/20 shadow-xs"
                          : "bg-slate-100 dark:bg-slate-800 group-hover:bg-blue-500/15 dark:group-hover:bg-blue-400/20"
                      }`}
                    >
                      <item.icon
                        size={18}
                        className={`transition-colors duration-300 ${
                          isActive
                            ? "text-blue-600 dark:text-blue-400"
                            : "text-slate-500 dark:text-slate-400 group-hover:text-blue-600 dark:group-hover:text-blue-400"
                        }`}
                      />
                    </div>
                  </div>
                  <span
                    className={`text-lg tracking-tight transition-colors duration-300 ${
                      isActive
                        ? "text-blue-600 dark:text-blue-400 font-semibold"
                        : "text-slate-800 dark:text-slate-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 font-medium"
                    }`}
                  >
                    {item.label}
                  </span>
                </div>
              </button>
            );
          })}

          <div className="flex items-center gap-3 mt-4 pt-4 border-t border-slate-200/60 dark:border-slate-800/80 w-full max-w-xs justify-center">
            <div className="relative group flex-1">
              <ButtonRing rounded="rounded-xl" />
              <a
                href="/CV MUHAMAD NUR AIDUL HARPAN.pdf"
                target="_blank"
                rel="noreferrer"
                className="block text-center py-2.5 px-4 rounded-xl text-xs font-bold bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 border border-blue-200/60 dark:border-blue-800/60 active:scale-95 transition-all shadow-xs"
              >
                Lihat CV
              </a>
            </div>
            <div className="relative group flex-1">
              <ButtonRing rounded="rounded-xl" variant="emerald" />
              <a
                href="/CV MUHAMAD NUR AIDUL HARPAN.pdf"
                download="CV MUHAMAD NUR AIDUL HARPAN.pdf"
                className="block text-center py-2.5 px-4 rounded-xl text-xs font-bold bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 border border-emerald-200/60 dark:border-emerald-800/60 active:scale-95 transition-all shadow-xs"
              >
                Unduh CV
              </a>
            </div>
          </div>
        </div>

        <div className={`absolute bottom-10 z-10 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] delay-200 transform ${isMobileMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
          <ThemeToggle />
        </div>
      </div>

      <nav className="fixed top-4 md:top-8 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none">
        <div
          className={`hidden md:block pointer-events-auto transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] transform-gpu will-change-transform origin-center ${
            shouldShow
              ? "scale-x-100 scale-y-100 opacity-100"
              : "scale-x-0 scale-y-95 opacity-0 pointer-events-none"
          }`}
        >
          <div
            ref={desktopNavRef}
            className="relative rounded-full w-max group/navbar shadow-[0_8px_32px_rgba(0,0,0,0.08)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.4)] will-change-transform"
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
            <div className="relative group/logo cursor-pointer flex-shrink-0">
              <ButtonRing rounded="rounded-full" />
              <div
                onClick={() => handleNavClick({ id: "home", type: "scroll" })}
                className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full font-bold shadow-md hover:shadow-xl hover:shadow-blue-500/35 transition-all duration-400 ease-out active:scale-95 overflow-hidden bg-slate-900 border border-slate-700/60"
              >
                <LogoIcon sizeClass="w-full h-full" />
              </div>
            </div>

            <div className="w-px h-6 bg-slate-300/60 dark:bg-slate-700/60 mx-2 flex-shrink-0" />

            <div className="relative flex flex-1 items-center justify-center gap-1.5 px-1 mx-1">
              {navItems.map((item) => {
                const isActive = location.pathname === "/" ? activeSection === item.id : location.pathname === item.path;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item)}
                    className="group/item cursor-pointer relative px-3 py-1.5 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 active:scale-95"
                  >
                    <div className="relative z-10 flex items-center gap-2">
                      <div className="relative flex items-center justify-center w-7 h-7 rounded-full">
                        <div
                          className={`absolute -inset-[2px] rounded-full p-[1.5px] overflow-hidden pointer-events-none transition-opacity duration-300 ${
                            isActive ? "opacity-0" : "opacity-0 group-hover/item:opacity-100"
                          }`}
                          style={maskStyle}
                        >
                          <div className="absolute top-1/2 left-1/2 aspect-square w-[300%] -translate-x-1/2 -translate-y-1/2 bg-[conic-gradient(from_0deg,transparent_30%,#2563eb_65%,#38bdf8_85%,#ffffff_96%,transparent_100%)] animate-[spin_2.5s_linear_infinite]" />
                        </div>
                        <div
                          className={`absolute -inset-[3px] rounded-full p-[2px] overflow-hidden blur-[3px] pointer-events-none transition-opacity duration-300 ${
                            isActive ? "opacity-0" : "opacity-0 group-hover/item:opacity-75"
                          }`}
                          style={maskStyle}
                        >
                          <div className="absolute top-1/2 left-1/2 aspect-square w-[300%] -translate-x-1/2 -translate-y-1/2 bg-[conic-gradient(from_0deg,transparent_30%,#3b82f6_70%,#60a5fa_90%,transparent_100%)] animate-[spin_2.5s_linear_infinite]" />
                        </div>

                        <div
                          className={`absolute -inset-[2px] rounded-full p-[1.5px] overflow-hidden pointer-events-none transition-all duration-300 shadow-[0_0_10px_rgba(56,189,248,0.5)] ${
                            isActive ? "opacity-100 scale-100" : "opacity-0 scale-90"
                          }`}
                          style={maskStyle}
                        >
                          <div className="absolute inset-0 bg-gradient-to-tr from-blue-600 via-sky-400 to-indigo-500" />
                        </div>
                        <div
                          className={`absolute -inset-[3px] rounded-full p-[2px] overflow-hidden blur-[3px] pointer-events-none transition-all duration-300 ${
                            isActive ? "opacity-80 scale-100" : "opacity-0 scale-90"
                          }`}
                          style={maskStyle}
                        >
                          <div className="absolute inset-0 bg-gradient-to-tr from-blue-600 via-sky-400 to-indigo-500" />
                        </div>

                        <div
                          className={`absolute inset-0 rounded-full transition-all duration-300 ${
                            isActive
                              ? "bg-gradient-to-tr from-blue-600/20 via-sky-400/15 to-indigo-600/20 shadow-xs"
                              : "bg-transparent group-hover/item:bg-blue-500/10 dark:group-hover/item:bg-blue-400/15"
                          }`}
                        />

                        <item.icon
                          size={15}
                          className={`relative z-10 transition-colors duration-300 ease-out ${
                            isActive
                              ? "text-blue-600 dark:text-blue-400"
                              : "text-slate-500 dark:text-slate-400 group-hover/item:text-blue-600 dark:group-hover/item:text-blue-400"
                          }`}
                        />
                      </div>
                      <span
                        className={`hidden lg:block text-sm tracking-tight transition-colors duration-300 ease-out ${
                          isActive
                            ? "text-blue-600 dark:text-blue-400 font-semibold"
                            : "text-slate-600 dark:text-slate-300 group-hover/item:text-blue-600 dark:group-hover/item:text-blue-400 font-medium"
                        }`}
                      >
                        {item.label}
                      </span>
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
      </div>

        <div className="md:hidden pointer-events-none w-full flex justify-between items-center">
          <div
            className={`pointer-events-auto transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] transform-gpu will-change-transform ${
              shouldShow
                ? "translate-x-0 scale-100 opacity-100"
                : "translate-x-[calc(50vw-2.5rem)] scale-0 opacity-0 pointer-events-none"
            }`}
          >
            <div className="relative group/logo cursor-pointer">
              <ButtonRing rounded="rounded-full" />
              <div
                onClick={() => {
                  handleNavClick({ id: "home", type: "scroll" });
                  setIsMobileMenuOpen(false);
                }}
                className="flex items-center justify-center w-12 h-12 rounded-full cursor-pointer shadow-md transition-all duration-400 ease-out backdrop-blur-xl border bg-white/90 dark:bg-slate-900/90 border-white/50 dark:border-white/10 hover:bg-slate-50 dark:hover:bg-[#111111] hover:shadow-xl hover:shadow-blue-500/20 active:scale-95"
              >
                <div className="flex items-center justify-center w-9 h-9 bg-slate-900 text-white rounded-full font-bold shadow-md shadow-blue-500/20 overflow-hidden border border-slate-700/60">
                  <LogoIcon sizeClass="w-full h-full" />
                </div>
              </div>
            </div>
          </div>

          <div
            className={`pointer-events-auto transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] transform-gpu will-change-transform ${
              shouldShow
                ? "translate-x-0 scale-100 opacity-100"
                : "-translate-x-[calc(50vw-2.5rem)] scale-0 opacity-0 pointer-events-none"
            }`}
          >
            <div className="relative group/menu cursor-pointer">
              <ButtonRing rounded="rounded-full" />
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Toggle Menu"
                className="relative flex flex-col justify-center items-center w-12 h-12 gap-[5px] rounded-full cursor-pointer shadow-md transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] backdrop-blur-xl border bg-white/90 dark:bg-slate-900/90 border-white/50 dark:border-white/10 hover:bg-slate-50 dark:hover:bg-[#111111] active:scale-95"
              >
                <span className={`h-[2px] bg-slate-900 dark:bg-white rounded-full transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] origin-center ${isMobileMenuOpen ? "w-5 rotate-45 translate-y-[7px]" : "w-5"}`} />
                <span className={`h-[2px] bg-slate-900 dark:bg-white rounded-full transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] ${isMobileMenuOpen ? "w-0 opacity-0" : "w-5 opacity-100"}`} />
                <span className={`h-[2px] bg-slate-900 dark:bg-white rounded-full transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] origin-center ${isMobileMenuOpen ? "w-5 -rotate-45 -translate-y-[7px]" : "w-5"}`} />
              </button>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};
