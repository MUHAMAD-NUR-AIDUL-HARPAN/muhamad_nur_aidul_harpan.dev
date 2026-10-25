import { useState, useEffect, useRef } from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";
import AOS from "aos";
import "aos/dist/aos.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { Navbar } from "../organisms/Navbar";
import { Preloader } from "../organisms/Preloader";
import { Footer } from "../organisms/Footer";
import { AiAssistant } from "../organisms/AiAssistant";
import { useGlobal } from "../../context/GlobalContext";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

export const MainLayout = ({ children }) => {
  const { setIsPreloaderDone } = useGlobal();

  // Hanya tampilkan preloader sekali per sesi agar pengunjung tidak terhambat
  const [isLoading, setIsLoading] = useState(() => {
    return !sessionStorage.getItem("visited");
  });

  const lenisRef = useRef(null);
  const progressBarRef = useRef(null);

  // Optimasi ScrollTrigger untuk Mobile: Mencegah jitter saat address bar HP muncul/hilang
  useEffect(() => {
    ScrollTrigger.config({ ignoreMobileResize: true });
  }, []);

  // Inisialisasi AOS (Animate On Scroll)
  useEffect(() => {
    AOS.init({
      duration: 600,
      easing: "ease-out-cubic",
      once: true,
      offset: 40,
      disableMutationObserver: false,
    });

    const timer = setTimeout(() => {
      AOS.refreshHard();
      ScrollTrigger.refresh();
    }, 250);

    return () => clearTimeout(timer);
  }, []);

  // Inisialisasi Lenis Smooth Scroll terintegrasi dengan GSAP Ticker
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.085, // Damping lerp fisik murni (seragam untuk desktop wheel & mobile touch)
      wheelMultiplier: 1.0, // Respons wheel natural 1:1
      touchMultiplier: 1.0, // Respons touch natural 1:1 (menempel presisi di jari, sama dengan desktop)
      smoothWheel: true,
      syncTouch: true, // Lenis aktif di mobile sama persis seperti di desktop
      syncTouchLerp: 0.085, // Nilai lerp inersia sama persis dengan lerp desktop (0.085)
      touchInertiaExponent: 1.6, // Inersia alami tanpa loncatan eksponensial mendadak
      orientation: "vertical",
      gestureOrientation: "vertical",
      autoResize: false, // Ditangani manual agar address bar HP tidak memicu reset scroll (anti loncat-loncat)
    });

    lenisRef.current = lenis;
    window.lenis = lenis;

    // Resize handler cerdas: Hanya resize saat lebar layar berubah (rotasi HP atau resize jendela browser desktop),
    // sehingga address bar HP yang muncul/hilang saat scrolling tidak mereset posisi scroll (bebas loncat-loncat)
    let lastWidth = typeof window !== "undefined" ? window.innerWidth : 0;
    const handleResize = () => {
      if (window.innerWidth !== lastWidth) {
        lastWidth = window.innerWidth;
        lenis.resize();
        ScrollTrigger.refresh();
      }
    };
    window.addEventListener("resize", handleResize);

    // Hitung dimensi awal
    lenis.resize();

    // Jika preloader masih aktif saat inisialisasi, kunci scroll
    if (isLoading) {
      lenis.stop();
    }

    // Integrasi Resmi GSAP Ticker & Lenis
    lenis.on("scroll", ScrollTrigger.update);
    const tickerUpdate = (time) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tickerUpdate);

    // KUNCI UTAMA: Matikan lagSmoothing bawaan GSAP agar frame rate 100% konsisten tanpa getaran/stutter
    gsap.ticker.lagSmoothing(0);

    return () => {
      window.removeEventListener("resize", handleResize);
      gsap.ticker.remove(tickerUpdate);
      lenis.destroy();
      window.lenis = null;
      lenisRef.current = null;
      document.body.style.overflow = "";
    };
  }, []);

  // Kontrol lock / unlock scroll saat preloader aktif
  useEffect(() => {
    const lenis = lenisRef.current;

    if (isLoading) {
      if (lenis) lenis.stop();
      document.body.style.overflow = "hidden";
    } else {
      if (lenis) {
        lenis.start();
        lenis.resize();
      }
      document.body.style.overflow = "";
      setTimeout(() => {
        if (lenis) lenis.resize();
        AOS.refreshHard();
        ScrollTrigger.refresh();
      }, 150);
    }
  }, [isLoading]);

  const handlePreloaderComplete = () => {
    setIsLoading(false);
    setIsPreloaderDone(true);
    sessionStorage.setItem("visited", "true");
  };

  // Scroll Progress Bar: Langsung dari Lenis Event (Zero Layout Reflow, 100% GPU)
  useEffect(() => {
    const lenis = lenisRef.current;
    if (!lenis || !progressBarRef.current) return;

    const onScroll = ({ progress }) => {
      if (progressBarRef.current) {
        progressBarRef.current.style.transform = `scaleX(${progress})`;
      }
    };

    lenis.on("scroll", onScroll);
    return () => lenis.off("scroll", onScroll);
  }, [isLoading]);

  return (
    <>
      {isLoading && <Preloader onComplete={handlePreloaderComplete} />}

      {/* Global Progress Bar (100% GPU Hardware Accelerated via Lenis) */}
      <div
        ref={progressBarRef}
        style={{ transform: "scaleX(0)", transformOrigin: "left center" }}
        className="fixed top-0 left-0 right-0 h-[3px] bg-blue-600 dark:bg-blue-400 z-[9999] pointer-events-none will-change-transform transform-gpu"
      />

      <div className="min-h-screen w-full bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-200 relative z-0">
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
