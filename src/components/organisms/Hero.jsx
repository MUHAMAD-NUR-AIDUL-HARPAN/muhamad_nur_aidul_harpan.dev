import { useRef, useEffect, useCallback } from "react";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { Download, ArrowRight, Github, Linkedin, Globe, Rocket, FileText, Code2 } from "lucide-react";
import { useGlobal } from "../../context/GlobalContext";
import { heroData } from "../../data/content";

gsap.registerPlugin(ScrollToPlugin);

const Marquee = () => {
  const marqueeRef = useRef(null);

  useEffect(() => {
    if (!marqueeRef.current) return;
    const tween = gsap.to(marqueeRef.current, {
      xPercent: -50,
      repeat: -1,
      duration: 25,
      ease: "none",
    });
    return () => tween.kill();
  }, []);
  return (
    <div className="absolute bottom-0 left-0 w-full overflow-hidden bg-gray-900 dark:bg-white text-white dark:text-black py-3 z-20 border-t border-white/10">
      <div ref={marqueeRef} className="flex whitespace-nowrap will-change-transform">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="flex items-center gap-8 mx-4">
            <span className="text-sm font-bold tracking-[0.2em] uppercase">
              Frontend Development
            </span>
            <span className="w-2 h-2 rounded-full bg-blue-500"></span>
            <span className="text-sm font-bold tracking-[0.2em] uppercase">
              Pixel-Perfect UI
            </span>
            <span className="w-2 h-2 rounded-full bg-blue-500"></span>
            <span className="text-sm font-bold tracking-[0.2em] uppercase">
              System Architecture
            </span>
            <span className="w-2 h-2 rounded-full bg-blue-500"></span>
            <span className="text-sm font-bold tracking-[0.2em] uppercase">
              Performance Optimization
            </span>
            <span className="w-2 h-2 rounded-full bg-blue-500"></span>
          </div>
        ))}
      </div>
    </div>
  );
};

