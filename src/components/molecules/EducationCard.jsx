import { motion } from "framer-motion";
import { GraduationCap, Calendar, Award } from "lucide-react";
import { useGlobal } from "../../context/GlobalContext";

export const EducationCard = ({ item, index }) => {
  const { lang } = useGlobal();

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.2, duration: 0.5 }}
      whileHover={{ y: -5 }}
      className="group relative bg-white dark:bg-gray-900 rounded-3xl p-8 border border-gray-100 dark:border-gray-800 shadow-lg overflow-hidden"
    >
      {/* Decorative Background Blob */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 dark:bg-blue-500/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 group-hover:bg-blue-500/10 transition-colors duration-500" />

      {/* Header: Icon & Year */}
      <div className="flex justify-between items-start mb-6 relative z-10">
        <div className="p-4 bg-blue-50 dark:bg-blue-900/20 text-blue-600 rounded-2xl group-hover:scale-110 transition-transform duration-300">
          <GraduationCap size={32} />
        </div>
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-xs font-bold text-gray-500 uppercase tracking-wide">
          <Calendar size={12} />
          {item.year}
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        <h3 className="text-2xl font-bold mb-2 group-hover:text-blue-600 transition-colors">
          {lang === "id" ? item.degree.id : item.degree.en}
        </h3>
        <p className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-4">
          {item.school}
        </p>
        <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed mb-6 border-l-2 border-gray-200 dark:border-gray-700 pl-4">
          {lang === "id" ? item.desc.id : item.desc.en}
        </p>

        {/* Achievements List */}
        <div className="space-y-2">
          {item.achievements.map((ach, i) => (
            <div
              key={i}
              className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300"
            >
              <Award size={14} className="text-yellow-500" />
              <span>{ach}</span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};
