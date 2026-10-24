import { motion } from "framer-motion";
import { educationData } from "../../data/content";
import { EducationCard } from "../molecules/EducationCard";
import { useGlobal } from "../../context/GlobalContext";
import { GraduationCap } from "lucide-react";

export const EducationSection = () => {
  const { lang } = useGlobal();

  return (
    <section className="py-24 bg-slate-50 dark:bg-slate-900 relative overflow-hidden">
      {/* Background Decor (Dots pattern) */}
      <div className="absolute inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] dark:bg-[radial-gradient(#333_1px,transparent_1px)] [background-size:20px_20px] opacity-40 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6"
        >
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="p-2.5 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600">
                <GraduationCap size={20} />
              </div>
              <span className="text-xs font-bold uppercase tracking-widest text-slate-500">
                {lang === "id" ? "Pendidikan Formal" : "Education"}
              </span>
            </div>

            <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-4 relative inline-block z-10">
              <span className="absolute inset-0 bg-blue-200 dark:bg-blue-800/50 transform -skew-x-6 rounded-sm -z-10 shadow-sm"></span>
              <span className="relative px-2 text-slate-900 dark:text-white">
                {lang === "id" ? "Latar Pendidikan" : "Academic Background"}
              </span>
            </h2>
            <p className="text-gray-500 max-w-md">
              {lang === "id"
                ? "Fondasi akademis yang membentuk pemahaman teknis saya."
                : "The academic foundation that shaped my technical understanding."}
            </p>
          </div>

          {/* Decorative Line */}
          <div className="hidden md:block h-px flex-1 bg-slate-200 dark:bg-slate-800 mx-8 mb-4" />
        </motion.div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {educationData.map((item, index) => (
            <EducationCard key={item.id} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};
