import { motion } from "framer-motion";
import { useRef } from "react";
import { experienceData } from "../../data/content";
import { useGlobal } from "../../context/GlobalContext";
import { Briefcase, GraduationCap, Calendar, ArrowRight } from "lucide-react";

// --- SUB-COMPONENT: EXPERIENCE CARD ---
const ExperienceCard = ({ item, index }) => {
  const { lang } = useGlobal();

  // Menentukan posisi card (Kiri atau Kanan Timeline)
  const isLeft = index % 2 === 0;

  return (
    <div
      className={`flex justify-between items-center w-full mb-8 md:mb-12 ${
        isLeft ? "md:flex-row-reverse" : "md:flex-row"
      }`}
    >
      {/* 1. SPACE KOSONG (Untuk menyeimbangkan grid di desktop) */}
      <div className="hidden md:block w-5/12" />

      {/* 2. TIMELINE DOT (Titik Tengah dengan Animated Ring) */}
      <div className="absolute left-4 md:left-1/2 transform -translate-x-1/2 flex items-center justify-center z-20">
        <div className="relative w-10 h-10 rounded-full flex items-center justify-center">
          {/* Animated Ring Glow */}
          <div 
            className="absolute -inset-[2px] rounded-full p-[2px] overflow-hidden opacity-60 blur-[4px] pointer-events-none transform-gpu"
            style={{
              WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
              WebkitMaskComposite: "xor",
              maskComposite: "exclude",
            }}
          >
            <div className="absolute top-1/2 left-1/2 aspect-square w-[300%] -translate-x-1/2 -translate-y-1/2 bg-[conic-gradient(from_0deg,transparent_60%,#1d4ed8_75%,#3b82f6_85%,#93c5fd_95%,transparent_100%)] animate-[spin_6s_linear_infinite] will-change-transform transform-gpu" />
          </div>

          {/* Animated Crisp Ring */}
          <div 
            className="absolute -inset-[1.5px] rounded-full p-[1.5px] overflow-hidden pointer-events-none shadow-md shadow-blue-500/20 transform-gpu"
            style={{
              WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
              WebkitMaskComposite: "xor",
              maskComposite: "exclude",
            }}
          >
            <div className="absolute top-1/2 left-1/2 aspect-square w-[300%] -translate-x-1/2 -translate-y-1/2 bg-[conic-gradient(from_0deg,transparent_60%,#2563eb_75%,#38bdf8_88%,#ffffff_96%,transparent_100%)] animate-[spin_6s_linear_infinite] will-change-transform transform-gpu" />
          </div>

          {/* Inner Node Core */}
          <div className="w-8 h-8 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-center z-10 shadow-sm">
            {item.category === "work" ? (
              <Briefcase size={14} className="text-blue-600 dark:text-blue-400" />
            ) : (
              <GraduationCap
                size={14}
                className="text-blue-600 dark:text-blue-400"
              />
            )}
          </div>
        </div>
      </div>

      {/* 3. CONTENT CARD */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.4, ease: "easeOut", delay: index * 0.05 }}
        className="w-full md:w-5/12 pl-12 md:pl-0"
      >
        <div className="relative p-6 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-lg hover:shadow-xl hover:border-blue-500/30 transition-all duration-300 group">
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
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="p-2.5 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600">
              <Briefcase size={20} />
            </div>
            <span className="text-xs font-bold uppercase tracking-widest text-slate-500">
              {lang === "id" ? "Jejak Karir" : "Career Path"}
            </span>
          </div>
          <div className="w-full">
            <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-4 relative inline-block z-10">
              <span className="absolute inset-0 bg-blue-200 dark:bg-blue-800/50 transform -skew-x-6 rounded-sm -z-10 shadow-sm"></span>
              <span className="relative px-2 text-slate-900 dark:text-white">
                {lang === "id" ? "Pengalaman Profesional" : "Professional Experience"}
              </span>
            </h2>
          </div>
          <p className="text-slate-500 dark:text-slate-400 max-w-xl mx-auto">
            {lang === "id"
              ? "Perjalanan saya dalam membangun produk digital dan memperdalam keahlian teknis."
              : "My journey in building digital products and deepening technical expertise."}
          </p>

          {/* Connector Beacon with Animated Ring leading downwards into timeline */}
          <div className="hidden md:flex flex-col items-center justify-center mt-8 -mb-12">
            <div className="relative w-8 h-8 rounded-full flex items-center justify-center">
              {/* Outer Glow */}
              <div 
                className="absolute -inset-[2px] rounded-full p-[2px] overflow-hidden opacity-60 blur-[4px] pointer-events-none transform-gpu"
                style={{
                  WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                  WebkitMaskComposite: "xor",
                  maskComposite: "exclude",
                }}
              >
                <div className="absolute top-1/2 left-1/2 aspect-square w-[300%] -translate-x-1/2 -translate-y-1/2 bg-[conic-gradient(from_0deg,transparent_60%,#1d4ed8_75%,#3b82f6_85%,#93c5fd_95%,transparent_100%)] animate-[spin_6s_linear_infinite] transform-gpu will-change-transform" />
              </div>

              {/* Crisp Animated Ring */}
              <div 
                className="absolute -inset-[1.5px] rounded-full p-[1.5px] overflow-hidden pointer-events-none shadow-md shadow-blue-500/25 transform-gpu"
                style={{
                  WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                  WebkitMaskComposite: "xor",
                  maskComposite: "exclude",
                }}
              >
                <div className="absolute top-1/2 left-1/2 aspect-square w-[300%] -translate-x-1/2 -translate-y-1/2 bg-[conic-gradient(from_0deg,transparent_60%,#2563eb_75%,#38bdf8_88%,#ffffff_96%,transparent_100%)] animate-[spin_6s_linear_infinite] transform-gpu will-change-transform" />
              </div>

              {/* Core Center */}
              <div className="w-7 h-7 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-center shadow-sm">
                <div className="w-2.5 h-2.5 rounded-full bg-blue-600 dark:bg-blue-400 animate-pulse" />
              </div>
            </div>

            {/* Connecting Vertical Stem */}
            <div className="w-[2px] h-8 bg-gradient-to-b from-blue-500 via-blue-500/50 to-blue-500/20" />
          </div>
        </motion.div>

        {/* Timeline Container */}
        <div className="relative max-w-5xl mx-auto">
          {/* Vertical Line (Garis Tengah) dengan Animasi Light Beam */}
          <div className="absolute left-4 md:left-1/2 transform -translate-x-1/2 top-0 bottom-0 w-[2px] bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
            <motion.div
              animate={{ y: ["-100%", "250%"] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "linear" }}
              className="w-full h-48 bg-gradient-to-b from-transparent via-blue-500 to-transparent"
            />
          </div>

          {/* Render Cards */}
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
