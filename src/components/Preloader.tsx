"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface PreloaderProps {
  onComplete: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const totalFrames = 244;
    let loaded = 0;
    const images: HTMLImageElement[] = [];

    const catConfigs = [
      { cat: 1, frames: 72 },
      { cat: 2, frames: 76 },
      { cat: 3, frames: 96 },
    ];

    const onLoad = () => {
      loaded++;
      setProgress(Math.round((loaded / totalFrames) * 100));
      if (loaded >= totalFrames) {
        setTimeout(() => setDone(true), 400);
        setTimeout(() => onComplete(), 1200);
      }
    };

    catConfigs.forEach(({ cat, frames }) => {
      for (let i = 1; i <= frames; i++) {
        const img = new Image();
        img.src = `/demo/cat${cat}/ezgif-frame-${String(i).padStart(3, "0")}.jpg`;
        img.onload = onLoad;
        img.onerror = onLoad;
        images.push(img);
      }
    });

    return () => {
      images.forEach((img) => {
        img.onload = null;
        img.onerror = null;
      });
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[9999] bg-black flex flex-col items-center justify-center"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          {/* Animated paw prints walking across */}
          <div className="relative w-64 h-20 mb-12 overflow-hidden">
            <motion.div
              className="absolute top-0 left-0 flex gap-6 items-end"
              animate={{ x: ["-100%", "300%"] }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              {[0, 1, 2, 3].map((i) => (
                <motion.svg
                  key={i}
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="opacity-80"
                  style={{
                    transform: i % 2 === 0 ? "translateY(-8px) rotate(-15deg)" : "rotate(15deg)",
                  }}
                >
                  <motion.path
                    d="M12 18c-2.5 0-4.5-1.5-4.5-3.5S9.5 11 12 11s4.5 1.5 4.5 3.5S14.5 18 12 18z"
                    fill="rgba(245, 158, 11, 0.8)"
                    animate={{ opacity: [0.4, 1, 0.4] }}
                    transition={{
                      duration: 0.6,
                      delay: i * 0.15,
                      repeat: Infinity,
                    }}
                  />
                  <motion.circle
                    cx="8"
                    cy="9"
                    r="1.8"
                    fill="rgba(245, 158, 11, 0.8)"
                    animate={{ opacity: [0.4, 1, 0.4] }}
                    transition={{
                      duration: 0.6,
                      delay: i * 0.15,
                      repeat: Infinity,
                    }}
                  />
                  <motion.circle
                    cx="16"
                    cy="9"
                    r="1.8"
                    fill="rgba(245, 158, 11, 0.8)"
                    animate={{ opacity: [0.4, 1, 0.4] }}
                    transition={{
                      duration: 0.6,
                      delay: i * 0.15,
                      repeat: Infinity,
                    }}
                  />
                  <motion.circle
                    cx="10"
                    cy="6"
                    r="1.5"
                    fill="rgba(245, 158, 11, 0.8)"
                    animate={{ opacity: [0.4, 1, 0.4] }}
                    transition={{
                      duration: 0.6,
                      delay: i * 0.15,
                      repeat: Infinity,
                    }}
                  />
                  <motion.circle
                    cx="14"
                    cy="6"
                    r="1.5"
                    fill="rgba(245, 158, 11, 0.8)"
                    animate={{ opacity: [0.4, 1, 0.4] }}
                    transition={{
                      duration: 0.6,
                      delay: i * 0.15,
                      repeat: Infinity,
                    }}
                  />
                </motion.svg>
              ))}
            </motion.div>
          </div>

          {/* Loading text */}
          <motion.p
            className="font-inter text-white/50 text-sm tracking-wider mb-8"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Loading their stories...
          </motion.p>

          {/* Progress bar */}
          <div className="w-64 h-[2px] bg-white/10 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-amber-600 to-amber-400 rounded-full"
              style={{ width: `${progress}%` }}
              transition={{ duration: 0.1 }}
            />
          </div>

          {/* Progress number */}
          <motion.p className="font-bebas text-amber-500/80 text-lg mt-4 tracking-widest">
            {progress}%
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
