import { motion } from "framer-motion";

export const Avatar = ({ src }) => (
  <motion.div
    initial={{ scale: 0.5, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    transition={{ type: "spring", stiffness: 100 }}
    className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-white dark:border-gray-800 shadow-2xl z-10"
  >
    <img src={src} alt="Profile" className="w-full h-full object-cover" />
  </motion.div>
);
