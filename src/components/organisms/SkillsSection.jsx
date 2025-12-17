import { motion } from "framer-motion";
import { skillsData } from "../../data/content";
import { SkillBar } from "../molecules/SkillBar";
import { Layout, Server, Settings, Cpu } from "lucide-react";

// Helper untuk mapping string icon ke Komponen Lucide
const iconMap = {
  Layout: Layout,
  Server: Server,
  Settings: Settings,
};

export const SkillsSection = () => {
  return (
    <section className="py-24 bg-gray-50 dark:bg-black border-t border-gray-200 dark:border-gray-900 relative">
      {/* Background Pattern (Optional) */}
      <div className="absolute inset-0 opacity-5 dark:opacity-10 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:16px_16px]" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">
            Technical <span className="text-blue-600">Proficiency</span>
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            A deep dive into the tools and technologies I use to build scalable
            products.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillsData.map((category, catIndex) => {
            const Icon = iconMap[category.icon] || Cpu;

            return (
              <motion.div
                key={catIndex}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: catIndex * 0.2, duration: 0.5 }}
                whileHover={{ y: -5 }}
                className="bg-white dark:bg-gray-900/50 backdrop-blur-sm p-8 rounded-3xl border border-gray-200 dark:border-gray-800 shadow-xl hover:shadow-2xl hover:border-blue-500/30 transition-all duration-300"
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
