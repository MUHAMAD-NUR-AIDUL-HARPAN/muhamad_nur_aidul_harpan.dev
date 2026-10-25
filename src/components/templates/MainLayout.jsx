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
  const [isLoading, setIsLoading] = useState(() => !sessionStorage.getItem("visited"));
  const lenisRef = useRef(null);
  const progressBarRef = useRef(null);

  useEffect(() => {
    ScrollTrigger.config({ ignoreMobileResize: true });

    AOS.init({
      duration: 600,
      easing: "ease-out-cubic",
      once: true,
      offset: 40,
    });

    const lenis = new Lenis({
      lerp: 0.085,
      smoothWheel: true,
      syncTouch: true,
      syncTouchLerp: 0.08,
      touchMultiplier: 1.0,
      touchInertiaExponent: 1.5,
      autoResize: true,
    });

    lenisRef.current = lenis;
    window.lenis = lenis;

    lenis.on("scroll", ScrollTrigger.update);
    const tickerUpdate = (time) => lenis.raf(time * 1000);
    gsap.ticker.add(tickerUpdate);
    gsap.ticker.lagSmoothing(0);

    const onScroll = ({ progress }) => {
      if (progressBarRef.current) {
        progressBarRef.current.style.transform = `scaleX(${progress})`;
      }
    };
    lenis.on("scroll", onScroll);

    return () => {
      gsap.ticker.remove(tickerUpdate);
      lenis.destroy();
      window.lenis = null;
      lenisRef.current = null;
      document.body.style.overflow = "";
    };
  }, []);

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
        ScrollTrigger.refresh();
      }, 100);
    }
  }, [isLoading]);

  const handlePreloaderComplete = () => {
    setIsLoading(false);
    setIsPreloaderDone(true);
    sessionStorage.setItem("visited", "true");
  };

  return (
    <>
      {isLoading && <Preloader onComplete={handlePreloaderComplete} />}
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
