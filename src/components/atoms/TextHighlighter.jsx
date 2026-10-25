export const TextHighlighter = ({ className = "" }) => {
  return (
    <span
      aria-hidden="true"
      className={`absolute inset-0 transform -skew-x-6 rounded-sm -z-10 overflow-hidden pointer-events-none select-none ${className}`}
    >
      <span
        className="highlighter-sweep absolute inset-0 bg-blue-200 dark:bg-blue-800/50 shadow-sm block will-change-transform transform-gpu"
      >

        <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 dark:via-blue-300/25 to-blue-400/30 pointer-events-none" />

        <span className="absolute right-0 top-0 bottom-0 w-[3px] bg-blue-500 dark:bg-blue-400 shadow-[0_0_10px_#3b82f6]" />
      </span>
    </span>
  );
};

export default TextHighlighter;
