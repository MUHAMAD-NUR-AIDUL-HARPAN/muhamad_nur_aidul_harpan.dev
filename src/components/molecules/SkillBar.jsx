import { motion } from "framer-motion";
import {
  SiHtml5,
  SiCss3,
  SiTailwindcss,
  SiJavascript,
  SiReact,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiPostgresql,
  SiGit,
  SiFigma,
} from "react-icons/si";
import { TbBrandVscode, TbBrandOffice } from "react-icons/tb";
import { Code } from "lucide-react";

// Mapping Icon Brand
const iconMap = {
  html: { icon: SiHtml5, color: "#E34F26" },
  css: { icon: SiCss3, color: "#1572B6" },
  tailwind: { icon: SiTailwindcss, color: "#38B2AC" },
  js: { icon: SiJavascript, color: "#F7DF1E" },
  react: { icon: SiReact, color: "#61DAFB" },
  node: { icon: SiNodedotjs, color: "#339933" },
  express: { icon: SiExpress, color: "#64748B" },
  mongo: { icon: SiMongodb, color: "#47A248" },
  postgres: { icon: SiPostgresql, color: "#336791" },
  git: { icon: SiGit, color: "#F05032" },
  vscode: { icon: TbBrandVscode, color: "#007ACC" },
  figma: { icon: SiFigma, color: "#F24E1E" },
  office: { icon: TbBrandOffice, color: "#EA580C" },
};

export const SkillBar = ({ name, level, iconKey, color, index }) => {
  const iconData = iconMap[iconKey] || { icon: Code, color: color || "#3B82F6" };
  const IconComponent = iconData.icon;
  const brandColor = color || iconData.color;

  return (
    <div className="mb-4 last:mb-0 group/skill">
      <div className="flex justify-between items-center mb-1.5">
        <div className="flex items-center gap-2">
          {/* Logo Badge Icon */}
          <div
            className="w-6 h-6 rounded-md flex items-center justify-center p-1 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700/80 group-hover/skill:scale-110 transition-transform duration-300 shadow-xs"
            style={{ color: brandColor }}
          >
            <IconComponent size={14} />
          </div>
          <span className="font-medium text-slate-800 dark:text-slate-200 text-sm group-hover/skill:text-blue-600 dark:group-hover/skill:text-blue-400 transition-colors">
            {name}
          </span>
        </div>
        <span className="text-xs font-mono font-bold text-slate-500 dark:text-slate-400">
          {level}%
        </span>
      </div>

      {/* Background Bar */}
      <div className="h-2 w-full bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
        {/* Animated Foreground Bar */}
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          transition={{ duration: 1, delay: index * 0.1, ease: "easeOut" }}
          viewport={{ once: true }}
          className="h-full bg-gradient-to-r from-blue-600 to-indigo-500 dark:from-blue-500 dark:to-indigo-400 rounded-full relative"
        >
          {/* Shimmer Effect (Kilau Putih Berjalan) */}
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full animate-[shimmer_2s_infinite]" />
        </motion.div>
      </div>
    </div>
  );
};
