import { useState, useEffect, useRef } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { Navbar } from "../organisms/Navbar";
import { Preloader } from "../organisms/Preloader";
import { Footer } from "../organisms/Footer";
import { AiAssistant } from "../organisms/AiAssistant";
import { useGlobal } from "../../context/GlobalContext";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, ScrollSmoother);

export const MainLayout = ({ children }) => {
  const { setIsPreloaderDone } = useGlobal();
  const [isLoading, setIsLoading] = useState(() => !sessionStorage.getItem("visited"));
  const smootherRef = useRef(null);
  const progressBarRef = useRef(null);

  useEffect(() => {
    ScrollTrigger.config({ ignoreMobileResize: true });

    AOS.init({
      duration: 600,
      easing: "ease-out-cubic",
      once: true,
      offset: 40,
    });

    const smoother = ScrollSmoother.create({
      wrapper: "#smooth-wrapper",
      content: "#smooth-content",
      smooth: 1.1,
      smoothTouch: 0.1,
      normalizeScroll: true,
      ignoreMobileResize: true,
    });

    smootherRef.current = smoother;
    window.smoother = smoother;

    const progressTrigger = ScrollTrigger.create({
      onUpdate: (self) => {
        if (progressBarRef.current) {
          progressBarRef.current.style.transform = `scaleX(${self.progress})`;
        }
      },
    });

    return () => {
      progressTrigger.kill();
      smoother.kill();
      window.smoother = null;
      smootherRef.current = null;
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    const smoother = smootherRef.current;
    if (isLoading) {
      if (smoother) smoother.paused(true);
      document.body.style.overflow = "hidden";
    } else {
      if (smoother) smoother.paused(false);
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
        <Navbar />
        <div id="smooth-wrapper">
          <div id="smooth-content">
            <main className="relative">{children}</main>
            <Footer />
          </div>
        </div>
        <AiAssistant />
      </div>
    </>
  );
};
