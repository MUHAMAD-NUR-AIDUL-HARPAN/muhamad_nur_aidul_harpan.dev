import { useState, useEffect, useRef } from "react";
import {
  ExternalLink,
  Award,
  Calendar,
  AlertCircle,
  Filter,
  X,
  ZoomIn,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useGlobal } from "../context/GlobalContext";
import { supabase } from "../lib/supabaseClient";
import { TextHighlighter } from "../components/atoms/TextHighlighter";
import { ButtonRing } from "../components/atoms/ButtonRing";

const FALLBACK_IMAGE =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'%3E%3Crect width='800' height='600' fill='%23f1f5f9'/%3E%3Cpath d='M400 200c-33.1 0-60 26.9-60 60s26.9 60 60 60 60-26.9 60-60-26.9-60-60-60zm0 90c-16.5 0-30-13.5-30-30s13.5-30 30-30 30 13.5 30 30-13.5 30-30 30z' fill='%2394a3b8'/%3E%3Cpath d='M360 320h80v100l-40-20-40 20z' fill='%2394a3b8'/%3E%3Ctext x='50%25' y='65%25' dominant-baseline='middle' text-anchor='middle' font-family='sans-serif' font-size='24' font-weight='bold' fill='%2364748b'%3ESertifikat%3C/text%3E%3C/svg%3E";

