import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { experienceData } from "../../data/content";
import { useGlobal } from "../../context/GlobalContext";
import { Briefcase, GraduationCap, Calendar } from "lucide-react";
import { TextHighlighter } from "../atoms/TextHighlighter";

gsap.registerPlugin(ScrollTrigger);

const ExperienceCard = ({ item, index }) => {
  const { lang } = useGlobal();
  const isLeft = index % 2 === 0;

  return (
    <div
      className={`group flex justify-between items-center w-full mb-8 md:mb-12 ${
        isLeft ? "md:flex-row-reverse" : "md:flex-row"
      }`}
    >
      <div className="hidden md:block w-5/12" />

      <div className="absolute left-4 md:left-1/2 transform -translate-x-1/2 flex items-center justify-center z-20">
        <div className="relative w-11 h-11 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
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

      <div
        data-aos={isLeft ? "fade-right" : "fade-left"}
        data-aos-delay={index * 100}
        className="w-full md:w-5/12 pl-12 md:pl-0"
      >
        <div className="relative p-6 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-lg hover:shadow-2xl hover:border-blue-500/40 hover:-translate-y-1 transition-all duration-300 group">
          <div
            className={`hidden md:block absolute top-6 w-4 h-4 bg-slate-50 dark:bg-slate-800 border-t border-r border-slate-200 dark:border-slate-800 transform rotate-45 ${
              isLeft
                ? "-left-2 border-t-0 border-r-0 border-b border-l"
                : "-right-2"
            }`}
          />

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

          <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed mb-6">
            {lang === "id" ? item.desc.id : item.desc.en}
          </p>

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
      </div>
    </div>
  );
};

export const ExperienceSection = () => {
  const { lang } = useGlobal();
  const timelineRef = useRef(null);
  const fillLineRef = useRef(null);
  const beaconRef = useRef(null);

  useEffect(() => {
    if (!timelineRef.current || !fillLineRef.current || !beaconRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        fillLineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: timelineRef.current,
            start: "top 70%",
            end: "bottom 70%",
            scrub: 0.5,
          },
        }
      );

      const targetBeaconY = timelineRef.current ? timelineRef.current.offsetHeight : 1200;
      gsap.fromTo(
        beaconRef.current,
        { y: 0 },
        {
          y: targetBeaconY,
          ease: "none",
          scrollTrigger: {
            trigger: timelineRef.current,
            start: "top 70%",
            end: "bottom 70%",
            scrub: 0.5,
            invalidateOnRefresh: true,
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <section className="py-24 bg-slate-50 dark:bg-slate-900 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] dark:bg-[radial-gradient(#333_1px,transparent_1px)] [background-size:20px_20px] opacity-40 pointer-events-none" />

      <div 
        className="hidden md:block absolute top-20 left-[-20%] text-[4rem] md:text-[8rem] lg:text-[12rem] font-black text-slate-200 dark:text-slate-200/5 opacity-50 select-none pointer-events-none z-0 whitespace-nowrap"
      >
        EXPERIENCE
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div data-aos="fade-up" className="text-center mb-20">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="p-2.5 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 shadow-sm">
              <Briefcase size={20} />
            </div>
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
          <p className="text-slate-500 dark:text-slate-400 max-w-xl mx-auto">
            {lang === "id"
              ? "Perjalanan saya dalam membangun produk digital dan memperdalam keahlian teknis."
              : "My journey in building digital products and deepening technical expertise."}
          </p>

          <div className="flex flex-col items-center justify-center mt-8 -mb-12">
            <div className="relative w-6 h-6 rounded-full flex items-center justify-center">
              <div className="w-5 h-5 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-center shadow-sm">
                <div className="w-2.5 h-2.5 rounded-full bg-blue-600 dark:bg-blue-400 shadow-[0_0_8px_#3b82f6]" />
              </div>
            </div>

            <div className="w-[2px] h-8 bg-gradient-to-b from-blue-500 via-blue-500/50 to-blue-500/20" />
          </div>
        </div>

        <div ref={timelineRef} className="relative max-w-5xl mx-auto">
          <div className="absolute left-4 md:left-1/2 transform -translate-x-1/2 top-0 bottom-0 w-[2px] bg-slate-200 dark:bg-slate-800 rounded-full" />
          <div
            ref={fillLineRef}
            style={{ transform: "scaleY(0)", transformOrigin: "top center" }}
            className="absolute left-4 md:left-1/2 transform -translate-x-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-blue-600 via-blue-500 to-indigo-500 rounded-full shadow-[0_0_8px_#3b82f6] z-10 will-change-transform transform-gpu"
          />
          <div
            ref={beaconRef}
            className="flex absolute left-4 md:left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 z-30 pointer-events-none items-center justify-center will-change-transform transform-gpu"
          >
            <div className="absolute w-8 h-8 rounded-full bg-blue-500/25 dark:bg-blue-400/30 blur-[4px] pointer-events-none" />
            <div className="relative w-3.5 h-3.5 rounded-full bg-blue-600 dark:bg-blue-400 border-2 border-white dark:border-slate-900 shadow-[0_0_10px_#3b82f6]" />
            <div className="absolute -inset-1 rounded-full border border-blue-400/50 animate-ping opacity-40 pointer-events-none duration-1000" />
          </div>

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
