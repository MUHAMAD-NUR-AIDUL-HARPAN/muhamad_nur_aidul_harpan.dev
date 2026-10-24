import { motion } from "framer-motion";
import { aboutData } from "../../data/content";
import { useGlobal } from "../../context/GlobalContext"; // Import context

export const StatsGrid = () => {
  const { lang } = useGlobal(); // Ambil bahasa

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
      {aboutData.stats.map((stat, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 24, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{
            duration: 0.75,
            delay: index * 0.12,
            ease: [0.22, 1, 0.36, 1],
          }}
          whileHover={{ y: -4, scale: 1.02, transition: { duration: 0.25 } }}
          className="text-center p-4 rounded-2xl bg-white dark:bg-white/5 border border-slate-100 dark:border-white/10 shadow-sm hover:shadow-md transition-all cursor-default"
        >
          <div className="text-3xl font-black text-blue-600 dark:text-blue-400 mb-1">
            {stat.value}
          </div>
          {/* LOGIC BARU: Pilih label berdasarkan bahasa */}
          <div className="text-sm text-slate-500 dark:text-slate-400 font-medium uppercase tracking-wide">
            {lang === "id" ? stat.label.id : stat.label.en}
          </div>
        </motion.div>
      ))}
    </div>
  );
};
