import { motion } from "framer-motion";

/**
 * TextHighlighter
 * Komponen highlighter teks dengan animasi sapuan halus (wipe / slide) dari kiri ke kanan saat di-scroll.
 * Dirancang dengan durasi terukur dan kurva cubic-bezier yang sangat mulus (tidak terlalu cepat, tetap fluid).
 */
export const TextHighlighter = ({ className = "" }) => {
  return (
    <span
      aria-hidden="true"
      className={`absolute inset-0 transform -skew-x-6 rounded-sm -z-10 overflow-hidden pointer-events-none select-none ${className}`}
    >
      <motion.span
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: false, amount: 0.3 }}
        transition={{
          duration: 1.1,
          ease: [0.22, 1, 0.36, 1], // Smooth, natural, and continuous deceleration
          delay: 0.15,
        }}
        className="absolute inset-0 bg-blue-200 dark:bg-blue-800/50 origin-left shadow-sm block will-change-transform transform-gpu"
      >
        {/* Soft dynamic sheen gradient */}
        <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/35 dark:via-blue-300/20 to-blue-400/25 pointer-events-none" />

        {/* Crisp leading edge highlight stroke & glow */}
        <span className="absolute right-0 top-0 bottom-0 w-[2.5px] bg-blue-500 dark:bg-blue-400 shadow-[0_0_8px_rgba(59,130,246,0.9)]" />
      </motion.span>
    </span>
  );
};

export default TextHighlighter;
