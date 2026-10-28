import { useEffect, useRef } from "react";
import gsap from "gsap";

export const Preloader = ({ onComplete, onStartExit }) => {
  const containerRef = useRef(null);
  const contentRef = useRef(null);
  const fillRef = useRef(null);
  const numberRef = useRef(null);

  useEffect(() => {
    const counter = { val: 0 };
    const tween = gsap.to(counter, {
      val: 100,
      duration: 1.8,
      ease: "power2.out",
      onUpdate: () => {
        const p = Math.floor(counter.val);
        if (fillRef.current) {
          fillRef.current.style.width = `${counter.val}%`;
        }
        if (numberRef.current) {
          numberRef.current.textContent = `${p}%`;
        }
      },
      onComplete: () => {
        if (onStartExit) onStartExit();

        const tl = gsap.timeline({
          onComplete: () => {
            onComplete();
          },
        });

        tl.to(contentRef.current, {
          y: -20,
          opacity: 0,
          duration: 0.35,
          ease: "power2.in",
        }).to(
          containerRef.current,
          {
            yPercent: -100,
            duration: 0.85,
            ease: "power3.inOut",
          },
          "-=0.05"
        );
      },
    });

    return () => {
      tween.kill();
    };
  }, [onComplete, onStartExit]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-slate-950 text-slate-100 overflow-hidden pointer-events-auto select-none will-change-transform transform-gpu"
    >
      <div className="absolute w-[600px] h-[600px] bg-blue-600/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.08)_0,transparent_70%)] pointer-events-none" />

      <div
        ref={contentRef}
        className="relative z-10 flex flex-col items-center justify-center px-4 w-full"
      >
        <div className="relative text-[6vw] sm:text-[4vw] md:text-3xl lg:text-4xl font-black tracking-[0.2em] uppercase whitespace-nowrap mb-6">
          <div className="text-slate-800 select-none">
            MUHAMAD NUR AIDUL HARPAN
          </div>

          <div
            ref={fillRef}
            className="absolute top-0 left-0 overflow-hidden whitespace-nowrap select-none text-white drop-shadow-[0_0_25px_rgba(59,130,246,0.6)] will-change-[width]"
            style={{ width: "0%" }}
          >
            MUHAMAD NUR AIDUL HARPAN
            <span className="absolute right-0 top-0 bottom-0 w-[2px] bg-gradient-to-b from-transparent via-blue-400 to-transparent shadow-[0_0_12px_#38bdf8]" />
          </div>
        </div>

        <div className="flex items-center gap-4 text-xs font-mono text-slate-500 tracking-widest">
          <div className="w-12 h-[1px] bg-slate-800" />
          <span ref={numberRef} className="font-bold text-slate-300">
            0%
          </span>
          <div className="w-12 h-[1px] bg-slate-800" />
        </div>
      </div>
    </div>
  );
};

export default Preloader;
