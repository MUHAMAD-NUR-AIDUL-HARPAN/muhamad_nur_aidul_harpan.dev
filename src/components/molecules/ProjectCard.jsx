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
    <div
      data-aos="fade-up"
      data-aos-delay={(index % 3) * 100}
      className="group relative rounded-2xl overflow-hidden bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 shadow-md hover:shadow-2xl hover:shadow-blue-500/10 hover:border-blue-500/40 hover:-translate-y-2 transition-all duration-500 ease-out flex flex-col justify-between will-change-transform"
    >

      <div className="h-60 scale-[1.03] overflow-hidden relative">
        <img
          src={getImageUrl(project.image)}
          alt={project.title}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
        />

        <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noreferrer"
              className="p-3 bg-white/95 text-slate-900 rounded-full hover:bg-white hover:scale-110 hover:shadow-lg transition-all duration-300 ease-out shadow-md"
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
              className="p-3 bg-blue-600 text-white rounded-full hover:bg-blue-500 hover:scale-110 hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-300 ease-out shadow-md"
              title="Live Demo"
            >
              <ExternalLink size={20} />
            </a>
          )}
        </div>
      </div>

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

          <div className="flex items-center gap-4 pt-4 border-t border-slate-100 dark:border-slate-800">
            {project.link ? (
              <a
                href={project.link}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 text-sm font-bold text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300 ease-out"
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
                className="ml-auto flex items-center gap-2 text-sm font-bold text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors duration-300 ease-out"
              >
                <Github size={16} />
                Source
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
