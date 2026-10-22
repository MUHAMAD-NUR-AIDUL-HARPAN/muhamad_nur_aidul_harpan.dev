import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export const Preloader = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  // Loading Progress
  useEffect(() => {
    let currentProgress = 0;
    const interval = setInterval(() => {
      // Kecepatan loading bervariasi agar terasa lebih nyata
      currentProgress += Math.floor(Math.random() * 5) + 1;
      
      if (currentProgress >= 100) {
        setProgress(100);
        clearInterval(interval);
        // Tahan lebih lama di 100% sebelum memicu animasi selesai
        setTimeout(() => setIsFinished(true), 600); 
      } else {
        setProgress(currentProgress);
      }
    }, 80);

    return () => clearInterval(interval);
  }, []);

  // Trigger Selesai setelah animasi memudar beres
  useEffect(() => {
    if (isFinished) {
      setTimeout(() => {
        onComplete();
      }, 1600);
    }
  }, [isFinished, onComplete]);

  // Transisi memudar (Cross-fade) yang sangat halus dan mewah
  const overlayVariants = {
    initial: { opacity: 1 },
    exit: { 
      opacity: 0, 
      transition: { duration: 1.5, ease: "easeInOut" } 
    }
  };

  const textExitVariants = {
    initial: { opacity: 1, scale: 1 },
    exit: { 
      opacity: 0, 
      scale: 0.95,
      transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } 
    }
  };

  return (
    <motion.div
      variants={overlayVariants}
      initial="initial"
      animate={isFinished ? "exit" : "initial"}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-900 overflow-hidden"
    >
      <AnimatePresence>
        {!isFinished && (
          <motion.div
            variants={textExitVariants}
            initial="initial"
            exit="exit"
            className="relative flex flex-col items-center justify-center w-full px-4"
          >
            {/* Teks Pengisi (Text Fill Animation) */}
            <div className="relative text-[4vw] sm:text-[3vw] md:text-3xl lg:text-5xl font-black tracking-[0.15em] uppercase whitespace-nowrap mb-6">
              
              {/* Layer Bawah: Teks Pudar (Outline/Track) */}
              <div className="text-slate-200 dark:text-slate-800">
                MUHAMAD NUR AIDUL HARPAN
              </div>
              
              {/* Layer Atas: Teks Solid (Mengisi dari Kiri ke Kanan) */}
              <motion.div 
                className="absolute top-0 left-0 overflow-hidden text-slate-900 dark:text-slate-100 whitespace-nowrap"
                initial={{ width: "0%" }}
                animate={{ width: `${progress}%` }}
                transition={{ ease: "easeOut", duration: 0.3 }}
              >
                MUHAMAD NUR AIDUL HARPAN
              </motion.div>
            </div>

            {/* Indikator Angka & Elemen Minimalis */}
            <div className="flex items-center gap-4 text-xs font-mono text-slate-400 dark:text-slate-500 tracking-widest">
              <span>LOADING</span>
              <div className="w-12 h-[1px] bg-slate-300 dark:bg-slate-700" />
              <motion.span 
                className="w-8 text-right font-bold text-slate-800 dark:text-slate-200"
              >
                {progress}%
              </motion.span>
            </div>

          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
