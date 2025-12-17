import { motion } from "framer-motion";
import { educationData } from "../../data/content";
import { EducationCard } from "../molecules/EducationCard";
import { useGlobal } from "../../context/GlobalContext";

export const EducationSection = () => {
  const { lang } = useGlobal();

  return (
    <section className="py-24 bg-gray-50 dark:bg-black relative">
      <div className="max-w-7xl mx-auto px-6">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6"
        >
          <div>
            <h2 className="text-4xl font-black mb-4">
              {lang === "id" ? "Latar" : "Academic"}{" "}
              <span className="text-blue-600">
                {lang === "id" ? "Pendidikan" : "Background"}
              </span>
            </h2>
            <p className="text-gray-500 max-w-md">
              {lang === "id"
                ? "Fondasi akademis yang membentuk pemahaman teknis saya."
                : "The academic foundation that shaped my technical understanding."}
            </p>
          </div>

          {/* Decorative Line */}
          <div className="hidden md:block h-px flex-1 bg-gray-200 dark:bg-gray-800 mx-8 mb-4" />
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
