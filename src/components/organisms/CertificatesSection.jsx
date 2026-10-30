import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Award, Calendar, ArrowRight, ExternalLink, ZoomIn } from "lucide-react";
import { useGlobal } from "../../context/GlobalContext";
import { supabase } from "../../lib/supabaseClient";
import { TextHighlighter } from "../atoms/TextHighlighter";
import { ButtonRing } from "../atoms/ButtonRing";
import { ScrollScrubText } from "../atoms/ScrollScrubText";

const FALLBACK_IMAGE =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'%3E%3Crect width='800' height='600' fill='%23f1f5f9'/%3E%3Cpath d='M400 200c-33.1 0-60 26.9-60 60s26.9 60 60 60 60-26.9 60-60-26.9-60-60-60zm0 90c-16.5 0-30-13.5-30-30s13.5-30 30-30 30 13.5 30 30-13.5 30-30 30z' fill='%2394a3b8'/%3E%3Cpath d='M360 320h80v100l-40-20-40 20z' fill='%2394a3b8'/%3E%3Ctext x='50%25' y='65%25' dominant-baseline='middle' text-anchor='middle' font-family='sans-serif' font-size='24' font-weight='bold' fill='%2364748b'%3ESertifikat%3C/text%3E%3C/svg%3E";

export const CertificatesSection = () => {
  const { lang } = useGlobal();
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from("certificates")
      .select("*")
      .order("id", { ascending: false })
      .limit(3)
      .then(({ data, error }) => {
        if (!error && Array.isArray(data)) {
          setCertificates(data);
        }
      })
      .catch((err) => {
        console.error("Gagal mengambil sertifikat:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

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

  return (
    <section className="py-20 md:py-28 bg-white dark:bg-slate-900 relative overflow-hidden">
      <div className="hidden md:block absolute inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] dark:bg-[radial-gradient(#333_1px,transparent_1px)] [background-size:20px_20px] opacity-40 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div data-aos="fade-up" className="text-center mb-16">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="p-2.5 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 shadow-sm">
              <Award size={20} />
            </div>
            <span className="text-xs font-bold uppercase tracking-widest text-slate-500">
              {lang === "id" ? "Validasi & Penghargaan" : "Certifications & Honors"}
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-4 relative inline-block z-10">
            <TextHighlighter />
            <span className="relative px-2 text-slate-900 dark:text-white">
              {lang === "id" ? "Sertifikasi Unggulan" : "Featured Certificates"}
            </span>
          </h2>
          <div className="text-slate-500 dark:text-slate-400 max-w-xl mx-auto text-base sm:text-lg">
            <ScrollScrubText
              text={
                lang === "id"
                  ? "Bukti dedikasi dan standar kompetensi profesional saya dalam industri teknologi terkini."
                  : "Proof of my continuous learning, technical competence, and industry standards."
              }
              start="top 90%"
              end="bottom 65%"
            />
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-80 rounded-2xl bg-slate-100 dark:bg-slate-800 animate-pulse border border-slate-200 dark:border-slate-800" />
            ))}
          </div>
        ) : certificates.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {certificates.map((cert, index) => {
              const validLink = getValidLink(cert);
              return (
                <div key={cert.id} className="lenis-skew transform-gpu will-change-transform h-full">
                  <div
                    data-aos="fade-up"
                    data-aos-delay={(index % 3) * 100}
                    className="group relative bg-slate-50 dark:bg-slate-800/60 rounded-2xl overflow-hidden border border-slate-200/80 dark:border-slate-700/60 shadow-md hover:shadow-2xl hover:shadow-blue-500/10 hover:border-blue-500/40 hover:-translate-y-2 transition-all duration-500 ease-out flex flex-col justify-between will-change-transform h-full"
                  >
                  <Link to="/certificates" className="block overflow-hidden relative aspect-video bg-slate-200 dark:bg-slate-900">
                    <img
                      src={getImageUrl(cert.image)}
                      alt={cert.title}
                      loading="lazy"
                      decoding="async"
                      onError={handleImageError}
                      className="w-full h-full object-cover transition-opacity duration-300"
                    />

                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <div className="flex items-center gap-2 px-5 py-2.5 bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm text-slate-900 dark:text-white rounded-full font-bold text-xs transform translate-y-3 group-hover:translate-y-0 transition-transform duration-300 shadow-md">
                        <ZoomIn size={16} />
                        {lang === "id" ? "Buka Galeri Sertifikat" : "Preview Gallery"}
                      </div>
                    </div>

                    <div className="absolute top-3 left-3">
                      <span className="px-3 py-1 bg-black/70 backdrop-blur-md text-white text-[11px] font-bold rounded-full border border-white/20 shadow-md">
                        {cert.category || (lang === "id" ? "Lainnya" : "Other")}
                      </span>
                    </div>

                    {validLink && (
                      <a
                        href={validLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="absolute top-3 right-3 p-2 bg-black/70 hover:bg-blue-600 text-white rounded-full backdrop-blur-md transition-all shadow-md"
                        title={lang === "id" ? "Buka Tautan Asli" : "Open Credential"}
                      >
                        <ExternalLink size={13} />
                      </a>
                    )}
                  </Link>

                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-2 text-xs font-semibold text-slate-400 mb-2 uppercase tracking-wide font-mono">
                        <Calendar size={12} />
                        {cert.date}
                      </div>
                      <h3 className="text-lg font-bold mb-2 leading-snug group-hover:text-blue-600 transition-colors duration-300 ease-out text-slate-900 dark:text-slate-100 line-clamp-2">
                        {cert.title}
                      </h3>
                      <p className="text-slate-500 dark:text-slate-400 text-xs flex items-center gap-1.5">
                        <Award size={13} className="text-slate-400" />
                        {lang === "id" ? "Diterbitkan oleh" : "Issued by"}{" "}
                        <span className="text-slate-800 dark:text-slate-200 font-medium">{cert.issuer}</span>
                      </p>
                    </div>
                  </div>

                  <div className="h-1 w-full bg-gradient-to-r from-blue-600 to-indigo-500 dark:from-blue-500 dark:to-indigo-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                </div>
              </div>
              );
            })}
          </div>
        ) : null}

        <div data-aos="fade-up" className="flex justify-center mt-6">
          <div className="relative group inline-block cursor-pointer">
            <ButtonRing rounded="rounded-full" />
            <Link
              to="/certificates"
              className="relative inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-full font-bold text-sm shadow-xl shadow-blue-500/25 hover:shadow-blue-500/40 hover:-translate-y-0.5 active:scale-95 transition-all duration-400 ease-out"
            >
              <span>{lang === "id" ? "Lihat Sertifikat Lengkap" : "View All Certificates"}</span>
              <ArrowRight size={18} className="transform group-hover:translate-x-1.5 transition-transform duration-400 ease-out" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CertificatesSection;
