import { aboutData } from "../../data/content";
import { useGlobal } from "../../context/GlobalContext";

export const StatsGrid = () => {
  const { lang } = useGlobal();

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
      {aboutData.stats.map((stat, index) => (
        <div
          key={index}
          data-aos="fade-up"
          data-aos-delay={index * 100}
          className="text-center p-4 rounded-2xl bg-white dark:bg-white/5 border border-slate-100 dark:border-white/10 shadow-sm hover:shadow-xl hover:border-blue-500/30 hover:-translate-y-1 transition-all duration-300 cursor-default"
        >
          <div className="text-3xl font-black text-blue-600 dark:text-blue-400 mb-1">
            {stat.value}
          </div>
          <div className="text-sm text-slate-500 dark:text-slate-400 font-medium uppercase tracking-wide">
            {lang === "id" ? stat.label.id : stat.label.en}
          </div>
        </div>
      ))}
    </div>
  );
};
