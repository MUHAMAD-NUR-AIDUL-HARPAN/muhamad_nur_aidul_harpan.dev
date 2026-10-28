const maskStyle = {
  WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
  WebkitMaskComposite: "xor",
  mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
  maskComposite: "exclude",
};

export const ButtonRing = ({
  rounded = "rounded-full",
  variant = "blue",
  className = "",
}) => {
  const isEmerald = variant === "emerald";
  const conicFront = isEmerald
    ? "bg-[conic-gradient(from_0deg,transparent_35%,#059669_65%,#34d399_82%,#ffffff_96%,transparent_100%)]"
    : "bg-[conic-gradient(from_0deg,transparent_35%,#2563eb_65%,#38bdf8_82%,#ffffff_96%,transparent_100%)]";
  const conicBack = isEmerald
    ? "bg-[conic-gradient(from_0deg,transparent_35%,#047857_65%,#10b981_80%,#6ee7b7_90%,#ffffff_98%,transparent_100%)]"
    : "bg-[conic-gradient(from_0deg,transparent_35%,#1d4ed8_65%,#3b82f6_80%,#60a5fa_90%,#ffffff_98%,transparent_100%)]";

  return (
    <>
      <div
        className={`absolute -inset-[2px] ${rounded} p-[2px] overflow-hidden opacity-0 group-hover:opacity-100 group-hover/btn:opacity-100 group-hover/viewcv:opacity-100 group-hover/dlcv:opacity-100 group-hover/submit:opacity-100 group-hover/wa:opacity-100 group-hover/logo:opacity-100 group-hover/menu:opacity-100 group-hover/social:opacity-100 transition-opacity duration-400 pointer-events-none z-10 ${className}`}
        style={maskStyle}
      >
        <div className={`absolute top-1/2 left-1/2 aspect-square w-[300%] -translate-x-1/2 -translate-y-1/2 ${conicFront} animate-[spin_2.5s_linear_infinite]`} />
      </div>
      <div
        className={`absolute -inset-[3px] ${rounded} p-[3px] overflow-hidden opacity-0 group-hover:opacity-100 group-hover/btn:opacity-100 group-hover/viewcv:opacity-100 group-hover/dlcv:opacity-100 group-hover/submit:opacity-100 group-hover/wa:opacity-100 group-hover/logo:opacity-100 group-hover/menu:opacity-100 group-hover/social:opacity-100 blur-[4px] transition-opacity duration-400 pointer-events-none z-0 ${className}`}
        style={maskStyle}
      >
        <div className={`absolute top-1/2 left-1/2 aspect-square w-[300%] -translate-x-1/2 -translate-y-1/2 ${conicBack} animate-[spin_2.5s_linear_infinite]`} />
      </div>
    </>
  );
};

export default ButtonRing;
