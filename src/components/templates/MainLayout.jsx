import { useState, useEffect, useRef } from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";
import AOS from "aos";
import "aos/dist/aos.css";
import { AnimatePresence, motion, useScroll } from "framer-motion";
import { Navbar } from "../organisms/Navbar";
import { Preloader } from "../organisms/Preloader";
import { Footer } from "../organisms/Footer";
import { AiAssistant } from "../organisms/AiAssistant";
import { useGlobal } from "../../context/GlobalContext";

export const MainLayout = ({ children }) => {
  const { setIsPreloaderDone } = useGlobal();

  // Hanya tampilkan preloader sekali per sesi agar pengunjung tidak terhambat
  const [isLoading, setIsLoading] = useState(() => {
    return !sessionStorage.getItem("visited");
  });

  const lenisRef = useRef(null);

  // Inisialisasi AOS (Animate On Scroll) dioptimasi khusus untuk performa tinggi di HP & Desktop
  useEffect(() => {
    AOS.init({
      once: true,      // Animasi hanya jalan 1x saat di-scroll (tidak diulang saat scroll ke atas)
      duration: 500,   // Durasi animasi yang singkat dan padat
      offset: 100,     // Animasi baru terpicu setelah elemen masuk 100px ke layar agar tidak menumpuk
    });
  }, []);

  useEffect(() => {
    // Inisialisasi Smooth Scroll Lenis satu kali (Singleton)
    // Desktop: Silky smooth wheel scroll
    // Mobile / Touch: Native hardware momentum (0 lag, 60-120fps fluid scroll & stutter-free animations)
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1.1,
      syncTouch: false,
      smoothTouch: false,
    });
    lenisRef.current = lenis;
    window.lenis = lenis;

    let rafId;
    function raf(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      window.lenis = null;
      lenisRef.current = null;
      document.body.style.overflow = "";
    };
  }, []);

  // Kontrol stop / start scroll saat preloader aktif tanpa menghancurkan instance Lenis
  useEffect(() => {
    const lenis = lenisRef.current;
    if (!lenis) return;

    if (isLoading) {
      lenis.stop();
      document.body.style.overflow = "hidden";
    } else {
      lenis.start();
      document.body.style.overflow = "";
      setTimeout(() => {
        AOS.refresh();
      }, 100);
    }
  }, [isLoading]);

  const handlePreloaderComplete = () => {
    setIsLoading(false);
    setIsPreloaderDone(true);
    sessionStorage.setItem("visited", "true");
  };

  // Scroll Progress Bar super ringan langsung dari scrollYProgress (tanpa overhead useSpring)
  const { scrollYProgress } = useScroll();

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && <Preloader onComplete={handlePreloaderComplete} />}
      </AnimatePresence>

      {/* Global Progress Bar (Hardware Accelerated GPU transform3d) */}
      <motion.div
        style={{ scaleX: scrollYProgress }}
        className="fixed top-0 left-0 right-0 h-[3px] bg-blue-600 dark:bg-blue-400 origin-left z-[9999] pointer-events-none transform-gpu gpu-accelerated-bar"
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
