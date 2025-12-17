import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";

export const ProjectCard = ({ project }) => {
  return (
    <motion.div
      layout // Magic prop dari Framer Motion untuk animasi posisi otomatis
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.5 }}
      transition={{ duration: 0.3 }}
      className="group relative rounded-2xl overflow-hidden bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-lg"
    >
      {/* Image Container */}
      <div className="h-64 overflow-hidden relative">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out"
        />

        {/* Overlay on Hover */}
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
          <button
            className="p-3 bg-white text-black rounded-full hover:scale-110 transition-transform"
            title="View Code"
          >
            <Github size={20} />
          </button>
          <button
            className="p-3 bg-blue-600 text-white rounded-full hover:scale-110 transition-transform"
            title="Live Demo"
          >
            <ExternalLink size={20} />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <span className="text-xs font-bold text-blue-500 uppercase tracking-widest">
            {project.category}
          </span>
        </div>
        <h3 className="text-xl font-bold mb-2 group-hover:text-blue-500 transition-colors">
          {project.title}
        </h3>
        <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
          {project.desc}
        </p>

        {/* Tech Stack Tags */}
        <div className="flex flex-wrap gap-2">
          {project.tech.map((t) => (
            <span
              key={t}
              className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded text-gray-500"
            >
              #{t}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};
