import { useState, useEffect } from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";
import { AnimatePresence, motion, useScroll, useSpring, useTransform } from "framer-motion";
import { Hand } from "lucide-react";
import { Navbar } from "../organisms/Navbar";
import { Preloader } from "../organisms/Preloader";
import { Footer } from "../organisms/Footer";
import { AiAssistant } from "../organisms/AiAssistant"; // <--- 1. JANGAN LUPA IMPORT INI

export const MainLayout = ({ children }) => {
  // Selalu tampilkan preloader saat di-refresh sesuai permintaan
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Inisialisasi Smooth Scroll (Lenis) ultra-smooth tanpa stutter/gredeg
    const lenis = new Lenis({
      autoRaf: true,
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
      syncTouch: false, // syncTouch dimatikan agar tidak berbenturan dengan native momentum
    });
    window.lenis = lenis;

    // Logic Kunci Scroll saat Loading Preloader
    if (isLoading) {
      lenis.stop();
      document.body.style.overflow = "hidden";
    } else {
      lenis.start();
      document.body.style.overflow = "";
    }

    return () => {
      lenis.destroy();
      window.lenis = null;
      document.body.style.overflow = "";
    };
  }, [isLoading]);

  const handlePreloaderComplete = () => {
    setIsLoading(false);
    sessionStorage.setItem("visited", "true");
  };

  // --- SCROLL PROGRESS BAR LOGIC ---
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && <Preloader onComplete={handlePreloaderComplete} />}
      </AnimatePresence>

      {/* Global Progress Bar */}
      <motion.div
        style={{ scaleX }}
        className="fixed top-0 left-0 right-0 h-[3px] bg-blue-600 dark:bg-blue-400 origin-left z-[9999] shadow-[0_0_10px_rgba(37,99,235,0.5)] dark:shadow-[0_0_10px_rgba(96,165,250,0.5)]"
      />

      <div className="min-h-screen w-full bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-200 transition-colors duration-500 relative z-0 overflow-x-clip">
        <div className="relative z-10">
          <Navbar />
          <main className="relative">{children}</main>
          <Footer />
          <AiAssistant />
        </div>
      </div>
    </>
  );
};
