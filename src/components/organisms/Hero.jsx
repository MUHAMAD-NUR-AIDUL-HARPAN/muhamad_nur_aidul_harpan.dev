import { useRef } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";
import { Download, ArrowRight, Github, Linkedin, Globe } from "lucide-react";
import { useGlobal } from "../../context/GlobalContext";
import { heroData } from "../../data/content";

// --- COMPONENT: INFINITE MARQUEE ---
const Marquee = () => {
  return (
    <div className="absolute bottom-0 left-0 w-full overflow-hidden bg-gray-900 dark:bg-white text-white dark:text-black py-3 z-20 border-t border-white/10">
      <motion.div
        className="flex whitespace-nowrap"
        animate={{ x: "-50%" }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      >
        {[...Array(4)].map((_, i) => (
          <div key={i} className="flex items-center gap-8 mx-4">
            <span className="text-sm font-bold tracking-[0.2em] uppercase">
              Frontend Development
            </span>
            <span className="w-2 h-2 rounded-full bg-blue-500"></span>
            <span className="text-sm font-bold tracking-[0.2em] uppercase">
              Pixel-Perfect UI
            </span>
            <span className="w-2 h-2 rounded-full bg-blue-500"></span>
            <span className="text-sm font-bold tracking-[0.2em] uppercase">
              System Architecture
            </span>
            <span className="w-2 h-2 rounded-full bg-blue-500"></span>
            <span className="text-sm font-bold tracking-[0.2em] uppercase">
              Performance Optimization
            </span>
            <span className="w-2 h-2 rounded-full bg-blue-500"></span>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

// --- COMPONENT: MAGNETIC BUTTON (UPDATED) ---
// Sekarang menerima props 'href' dan 'download'
const MagneticButton = ({ children, className, href, download, onClick }) => {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const handleMouse = (e) => {
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    x.set(middleX * 0.2);
    y.set(middleY * 0.2);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  const springConfig = {
    type: "spring",
    stiffness: 150,
    damping: 15,
    mass: 0.1,
  };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  // LOGIC BARU:
  // Jika ada 'href', gunakan motion.a (link). Jika tidak, gunakan motion.button.
  const Component = href ? motion.a : motion.button;

  return (
    <Component
      ref={ref}
      href={href} // Untuk link
      download={download} // Untuk trigger download file
      onClick={onClick} // Untuk fungsi klik biasa
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      style={{ x: springX, y: springY }}
      className={className}
    >
      {children}
    </Component>
  );
};

export const Hero = () => {
  const { lang } = useGlobal();
  const t = heroData;

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { y: "100%", opacity: 0 },
    show: {
      y: "0%",
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  // --- FUNGSI SCROLL KE CONTACT ---
  const handleContactClick = () => {
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="min-h-screen flex items-center relative overflow-hidden pt-20 pb-20 bg-gray-50 dark:bg-[#0a0a0a]">
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.5)_100%)] dark:bg-[radial-gradient(circle_at_center,transparent_0%,#000000_100%)]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        <div className="lg:col-span-7 flex flex-col justify-center">
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="overflow-hidden mb-6"
          >
            <div className="overflow-hidden">
              <motion.p
                variants={item}
                className="text-blue-600 font-mono text-sm tracking-widest uppercase mb-4 flex items-center gap-2"
              >
                <span className="w-2 h-2 bg-blue-600 rounded-full animate-pulse" />{" "}
                Available for work
              </motion.p>
            </div>

            <div className="overflow-hidden">
              <motion.h1
                variants={item}
                className="text-6xl md:text-8xl font-black tracking-tight text-gray-900 dark:text-white leading-[0.9] mb-2"
              >
                {t.name}
              </motion.h1>
            </div>

            <div className="overflow-hidden">
              <motion.h2
                variants={item}
                className="text-4xl md:text-6xl font-bold text-gray-400 dark:text-gray-500 tracking-tight mb-8"
              >
                {t.role}
              </motion.h2>
            </div>

            <div className="overflow-hidden">
              <motion.p
                variants={item}
                className="text-lg text-gray-600 dark:text-gray-400 max-w-lg leading-relaxed mb-10 border-l-2 border-gray-300 dark:border-gray-700 pl-6"
              >
                {lang === "id" ? t.desc.id : t.desc.en}
              </motion.p>
            </div>

            <motion.div variants={item} className="flex flex-wrap gap-4">
              {/* TOMBOL START PROJECT (Scroll ke Contact) */}
              <MagneticButton
                onClick={handleContactClick}
                className="px-8 py-4 bg-gray-900 dark:bg-white text-white dark:text-black rounded-full font-bold hover:shadow-xl transition-all flex items-center gap-2 group cursor-pointer"
              >
                {lang === "id" ? "Mulai Proyek" : "Start a Project"}
                <ArrowRight
                  size={18}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </MagneticButton>

              {/* TOMBOL DOWNLOAD CV (Sudah Aktif) */}
              <MagneticButton
                href="../public/cv muhamad nur aidul harpan.pdf" // Path file di folder public
                download="cv muhamad nur aidul harpan.pdf" // Nama file saat di-download user
                className="px-8 py-4 bg-transparent border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white rounded-full font-bold hover:bg-gray-200 dark:hover:bg-gray-800 transition-all flex items-center gap-2 cursor-pointer"
              >
                <Download size={18} /> {lang === "id" ? "CV Saya" : "Resume"}
              </MagneticButton>
            </motion.div>

            <motion.div
              variants={item}
              className="mt-12 flex gap-6 text-gray-400"
            >
              <a
                href="https://github.com/"
                target="_blank"
                rel="noreferrer"
                className="hover:text-black dark:hover:text-white transition-colors"
              >
                <Github size={20} />
              </a>
              <a
                href="https://linkedin.com/"
                target="_blank"
                rel="noreferrer"
                className="hover:text-blue-600 transition-colors"
              >
                <Linkedin size={20} />
              </a>
              <a
                href="https://dribbble.com/"
                target="_blank"
                rel="noreferrer"
                className="hover:text-pink-500 transition-colors"
              >
                <Globe size={20} />
              </a>
            </motion.div>
          </motion.div>
        </div>

        <div className="lg:col-span-5 flex justify-center lg:justify-end relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, rotateY: 10 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="relative w-full max-w-md aspect-[4/5] perspective-1000 group"
          >
            <div className="absolute inset-0 border-2 border-gray-200 dark:border-gray-800 rounded-2xl transform translate-x-4 translate-y-4 transition-transform group-hover:translate-x-6 group-hover:translate-y-6" />

            <div className="absolute inset-0 bg-gray-300 dark:bg-gray-800 rounded-2xl overflow-hidden shadow-2xl transition-all duration-500">
              <img
                src={heroData.image}
                alt="Profile"
                className="w-full h-full object-cover transform scale-105 group-hover:scale-110 transition-transform duration-700"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />
              <div className="absolute bottom-6 left-6 text-white">
                <p className="text-xs font-mono tracking-widest mb-1 text-gray-300">
                  LOCATION
                </p>
                <p className="font-bold flex items-center gap-2">
                  Jakarta, ID{" "}
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <Marquee />
    </section>
  );
};
