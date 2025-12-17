import { motion } from "framer-motion";
import { aboutData } from "../../data/content";

export const StatsGrid = () => {
  return (
    <div className="grid grid-cols-2 gap-4 mt-8">
      {aboutData.stats.map((stat, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 + i * 0.1 }}
          className="p-4 rounded-2xl bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10 shadow-sm text-center hover:bg-blue-50 dark:hover:bg-white/10 transition-colors"
        >
          <h4 className="text-3xl font-bold text-blue-600 dark:text-blue-400">
            {stat.value}
          </h4>
          <p className="text-xs text-gray-500 uppercase tracking-wider font-medium mt-1">
            {stat.label}
          </p>
        </motion.div>
      ))}
    </div>
  );
};
