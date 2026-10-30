import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const ScrollScrubText = ({
  text = "",
  className = "",
  start = "top 88%",
  end = "bottom 55%",
  baseOpacity = 0.2,
}) => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const words = containerRef.current.querySelectorAll(".scrub-word");
    if (!words.length) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        words,
        { opacity: baseOpacity, y: 2 },
        {
          opacity: 1,
          y: 0,
          ease: "none",
          stagger: 0.08,
          scrollTrigger: {
            trigger: containerRef.current,
            start,
            end,
            scrub: 0.5,
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [text, start, end, baseOpacity]);

  const words = (text || "").split(" ");

  return (
    <span ref={containerRef} className={`inline-block ${className}`}>
      {words.map((word, i) => (
        <span
          key={i}
          className="scrub-word inline-block mr-[0.28em] will-change-[opacity,transform]"
        >
          {word}
        </span>
      ))}
    </span>
  );
};

export default ScrollScrubText;
