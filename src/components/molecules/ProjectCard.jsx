import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";

export const ProjectCard = ({ project, index = 0 }) => {
  const getImageUrl = (imagePath) => {
    if (!imagePath) return '';
    if (imagePath.startsWith('/uploads/')) {
      const fileName = imagePath.replace('/uploads/', '');
      return `https://ugbwpgalnyazmbmntxhi.supabase.co/storage/v1/object/public/portfolio/${fileName}`;
    }
    return imagePath;
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 60, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ 
        duration: 0.85, 
        delay: (index % 3) * 0.15, 
        ease: [0.22, 1, 0.36, 1] 
      }}
      whileHover={{ y: -8, transition: { duration: 0.25, ease: "easeOut" } }}
      className="group relative rounded-2xl overflow-hidden bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-lg hover:shadow-2xl hover:border-blue-500/40 transition-all duration-300 flex flex-col justify-between"
    >
      {/* IMAGE */}
      <div className="h-60 scale-[1.03] overflow-hidden relative">
        <img
          src={getImageUrl(project.image)}
          alt={project.title}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500 ease-out"
        />

        {/* OVERLAY */}
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noreferrer"
              className="p-3 bg-white/90 text-slate-900 rounded-full hover:bg-white hover:scale-110 transition-all shadow-xl"
              title="Source Code"
            >
              <Github size={20} />
            </a>
          )}

          {project.link && (
            <a
              href={project.link}
              target="_blank"
              rel="noreferrer"
              className="p-3 bg-blue-600/90 text-white rounded-full hover:bg-blue-600 hover:scale-110 transition-all shadow-xl"
              title="Live Demo"
            >
              <ExternalLink size={20} />
            </a>
          )}
        </div>
      </div>

      {/* CONTENT */}
      <div className="p-6 flex-1 flex flex-col justify-between">
        <div>
          <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest bg-blue-50 dark:bg-blue-900/20 px-3 py-1 rounded-full">
            {project.category}
          </span>

          <h3 className="text-xl font-bold mt-4 mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
            {project.title}
          </h3>

          <p className="text-slate-600 dark:text-slate-400 text-sm mb-6 line-clamp-2 leading-relaxed">
            {project.desc}
          </p>
        </div>

        <div>
          {/* TECH STACK */}
          <div className="flex flex-wrap gap-2 mb-6">
            {(Array.isArray(project.tech) ? project.tech : (project.tech ? project.tech.split(',').map(t => t.trim()) : [])).map((t) => (
              <span
                key={t}
                className="text-xs font-medium px-2.5 py-1 bg-slate-100 dark:bg-slate-800 rounded-md text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700"
              >
                {t}
              </span>
            ))}
          </div>

          {/* ACTIONS (TEXT LINK) */}
          <div className="flex items-center gap-4 pt-4 border-t border-slate-100 dark:border-slate-800">
            {project.link ? (
              <a
                href={project.link}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 text-sm font-bold text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                <ExternalLink size={16} />
                Live Demo
              </a>
            ) : (
              <span className="text-sm text-slate-400 flex items-center gap-2">
                <ExternalLink size={16} /> Live Demo
              </span>
            )}

            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noreferrer"
                className="ml-auto flex items-center gap-2 text-sm font-bold text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors"
              >
                <Github size={16} />
                Source
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};
