import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export const Preloader = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  // Loading Progress Cepat & Responsif
  useEffect(() => {
    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += Math.floor(Math.random() * 8) + 5;
      
      if (currentProgress >= 100) {
        setProgress(100);
        clearInterval(interval);
        setTimeout(() => setIsFinished(true), 120); 
      } else {
        setProgress(currentProgress);
      }
    }, 18);

    return () => clearInterval(interval);
  }, []);

  // Trigger Selesai
  useEffect(() => {
    if (isFinished) {
      const timer = setTimeout(() => {
        onComplete();
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isFinished, onComplete]);

  const overlayVariants = {
    initial: { opacity: 1 },
    exit: { 
      opacity: 0, 
      transition: { duration: 0.5, ease: "easeOut" } 
    }
  };

  const textExitVariants = {
    initial: { opacity: 1, scale: 1 },
    exit: { 
      opacity: 0, 
      scale: 0.98,
      transition: { duration: 0.4, ease: "easeOut" } 
    }
  };

  return (
    <motion.div
      variants={overlayVariants}
      initial="initial"
      animate={isFinished ? "exit" : "initial"}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-900 overflow-hidden pointer-events-none"
    >
      <AnimatePresence>
        {!isFinished && (
          <motion.div
            variants={textExitVariants}
            initial="initial"
            exit="exit"
            className="relative flex flex-col items-center justify-center w-full px-4"
          >
            {/* Teks Pengisi */}
            <div className="relative text-[5vw] sm:text-[3vw] md:text-3xl lg:text-4xl font-black tracking-[0.15em] uppercase whitespace-nowrap mb-6">
              {/* Layer Bawah: Teks Pudar */}
              <div className="text-slate-200 dark:text-slate-800">
                MUHAMAD NUR AIDUL HARPAN
              </div>
              
              {/* Layer Atas: Teks Solid */}
              <motion.div 
                className="absolute top-0 left-0 overflow-hidden text-slate-900 dark:text-slate-100 whitespace-nowrap"
                initial={{ width: "0%" }}
                animate={{ width: `${progress}%` }}
                transition={{ ease: "easeOut", duration: 0.1 }}
              >
                MUHAMAD NUR AIDUL HARPAN
              </motion.div>
            </div>

            {/* Indikator Angka */}
            <div className="flex items-center gap-4 text-xs font-mono text-slate-400 dark:text-slate-500 tracking-widest">
              <span>LOADING</span>
              <div className="w-12 h-[1px] bg-slate-300 dark:bg-slate-700" />
              <span className="w-8 text-right font-bold text-slate-800 dark:text-slate-200">
                {progress}%
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
