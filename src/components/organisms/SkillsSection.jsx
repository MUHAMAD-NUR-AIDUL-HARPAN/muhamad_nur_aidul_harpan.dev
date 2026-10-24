import { motion } from "framer-motion";
import { skillsData } from "../../data/content";
import { SkillBar } from "../molecules/SkillBar";
import { Layout, Server, Settings, Cpu, Layers } from "lucide-react";
import { useGlobal } from "../../context/GlobalContext";
import { TextHighlighter } from "../atoms/TextHighlighter";

// Helper untuk mapping string icon ke Komponen Lucide
const iconMap = {
  Layout: Layout,
  Server: Server,
  Settings: Settings,
};

export const SkillsSection = () => {
  const { lang } = useGlobal();

  return (
    <section className="py-16 md:py-24 bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-900 relative overflow-hidden">
      {/* Background Decor (Dots pattern) */}
      <div className="absolute inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] dark:bg-[radial-gradient(#333_1px,transparent_1px)] [background-size:20px_20px] opacity-40 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="p-2.5 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600"
            >
              <Layers size={20} />
            </motion.div>
            <span className="text-xs font-bold uppercase tracking-widest text-slate-500">
              {lang === "id" ? "Keahlian Teknis" : "Skillset & Tools"}
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-4 relative inline-block z-10">
            <TextHighlighter />
            <span className="relative px-2 text-slate-900 dark:text-white">
              {lang === "id" ? "Kemampuan Teknis" : "Technical Proficiency"}
            </span>
          </h2>
          <p className="text-slate-500 max-w-xl mx-auto">
            {lang === "id"
              ? "Teknologi dan perangkat modern yang saya gunakan untuk membangun sistem handal dan terukur."
              : "A deep dive into the tools and modern technologies I use to build scalable products."}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillsData.map((category, catIndex) => {
            const Icon = iconMap[category.icon] || Cpu;

            return (
              <motion.div
                key={catIndex}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ delay: catIndex * 0.15, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -5 }}
                className="bg-white dark:bg-slate-900/50 backdrop-blur-sm p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl hover:shadow-2xl hover:border-blue-500/30 transition-all duration-300"
              >
                {/* Header Icon */}
                <div className="flex items-center gap-4 mb-8">
                  <div className="p-3 rounded-2xl bg-blue-100 dark:bg-blue-900/30 text-blue-600">
                    <Icon size={28} />
                  </div>
                  <h3 className="text-2xl font-bold">{category.category}</h3>
                </div>

                {/* List Skills */}
                <div className="space-y-6">
                  {category.skills.map((skill, skillIndex) => (
                    <SkillBar
                      key={skillIndex}
                      name={skill.name}
                      level={skill.level}
                      iconKey={skill.iconKey}
                      color={skill.color}
                      index={skillIndex}
                    />
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
