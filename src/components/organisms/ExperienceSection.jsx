import { motion } from "framer-motion";
import { experienceData } from "../../data/content";
import { ExperienceCard } from "../molecules/ExperienceCard";
import { useGlobal } from "../../context/GlobalContext";

export const ExperienceSection = () => {
  const { lang } = useGlobal();

  return (
    <section className="py-24 bg-gray-50 dark:bg-[#0a0a0a] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-black mb-4">
            {lang === "id" ? "Pengalaman" : "Work"}{" "}
            <span className="text-blue-600">
              {lang === "id" ? "Kerja" : "Experience"}
            </span>
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            {lang === "id"
              ? "Perjalanan karir saya dalam membangun produk digital berkualitas."
              : "My professional journey in building high-quality digital products."}
          </p>
        </motion.div>

        {/* Timeline Container */}
        <div className="relative">
          {/* Vertical Line Background (Garis Abu-abu panjang di tengah) */}
          <div className="absolute left-4 md:left-1/2 transform -translate-x-1/2 top-0 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-800/50" />

          {/* Render Experience Cards */}
          {experienceData.map((item, index) => (
            <ExperienceCard key={item.id} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};
