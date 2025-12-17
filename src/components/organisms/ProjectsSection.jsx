import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { projectsData, projectCategories } from "../../data/content";
import { ProjectCard } from "../molecules/ProjectCard";

export const ProjectsSection = () => {
  const [activeCategory, setActiveCategory] = useState("All");

  // Filter Logic
  const filteredProjects =
    activeCategory === "All"
      ? projectsData
      : projectsData.filter((item) => item.category === activeCategory);

  return (
    <section className="py-24 bg-white dark:bg-[#050505]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black mb-4">
            Featured <span className="text-blue-600">Work</span>
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            A selection of projects that demonstrate my ability to solve complex
            problems with clean code.
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {projectCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`relative px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 
                ${
                  activeCategory === cat
                    ? "text-white"
                    : "text-gray-500 hover:text-gray-900 dark:hover:text-white bg-gray-100 dark:bg-gray-800"
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
            {filteredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-20 text-gray-500">
            No projects found in this category.
          </div>
        )}
      </div>
    </section>
  );
};