export const CertificatesPage = () => {
  const { lang } = useGlobal();
  const [certificates, setCertificates] = useState([]);
  const [error, setError] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedCert, setSelectedCert] = useState(null);

  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  useEffect(() => {
    window.scrollTo(0, 0);
    window.lenis?.scrollTo(0, { immediate: true });

    const fetchCertificates = async () => {
      try {
        const { data, error: sbError } = await supabase
          .from("certificates")
          .select("*")
          .order("id", { ascending: false });
        if (sbError) throw sbError;
        setCertificates(data || []);
      } catch (err) {
        setError("Tidak dapat terhubung ke database. Periksa koneksi internet Anda.");
        console.error(err);
      }
    };
    fetchCertificates();
  }, []);

  const categories = ["All", ...new Set(certificates.map((c) => c.category || "Lainnya"))];
  const filteredCertificates = activeCategory === "All"
    ? certificates
    : certificates.filter((c) => (c.category || "Lainnya") === activeCategory);

  const getImageUrl = (imagePath) => {
    if (!imagePath) return FALLBACK_IMAGE;
    if (imagePath.startsWith("/uploads/")) {
      const fileName = imagePath.replace("/uploads/", "");
      return `https://ugbwpgalnyazmbmntxhi.supabase.co/storage/v1/object/public/portfolio/${fileName}`;
    }
    return imagePath.startsWith("http") || imagePath.startsWith("data:") ? imagePath : `https://${imagePath}`;
  };

  const getValidLink = (cert) => {
    if (cert?.link && cert.link !== "#" && cert.link.trim() !== "") return cert.link;
    if (cert?.image && cert.image.startsWith("http") && !cert.image.includes(".jpg") && !cert.image.includes(".png")) {
      return cert.image;
    }
    return null;
  };

  const handleImageError = (e) => {
    e.target.src = FALLBACK_IMAGE;
    e.target.onerror = null;
  };

  const handleCardClick = (cert) => {
    setSelectedCert(cert);
  };

  const currentIndex = filteredCertificates.findIndex((c) => c.id === selectedCert?.id);

  const handlePrev = (e) => {
    e?.stopPropagation();
    if (filteredCertificates.length <= 1) return;
    const nextIdx = (currentIndex - 1 + filteredCertificates.length) % filteredCertificates.length;
    setSelectedCert(filteredCertificates[nextIdx]);
  };

  const handleNext = (e) => {
    e?.stopPropagation();
    if (filteredCertificates.length <= 1) return;
    const nextIdx = (currentIndex + 1) % filteredCertificates.length;
    setSelectedCert(filteredCertificates[nextIdx]);
  };

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    touchEndX.current = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }
  };

  useEffect(() => {
    if (!selectedCert) return;

    const handleKeyDown = (e) => {
      if (e.key === "ArrowLeft") {
        if (filteredCertificates.length > 1) {
          const nextIdx = (currentIndex - 1 + filteredCertificates.length) % filteredCertificates.length;
          setSelectedCert(filteredCertificates[nextIdx]);
        }
      } else if (e.key === "ArrowRight") {
        if (filteredCertificates.length > 1) {
          const nextIdx = (currentIndex + 1) % filteredCertificates.length;
          setSelectedCert(filteredCertificates[nextIdx]);
        }
      } else if (e.key === "Escape") {
        setSelectedCert(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedCert, currentIndex, filteredCertificates]);

  useEffect(() => {
    document.body.style.overflow = selectedCert ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [selectedCert]);

  return (
    <div className="pt-32 pb-20 min-h-screen px-6 max-w-7xl mx-auto">
      <div data-aos="fade-up" className="mb-12 text-center">
        <div className="flex items-center justify-center gap-2 mb-4">
          <div className="p-2.5 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600">
            <Award size={20} />
          </div>
          <span className="text-xs font-bold uppercase tracking-widest text-slate-500">
            {lang === "id" ? "Sertifikasi & Lisensi" : "Validations & Honors"}
          </span>
        </div>

        <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-4 relative inline-block z-10">
          <TextHighlighter />
          <span className="relative px-2 text-slate-900 dark:text-white">
            {lang === "id" ? "Sertifikasi & Penghargaan" : "Professional Certificates"}
          </span>
        </h1>
        <p className="text-slate-500 dark:text-slate-400 max-w-xl mx-auto text-lg">
          {lang === "id"
            ? "Bukti dedikasi saya untuk terus belajar dan mengikuti standar industri terbaru."
            : "Proof of my dedication to continuous learning and keeping up with industry standards."}
        </p>
      </div>

      {error && (
        <div className="flex flex-col items-center justify-center py-20 text-red-500 text-center max-w-lg mx-auto">
          <AlertCircle size={48} className="mb-4 opacity-50" />
          <p className="text-lg font-medium">{error}</p>
        </div>
      )}

      {!error && certificates.length === 0 && (
        <div className="text-center py-20 text-slate-500">
          <Award size={48} className="mx-auto mb-4 opacity-20" />
          <p>Belum ada sertifikat. Silakan tambahkan melalui halaman Admin.</p>
        </div>
      )}

      {!error && certificates.length > 0 && (
        <div data-aos="fade-up" data-aos-delay="100" className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => {
            const count = category === "All"
              ? certificates.length
              : certificates.filter((c) => (c.category || "Lainnya") === category).length;
            const isActive = activeCategory === category;

            return (
              <div key={category} className="relative group inline-block cursor-pointer">
                <ButtonRing rounded="rounded-full" />
                <button
                  onClick={() => setActiveCategory(category)}
                  className={`relative px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-400 ease-out flex items-center gap-2 cursor-pointer active:scale-95 ${
                    isActive
                      ? "bg-blue-600 text-white shadow-lg shadow-blue-500/30 border border-blue-500 font-bold"
                      : "bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-slate-200/80 dark:border-slate-800/80 hover:border-blue-500/40 hover:text-blue-600 dark:hover:text-blue-400 shadow-xs"
                  }`}
                >
                  {category === "All" && <Filter size={16} />}
                  {category}
                  <span className={`px-2 py-0.5 rounded-full text-xs ${isActive ? "bg-white/20 text-white" : "bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400"}`}>
                    {count}
                  </span>
                </button>
              </div>
            );
          })}
        </div>
      )}

      {!error && certificates.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCertificates.map((cert, index) => {
            const validLink = getValidLink(cert);
            return (
              <div
                key={cert.id}
                data-aos="fade-up"
                data-aos-delay={(index % 3) * 100}
                onClick={() => handleCardClick(cert)}
                className="group relative bg-white dark:bg-slate-900 rounded-2xl overflow-hidden border border-slate-200/80 dark:border-slate-800/80 shadow-md hover:shadow-2xl hover:shadow-blue-500/10 hover:border-blue-500/40 hover:-translate-y-2 transition-all duration-500 ease-out cursor-pointer will-change-transform"
              >
                <div className="h-56 overflow-hidden relative bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                  <img
                    src={getImageUrl(cert.image)}
                    alt={cert.title}
                    loading="lazy"
                    decoding="async"
                    onError={handleImageError}
                    className="w-full h-full object-cover transition-opacity duration-300"
                  />

                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="flex items-center gap-2 px-6 py-3 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm text-slate-900 dark:text-white rounded-full font-bold transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 shadow-lg">
                      <ZoomIn size={18} />
                      {lang === "id" ? "Buka Pratinjau" : "Preview Certificate"}
                    </div>
                  </div>

                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-black/70 backdrop-blur-md text-white text-xs font-bold rounded-full border border-white/20 shadow-lg">
                      {cert.category || (lang === "id" ? "Lainnya" : "Other")}
                    </span>
                  </div>

                  {validLink && (
                    <a
                      href={validLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="absolute top-4 right-4 z-10 p-2 bg-black/60 hover:bg-blue-600 text-white rounded-full backdrop-blur-md transition-all shadow-md"
                      title={lang === "id" ? "Buka Dokumen Asli" : "Open Credential"}
                    >
                      <ExternalLink size={14} />
                    </a>
                  )}
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-2 text-xs font-semibold text-slate-400 mb-3 uppercase tracking-wide">
                    <Calendar size={12} />
                    {cert.date}
                  </div>
                  <h3 className="text-xl font-bold mb-2 leading-tight group-hover:text-blue-600 transition-colors duration-300 ease-out text-slate-900 dark:text-slate-100 line-clamp-2">
                    {cert.title}
                  </h3>
                  <p className="text-slate-500 text-sm flex items-center gap-1.5">
                    <Award size={14} className="text-slate-400" />
                    {lang === "id" ? "Diterbitkan oleh" : "Issued by"}{" "}
                    <span className="text-slate-800 dark:text-slate-200 font-medium">{cert.issuer}</span>
                  </p>
                </div>

                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 to-indigo-500 dark:from-blue-500 dark:to-indigo-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              </div>
            );
          })}
        </div>
      )}

      {!error && certificates.length > 0 && filteredCertificates.length === 0 && (
        <div className="text-center py-20 text-slate-500">
          <Filter size={48} className="mx-auto mb-4 opacity-20" />
          <p>{lang === "id" ? "Tidak ada sertifikat dalam kategori ini." : "No certificates found in this category."}</p>
        </div>
      )}

      {selectedCert && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 backdrop-blur-md p-2 sm:p-6 transition-all duration-300"
          onClick={() => setSelectedCert(null)}
        >
          <div
            className="bg-white dark:bg-slate-900 rounded-2xl max-w-4xl w-full max-h-[94vh] flex flex-col overflow-hidden shadow-2xl relative transition-all duration-300 border border-slate-200 dark:border-slate-800"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="absolute top-4 left-4 z-30 flex items-center gap-2">
              <span className="px-3 py-1 bg-black/70 backdrop-blur-md text-white text-xs font-mono font-bold rounded-full border border-white/20 shadow-md">
                {currentIndex + 1} / {filteredCertificates.length}
              </span>
            </div>

            <button
              onClick={() => setSelectedCert(null)}
              className="absolute top-4 right-4 z-30 p-2.5 bg-black/60 hover:bg-black/90 text-white rounded-full backdrop-blur-sm transition-colors cursor-pointer border border-white/20 shadow-md"
              aria-label="Tutup"
            >
              <X size={20} />
            </button>

            <div
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
              className="flex-1 overflow-hidden bg-slate-100 dark:bg-slate-950 flex items-center justify-center min-h-[45vh] relative p-2 sm:p-6 select-none touch-pan-y"
            >
              {filteredCertificates.length > 1 && (
                <>
                  <button
                    onClick={handlePrev}
                    className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-30 w-11 h-11 sm:w-12 sm:h-12 bg-black/70 hover:bg-blue-600 active:scale-90 text-white rounded-full backdrop-blur-md transition-all shadow-xl cursor-pointer flex items-center justify-center border border-white/20"
                    aria-label="Sertifikat Sebelumnya"
                    title="Sebelumnya (Panah Kiri / Geser Kanan)"
                  >
                    <ChevronLeft size={24} />
                  </button>
                  <button
                    onClick={handleNext}
                    className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-30 w-11 h-11 sm:w-12 sm:h-12 bg-black/70 hover:bg-blue-600 active:scale-90 text-white rounded-full backdrop-blur-md transition-all shadow-xl cursor-pointer flex items-center justify-center border border-white/20"
                    aria-label="Sertifikat Berikutnya"
                    title="Berikutnya (Panah Kanan / Geser Kiri)"
                  >
                    <ChevronRight size={24} />
                  </button>
                </>
              )}

              <img
                key={selectedCert.id}
                src={getImageUrl(selectedCert.image)}
                alt={selectedCert.title}
                onError={handleImageError}
                className="max-w-full max-h-[64vh] object-contain rounded-lg shadow-lg transition-opacity duration-300 pointer-events-none"
              />
            </div>

            <div className="p-4 sm:p-6 bg-white dark:bg-slate-900 flex flex-col gap-4 border-t border-slate-100 dark:border-slate-800">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-1.5 flex-wrap">
                    <span className="px-2.5 py-0.5 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs font-bold rounded-full">
                      {selectedCert.category || "Lainnya"}
                    </span>
                    <span className="text-slate-500 text-xs flex items-center gap-1 font-mono">
                      <Calendar size={13} /> {selectedCert.date}
                    </span>
                  </div>
                  <h2 className="text-lg sm:text-2xl font-bold text-slate-900 dark:text-white mb-1 truncate">
                    {selectedCert.title}
                  </h2>
                  <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm">
                    {lang === "id" ? "Diterbitkan oleh:" : "Issued by:"}{" "}
                    <strong className="text-slate-900 dark:text-slate-200">{selectedCert.issuer}</strong>
                  </p>
                </div>

                {getValidLink(selectedCert) && (
                  <div className="relative group/btn hidden sm:inline-block cursor-pointer flex-shrink-0">
                    <ButtonRing rounded="rounded-xl" variant="blue" />
                    <a
                      href={getValidLink(selectedCert)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs sm:text-sm font-bold shadow-md shadow-blue-500/25 transition-all active:scale-95 flex-shrink-0"
                    >
                      <ExternalLink size={16} />
                      {lang === "id" ? "Lihat Dokumen Asli / PDF" : "View Original Credential"}
                    </a>
                  </div>
                )}
              </div>

              {filteredCertificates.length > 1 && (
                <div className="flex sm:hidden items-center gap-2 w-full pt-1">
                  <button
                    onClick={handlePrev}
                    className="flex-1 py-2.5 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-100 font-bold text-xs flex items-center justify-center gap-1.5 active:scale-95 shadow-xs"
                  >
                    <ChevronLeft size={16} /> Sebelumnya
                  </button>
                  <button
                    onClick={handleNext}
                    className="flex-1 py-2.5 px-3 rounded-xl bg-blue-600 text-white font-bold text-xs flex items-center justify-center gap-1.5 active:scale-95 shadow-md shadow-blue-500/25"
                  >
                    Selanjutnya <ChevronRight size={16} />
                  </button>
                </div>
              )}

              {getValidLink(selectedCert) && (
                <a
                  href={getValidLink(selectedCert)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="sm:hidden w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800 rounded-xl text-xs font-bold"
                >
                  <ExternalLink size={14} />
                  {lang === "id" ? "Buka Dokumen Asli / PDF" : "View Original Credential"}
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CertificatesPage;
