import { motion } from "framer-motion";

export const SkillBar = ({ name, level, index }) => {
  return (
    <div className="mb-4 last:mb-0">
      <div className="flex justify-between items-end mb-1">
        <span className="font-medium text-gray-700 dark:text-gray-200 text-sm">
          {name}
        </span>
        <span className="text-xs font-bold text-gray-500 dark:text-gray-400">
          {level}%
        </span>
      </div>

      {/* Background Bar */}
      <div className="h-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
        {/* Animated Foreground Bar */}
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          transition={{ duration: 1, delay: index * 0.1, ease: "easeOut" }}
          viewport={{ once: true }}
          className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full relative"
        >
          {/* Shimmer Effect (Kilau Putih Berjalan) */}
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full animate-[shimmer_2s_infinite]" />
        </motion.div>
      </div>
    </div>
  );
};
