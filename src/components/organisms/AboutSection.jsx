import { motion } from 'framer-motion';
import { useGlobal } from '../../context/GlobalContext';
import { aboutData, skills } from '../../data/content';
import { StatsGrid } from '../molecules/StatsGrid';
import { TechTag } from '../atoms/TechTag';
import { User, Code } from 'lucide-react';

export const AboutSection = () => {
  const { lang } = useGlobal();

  return (
    <section className="py-24 bg-gray-50 dark:bg-[#0a0a0a] relative overflow-hidden">
      
      {/* Decorative Text Background */}
      <div className="absolute top-10 right-0 text-9xl font-black text-gray-200 dark:text-white/5 opacity-50 select-none pointer-events-none">
        ABOUT
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* LEFT COLUMN: Narrative & Stats */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600">
                <User size={24} />
              </div>
              <h2 className="text-4xl font-bold tracking-tight">{aboutData.title}</h2>
            </div>
            
            <h3 className="text-xl font-medium text-gray-500 mb-6 border-l-4 border-blue-500 pl-4">
              {aboutData.subtitle}
            </h3>

            <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-8">
              {lang === 'id' ? aboutData.bio.id : aboutData.bio.en}
            </p>

            <StatsGrid />
          </motion.div>

          {/* RIGHT COLUMN: Visual & Skills */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            {/* Glassmorphic Card Container */}
            <div className="p-8 rounded-3xl bg-white/50 dark:bg-white/5 backdrop-blur-xl border border-white/20 shadow-2xl">
              <div className="flex items-center gap-3 mb-8">
                 <div className="p-2 rounded-lg bg-purple-100 dark:bg-purple-900/30 text-purple-600">
                    <Code size={20} />
                 </div>
                 <h3 className="text-xl font-bold">Technical Arsenal</h3>
              </div>

              {/* Skills Grid */}
              <div className="flex flex-wrap gap-3">
                {skills.map((skill, index) => (
                  <TechTag key={skill} label={skill} index={index} />
                ))}
              </div>

              {/* Decorative Code Snippet Style */}
              <div className="mt-8 p-4 rounded-xl bg-gray-900 text-gray-300 font-mono text-xs overflow-hidden">
                <div className="flex gap-1.5 mb-3">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                </div>
                <p><span className="text-pink-400">const</span> <span className="text-blue-400">developer</span> = <span className="text-yellow-300">{`{`}</span></p>
                <p className="pl-4">passion: <span className="text-green-400">"infinite"</span>,</p>
                <p className="pl-4">coffeeLevel: <span className="text-purple-400">100</span>,</p>
                <p className="pl-4">bugs: <span className="text-red-400">null</span></p>
                <p><span className="text-yellow-300">{`}`}</span>;</p>
              </div>
            </div>

            {/* Floating Elements Animation behind card */}
            <motion.div 
              animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
              transition={{ repeat: Infinity, duration: 8 }}
              className="absolute -top-10 -right-10 w-32 h-32 bg-blue-500/20 rounded-full blur-2xl -z-10" 
            />
             <motion.div 
              animate={{ y: [0, 20, 0], rotate: [0, -5, 0] }}
              transition={{ repeat: Infinity, duration: 6 }}
              className="absolute -bottom-10 -left-10 w-40 h-40 bg-purple-500/20 rounded-full blur-2xl -z-10" 
            />
          </motion.div>

        </div>
      </div>
    </section>
  );
};