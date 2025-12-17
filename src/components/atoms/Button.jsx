import { motion } from "framer-motion";

export const Button = ({
  children,
  onClick,
  variant = "primary",
  className = "",
}) => {
  const baseStyle =
    "px-6 py-3 rounded-full font-bold transition-all flex items-center gap-2 cursor-pointer";

  const variants = {
    primary:
      "bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-500/30",
    outline:
      "border-2 border-gray-300 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-400 hover:text-blue-500 dark:hover:text-blue-400 bg-transparent text-gray-700 dark:text-white",
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`${baseStyle} ${variants[variant]} ${className}`}
    >
      {children}
    </motion.button>
  );
};
