import { motion } from "framer-motion";

export const InputGroup = ({
  label,
  type = "text",
  name,
  value,
  onChange,
  textarea = false,
}) => {
  return (
    <div className="relative mb-6 group">
      {textarea ? (
        <textarea
          name={name}
          value={value}
          onChange={onChange}
          required
          rows="4"
          className="block w-full px-4 py-4 text-gray-900 dark:text-white bg-transparent border-2 border-gray-200 dark:border-gray-800 rounded-xl appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 dark:focus:border-blue-500 peer resize-none transition-colors"
          placeholder=" "
        />
      ) : (
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          required
          className="block w-full px-4 py-4 text-gray-900 dark:text-white bg-transparent border-2 border-gray-200 dark:border-gray-800 rounded-xl appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 dark:focus:border-blue-500 peer transition-colors"
          placeholder=" "
        />
      )}

      {/* Floating Label Logic */}
      <label className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-[#0a0a0a] px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-3 cursor-text">
        {label}
      </label>
    </div>
  );
};
