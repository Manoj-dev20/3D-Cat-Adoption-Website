"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function PawCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springX = useSpring(cursorX, { stiffness: 500, damping: 28 });
  const springY = useSpring(cursorY, { stiffness: 500, damping: 28 });

  useEffect(() => {
    // Only show on fine pointer (non-touch) devices
    if (window.matchMedia("(pointer: fine)").matches) {
      setIsVisible(true);
    }

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 12);
      cursorY.set(e.clientY - 12);
    };

    window.addEventListener("mousemove", moveCursor);
    return () => window.removeEventListener("mousemove", moveCursor);
  }, [cursorX, cursorY]);

  if (!isVisible) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 z-[9998] pointer-events-none mix-blend-difference"
      style={{ x: springX, y: springY }}
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
      >
        <path
          d="M12 18c-2.5 0-4.5-1.5-4.5-3.5S9.5 11 12 11s4.5 1.5 4.5 3.5S14.5 18 12 18z"
          fill="rgba(255,255,255,0.9)"
        />
        <circle cx="8" cy="9" r="1.8" fill="rgba(255,255,255,0.9)" />
        <circle cx="16" cy="9" r="1.8" fill="rgba(255,255,255,0.9)" />
        <circle cx="10" cy="6" r="1.5" fill="rgba(255,255,255,0.9)" />
        <circle cx="14" cy="6" r="1.5" fill="rgba(255,255,255,0.9)" />
      </svg>
    </motion.div>
  );
}
