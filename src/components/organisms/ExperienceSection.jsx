import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";
import { experienceData } from "../../data/content";
import { useGlobal } from "../../context/GlobalContext";
import { Briefcase, GraduationCap, Calendar, ArrowRight } from "lucide-react";
import { TextHighlighter } from "../atoms/TextHighlighter";

// --- SUB-COMPONENT: EXPERIENCE CARD ---
const ExperienceCard = ({ item, index }) => {
  const { lang } = useGlobal();

  // Menentukan posisi card (Kiri atau Kanan Timeline)
  const isLeft = index % 2 === 0;

  return (
    <div
      className={`group flex justify-between items-center w-full mb-8 md:mb-12 ${
        isLeft ? "md:flex-row-reverse" : "md:flex-row"
      }`}
    >
      {/* 1. SPACE KOSONG (Untuk menyeimbangkan grid di desktop) */}
      <div className="hidden md:block w-5/12" />

      {/* 2. TIMELINE DOT (Titik Tengah dengan Animated Ring Aktif & Jelas) */}
      <div className="absolute left-4 md:left-1/2 transform -translate-x-1/2 flex items-center justify-center z-20">
        <div className="relative w-11 h-11 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
          {/* Animated Ring Glow (Soft Ambient Halo) */}
          <div 
            className="absolute -inset-[3px] rounded-full p-[3px] overflow-hidden opacity-75 group-hover:opacity-100 blur-[4px] pointer-events-none transition-opacity duration-300"
            style={{
              WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
              WebkitMaskComposite: "xor",
              maskComposite: "exclude",
            }}
          >
            <div className="absolute top-1/2 left-1/2 aspect-square w-[300%] -translate-x-1/2 -translate-y-1/2 bg-[conic-gradient(from_0deg,transparent_40%,#1d4ed8_65%,#3b82f6_80%,#60a5fa_90%,#ffffff_98%,transparent_100%)] animate-[spin_4s_linear_infinite]" />
          </div>

          {/* Crisp Concentric Traveling Ring Beam */}
          <div 
            className="absolute -inset-[2px] rounded-full p-[2px] overflow-hidden pointer-events-none shadow-md shadow-blue-500/30"
            style={{
              WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
              WebkitMaskComposite: "xor",
              maskComposite: "exclude",
            }}
          >
            <div className="absolute top-1/2 left-1/2 aspect-square w-[300%] -translate-x-1/2 -translate-y-1/2 bg-[conic-gradient(from_0deg,transparent_40%,#2563eb_65%,#38bdf8_82%,#93c5fd_92%,#ffffff_98%,transparent_100%)] animate-[spin_4s_linear_infinite]" />
          </div>

          {/* Inner Node Core Icon Container */}
          <div className="w-9 h-9 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-center z-10 shadow-sm transition-all duration-300 group-hover:border-blue-500/50 group-hover:shadow-[0_0_12px_rgba(59,130,246,0.3)]">
            {item.category === "work" ? (
              <Briefcase size={15} className="text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform duration-300" />
            ) : (
              <GraduationCap
                size={15}
                className="text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform duration-300"
              />
            )}
          </div>
        </div>
      </div>

      {/* 3. CONTENT CARD */}
      <motion.div
        initial={{ opacity: 0, x: isLeft ? -20 : 20, y: 15 }}
        whileInView={{ opacity: 1, x: 0, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.05 }}
        whileHover={{ y: -4, transition: { duration: 0.25 } }}
        className="w-full md:w-5/12 pl-12 md:pl-0"
      >
        <div className="relative p-6 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-lg hover:shadow-2xl hover:border-blue-500/40 transition-all duration-300 group">
          {/* Panah dekorasi kecil mengarah ke timeline */}
          <div
            className={`hidden md:block absolute top-6 w-4 h-4 bg-slate-50 dark:bg-slate-800 border-t border-r border-slate-200 dark:border-slate-800 transform rotate-45 ${
              isLeft
                ? "-left-2 border-t-0 border-r-0 border-b border-l"
                : "-right-2"
            }`}
          />

          {/* Header Card */}
          <div className="flex flex-col gap-2 mb-4">
            <span className="inline-flex items-center gap-2 text-xs font-mono font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
              <Calendar size={12} />
              {item.period}
            </span>
            <h3 className="text-xl font-bold text-slate-900 dark:text-slate-200 leading-tight">
              {lang === "id" ? item.role.id : item.role.en}
            </h3>
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
              @ {item.company}
            </p>
          </div>

          {/* Description */}
          <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed mb-6">
            {lang === "id" ? item.desc.id : item.desc.en}
          </p>

          {/* Tech Stack Tags */}
          <div className="flex flex-wrap gap-2">
            {item.tech.map((tech, idx) => (
              <span
                key={idx}
                className="px-2 py-1 text-[10px] font-bold uppercase tracking-wide bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-md border border-slate-200 dark:border-slate-700"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

// --- MAIN COMPONENT ---
export const ExperienceSection = () => {
  const { lang } = useGlobal();
  const timelineRef = useRef(null);

  // Animasi Ring Mengikuti Posisi Scroll di Timeline
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start 65%", "end 65%"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 160,
    damping: 24,
    restDelta: 0.001,
  });

  const lineHeight = useTransform(smoothProgress, [0, 1], ["0%", "100%"]);
  const ringTop = useTransform(smoothProgress, [0, 1], ["0%", "100%"]);

  return (
    <section className="py-24 bg-slate-50 dark:bg-slate-900 relative overflow-hidden">
      {/* Background Decor (Dots pattern) */}
      <div className="absolute inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] dark:bg-[radial-gradient(#333_1px,transparent_1px)] [background-size:20px_20px] opacity-40 pointer-events-none" />

      {/* Decorative Text Background */}
      <div 
        className="hidden md:block absolute top-20 left-[-20%] text-[4rem] md:text-[8rem] lg:text-[12rem] font-black text-slate-200 dark:text-slate-200/5 opacity-50 select-none pointer-events-none z-0 whitespace-nowrap"
      >
        EXPERIENCE
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-20"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="p-2.5 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600"
            >
              <Briefcase size={20} />
            </motion.div>
            <span className="text-xs font-bold uppercase tracking-widest text-slate-500">
              {lang === "id" ? "Jejak Karir" : "Career Path"}
            </span>
          </div>
          <div className="w-full">
            <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-4 relative inline-block z-10">
              <TextHighlighter />
              <span className="relative px-2 text-slate-900 dark:text-white">
                {lang === "id" ? "Pengalaman Profesional" : "Professional Experience"}
              </span>
            </h2>
          </div>
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.75, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="text-slate-500 dark:text-slate-400 max-w-xl mx-auto"
          >
            {lang === "id"
              ? "Perjalanan saya dalam membangun produk digital dan memperdalam keahlian teknis."
              : "My journey in building digital products and deepening technical expertise."}
          </motion.p>

          {/* Connector Beacon leading downwards into timeline */}
          <div className="hidden md:flex flex-col items-center justify-center mt-8 -mb-12">
            <div className="relative w-6 h-6 rounded-full flex items-center justify-center">
              <div className="w-5 h-5 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-center shadow-sm">
                <div className="w-2.5 h-2.5 rounded-full bg-blue-600 dark:bg-blue-400 shadow-[0_0_8px_#3b82f6]" />
              </div>
            </div>

            {/* Connecting Vertical Stem */}
            <div className="w-[2px] h-8 bg-gradient-to-b from-blue-500 via-blue-500/50 to-blue-500/20" />
          </div>
        </motion.div>

        {/* Timeline Container */}
        <div ref={timelineRef} className="relative max-w-5xl mx-auto">
          {/* 1. Base Guide Track Vertical Line */}
          <div className="absolute left-4 md:left-1/2 transform -translate-x-1/2 top-0 bottom-0 w-[2px] bg-slate-200 dark:bg-slate-800 rounded-full" />

          {/* 2. Glowing Fill Line Mengikuti Scroll Progress */}
          <motion.div
            style={{ height: lineHeight }}
            className="absolute left-4 md:left-1/2 transform -translate-x-1/2 top-0 w-[2px] bg-gradient-to-b from-blue-600 via-blue-500 to-indigo-500 rounded-full shadow-[0_0_8px_#3b82f6] z-10 will-change-[height]"
          />

          {/* 3. Traveling Glowing Beacon Dot yang Mengikuti Posisi Scroll (Tanpa Ring) */}
          <motion.div
            style={{ top: ringTop }}
            className="absolute left-4 md:left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 pointer-events-none flex items-center justify-center will-change-transform transform-gpu"
          >
            {/* Soft Ambient Halo */}
            <div className="absolute w-8 h-8 rounded-full bg-blue-500/25 dark:bg-blue-400/30 blur-[4px] pointer-events-none" />

            {/* Center Glowing Core Beacon Dot */}
            <div className="relative w-3.5 h-3.5 rounded-full bg-blue-600 dark:bg-blue-400 border-2 border-white dark:border-slate-900 shadow-[0_0_10px_#3b82f6]" />

            {/* Soft Expanding Pulse Wave */}
            <div className="absolute -inset-1 rounded-full border border-blue-400/50 animate-ping opacity-40 pointer-events-none duration-1000" />
          </motion.div>

          {/* 4. Render Cards */}
          <div className="relative">
            {experienceData.map((item, index) => (
              <ExperienceCard key={item.id} item={item} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
