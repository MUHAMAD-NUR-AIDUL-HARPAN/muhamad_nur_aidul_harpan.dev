export const TechTag = ({ label, index = 0 }) => {
  return (
    <div
      data-aos="fade-up"
      data-aos-delay={index * 50}
      className="px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-lg text-sm font-semibold border border-slate-200 dark:border-slate-700 cursor-default transition-all duration-300 hover:scale-105 hover:rotate-1 hover:bg-blue-600 hover:text-white hover:border-transparent select-none"
    >
      {label}
    </div>
  );
};
