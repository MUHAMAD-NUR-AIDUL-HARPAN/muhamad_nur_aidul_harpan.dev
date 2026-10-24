export const Button = ({
  children,
  onClick,
  variant = "primary",
  className = "",
  type = "button",
  disabled = false,
}) => {
  return (
    <div className={`relative inline-block group/btn rounded-full ${disabled ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'}`}>
      {/* 1. Animated Conic Ambient Glow Ring on Hover */}
      {!disabled && (
        <>
          <div
            className="absolute -inset-[2px] rounded-full p-[2px] overflow-hidden opacity-0 group-hover/btn:opacity-100 blur-[4px] transition-all duration-500 pointer-events-none"
            style={{
              WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
              WebkitMaskComposite: "xor",
              maskComposite: "exclude",
            }}
          >
            <div className="absolute top-1/2 left-1/2 aspect-square w-[300%] -translate-x-1/2 -translate-y-1/2 bg-[conic-gradient(from_0deg,transparent_60%,#1d4ed8_75%,#3b82f6_85%,#93c5fd_95%,transparent_100%)] animate-[spin_4s_linear_infinite]" />
          </div>

          {/* 2. Crisp Traveling Ring Beam */}
          <div
            className="absolute -inset-[1.5px] rounded-full p-[1.5px] overflow-hidden opacity-0 group-hover/btn:opacity-100 transition-all duration-500 pointer-events-none z-10"
            style={{
              WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
              WebkitMaskComposite: "xor",
              maskComposite: "exclude",
            }}
          >
            <div className="absolute top-1/2 left-1/2 aspect-square w-[300%] -translate-x-1/2 -translate-y-1/2 bg-[conic-gradient(from_0deg,transparent_60%,#2563eb_75%,#38bdf8_88%,#ffffff_96%,transparent_100%)] animate-[spin_4s_linear_infinite]" />
          </div>
        </>
      )}

      {/* 3. Button Element */}
      <button
        type={type}
        disabled={disabled}
        onClick={onClick}
        className={`relative z-0 px-7 py-3.5 rounded-full font-bold text-sm tracking-wide transition-all duration-300 flex items-center justify-center gap-2 overflow-hidden ${
          !disabled ? "hover:scale-[1.02] active:scale-[0.98]" : ""
        } ${
          variant === "primary"
            ? "bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-xl group-hover/btn:shadow-2xl group-hover/btn:shadow-blue-500/25"
            : variant === "blue"
            ? "bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-500/20"
            : "border border-slate-300/80 dark:border-slate-700/80 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md text-slate-700 dark:text-slate-300 group-hover/btn:text-blue-600 dark:group-hover/btn:text-blue-400 group-hover/btn:border-transparent"
        } ${className}`}
      >
        {variant === "primary" && (
          <span className="absolute inset-0 w-full h-full bg-gradient-to-tr from-blue-600 via-blue-500 to-indigo-600 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500 -z-10" />
        )}
        {children}
      </button>
    </div>
  );
};
