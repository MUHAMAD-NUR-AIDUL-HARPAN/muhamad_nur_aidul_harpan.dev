
import { motion } from "framer-motion";
import { Briefcase, Calendar } from "lucide-react";
import { useGlobal } from "../../context/GlobalContext";

export const ExperienceCard = ({ item, index }) => {
  const { lang } = useGlobal();
  const isEven = index % 2 === 0;

  return (
    <div
      className={`flex flex-col md:flex-row items-center justify-between gap-8 mb-12 w-full ${
        isEven ? "md:flex-row-reverse" : ""
      }`}
    >
      {/* 1. Empty Space (untuk menyeimbangkan layout zig-zag di desktop) */}
      <div className="hidden md:block w-5/12" />

      {/* 2. Center Node (Titik Tengah) */}
      <div className="absolute left-4 md:left-1/2 transform -translate-x-1/2 flex flex-col items-center h-full">
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          transition={{ duration: 0.5, type: "spring" }}
          className="w-4 h-4 bg-blue-600 rounded-full z-10 ring-4 ring-white dark:ring-[#0a0a0a] shadow-[0_0_20px_rgba(37,99,235,0.5)]"
        />
        {/* Garis vertikal tipis (penghubung) */}
        <div className="w-0.5 h-full bg-gray-200 dark:bg-gray-800 -mt-2" />
      </div>

      {/* 3. The Card Content */}
      <motion.div
        initial={{ opacity: 0, x: isEven ? -50 : 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, delay: index * 0.1 }}
        className="w-full pl-12 md:pl-0 md:w-5/12 relative"
      >
        <div className="p-6 bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-lg hover:shadow-xl hover:border-blue-500/30 transition-all duration-300 group">
          {/* Header: Role & Period */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-2">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 transition-colors">
              {lang === "id" ? item.role.id : item.role.en}
            </h3>
            <div className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-full text-gray-500">
              <Calendar size={12} />
              {item.period}
            </div>
          </div>

          {/* Company Name */}
          <div className="flex items-center gap-2 mb-4 text-blue-600 font-medium">
            <Briefcase size={16} />
            <span>{item.company}</span>
          </div>

          {/* Description */}
          <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-6">
            {lang === "id" ? item.desc.id : item.desc.en}
          </p>

          {/* Tech Stack Tags */}
          <div className="flex flex-wrap gap-2">
            {item.tech.map((tech) => (
              <span
                key={tech}
                className="text-[10px] uppercase font-bold px-2 py-1 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-300 rounded border border-blue-100 dark:border-blue-900/30"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Arrow Decoration (Segitiga kecil menunjuk ke tengah) */}
          <div
            className={`hidden md:block absolute top-8 w-4 h-4 bg-white dark:bg-gray-900 border-t border-l border-gray-100 dark:border-gray-800 rotate-45 transform ${
              isEven
                ? "-right-2 border-r-0 border-b-0"
                : "-left-2 border-t-0 border-l-0 border-r border-b"
            }`}
          />
        </div>
      </motion.div>
    </div>
  );
};