export const Hero = () => {
  const { lang, isPreloaderDone } = useGlobal();
  const t = heroData;

  const heroRef = useRef(null);
  const ringRef = useRef(null);
  const heroContentRef = useRef(null);
  const heroImageRef = useRef(null);

  const xTo = useRef(null);
  const yTo = useRef(null);
  const opacityTo = useRef(null);

  const activePointer = useRef({ x: null, y: null, hasMoved: false });
  const rafId = useRef(null);

  const GRID_SIZE = 48;
  const heroDimensionsRef = useRef({ width: 0, height: 0, top: 0 });

  useEffect(() => {
    if (ringRef.current) {
      gsap.set(ringRef.current, { x: 96, y: 96, opacity: 0 });
      xTo.current = gsap.quickTo(ringRef.current, "x", { duration: 0.35, ease: "power2.out" });
      yTo.current = gsap.quickTo(ringRef.current, "y", { duration: 0.35, ease: "power2.out" });
      opacityTo.current = gsap.quickTo(ringRef.current, "opacity", { duration: 0.3, ease: "power2.out" });
    }
  }, []);

  useEffect(() => {
    if (isPreloaderDone && heroContentRef.current) {
      const tl = gsap.timeline();
      tl.fromTo(
        heroContentRef.current.querySelectorAll(".hero-fade-item"),
        { y: 35, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, stagger: 0.1, ease: "power3.out" }
      );
      if (heroImageRef.current) {
        tl.fromTo(
          heroImageRef.current,
          { scale: 0.95, opacity: 0, y: 30 },
          { scale: 1, opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
          "-=0.5"
        );
      }
    }
  }, [isPreloaderDone]);

  useEffect(() => {
    const updateDimensions = () => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        heroDimensionsRef.current = {
          width: heroRef.current.offsetWidth || window.innerWidth,
          height: heroRef.current.offsetHeight || 800,
          top: rect.top + window.scrollY,
        };
      }
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions, { passive: true });
    const timer = setTimeout(updateDimensions, 400);

    return () => {
      window.removeEventListener("resize", updateDimensions);
      clearTimeout(timer);
    };
  }, []);

  const updatePosition = useCallback((clientX, clientY, isScrollUpdate = false) => {
    if (!heroRef.current) return false;
    const { width: heroWidth, height: heroHeight, top: heroTop } = heroDimensionsRef.current;
    const currentScroll = window.scrollY || 0;
    const rectTop = heroTop - currentScroll;
    const rectBottom = rectTop + (heroHeight || 800);
    const windowH = window.innerHeight;

    if (rectBottom <= 0 || rectTop >= windowH) {
      opacityTo.current?.(0);
      return false;
    }

    if (clientX !== null && clientY !== null) {
      const isInside = 
        clientX >= 0 && 
        clientX <= (heroWidth || window.innerWidth) && 
        clientY >= rectTop && 
        clientY <= rectBottom;

      if (isInside) {
        const x = clientX;
        const y = clientY - rectTop;
        const cellX = Math.floor(x / GRID_SIZE) * GRID_SIZE;
        const cellY = Math.floor(y / GRID_SIZE) * GRID_SIZE;

        xTo.current?.(cellX);
        yTo.current?.(cellY);
        opacityTo.current?.(1);
        return true;
      }
    }

    if (activePointer.current.hasMoved && !isScrollUpdate) {
      opacityTo.current?.(0);
      return false;
    }

    const effectiveWidth = heroWidth || window.innerWidth;
    const effectiveHeight = heroHeight || 800;
    const totalCols = Math.max(4, Math.floor(effectiveWidth / GRID_SIZE));
    const totalRows = Math.max(6, Math.floor(effectiveHeight / GRID_SIZE));

    const scrollProgress = Math.max(0, Math.min(1, -rectTop / (effectiveHeight * 0.75 || 600)));
    const targetCol = Math.floor(totalCols * 0.25) * GRID_SIZE;

    const startRow = 2;
    const maxRow = Math.max(startRow, totalRows - 3);
    const targetY = (startRow + scrollProgress * (maxRow - startRow)) * GRID_SIZE;

    xTo.current?.(targetCol);
    yTo.current?.(targetY);
    opacityTo.current?.(1);
    return true;
  }, []);

  const scheduleUpdate = useCallback((clientX, clientY, isScrollUpdate = false) => {
    if (rafId.current) return;
    rafId.current = requestAnimationFrame(() => {
      rafId.current = null;
      updatePosition(clientX, clientY, isScrollUpdate);
    });
  }, [updatePosition]);

  useEffect(() => {
    if (window.innerWidth < 768 || ('ontouchstart' in window && window.innerWidth < 1024)) return;

    const handlePointerMove = (e) => {
      if (e.pointerType === 'touch') return;
      activePointer.current = { x: e.clientX, y: e.clientY, hasMoved: true };
      scheduleUpdate(e.clientX, e.clientY, false);
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
    };
  }, [scheduleUpdate]);

  useEffect(() => {
    if (window.innerWidth < 768) return;

    const onScroll = () => {
      scheduleUpdate(activePointer.current.x, activePointer.current.y, true);
    };

    const timer = setTimeout(() => {
      updatePosition(activePointer.current.x, activePointer.current.y, true);
    }, 120);

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      clearTimeout(timer);
      if (rafId.current) cancelAnimationFrame(rafId.current);
      window.removeEventListener("scroll", onScroll);
    };
  }, [scheduleUpdate, updatePosition]);

  const handleContactClick = () => {
    if (window.lenis) {
      window.lenis.scrollTo("#contact", {
        offset: -80,
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });
    } else {
      const contactSection = document.getElementById("contact");
      if (contactSection) {
        gsap.to(window, {
          duration: 1.1,
          scrollTo: { y: contactSection, offsetY: 80 },
          ease: "power2.inOut",
          overwrite: "auto",
        });
      }
    }
  };

  return (
    <section 
      ref={heroRef} 
      className="min-h-screen flex items-center relative overflow-hidden pt-20 pb-20 bg-slate-50 dark:bg-slate-900"
    >
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">

        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808018_1px,transparent_1px),linear-gradient(to_bottom,#80808018_1px,transparent_1px)] bg-[size:48px_48px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.5)_100%)] dark:bg-[radial-gradient(circle_at_center,transparent_0%,#000000_100%)]" />

        <div
          ref={ringRef}
          style={{
            width: `${GRID_SIZE}px`,
            height: `${GRID_SIZE}px`,
          }}
          className="hidden md:flex absolute top-0 left-0 pointer-events-none z-0 items-center justify-center will-change-transform transform-gpu"
        >

          <div className="absolute -inset-6 bg-blue-500/10 dark:bg-blue-400/15 rounded-2xl blur-lg pointer-events-none" />

          <div className="absolute inset-0 bg-blue-500/[0.08] dark:bg-blue-400/[0.12] border border-blue-500/50 dark:border-blue-400/60 rounded-md shadow-[0_0_20px_rgba(59,130,246,0.3)] transition-colors duration-300" />

          <div className="absolute -top-[1px] -left-[1px] w-2 h-2 border-t-2 border-l-2 border-blue-600 dark:border-blue-400 rounded-tl-sm" />
          <div className="absolute -top-[1px] -right-[1px] w-2 h-2 border-t-2 border-r-2 border-blue-600 dark:border-blue-400 rounded-tr-sm" />
          <div className="absolute -bottom-[1px] -left-[1px] w-2 h-2 border-b-2 border-l-2 border-blue-600 dark:border-blue-400 rounded-bl-sm" />
          <div className="absolute -bottom-[1px] -right-[1px] w-2 h-2 border-b-2 border-r-2 border-blue-600 dark:border-blue-400 rounded-br-sm" />

          <div 
            className="absolute w-[38px] h-[38px] rounded-full p-[1.5px] overflow-hidden shadow-[0_0_10px_rgba(56,189,248,0.35)]"
            style={{
              WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
              WebkitMaskComposite: "xor",
              maskComposite: "exclude",
            }}
          >
            <div className="absolute top-1/2 left-1/2 aspect-square w-[300%] -translate-x-1/2 -translate-y-1/2 bg-[conic-gradient(from_0deg,transparent_40%,#1d4ed8_65%,#3b82f6_80%,#38bdf8_92%,#ffffff_98%,transparent_100%)] animate-[spin_3s_linear_infinite]" />
          </div>

          <div className="w-[20px] h-[20px] rounded-full border border-dashed border-blue-400/50 dark:border-blue-300/40 animate-[spin_8s_linear_infinite_reverse] flex items-center justify-center pointer-events-none">
            <div className="w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-blue-400 animate-pulse shadow-[0_0_8px_#3b82f6]" />
          </div>

          <div className="absolute -inset-1 rounded-lg border border-blue-500/30 animate-ping opacity-35 pointer-events-none duration-1000" />

          <div className="absolute -top-[48px] inset-x-0 h-[48px] border border-blue-500/20 bg-blue-500/[0.03] rounded-sm pointer-events-none opacity-40 transition-opacity" />
          <div className="absolute -bottom-[48px] inset-x-0 h-[48px] border border-blue-500/20 bg-blue-500/[0.03] rounded-sm pointer-events-none opacity-40 transition-opacity" />
          <div className="absolute -left-[48px] inset-y-0 w-[48px] border border-blue-500/20 bg-blue-500/[0.03] rounded-sm pointer-events-none opacity-40 transition-opacity" />
          <div className="absolute -right-[48px] inset-y-0 w-[48px] border border-blue-500/20 bg-blue-500/[0.03] rounded-sm pointer-events-none opacity-40 transition-opacity" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        <div className="lg:col-span-7 flex flex-col justify-center">
          <div
            ref={heroContentRef}
            className="overflow-hidden mb-6"
          >
            <div className="overflow-hidden">
              <p className="hero-fade-item text-blue-600 font-mono text-sm tracking-widest uppercase mb-4 flex items-center gap-2">
                <span className="w-2 h-2 bg-blue-600 rounded-full animate-pulse" />{" "}
                {lang === "id" ? "Portofolio Resmi" : "Software Engineer"}
              </p>
            </div>

            <div className="overflow-hidden">
              <h1 className="hero-fade-item text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight text-slate-900 dark:text-slate-200 leading-[1] md:leading-[0.9] mb-2">
                {t.name}
              </h1>
            </div>

            <div className="overflow-hidden">
              <h2 className="hero-fade-item text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-slate-500 dark:text-slate-500 tracking-tight mb-6 md:mb-8">
                {t.role}
              </h2>
            </div>

            <div className="overflow-hidden">
              <p className="hero-fade-item text-lg text-slate-700 dark:text-slate-400 max-w-lg leading-relaxed mb-10 border-l-2 border-slate-300 dark:border-slate-700 pl-6">
                {lang === "id" ? t.desc.id : t.desc.en}
              </p>
            </div>

            <div className="hero-fade-item flex flex-wrap gap-5 items-center">

              <div className="relative group/btn cursor-pointer">
                <div
                  className="absolute -inset-[2px] rounded-full p-[2px] overflow-hidden opacity-0 group-hover/btn:opacity-100 blur-[4px] transition-all duration-500 pointer-events-none"
                  style={{
                    WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                    WebkitMaskComposite: "xor",
                    maskComposite: "exclude",
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full" />
                </div>

                <div
                  className="absolute -inset-[2px] rounded-full p-[2px] overflow-hidden opacity-0 group-hover/btn:opacity-100 transition-all duration-500 pointer-events-none z-10"
                  style={{
                    WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                    WebkitMaskComposite: "xor",
                    maskComposite: "exclude",
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-400 rounded-full" />
                </div>

                <button
                  onClick={handleContactClick}
                  className="relative inline-flex h-14 items-center justify-center overflow-hidden rounded-full bg-slate-900 dark:bg-white px-8 font-medium text-white dark:text-slate-900 shadow-xl transition-all duration-300 group-hover/btn:shadow-2xl group-hover/btn:shadow-blue-500/25 group-hover/btn:-translate-y-0.5 active:translate-y-0 cursor-pointer z-0"
                >
                  <span className="absolute inset-0 w-full h-full bg-gradient-to-tr from-blue-600 via-blue-500 to-indigo-600 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500" />
                  <span className="relative flex items-center gap-2 group-hover/btn:text-white transition-colors duration-300 font-semibold tracking-wide text-sm md:text-base">
                    {lang === "id" ? "Mulai Proyek" : "Start a Project"}
                    <Rocket
                      size={18}
                      className="group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform duration-300"
                    />
                  </span>
                </button>
              </div>

              <div className="relative group/cv cursor-pointer">
                <div
                  className="absolute -inset-[2px] rounded-full p-[2px] overflow-hidden opacity-0 group-hover/cv:opacity-100 blur-[3px] transition-all duration-500 pointer-events-none"
                  style={{
                    WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                    WebkitMaskComposite: "xor",
                    maskComposite: "exclude",
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-sky-400 rounded-full" />
                </div>

                <div
                  className="absolute -inset-[2px] rounded-full p-[2px] overflow-hidden opacity-0 group-hover/cv:opacity-100 transition-all duration-500 pointer-events-none z-10"
                  style={{
                    WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                    WebkitMaskComposite: "xor",
                    maskComposite: "exclude",
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-indigo-300 rounded-full" />
                </div>

                <a
                  href="/CV MUHAMAD NUR AIDUL HARPAN.pdf"
                  download="CV MUHAMAD NUR AIDUL HARPAN.pdf"
                  className="relative inline-flex h-14 items-center justify-center overflow-hidden rounded-full border border-slate-300/80 dark:border-slate-700/80 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md px-8 font-medium text-slate-700 dark:text-slate-300 transition-all duration-300 group-hover/cv:border-transparent group-hover/cv:text-blue-600 dark:group-hover/cv:text-blue-400 group-hover/cv:shadow-lg group-hover/cv:shadow-blue-500/15 group-hover/cv:-translate-y-0.5 active:translate-y-0 cursor-pointer z-0"
                >
                  <span className="relative flex items-center gap-2 font-semibold tracking-wide text-sm md:text-base">
                    <FileText 
                      size={18} 
                      className="group-hover/cv:scale-110 group-hover/cv:rotate-6 transition-transform duration-300"
                    /> 
                    {lang === "id" ? "Lihat CV Saya" : "View Resume"}
                  </span>
                </a>
              </div>
            </div>

            <div className="hero-fade-item mt-12 flex gap-6 text-slate-500 dark:text-slate-400">
              <a
                href="https://github.com/MUHAMAD-NUR-AIDUL-HARPAN"
                target="_blank"
                rel="noreferrer"
                className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors transform hover:scale-110 duration-200"
              >
                <Github size={22} />
              </a>
              <a
                href="https://linkedin.com/in/aidul-harpan"
                target="_blank"
                rel="noreferrer"
                className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors transform hover:scale-110 duration-200"
              >
                <Linkedin size={22} />
              </a>
              <a
                href="https://aidulharpan.my.id"
                target="_blank"
                rel="noreferrer"
                className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors transform hover:scale-110 duration-200"
              >
                <Globe size={22} />
              </a>
            </div>
          </div>
        </div>

        <div
          ref={heroImageRef}
          className="lg:col-span-5 flex justify-center lg:justify-end relative mt-10 lg:mt-0"
        >

          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 aspect-square bg-blue-500/15 dark:bg-blue-400/10 rounded-full blur-[50px] pointer-events-none z-0 hidden sm:block" />

          <div className="relative z-10 w-full max-w-[340px] md:max-w-[400px]">

            <div className="relative w-full aspect-[3/4] group">

              <div className="relative w-full h-full rounded-t-full rounded-b-[40px] overflow-hidden bg-slate-100 dark:bg-slate-900 shadow-xl border border-slate-200/90 dark:border-slate-800/80 transition-colors duration-300">
                <img
                  src={t.image}
                  alt={t.name}
                  loading="eager"
                  fetchPriority="high"
                  decoding="async"
                  className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105"
                />

                <div className="absolute inset-x-0 bottom-0 h-52 bg-gradient-to-t from-slate-100 via-slate-100/90 to-transparent dark:from-slate-950 dark:via-slate-950/85 dark:to-transparent flex flex-col items-center justify-end pb-7 px-6 text-center pointer-events-none select-none z-10 transition-colors duration-500">
                  <h3 className="font-serif text-2xl sm:text-[26px] font-normal tracking-[0.22em] uppercase text-slate-900 dark:text-white drop-shadow-sm dark:drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)] transition-colors duration-500">
                    -
                  </h3>

                  <div className="flex items-center justify-center gap-3 w-full max-w-[210px] my-2.5">
                    <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent via-blue-500 to-indigo-500 opacity-80" />
                    <div className="flex items-center justify-center text-blue-600 dark:text-blue-400 transition-colors duration-500">
                      <Code2 size={13} strokeWidth={2.5} />
                    </div>
                    <div className="flex-1 h-[1px] bg-gradient-to-r from-indigo-500 via-blue-500 to-transparent opacity-80" />
                  </div>

                  <p className="text-[10px] sm:text-[11px] font-mono tracking-[0.38em] uppercase text-slate-600 dark:text-slate-300 font-semibold drop-shadow-sm dark:drop-shadow transition-colors duration-500">
                    SOFTWARE ENGINEER
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Marquee />
    </section>
  );
};
