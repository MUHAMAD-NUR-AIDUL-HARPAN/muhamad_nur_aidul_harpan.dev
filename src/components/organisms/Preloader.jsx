import { useEffect, useRef } from "react";
import gsap from "gsap";

export const Preloader = ({ onComplete, onStartExit }) => {
  const containerRef = useRef(null);
  const contentRef = useRef(null);
  const fillRef = useRef(null);
  const barRef = useRef(null);
  const numberRef = useRef(null);

  useEffect(() => {
    const counter = { val: 0 };
    const tween = gsap.to(counter, {
      val: 100,
      duration: 1.6,
      ease: "power2.inOut",
      onUpdate: () => {
        const p = Math.round(counter.val);
        if (fillRef.current) {
          fillRef.current.style.clipPath = `inset(0 ${100 - counter.val}% 0 0)`;
        }
        if (barRef.current) {
          barRef.current.style.transform = `scaleX(${counter.val / 100})`;
        }
        if (numberRef.current) {
          numberRef.current.textContent = `${p}%`;
        }
      },
      onComplete: () => {
        const tl = gsap.timeline({
          delay: 0.12,
          onComplete: () => {
            onComplete();
          },
        });

        tl.to(contentRef.current, {
          y: -60,
          opacity: 0,
          duration: 0.5,
          ease: "power3.inOut",
        }, 0)
        .to(containerRef.current, {
          yPercent: -100,
          duration: 0.95,
          ease: "power4.inOut",
        }, 0)
        .call(() => {
          if (onStartExit) onStartExit();
        }, null, 0.18);
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
        <div className="relative text-[6vw] sm:text-[4vw] md:text-3xl lg:text-4xl font-black tracking-[0.2em] uppercase whitespace-nowrap mb-6 select-none">
          <div className="text-slate-800 select-none">
            MUHAMAD NUR AIDUL HARPAN
          </div>

          <div
            ref={fillRef}
            className="absolute inset-0 text-white drop-shadow-[0_0_25px_rgba(59,130,246,0.6)] pointer-events-none will-change-[clip-path]"
            style={{ clipPath: "inset(0 100% 0 0)" }}
          >
            MUHAMAD NUR AIDUL HARPAN
          </div>
        </div>

        <div className="w-56 sm:w-72 h-[2px] bg-slate-800/80 rounded-full overflow-hidden mb-6 relative">
          <div
            ref={barRef}
            className="h-full w-full bg-gradient-to-r from-blue-600 via-sky-400 to-indigo-500 rounded-full will-change-transform shadow-[0_0_10px_rgba(56,189,248,0.7)]"
            style={{ transform: "scaleX(0)", transformOrigin: "left center" }}
          />
        </div>

        <div className="flex items-center gap-4 text-xs font-mono text-slate-500 tracking-widest">
          <div className="w-12 h-[1px] bg-slate-800" />
          <span ref={numberRef} className="font-bold text-slate-300 min-w-[3ch] text-center">
            0%
          </span>
          <div className="w-12 h-[1px] bg-slate-800" />
        </div>
      </div>
    </div>
  );
};

export default Preloader;
