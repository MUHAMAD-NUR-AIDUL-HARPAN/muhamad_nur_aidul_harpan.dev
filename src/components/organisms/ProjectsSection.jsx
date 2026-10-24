import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
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
  const sectionRef = useRef(null);

  // Parallax scroll effect untuk background text "WORK"
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const bgTextX = useTransform(scrollYProgress, [0, 1], ["5%", "-15%"]);

  // Fetch projects from Supabase
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

  // Filter Logic
  const filteredProjects =
    activeCategory === "All"
      ? projects
      : projects.filter((item) => item.category === activeCategory);

  return (
    <section ref={sectionRef} className="py-16 md:py-24 bg-slate-50 dark:bg-slate-900 relative overflow-hidden">
      {/* Background Decor (Dots pattern) */}
      <div className="absolute inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] dark:bg-[radial-gradient(#333_1px,transparent_1px)] [background-size:20px_20px] opacity-40 pointer-events-none" />

      {/* Decorative Text Background dengan Parallax Scroll */}
      <motion.div 
        style={{ x: bgTextX }}
        className="hidden md:block absolute top-10 right-[-5%] text-[5rem] md:text-[10rem] lg:text-[15rem] font-black text-slate-200 dark:text-slate-200/5 opacity-50 select-none pointer-events-none z-0 whitespace-nowrap will-change-transform transform-gpu"
      >
        WORK
      </motion.div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <motion.div 
              initial={{ scale: 0.7, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="p-2.5 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600"
            >
              <Filter size={20} />
            </motion.div>
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
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="text-slate-500 max-w-xl mx-auto"
          >
            {lang === "id"
              ? "Koleksi proyek terpilih yang memperlihatkan keahlian saya dalam menciptakan solusi aplikasi dengan kode yang terstruktur."
              : "A selection of projects that demonstrate my ability to solve complex problems with clean code."}
          </motion.p>
        </motion.div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`relative px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 
                ${
                  activeCategory === cat
                    ? "text-white"
                    : "text-slate-500 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-slate-800"
                }`}
            >
              {activeCategory === cat && (
                <motion.div
                  layoutId="activeFilter"
                  className="absolute inset-0 bg-blue-600 rounded-full"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              <span className="relative z-10">{cat}</span>
            </button>
          ))}
        </div>

        {/* Projects Grid with Animation */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-20 text-slate-500">
            No projects found in this category.
          </div>
        )}
      </div>
    </section>
  );
};
