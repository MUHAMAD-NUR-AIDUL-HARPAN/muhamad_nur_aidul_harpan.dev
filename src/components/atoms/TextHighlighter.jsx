import { useEffect, useRef, useState } from "react";

export const TextHighlighter = ({ className = "" }) => {
  const containerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        } else if (entry.boundingClientRect.top > window.innerHeight) {
          setIsVisible(false);
        }
      },
      {
        threshold: 0.25,
        rootMargin: "0px 0px -40px 0px",
      }
    );

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <span
      ref={containerRef}
      aria-hidden="true"
      className={`absolute inset-0 transform -skew-x-6 rounded-md -z-10 overflow-hidden pointer-events-none select-none ${className}`}
    >
      <span
        style={{
          transformOrigin: "left center",
          transform: isVisible ? "scaleX(1)" : "scaleX(0)",
          transition: "transform 1.4s cubic-bezier(0.25, 1, 0.5, 1) 0.15s",
        }}  
        className="absolute inset-0 bg-blue-200/80 dark:bg-blue-600/30 rounded-md block will-change-transform transform-gpu"
      >
        <span className="absolute inset-0 bg-gradient-to-r from-blue-300/10 via-white/30 dark:via-blue-400/20 to-blue-400/30 pointer-events-none" />
        <span className="absolute right-0 top-0 bottom-0 w-[4px] bg-blue-500 dark:bg-blue-400 shadow-[0_0_12px_#3b82f6] rounded-r-sm" />
      </span>
    </span>
  );
};

export default TextHighlighter;
