import { useGlobal } from "../../context/GlobalContext";
import { aboutData, skills } from "../../data/content";
import { StatsGrid } from "../molecules/StatsGrid";
import { TechTag } from "../atoms/TechTag";
import { TextHighlighter } from "../atoms/TextHighlighter";
import { User, Code } from "lucide-react";

export const AboutSection = () => {
  const { lang } = useGlobal();
  const t = aboutData;

  return (
    <section className="py-24 bg-slate-50 dark:bg-slate-900 relative overflow-hidden">
      {/* Pattern titik-titik halus */}
      <div className="absolute inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] dark:bg-[radial-gradient(#333_1px,transparent_1px)] [background-size:20px_20px] opacity-40 pointer-events-none" />

      {/* Decorative Text Background */}
      <div 
        className="hidden md:block absolute top-10 right-[-10%] text-[5rem] md:text-[10rem] lg:text-[15rem] font-black text-slate-200 dark:text-slate-200/5 opacity-50 select-none pointer-events-none z-0 whitespace-nowrap"
      >
        ABOUT ME
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* LEFT COLUMN: Narrative & Stats (AOS Fade Up) */}
          <div
            data-aos="fade-up"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 shadow-sm">
                <User size={24} />
              </div>
              <h2 className="text-4xl md:text-5xl font-black tracking-tight relative inline-block z-10">
                <TextHighlighter />
                <span className="relative px-2">
                  {lang === "id" ? t.title.id : t.title.en}
                </span>
              </h2>
            </div>

            <h3 className="text-xl font-medium text-slate-500 mb-6 border-l-4 border-blue-500 pl-4">
              {lang === "id" ? t.subtitle.id : t.subtitle.en}
            </h3>

            <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed mb-8">
              {lang === "id" ? t.bio.id : t.bio.en}
            </p>

            <StatsGrid />
          </div>

          {/* RIGHT COLUMN: Visual & Skills (AOS Fade Up Staggered) */}
          <div
            data-aos="fade-up"
            data-aos-delay="150"
            className="relative"
          >
            {/* Glassmorphic Card Container */}
            <div className="p-8 rounded-3xl bg-white/50 dark:bg-black/50 backdrop-blur-xl border border-white/20 shadow-2xl relative z-10 hover:shadow-blue-500/10 transition-all duration-300">
              <div className="flex items-center gap-3 mb-8">
                <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/30 text-blue-600">
                  <Code size={20} />
                </div>
                <h3 className="text-xl font-bold">
                  {lang === "id" ? t.techTitle.id : t.techTitle.en}
                </h3>
              </div>

              {/* Skills Grid */}
              <div className="flex flex-wrap gap-3">
                {skills.map((skill, index) => (
                  <TechTag key={skill} label={skill} index={index} />
                ))}
              </div>

              {/* Decorative Code Snippet Style */}
              <div className="mt-8 p-4 rounded-xl bg-slate-900 text-slate-300 font-mono text-xs overflow-hidden border border-slate-800 shadow-md">
                <div className="flex gap-1.5 mb-3">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                </div>
                <p>
                  <span className="text-pink-400">const</span>{" "}
                  <span className="text-blue-400">developer</span> ={" "}
                  <span className="text-yellow-300">{`{`}</span>
                </p>
                <p className="pl-4">
                  passion: <span className="text-green-400">"infinite"</span>,
                </p>
                <p className="pl-4">
                  coffeeLevel: <span className="text-blue-400">100</span>,
                </p>
                <p className="pl-4">
                  bugs: <span className="text-red-400">null</span>
                </p>
                <p>
                  <span className="text-yellow-300">{`}`}</span>;
                </p>
              </div>
            </div>

            <div className="absolute -top-10 -right-10 w-32 h-32 bg-blue-500/20 rounded-full blur-2xl -z-10" />
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-blue-500/20 rounded-full blur-2xl -z-10" />
          </div>
        </div>
      </div>
    </section>
  );
};
