import { useState, useEffect } from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";
import { AnimatePresence } from "framer-motion";
import { Navbar } from "../organisms/Navbar";
import { Preloader } from "../organisms/Preloader";

export const MainLayout = ({ children }) => {
  // --- LOGIC BARU: Session Storage Check ---
  const [isLoading, setIsLoading] = useState(() => {
    // Cek apakah user sudah pernah berkunjung di sesi browser ini?
    // Jika sessionStorage "visited" KOSONG (!null = true), maka loading aktif.
    // Jika ADA, maka loading mati (false).
    return !sessionStorage.getItem("visited");
  });

  useEffect(() => {
    // Inisialisasi Smooth Scroll (Lenis)
    const lenis = new Lenis({
      duration: 1.5,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    // Kunci scroll saat loading, lepaskan saat selesai
    if (isLoading) {
      lenis.stop();
      document.body.style.overflow = "hidden"; // Tambahan: Paksa stop scroll browser native
    } else {
      lenis.start();
      document.body.style.overflow = ""; // Reset
      requestAnimationFrame(raf);
    }

    return () => lenis.destroy();
  }, [isLoading]);

  // Handler saat Preloader selesai
  const handlePreloaderComplete = () => {
    setIsLoading(false);
    // Simpan tanda bahwa user sudah berkunjung
    sessionStorage.setItem("visited", "true");
  };

  return (
    <>
      {/* AnimatePresence menangani animasi keluar (slide up) preloader */}
      <AnimatePresence mode="wait">
        {isLoading && <Preloader onComplete={handlePreloaderComplete} />}
      </AnimatePresence>

      <div className="min-h-screen w-full transition-colors duration-500 bg-gray-50 dark:bg-[#0a0a0a] text-gray-900 dark:text-white">
        <Navbar />

        <main className="relative">{children}</main>

        <footer className="py-10 text-center text-sm text-gray-500 border-t border-gray-200 dark:border-gray-900 transition-colors duration-500">
          © {new Date().getFullYear()} Alex. Built with React & Lenis.
        </footer>
      </div>
    </>
  );
};
