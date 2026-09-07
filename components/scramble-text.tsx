"use client";

import { useEffect, useRef, useState } from "react";

const CHARS = "!<>-_\\/[]{}—=+*^?#________";

/**
 * Text scramble effect. Letters morph through random chars before settling.
 * Re-scrambles on hover.
 */
export function ScrambleText({
  children,
  className = "",
  duration = 600,
  triggerOnHover = false,
}: {
  children: string;
  className?: string;
  duration?: number;
  triggerOnHover?: boolean;
}) {
  const [display, setDisplay] = useState(children);
  const raf = useRef<number>();
  const startTime = useRef<number>(0);

  const start = (text: string) => {
    if (raf.current) cancelAnimationFrame(raf.current);
    startTime.current = performance.now();
    const animate = () => {
      const progress = Math.min((performance.now() - startTime.current) / duration, 1);
      const locked = Math.floor(progress * text.length);
      let out = "";
      for (let i = 0; i < text.length; i++) {
        if (i < locked) {
          out += text[i];
        } else {
          const ch = text[i];
          if (ch === " ") out += " ";
          else out += CHARS[Math.floor(Math.random() * CHARS.length)];
        }
      }
      setDisplay(out);
      if (progress < 1) raf.current = requestAnimationFrame(animate);
    };
    raf.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    start(children);
    return () => {
      if (raf.current) cancelAnimationFrame(raf.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [children]);

  return (
    <span
      className={className}
      onMouseEnter={triggerOnHover ? () => start(children) : undefined}
    >
      {display}
    </span>
  );
}
