import { motion } from "framer-motion";
import { certificatesData } from "../data/content";
import { ExternalLink, Award, Calendar } from "lucide-react";
import { useGlobal } from "../context/GlobalContext";

export const CertificatesPage = () => {
  const { lang } = useGlobal();

  // Animasi Container (agar anak-anaknya muncul berurutan)
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1, // Jeda 0.1 detik antar kartu
      },
    },
  };

  // Animasi Kartu Satuan
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <div className="pt-32 pb-20 min-h-screen px-6 max-w-7xl mx-auto">
      {/* Header Halaman */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-16 text-center"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-600 mb-6 border border-blue-100 dark:border-blue-800">
          <Award size={18} />
          <span className="text-sm font-bold tracking-widest uppercase">
            Validations
          </span>
        </div>
        <h1 className="text-4xl md:text-5xl font-black mb-6">
          {lang === "id" ? "Sertifikasi" : "Professional"}{" "}
          <span className="text-blue-600">
            {lang === "id" ? "& Penghargaan" : "Certificates"}
          </span>
        </h1>
        <p className="text-gray-500 max-w-xl mx-auto text-lg">
          {lang === "id"
            ? "Bukti dedikasi saya untuk terus belajar dan mengikuti standar industri terbaru."
            : "Proof of my dedication to continuous learning and keeping up with industry standards."}
        </p>
      </motion.div>

      {/* Grid Sertifikat */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        {certificatesData.map((cert) => (
          <motion.div
            key={cert.id}
            variants={cardVariants}
            className="group relative bg-white dark:bg-gray-900 rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-800 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
          >
            {/* Image Section */}
            <div className="h-48 overflow-hidden relative bg-gray-100 dark:bg-gray-800">
              <img
                src={cert.image}
                alt={cert.title}
                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <a
                  href={cert.link}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 px-6 py-3 bg-white text-black rounded-full font-bold hover:scale-105 transition-transform"
                >
                  <ExternalLink size={18} /> Verify
                </a>
              </div>
            </div>

            {/* Content Section */}
            <div className="p-6">
              <div className="flex items-center gap-2 text-xs font-semibold text-gray-400 mb-3 uppercase tracking-wide">
                <Calendar size={12} />
                {cert.date}
              </div>
              <h3 className="text-xl font-bold mb-2 leading-tight group-hover:text-blue-600 transition-colors">
                {cert.title}
              </h3>
              <p className="text-gray-500 text-sm">
                Issued by{" "}
                <span className="text-gray-800 dark:text-gray-200 font-medium">
                  {cert.issuer}
                </span>
              </p>
            </div>

            {/* Decorative Gradient Line at Bottom */}
            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default CertificatesPage;
