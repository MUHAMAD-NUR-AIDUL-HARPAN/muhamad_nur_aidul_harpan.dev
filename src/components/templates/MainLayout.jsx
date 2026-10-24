import { useState, useEffect, useRef } from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";
import AOS from "aos";
import "aos/dist/aos.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Navbar } from "../organisms/Navbar";
import { Preloader } from "../organisms/Preloader";
import { Footer } from "../organisms/Footer";
import { AiAssistant } from "../organisms/AiAssistant";
import { useGlobal } from "../../context/GlobalContext";

gsap.registerPlugin(ScrollTrigger);

export const MainLayout = ({ children }) => {
  const { setIsPreloaderDone } = useGlobal();

  // Hanya tampilkan preloader sekali per sesi agar pengunjung tidak terhambat
  const [isLoading, setIsLoading] = useState(() => {
    return !sessionStorage.getItem("visited");
  });

  const lenisRef = useRef(null);
  const progressBarRef = useRef(null);

  // Optimasi ScrollTrigger untuk Mobile: Mencegah jitter/recalculating saat address bar HP muncul/hilang
  useEffect(() => {
    ScrollTrigger.config({ ignoreMobileResize: true });
  }, []);

  // Inisialisasi AOS (Animate On Scroll) - Super ringan, 100% GPU CSS transitions
  useEffect(() => {
    AOS.init({
      duration: 600,
      easing: "ease-out-cubic",
      once: true,
      offset: 60,
      disableMutationObserver: true,
    });
  }, []);

  useEffect(() => {
    // Di Mobile (< 768px): Matikan Lenis total agar 100% menggunakan native scroll GPU bawaan HP
    const isMobile = window.innerWidth < 768;
    if (isMobile) {
      window.lenis = null;
      lenisRef.current = null;
      return;
    }

    // Inisialisasi Smooth Scroll Lenis hanya untuk Desktop
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

    // Sinkronisasi Sempurna Lenis dengan GSAP Ticker untuk Desktop
    lenis.on("scroll", ScrollTrigger.update);
    const tickerUpdate = (time) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tickerUpdate);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tickerUpdate);
      lenis.destroy();
      window.lenis = null;
      lenisRef.current = null;
      document.body.style.overflow = "";
    };
  }, []);

  // Kontrol stop / start scroll saat preloader aktif
  useEffect(() => {
    const lenis = lenisRef.current;

    if (isLoading) {
      if (lenis) lenis.stop();
      document.body.style.overflow = "hidden";
    } else {
      if (lenis) lenis.start();
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

  // Scroll Progress Bar langsung via ScrollTrigger (Zero Layout Reflow)
  useEffect(() => {
    if (!progressBarRef.current) return;
    const st = ScrollTrigger.create({
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => {
        if (progressBarRef.current) {
          progressBarRef.current.style.transform = `scaleX(${self.progress})`;
        }
      },
    });
    return () => st.kill();
  }, []);

  return (
    <>
      {isLoading && <Preloader onComplete={handlePreloaderComplete} />}

      {/* Global Progress Bar (100% GPU Hardware Accelerated) */}
      <div
        ref={progressBarRef}
        style={{ transform: "scaleX(0)", transformOrigin: "left center" }}
        className="fixed top-0 left-0 right-0 h-[3px] bg-blue-600 dark:bg-blue-400 z-[9999] pointer-events-none will-change-transform transform-gpu"
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
