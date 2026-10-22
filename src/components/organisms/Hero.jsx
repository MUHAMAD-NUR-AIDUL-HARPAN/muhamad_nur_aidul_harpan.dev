import { useRef, useState, useEffect } from "react";
import { motion, useSpring, useMotionValue, AnimatePresence, useScroll, useTransform, useVelocity, wrap } from "framer-motion";
import { Download, ArrowRight, Github, Linkedin, Globe, Rocket, FileText, Code2 } from "lucide-react";
import { useGlobal } from "../../context/GlobalContext";
import { heroData } from "../../data/content";

const Marquee = () => {
  return (
    <div className="absolute bottom-0 left-0 w-full overflow-hidden bg-slate-900 dark:bg-white text-white dark:text-slate-900 py-3 z-20 border-t border-white/10 flex">
      <motion.div 
        className="flex whitespace-nowrap will-change-transform" 
        animate={{ x: ["0%", "-50%"] }}
        transition={{ ease: "linear", duration: 80, repeat: Infinity }}
      >
        {[...Array(12)].map((_, i) => (
          <div key={i} className="flex items-center gap-8 mx-4">
            <span className="text-sm font-bold tracking-[0.2em] uppercase">
              Frontend Development
            </span>
            <span className="w-2 h-2 rounded-full bg-blue-500"></span>
            <span className="text-sm font-bold tracking-[0.2em] uppercase">
              Pixel-Perfect UI
            </span>
            <span className="w-2 h-2 rounded-full bg-blue-500"></span>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export const Hero = () => {
  const { lang } = useGlobal();
  const t = heroData;

  const heroRef = useRef(null);
  
  // Semua efek parallax scrollYProgress dihapus karena memicu konflik (stutter) dengan mesin scroll Lenis.
  // Lenis sudah memberikan scroll yang sangat halus secara native.

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const item = {
    hidden: { y: "120%", opacity: 0, rotate: 3 },
    show: {
      y: "0%",
      opacity: 1,
      rotate: 0,
      transition: {
        duration: 1.2,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  const image = t.image;

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
        contactSection.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <section ref={heroRef} className="min-h-screen flex items-center relative overflow-hidden pt-20 pb-20 bg-slate-50 dark:bg-slate-900">
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.5)_100%)] dark:bg-[radial-gradient(circle_at_center,transparent_0%,#000000_100%)]" />
      </div>


      <div className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        <div className="lg:col-span-7 flex flex-col justify-center">
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="overflow-hidden mb-6"
          >
            <div className="overflow-hidden">
              <motion.p
                variants={item}
                className="text-blue-600 font-mono text-sm tracking-widest uppercase mb-4 flex items-center gap-2"
              >
                <span className="w-2 h-2 bg-blue-600 rounded-full animate-pulse" />{" "}
                {lang === "id" ? "Portofolio Resmi" : "Software Engineer"}
              </motion.p>
            </div>

            <div className="overflow-hidden">
              <motion.h1
                variants={item}
                className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight text-slate-900 dark:text-slate-200 leading-[1] md:leading-[0.9] mb-2"
              >
                {t.name}
              </motion.h1>
            </div>

            <div className="overflow-hidden">
              <motion.h2
                variants={item}
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-slate-500 dark:text-slate-500 tracking-tight mb-6 md:mb-8"
              >
                {t.role}
              </motion.h2>
            </div>

            <div className="overflow-hidden">
              <motion.p
                variants={item}
                className="text-lg text-slate-700 dark:text-slate-400 max-w-lg leading-relaxed mb-10 border-l-2 border-slate-300 dark:border-slate-700 pl-6"
              >
                {lang === "id" ? t.desc.id : t.desc.en}
              </motion.p>
            </div>

            <motion.div variants={item} className="flex flex-wrap gap-5 items-center">
              {/* PRIMARY BUTTON: Mulai Proyek (Dengan Animasi Ring Cahaya Saat Hover) */}
              <div className="relative group/btn cursor-pointer">
                {/* 1. Animated Conic Glow Ring (Muncul & Berputar Halus Saat Hover) */}
                <div
                  className="absolute -inset-[2px] rounded-full p-[2px] overflow-hidden opacity-0 group-hover/btn:opacity-100 blur-[4px] transition-all duration-500 pointer-events-none"
                  style={{
                    WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                    WebkitMaskComposite: "xor",
                    maskComposite: "exclude",
                  }}
                >
                  <div className="absolute top-1/2 left-1/2 aspect-square w-[300%] -translate-x-1/2 -translate-y-1/2 bg-[conic-gradient(from_0deg,transparent_60%,#1d4ed8_75%,#3b82f6_85%,#93c5fd_95%,transparent_100%)] animate-[spin_4s_linear_infinite]" />
                </div>

                {/* 2. Crisp Traveling Beam Ring */}
                <div
                  className="absolute -inset-[2px] rounded-full p-[2px] overflow-hidden opacity-0 group-hover/btn:opacity-100 transition-all duration-500 pointer-events-none z-10"
                  style={{
                    WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                    WebkitMaskComposite: "xor",
                    maskComposite: "exclude",
                  }}
                >
                  <div className="absolute top-1/2 left-1/2 aspect-square w-[300%] -translate-x-1/2 -translate-y-1/2 bg-[conic-gradient(from_0deg,transparent_60%,#2563eb_75%,#38bdf8_88%,#ffffff_96%,transparent_100%)] animate-[spin_4s_linear_infinite]" />
                </div>

                {/* 3. Button Body */}
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

              {/* SECONDARY BUTTON: CV Saya (Dengan Ring Outline Glow Saat Hover) */}
              <div className="relative group/cv cursor-pointer">
                {/* Animated Conic Glow Ring */}
                <div
                  className="absolute -inset-[2px] rounded-full p-[2px] overflow-hidden opacity-0 group-hover/cv:opacity-100 blur-[3px] transition-all duration-500 pointer-events-none"
                  style={{
                    WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                    WebkitMaskComposite: "xor",
                    maskComposite: "exclude",
                  }}
                >
                  <div className="absolute top-1/2 left-1/2 aspect-square w-[300%] -translate-x-1/2 -translate-y-1/2 bg-[conic-gradient(from_0deg,transparent_60%,#3b82f6_75%,#60a5fa_85%,#93c5fd_95%,transparent_100%)] animate-[spin_4s_linear_infinite]" />
                </div>

                {/* Crisp Traveling Ring */}
                <div
                  className="absolute -inset-[2px] rounded-full p-[2px] overflow-hidden opacity-0 group-hover/cv:opacity-100 transition-all duration-500 pointer-events-none z-10"
                  style={{
                    WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                    WebkitMaskComposite: "xor",
                    maskComposite: "exclude",
                  }}
                >
                  <div className="absolute top-1/2 left-1/2 aspect-square w-[300%] -translate-x-1/2 -translate-y-1/2 bg-[conic-gradient(from_0deg,transparent_60%,#2563eb_75%,#38bdf8_88%,#ffffff_96%,transparent_100%)] animate-[spin_4s_linear_infinite]" />
                </div>

                {/* Anchor Body */}
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
            </motion.div>

            <motion.div
              variants={item}
              className="mt-12 flex gap-6 text-slate-500 dark:text-slate-400"
            >
              <a
                href="https://github.com/MUHAMAD-NUR-AIDUL-HARPAN"
                target="_blank"
                rel="noreferrer"
                className="hover:text-slate-900 dark:hover:text-white transition-colors"
                title="GitHub Profile"
              >
                <Github size={20} />
              </a>
              <a
                href="https://linkedin.com/in/muhamad-nur-aidul-harpan"
                target="_blank"
                rel="noreferrer"
                className="hover:text-blue-600 transition-colors"
                title="LinkedIn Profile"
              >
                <Linkedin size={20} />
              </a>
              <a
                href="https://instagram.com/aidl_harpan08"
                target="_blank"
                rel="noreferrer"
                className="hover:text-pink-500 transition-colors"
                title="Instagram Profile"
              >
                <Globe size={20} />
              </a>
            </motion.div>
          </motion.div>
        </div>

        <div className="lg:col-span-5 flex justify-center lg:justify-end relative mt-10 lg:mt-0">
          {/* Cahaya di belakang foto agar lebih menyatu (Glowing Aura) */}
          <motion.div 
            animate={{ scale: [1, 1.1, 1], opacity: [0.4, 0.6, 0.4] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 aspect-square bg-blue-500/20 dark:bg-blue-400/10 rounded-full blur-[80px] pointer-events-none z-0" 
          />

          {/* Wrapper Parallax dihapus agar tidak bentrok dengan Lenis */}
          <div className="relative z-10 w-full max-w-[340px] md:max-w-[400px]">
            {/* Wrapper Animasi Melayang (Floating Effect) */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="relative w-full aspect-[3/4] group"
            >
              {/* Clean Elegant Frame with Soft Shadow & Border */}
              <div className="relative w-full h-full rounded-t-full rounded-b-[40px] overflow-hidden bg-slate-100 dark:bg-slate-900 shadow-2xl border border-slate-200/90 dark:border-slate-800/80 transition-colors duration-500">
                <img
                  src={image}
                  alt={t.name}
                  className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
                />

                {/* Bottom Cinematic Vignette Gradient Overlay (Responsive Light & Dark Mode) */}
                <div className="absolute inset-x-0 bottom-0 h-52 bg-gradient-to-t from-slate-100 via-slate-100/90 to-transparent dark:from-slate-950 dark:via-slate-950/85 dark:to-transparent flex flex-col items-center justify-end pb-7 px-6 text-center pointer-events-none select-none z-10 transition-colors duration-500">
                  {/* Name in Luxury Serif Typography */}
                  <h3 className="font-serif text-2xl sm:text-[26px] font-normal tracking-[0.22em] uppercase text-slate-900 dark:text-white drop-shadow-sm dark:drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)] transition-colors duration-500">
                    -
                  </h3>

                  {/* Gradient Hairline Divider with Tech Emblem */}
                  <div className="flex items-center justify-center gap-3 w-full max-w-[210px] my-2.5">
                    <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent via-blue-500 to-indigo-500 opacity-80" />
                    <div className="flex items-center justify-center text-blue-600 dark:text-blue-400 transition-colors duration-500">
                      <Code2 size={13} strokeWidth={2.5} />
                    </div>
                    <div className="flex-1 h-[1px] bg-gradient-to-r from-indigo-500 via-blue-500 to-transparent opacity-80" />
                  </div>

                  {/* Spaced Monospace Role Title */}
                  <p className="text-[10px] sm:text-[11px] font-mono tracking-[0.38em] uppercase text-slate-600 dark:text-slate-300 font-semibold drop-shadow-sm dark:drop-shadow transition-colors duration-500">
                    SOFTWARE ENGINEER
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <Marquee />
    </section>
  );
};
