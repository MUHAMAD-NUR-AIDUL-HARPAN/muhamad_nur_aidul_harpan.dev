import { useState, useEffect } from "react";
import { useGlobal } from "../../context/GlobalContext";
import { projectsData, projectCategories } from "../../data/content";
import { ProjectCard } from "../molecules/ProjectCard";
import { TextHighlighter } from "../atoms/TextHighlighter";
import { Filter } from "lucide-react";
import { supabase } from "../../lib/supabaseClient";

export const ProjectsSection = () => {
  const { lang } = useGlobal();
  const [activeCategory, setActiveCategory] = useState("All");
  const [projects, setProjects] = useState(projectsData);
  const [categories, setCategories] = useState(projectCategories);

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
    <section className="py-16 md:py-24 bg-slate-50 dark:bg-slate-900 relative overflow-hidden">

      <div className="hidden md:block absolute inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] dark:bg-[radial-gradient(#333_1px,transparent_1px)] [background-size:20px_20px] opacity-40 pointer-events-none" />

      <div 
        className="hidden md:block absolute top-10 right-[-5%] text-[5rem] md:text-[10rem] lg:text-[15rem] font-black text-slate-200 dark:text-slate-200/5 opacity-50 select-none pointer-events-none z-0 whitespace-nowrap"
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
              <Filter size={20} />
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

        <div data-aos="fade-up" data-aos-delay="100" className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`relative px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 cursor-pointer ${
                  isActive
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-500/25 scale-105"
                    : "text-slate-500 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-slate-800"
                }`}
              >
                <span className="relative z-10">{cat}</span>
              </button>
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
