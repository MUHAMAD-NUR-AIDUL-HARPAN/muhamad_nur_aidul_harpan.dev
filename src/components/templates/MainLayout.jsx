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
    const isMobile = window.innerWidth < 768;

    const lenis = new Lenis({
      lerp: 0.085, // Damping lerp fisik yang sangat lembut dan halus untuk mouse wheel & trackpad
      wheelMultiplier: 1.05, // Respons wheel natural tanpa terasa berat
      touchMultiplier: 1.4, // Respon sentuhan jari lebih lincah dan berbobot di mobile
      smoothWheel: true,
      syncTouch: true, // Sinkronisasi sentuhan mobile dengan frame GSAP Ticker
      syncTouchLerp: 0.075, // Golden sweet spot inersia sentuh: meluncur halus (glide) saat jari dilepas
      touchInertiaExponent: 1.85, // Efek inersia kinetik yang elegan saat flick scroll
      stopInertiaOnNavigate: true, // Mencegah benturan inersia saat klik link internal
      orientation: "vertical",
      gestureOrientation: "vertical",
      autoResize: true,
    });

    lenisRef.current = lenis;
    window.lenis = lenis;

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
