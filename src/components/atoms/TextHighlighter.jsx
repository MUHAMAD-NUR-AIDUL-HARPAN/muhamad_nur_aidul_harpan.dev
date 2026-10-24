import { motion } from "framer-motion";

/**
 * TextHighlighter
 * Komponen highlighter teks dengan animasi sapuan kuas halus (wipe / slide) dari kiri ke kanan.
 * Menggunakan `once: true` dan origin-left eksplisit agar tidak pernah berkedip (ngedip) saat scroll.
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
        viewport={{ once: true, amount: 0.1 }}
        transition={{
          duration: 0.85,
          ease: [0.16, 1, 0.3, 1], // Smooth and snappy exponential deceleration
          delay: 0.1,
        }}
        style={{ transformOrigin: "left center" }}
        className="absolute inset-0 bg-blue-200 dark:bg-blue-800/50 shadow-sm block will-change-transform transform-gpu"
      >
        {/* Dynamic Sheen / Gloss Gradient */}
        <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 dark:via-blue-300/25 to-blue-400/30 pointer-events-none" />

        {/* Crisp Leading Edge Highlighter Marker & Glow */}
        <span className="absolute right-0 top-0 bottom-0 w-[3px] bg-blue-500 dark:bg-blue-400 shadow-[0_0_10px_#3b82f6]" />
      </motion.span>
    </span>
  );
};

export default TextHighlighter;
