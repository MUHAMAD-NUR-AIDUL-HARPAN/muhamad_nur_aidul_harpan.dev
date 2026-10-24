import { motion } from "framer-motion";

/**
 * TextHighlighter
 * Komponen highlighter teks dengan animasi sapuan kuas jelas dan terarah (wipe / slide) dari kiri ke kanan saat di-scroll.
 * Terinspirasi dari gaya transisi AOS dengan kurva cubic-bezier yang menonjol dan mulus.
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
        viewport={{ once: false, amount: 0.15 }}
        transition={{
          duration: 0.95,
          ease: [0.22, 1, 0.36, 1], // Smooth exponential deceleration
          delay: 0.1,
        }}
        className="absolute inset-0 bg-blue-200 dark:bg-blue-800/50 origin-left shadow-sm block will-change-transform transform-gpu"
      >
        {/* Dynamic Sheen / Gloss Gradient */}
        <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 dark:via-blue-300/25 to-blue-400/30 pointer-events-none" />

        {/* Crisp Leading Edge Highlighter Marker & Glow */}
        <span className="absolute right-0 top-0 bottom-0 w-[3px] bg-blue-500 dark:bg-blue-400 shadow-[0_0_12px_rgba(59,130,246,1)]" />
      </motion.span>
    </span>
  );
};

export default TextHighlighter;
