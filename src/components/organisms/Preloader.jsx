import { useState, useEffect, useRef } from "react";
import gsap from "gsap";

export const Preloader = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const containerRef = useRef(null);
  const contentRef = useRef(null);

  // Loading Progress Cepat & Responsif
  useEffect(() => {
    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += Math.floor(Math.random() * 8) + 5;
      
      if (currentProgress >= 100) {
        setProgress(100);
        clearInterval(interval);
        
        // Animasi keluar mulus via GSAP
        setTimeout(() => {
          const tl = gsap.timeline({
            onComplete: () => {
              onComplete();
            },
          });

          tl.to(contentRef.current, {
            opacity: 0,
            scale: 0.98,
            duration: 0.35,
            ease: "power2.out",
          }).to(
            containerRef.current,
            {
              opacity: 0,
              duration: 0.45,
              ease: "power2.inOut",
            },
            "-=0.1"
          );
        }, 120);
      } else {
        setProgress(currentProgress);
      }
    }, 18);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-900 overflow-hidden pointer-events-none will-change-transform transform-gpu"
    >
      <div
        ref={contentRef}
        className="relative flex flex-col items-center justify-center w-full px-4"
      >
        {/* Teks Pengisi */}
        <div className="relative text-[5vw] sm:text-[3vw] md:text-3xl lg:text-4xl font-black tracking-[0.15em] uppercase whitespace-nowrap mb-6">
          {/* Layer Bawah: Teks Pudar */}
          <div className="text-slate-200 dark:text-slate-800">
            MUHAMAD NUR AIDUL HARPAN
          </div>
          
          {/* Layer Atas: Teks Solid */}
          <div 
            className="absolute top-0 left-0 overflow-hidden text-slate-900 dark:text-slate-100 whitespace-nowrap transition-all duration-100 ease-out"
            style={{ width: `${progress}%` }}
          >
            MUHAMAD NUR AIDUL HARPAN
          </div>
        </div>

        {/* Indikator Angka */}
        <div className="flex items-center gap-4 text-xs font-mono text-slate-400 dark:text-slate-500 tracking-widest">
          <span>LOADING</span>
          <div className="w-12 h-[1px] bg-slate-300 dark:bg-slate-700" />
          <span className="w-8 text-right font-bold text-slate-800 dark:text-slate-200">
            {progress}%
          </span>
        </div>
      </div>
    </div>
  );
};
