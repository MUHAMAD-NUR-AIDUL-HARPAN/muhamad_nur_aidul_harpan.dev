import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const loadingTexts = [
  "INITIALIZING...",
  "SYNCING DATA...",
  "OPTIMIZING...",
  "READY.",
];

export const Preloader = ({ onComplete }) => {
  const [textIndex, setTextIndex] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  // 1. Logic Timer
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsFinished(true);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  // 2. Logic Ganti Teks
  useEffect(() => {
    const textInterval = setInterval(() => {
      setTextIndex((prev) => {
        if (prev === loadingTexts.length - 1) return prev;
        return prev + 1;
      });
    }, 600);
    return () => clearInterval(textInterval);
  }, []);

  // 3. Trigger Selesai
  useEffect(() => {
    if (isFinished) {
      setTimeout(() => {
        onComplete();
      }, 1200);
    }
  }, [isFinished, onComplete]);

  // --- VARIANTS ---
  const contentVariants = {
    initial: { opacity: 1 },
    exit: {
      opacity: 0,
      scale: 0.8,
      filter: "blur(10px)",
      transition: { duration: 0.5 },
    },
  };

  const blindsContainerVariants = {
    initial: {},
    exit: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const blindVariants = {
    initial: { scaleY: 1, transformOrigin: "top" },
    exit: {
      scaleY: 0,
      transition: {
        duration: 0.8,
        ease: [0.76, 0, 0.24, 1],
      },
    },
  };

  return (
    <div className="fixed inset-0 z-[9999] pointer-events-none flex items-center justify-center bg-transparent overflow-hidden">
      {/* --- 1. CONTENT LAYER (VISUAL ANIMATION) --- */}
      <AnimatePresence>
        {!isFinished && (
          <motion.div
            className="absolute z-30 flex flex-col items-center justify-center text-white w-full h-full"
            variants={contentVariants}
            initial="initial"
            exit="exit"
          >
            {/* --- TAMBAHAN 1: CORNER HUD ELEMENTS (Teks Pojok) --- */}
            <div className="absolute top-8 left-8 md:top-12 md:left-12 flex flex-col items-start gap-1">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "40px" }}
                transition={{ duration: 1 }}
                className="h-[2px] bg-blue-500 mb-2"
              />
              <span className="text-[10px] font-mono text-gray-500 tracking-widest">
                SYS_BOOT.V4
              </span>
              <span className="text-[10px] font-mono text-gray-400 tracking-widest">
                ID: USER-01
              </span>
            </div>

            <div className="absolute bottom-8 right-8 md:bottom-12 md:right-12 flex flex-col items-end gap-1">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "40px" }}
                transition={{ duration: 1 }}
                className="h-[2px] bg-blue-500 mb-2"
              />
              <span className="text-[10px] font-mono text-gray-500 tracking-widest">
                MEM_CHECK: OK
              </span>
              <span className="text-[10px] font-mono text-gray-400 tracking-widest animate-pulse">
                CONNECTED
              </span>
            </div>

            {/* --- VISUAL CORE (CENTER) --- */}
            <div className="relative w-32 h-32 mb-8 flex items-center justify-center">
              {/* TAMBAHAN 2: RADAR ECHO (Cincin membesar hilang) */}
              <motion.div
                className="absolute inset-0 border border-blue-500/30 rounded-full"
                animate={{ scale: [1, 1.8], opacity: [0.5, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
              />

              {/* Outer Ring (Berputar) */}
              <motion.div
                className="absolute inset-0 border-2 border-gray-800 rounded-full border-t-blue-500 border-r-blue-500"
                animate={{ rotate: 360 }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
              />

              {/* Inner Circle (Berdenyut) */}
              <motion.div
                className="w-12 h-12 bg-white rounded-full shadow-[0_0_30px_rgba(59,130,246,0.6)] relative z-10"
                animate={{ scale: [1, 1.2, 1], opacity: [0.8, 1, 0.8] }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </div>

            {/* Progress Bar Line */}
            <div className="w-48 h-1 bg-gray-800 rounded-full overflow-hidden relative mb-4">
              <motion.div
                className="absolute top-0 left-0 h-full bg-blue-500 w-1/3 rounded-full"
                animate={{ x: ["-100%", "300%"] }}
                transition={{
                  duration: 1.2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </div>

            {/* Minimalist Text */}
            <div className="h-6 overflow-hidden flex flex-col items-center">
              <motion.p
                key={textIndex}
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -10, opacity: 0 }}
                className="text-xs font-mono text-gray-500 tracking-[0.4em]"
              >
                {loadingTexts[textIndex]}
              </motion.p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- TAMBAHAN 3: SCANLINE EFFECT (Garis Scan Bergerak Turun) --- */}
      {/* Efek ini hanya muncul saat belum finished */}
      {!isFinished && (
        <motion.div
          className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-blue-500/20 to-transparent z-20 pointer-events-none"
          animate={{ top: ["0%", "100%"] }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        />
      )}

      {/* --- 2. BLINDS LAYER (TIRAI BACKGROUND) --- */}
      <motion.div
        className="absolute inset-0 z-10 flex w-full h-full"
        variants={blindsContainerVariants}
        initial="initial"
        animate={isFinished ? "exit" : "initial"}
      >
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            variants={blindVariants}
            className="relative w-1/5 h-full bg-black border-r border-gray-900/10 last:border-r-0"
          >
            {/* Grid Pattern Background */}
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:20px_20px]" />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};
