import { useState, useEffect, useRef } from "react";
import gsap from "gsap";

export const Preloader = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const containerRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const counter = { val: 0 };
    const tween = gsap.to(counter, {
      val: 100,
      duration: 1.6,
      ease: "power2.inOut",
      onUpdate: () => {
        setProgress(Math.floor(counter.val));
      },
      onComplete: () => {
        const tl = gsap.timeline({
          onComplete: () => {
            onComplete();
          },
        });

        tl.to(contentRef.current, {
          y: -24,
          opacity: 0,
          scale: 0.98,
          duration: 0.4,
          ease: "power3.in",
        }).to(
          containerRef.current,
          {
            yPercent: -100,
            duration: 0.75,
            ease: "power4.inOut",
          },
          "-=0.1"
        );
      },
    });

    return () => {
      tween.kill();
    };
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-slate-950 text-slate-100 overflow-hidden pointer-events-auto select-none will-change-transform transform-gpu"
    >
      <div className="absolute w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.06)_0,transparent_70%)] pointer-events-none" />

      <div
        ref={contentRef}
        className="relative z-10 flex flex-col items-center justify-center px-4 w-full"
      >
        <div className="relative text-[6vw] sm:text-[4vw] md:text-3xl lg:text-4xl font-black tracking-[0.2em] uppercase whitespace-nowrap mb-6">
          <div className="text-slate-800 select-none">
            MUHAMAD NUR AIDUL HARPAN
          </div>

          <div
            className="absolute top-0 left-0 overflow-hidden whitespace-nowrap select-none transition-all duration-75 ease-out text-white drop-shadow-[0_0_25px_rgba(59,130,246,0.5)]"
            style={{ width: `${progress}%` }}
          >
            MUHAMAD NUR AIDUL HARPAN
            <span className="absolute right-0 top-0 bottom-0 w-[2px] bg-gradient-to-b from-transparent via-blue-400 to-transparent shadow-[0_0_12px_#38bdf8]" />
          </div>
        </div>

        <div className="flex items-center gap-4 text-xs font-mono text-slate-500 tracking-widest">
          <div className="w-12 h-[1px] bg-slate-800" />
          <span className="font-bold text-slate-300">
            {progress}%
          </span>
          <div className="w-12 h-[1px] bg-slate-800" />
        </div>
      </div>
    </div>
  );
};

export default Preloader;
