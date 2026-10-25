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
      duration: 1.8,
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
      <div className="absolute w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.08)_0,transparent_70%)] pointer-events-none" />

      <div
        ref={contentRef}
        className="relative z-10 flex flex-col items-center justify-center px-6 max-w-md w-full"
      >
        <div className="relative flex items-center justify-center w-16 h-16 mb-8 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 shadow-[0_0_35px_rgba(37,99,235,0.4)] border border-blue-400/30">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-8 h-8 text-white"
          >
            <polyline points="16 18 22 12 16 6" />
            <polyline points="8 6 2 12 8 18" />
          </svg>
          <div className="absolute -inset-1 rounded-2xl bg-blue-500/20 blur-md pointer-events-none" />
        </div>

        <div className="text-center mb-6">
          <h2 className="text-lg sm:text-xl font-bold tracking-[0.2em] text-white uppercase mb-1">
            Muhamad Nur Aidul Harpan
          </h2>
          <p className="text-[11px] font-mono tracking-[0.25em] text-blue-400 uppercase">
            Full-Stack Developer & AI Specialist
          </p>
        </div>

        <div className="w-full max-w-[280px] mb-4">
          <div className="h-[3px] w-full bg-slate-800/90 rounded-full overflow-hidden relative">
            <div
              className="h-full bg-gradient-to-r from-blue-600 via-indigo-500 to-cyan-400 transition-all duration-75 ease-out relative"
              style={{ width: `${progress}%` }}
            >
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-white shadow-[0_0_10px_#38bdf8]" />
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between w-full max-w-[280px] text-[11px] font-mono text-slate-400">
          <span className="tracking-widest uppercase">Loading Assets</span>
          <span className="font-semibold text-white tracking-wider">{progress}%</span>
        </div>
      </div>
    </div>
  );
};

export default Preloader;
