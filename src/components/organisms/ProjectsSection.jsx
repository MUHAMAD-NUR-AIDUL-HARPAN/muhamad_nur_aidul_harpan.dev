import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGlobal } from "../../context/GlobalContext";
import { projectsData, projectCategories } from "../../data/content";
import { ProjectCard } from "../molecules/ProjectCard";
import { TextHighlighter } from "../atoms/TextHighlighter";
import { ButtonRing } from "../atoms/ButtonRing";
import { Code } from "lucide-react";
import { supabase } from "../../lib/supabaseClient";

gsap.registerPlugin(ScrollTrigger);

export const ProjectsSection = () => {
  const { lang } = useGlobal();
  const [activeCategory, setActiveCategory] = useState("All");
  const [projects, setProjects] = useState(projectsData);
  const [categories, setCategories] = useState(projectCategories);
  const sectionRef = useRef(null);
  const workTextRef = useRef(null);

  useEffect(() => {
    if (!sectionRef.current || !workTextRef.current) return;
    const ctx = gsap.context(() => {
      gsap.to(workTextRef.current, {
        xPercent: -20,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    supabase
      .from("projects")
      .select("*")
      .order("id", { ascending: false })
      .then(({ data, error }) => {
        if (!error && Array.isArray(data) && data.length > 0) {
          setProjects(data);
          const uniqueCats = Array.from(new Set(data.map((p) => p.category).filter(Boolean)));
          setCategories(["All", ...uniqueCats]);
        }
      })
      .catch((err) => {
        console.error("Failed to fetch projects from Supabase:", err);
      });
  }, []);

  const filteredProjects =
    activeCategory === "All"
      ? projects
      : projects.filter((item) => item.category === activeCategory);

  return (
    <section ref={sectionRef} className="py-16 md:py-24 bg-slate-50 dark:bg-slate-900 relative overflow-hidden">

      <div className="hidden md:block absolute inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] dark:bg-[radial-gradient(#333_1px,transparent_1px)] [background-size:20px_20px] opacity-40 pointer-events-none" />

      <div 
        ref={workTextRef}
        className="hidden md:block absolute top-10 right-[-5%] text-[5rem] md:text-[10rem] lg:text-[15rem] font-black text-slate-200 dark:text-slate-200/5 opacity-50 select-none pointer-events-none z-0 whitespace-nowrap will-change-transform"
      >
        WORK
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div 
          data-aos="fade-up"
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="p-2.5 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 shadow-sm">
              <Code size={20} />
            </div>
            <span className="text-xs font-bold uppercase tracking-widest text-slate-500">
              {lang === "id" ? "Koleksi Proyek" : "Featured Projects"}
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-4 relative inline-block z-10">
            <TextHighlighter />
            <span className="relative px-2 text-slate-900 dark:text-white">
              {lang === "id" ? "Proyek Pilihan" : "Featured Work"}
            </span>
          </h2>
          <p className="text-slate-500 max-w-xl mx-auto">
            {lang === "id"
              ? "Koleksi proyek terpilih yang memperlihatkan keahlian saya dalam menciptakan solusi aplikasi dengan kode yang terstruktur."
              : "A selection of projects that demonstrate my ability to solve complex problems with clean code."}
          </p>
        </div>

        <div data-aos="fade-up" data-aos-delay="100" className="flex flex-wrap justify-center gap-2.5 mb-12">
          {categories.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <div key={cat} className="relative group inline-block cursor-pointer">
                <ButtonRing rounded="rounded-full" />
                <button
                  onClick={() => setActiveCategory(cat)}
                  className={`relative px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-400 ease-out cursor-pointer active:scale-95 ${
                    isActive
                      ? "bg-blue-600 text-white shadow-lg shadow-blue-500/25 border border-blue-500 font-bold"
                      : "text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 bg-white dark:bg-slate-800/80 hover:bg-slate-100 dark:hover:bg-slate-700/80 border border-slate-200/80 dark:border-slate-700/80 shadow-xs hover:border-blue-500/30"
                  }`}
                >
                  <span className="relative z-10">{cat}</span>
                </button>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-20 text-slate-500">
            No projects found in this category.
          </div>
        )}
      </div>
    </section>
  );
};
