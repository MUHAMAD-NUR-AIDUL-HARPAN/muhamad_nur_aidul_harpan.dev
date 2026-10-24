import { useState, useEffect } from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { Navbar } from "../organisms/Navbar";
import { Preloader } from "../organisms/Preloader";
import { Footer } from "../organisms/Footer";
import { AiAssistant } from "../organisms/AiAssistant";

export const MainLayout = ({ children }) => {
  // Hanya tampilkan preloader sekali per sesi agar pengunjung tidak terhambat
  const [isLoading, setIsLoading] = useState(() => {
    return !sessionStorage.getItem("visited");
  });

  useEffect(() => {
    // Deteksi apakah perangkat menggunakan layar sentuh / mobile
    const isTouchDevice =
      typeof window !== "undefined" &&
      ("ontouchstart" in window || navigator.maxTouchPoints > 0 || window.innerWidth < 768);

    // Di HP / Layar Sentuh: JANGAN jalankan Lenis virtual touch agar native scroll 120Hz berjalan ringan & mulus
    if (isTouchDevice) {
      window.lenis = null;
      if (isLoading) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "";
      }
      return () => {
        document.body.style.overflow = "";
      };
    }

    // Inisialisasi Smooth Scroll (Lenis) HANYA untuk Desktop (Mouse/Trackpad)
    const lenis = new Lenis({
      autoRaf: true,
      duration: 1.0,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
    });
    window.lenis = lenis;

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

  // Scroll Progress Bar yang ringan
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
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
        className="fixed top-0 left-0 right-0 h-[3px] bg-blue-600 dark:bg-blue-400 origin-left z-[9999] pointer-events-none"
      />

      <div className="min-h-screen w-full bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-200 transition-colors duration-300 relative z-0 overflow-x-clip">
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
