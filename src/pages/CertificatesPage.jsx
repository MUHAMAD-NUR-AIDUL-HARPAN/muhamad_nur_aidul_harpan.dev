import { useState, useEffect } from "react";
import {
  ExternalLink,
  Award,
  Calendar,
  AlertCircle,
  Filter,
  X,
  ZoomIn,
} from "lucide-react";
import { useGlobal } from "../context/GlobalContext";
import { supabase } from "../lib/supabaseClient";
import { TextHighlighter } from "../components/atoms/TextHighlighter";

const FALLBACK_IMAGE =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'%3E%3Crect width='800' height='600' fill='%23f1f5f9'/%3E%3Cpath d='M400 200c-33.1 0-60 26.9-60 60s26.9 60 60 60 60-26.9 60-60-26.9-60-60-60zm0 90c-16.5 0-30-13.5-30-30s13.5-30 30-30 30 13.5 30 30-13.5 30-30 30z' fill='%2394a3b8'/%3E%3Cpath d='M360 320h80v100l-40-20-40 20z' fill='%2394a3b8'/%3E%3Ctext x='50%25' y='65%25' dominant-baseline='middle' text-anchor='middle' font-family='sans-serif' font-size='24' font-weight='bold' fill='%2364748b'%3ESertifikat%3C/text%3E%3C/svg%3E";

export const CertificatesPage = () => {
  const { lang } = useGlobal();
  const [certificates, setCertificates] = useState([]);
  const [error, setError] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedCert, setSelectedCert] = useState(null);

  useEffect(() => {
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
    if (cert.link && cert.link !== "#" && cert.link.trim() !== "") return cert.link;
    if (cert.image && cert.image.startsWith("http") && !cert.image.includes(".jpg") && !cert.image.includes(".png")) {
      return cert.image;
    }
    return null;
  };

  const handleImageError = (e) => {
    e.target.src = FALLBACK_IMAGE;
    e.target.onerror = null;
  };

  const handleCardClick = (cert) => {
    const link = getValidLink(cert);
    if (link) {
      window.open(link, "_blank", "noopener,noreferrer");
    } else {
      setSelectedCert(cert);
    }
  };

  useEffect(() => {
    if (selectedCert) {
      window.smoother?.paused(true);
      document.body.style.overflow = "hidden";
    } else {
      window.smoother?.paused(false);
      document.body.style.overflow = "unset";
    }
    return () => {
      window.smoother?.paused(false);
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
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 flex items-center gap-2 cursor-pointer ${
                  isActive
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-500/30 border border-blue-500 transform scale-105"
                    : "bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:border-blue-300 dark:hover:border-blue-700 hover:text-blue-600 dark:hover:text-blue-400"
                }`}
              >
                {category === "All" && <Filter size={16} />}
                {category}
                <span className={`px-2 py-0.5 rounded-full text-xs ${isActive ? "bg-white/20 text-white" : "bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400"}`}>
                  {count}
                </span>
              </button>
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
                className="group relative bg-white dark:bg-slate-900 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-lg hover:shadow-2xl hover:border-blue-500/40 hover:-translate-y-1.5 transition-all duration-300 cursor-pointer"
              >
                <div className="h-56 overflow-hidden relative bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                  <img
                    src={getImageUrl(cert.image)}
                    alt={cert.title}
                    loading="lazy"
                    decoding="async"
                    onError={handleImageError}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                  />

                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="flex items-center gap-2 px-6 py-3 bg-white/90 backdrop-blur-sm text-black rounded-full font-bold transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                      {validLink ? (
                        <>
                          <ExternalLink size={18} />
                          {lang === "id" ? "Lihat Sertifikat Asli" : "View Credential"}
                        </>
                      ) : (
                        <>
                          <ZoomIn size={18} />
                          {lang === "id" ? "Perbesar Gambar" : "Preview Certificate"}
                        </>
                      )}
                    </div>
                  </div>

                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-black/70 backdrop-blur-md text-white text-xs font-bold rounded-full border border-white/20 shadow-lg">
                      {cert.category || (lang === "id" ? "Lainnya" : "Other")}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-2 text-xs font-semibold text-slate-400 mb-3 uppercase tracking-wide">
                    <Calendar size={12} />
                    {cert.date}
                  </div>
                  <h3 className="text-xl font-bold mb-2 leading-tight group-hover:text-blue-600 transition-colors text-slate-900 dark:text-slate-100 line-clamp-2">
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
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md p-4 md:p-8 transition-opacity duration-200"
          onClick={() => setSelectedCert(null)}
        >
          <div
            className="bg-white dark:bg-slate-900 rounded-2xl max-w-4xl w-full max-h-[90vh] flex flex-col overflow-hidden shadow-2xl relative transition-all duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedCert(null)}
              className="absolute top-4 right-4 z-10 p-2 bg-black/50 hover:bg-black/80 text-white rounded-full backdrop-blur-sm transition-colors cursor-pointer"
            >
              <X size={24} />
            </button>

            <div className="flex-1 overflow-auto bg-slate-100 dark:bg-slate-950 flex items-center justify-center min-h-[40vh] relative p-4">
              <img
                src={getImageUrl(selectedCert.image)}
                alt={selectedCert.title}
                onError={handleImageError}
                className="max-w-full max-h-[60vh] object-contain rounded-lg shadow-lg"
              />
            </div>

            <div className="p-6 md:p-8 bg-white dark:bg-slate-900 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border-t border-slate-100 dark:border-slate-800">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs font-bold rounded-full">
                    {selectedCert.category || "Lainnya"}
                  </span>
                  <span className="text-slate-500 text-sm flex items-center gap-1">
                    <Calendar size={14} /> {selectedCert.date}
                  </span>
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-2">
                  {selectedCert.title}
                </h2>
                <p className="text-slate-600 dark:text-slate-400">
                  {lang === "id" ? "Penerbit:" : "Issuer:"}{" "}
                  <strong className="text-slate-900 dark:text-slate-200">{selectedCert.issuer}</strong>
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CertificatesPage;
