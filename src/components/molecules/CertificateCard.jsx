import { motion } from "framer-motion";

export const CertificateCard = ({ cert, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.1 }}
    whileHover={{ y: -10 }}
    className="group bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-lg border border-gray-100 dark:border-gray-800"
  >
    <div className="h-40 overflow-hidden relative">
      <img
        src={cert.img}
        alt={cert.title}
        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
      />
      <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
    </div>
    <div className="p-6">
      <div className="flex justify-between items-center mb-2">
        <span className="text-xs font-bold text-blue-500 uppercase tracking-widest">
          {cert.issuer}
        </span>
        <span className="text-xs text-gray-400 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
          {cert.year}
        </span>
      </div>
      <h3 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-blue-500 transition-colors">
        {cert.title}
      </h3>
    </div>
  </motion.div>
);
