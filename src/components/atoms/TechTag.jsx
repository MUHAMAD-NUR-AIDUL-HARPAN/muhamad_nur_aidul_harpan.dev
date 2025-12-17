import { motion } from "framer-motion";

export const TechTag = ({ label, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.05, type: "spring" }}
      whileHover={{
        scale: 1.1,
        rotate: 2,
        backgroundColor: "#3b82f6",
        color: "#fff",
      }}
      className="px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 rounded-lg text-sm font-semibold border border-gray-200 dark:border-gray-700 cursor-default transition-colors duration-300"
    >
      {label}
    </motion.div>
  );
};
