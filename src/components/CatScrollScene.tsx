"use client";

import { useRef, useEffect, useCallback, useState } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent, AnimatePresence } from "framer-motion";

interface CatScrollSceneProps {
  cat: 1 | 2 | 3;
  totalFrames: number;
  title: string;
  emotion: string;
  emotionColor: string;
  beats: string[];
  color: string;
  chapterNum: number;
}

// Beat positions use inline styles to guarantee no overlap with the name block (top-left).
// Name block occupies roughly top:32px left:32px, extends ~160px tall.
// Beat positions are offset to ensure minimum 80px gap from the name.
interface BeatPosition {
  style: React.CSSProperties;
  scrimStyle: React.CSSProperties;
  slideFrom: { x: number; y: number };
}

const beatPositions: Record<number, BeatPosition[]> = {
  // Chapter 1: Name at top-left
  1: [
    {
      // Beat 1: bottom-left — well below name
      style: { position: "absolute", bottom: 60, left: 32, zIndex: 12 },
      scrimStyle: { position: "absolute", bottom: 0, left: 0, width: 500, height: 300, zIndex: 11 },
      slideFrom: { x: -20, y: 20 },
    },
    {
      // Beat 2: top-right — opposite side from name
      style: { position: "absolute", top: 80, right: 32, zIndex: 12 },
      scrimStyle: { position: "absolute", top: 0, right: 0, width: 500, height: 300, zIndex: 11 },
      slideFrom: { x: 20, y: -20 },
    },
    {
      // Beat 3: bottom-right
      style: { position: "absolute", bottom: 60, right: 32, zIndex: 12 },
      scrimStyle: { position: "absolute", bottom: 0, right: 0, width: 500, height: 300, zIndex: 11 },
      slideFrom: { x: 20, y: 20 },
    },
  ],
  // Chapter 2: Name at top-left
  2: [
    {
      // Beat 1: top-right
      style: { position: "absolute", top: 80, right: 32, zIndex: 12 },
      scrimStyle: { position: "absolute", top: 0, right: 0, width: 500, height: 300, zIndex: 11 },
      slideFrom: { x: 20, y: -20 },
    },
    {
      // Beat 2: bottom-left
      style: { position: "absolute", bottom: 60, left: 32, zIndex: 12 },
      scrimStyle: { position: "absolute", bottom: 0, left: 0, width: 500, height: 300, zIndex: 11 },
      slideFrom: { x: -20, y: 20 },
    },
    {
      // Beat 3: top-left — SAME corner as name, so offset down by 160px+
      style: { position: "absolute", top: 200, left: 32, zIndex: 12 },
      scrimStyle: { position: "absolute", top: 140, left: 0, width: 500, height: 300, zIndex: 11 },
      slideFrom: { x: -20, y: -20 },
    },
  ],
  // Chapter 3: Name at top-left
  3: [
    {
      // Beat 1: bottom-right
      style: { position: "absolute", bottom: 60, right: 32, zIndex: 12 },
      scrimStyle: { position: "absolute", bottom: 0, right: 0, width: 500, height: 300, zIndex: 11 },
      slideFrom: { x: 20, y: 20 },
    },
    {
      // Beat 2: top-left — SAME corner as name, offset down
      style: { position: "absolute", top: 200, left: 32, zIndex: 12 },
      scrimStyle: { position: "absolute", top: 140, left: 0, width: 500, height: 300, zIndex: 11 },
      slideFrom: { x: -20, y: -20 },
    },
    {
      // Beat 3: bottom-center
      style: { position: "absolute", bottom: 60, left: "50%", transform: "translateX(-50%)", zIndex: 12 },
      scrimStyle: { position: "absolute", bottom: 0, left: "50%", transform: "translateX(-50%)", width: 500, height: 300, zIndex: 11 },
      slideFrom: { x: 0, y: 20 },
    },
  ],
};

// Chapter-specific text styles
const chapterStyles: Record<number, {
  emotionColor: string;
  nameTextShadow: string;
  beatTextShadow: string;
  beatTextColor: string;
  beatFontWeight: number;
  scrimOpacity: number;
}> = {
  1: {
    emotionColor: "#60A5FA",
    nameTextShadow: "0 0 40px rgba(0,0,0,0.9), 0 2px 4px rgba(0,0,0,1), 0 4px 20px rgba(0,0,0,0.9), 0 8px 60px rgba(0,0,0,0.7)",
    beatTextShadow: "0 1px 0 rgba(0,0,0,1), 0 2px 4px rgba(0,0,0,0.9), 0 4px 20px rgba(0,0,0,0.8), 0 8px 40px rgba(0,0,0,0.6)",
    beatTextColor: "rgba(255,255,255,0.75)",
    beatFontWeight: 400,
    scrimOpacity: 0.5,
  },
  2: {
    emotionColor: "#C084FC",
    nameTextShadow: "0 0 40px rgba(0,0,0,0.9), 0 0 60px rgba(168,85,247,0.4), 0 2px 4px rgba(0,0,0,1), 0 4px 20px rgba(0,0,0,0.9), 0 8px 60px rgba(0,0,0,0.7)",
    beatTextShadow: "0 1px 0 rgba(0,0,0,1), 0 2px 4px rgba(0,0,0,0.9), 0 4px 20px rgba(0,0,0,0.8), 0 8px 40px rgba(0,0,0,0.6)",
    beatTextColor: "rgba(255,255,255,0.75)",
    beatFontWeight: 400,
    scrimOpacity: 0.5,
  },
  3: {
    emotionColor: "#FCD34D",
    nameTextShadow: "0 0 40px rgba(0,0,0,0.9), 0 0 80px rgba(251,191,36,0.5), 0 0 120px rgba(251,191,36,0.2), 0 2px 4px rgba(0,0,0,1), 0 4px 20px rgba(0,0,0,1), 0 8px 60px rgba(0,0,0,1)",
    beatTextShadow: "0 1px 0 rgba(0,0,0,1), 0 2px 4px rgba(0,0,0,1), 0 4px 20px rgba(0,0,0,1), 0 8px 40px rgba(0,0,0,0.8)",
    beatTextColor: "rgba(255,255,255,1)",
    beatFontWeight: 500,
    scrimOpacity: 0.65,
  },
};

export default function CatScrollScene({
  cat,
  totalFrames,
  title,
  emotion,
  beats,
  color,
  chapterNum,
}: CatScrollSceneProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [currentBeat, setCurrentBeat] = useState(0);
  const [frames, setFrames] = useState<HTMLImageElement[]>([]);
  const lastFrameIndexRef = useRef(-1);
  const dprRef = useRef(1);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const frameIndex = useTransform(scrollYProgress, [0, 1], [0, totalFrames - 1]);

  // Preload frames for this cat
  useEffect(() => {
    const loadedFrames: HTMLImageElement[] = [];
    let loadCount = 0;

    for (let i = 1; i <= totalFrames; i++) {
      const img = new Image();
      img.src = `/demo/cat${cat}/ezgif-frame-${String(i).padStart(3, "0")}.jpg`;
      img.onload = () => {
        loadCount++;
        if (loadCount === totalFrames) {
          setFrames([...loadedFrames]);
        }
      };
      loadedFrames.push(img);
    }
  }, [cat, totalFrames]);

  // Draw frame on canvas with DPR-aware rendering
  const drawFrame = useCallback(
    (index: number) => {
      const canvas = canvasRef.current;
      if (!canvas || frames.length === 0) return;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const img = frames[index];
      if (!img || !img.complete) return;

      const dpr = dprRef.current;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const cssWidth = canvas.width / dpr;
      const cssHeight = canvas.height / dpr;

      const scale = Math.max(
        cssWidth / img.naturalWidth,
        cssHeight / img.naturalHeight
      );
      const x = (cssWidth - img.naturalWidth * scale) / 2;
      const y = (cssHeight - img.naturalHeight * scale) / 2;

      ctx.drawImage(img, x, y, img.naturalWidth * scale, img.naturalHeight * scale);
    },
    [frames]
  );

  // Listen to scroll and update canvas
  useMotionValueEvent(frameIndex, "change", (latest) => {
    const idx = Math.min(Math.floor(latest), totalFrames - 1);
    if (idx !== lastFrameIndexRef.current && idx >= 0) {
      lastFrameIndexRef.current = idx;
      requestAnimationFrame(() => drawFrame(idx));
    }

    // Calculate which beat to show
    const progress = latest / (totalFrames - 1);
    if (progress < 0.33) setCurrentBeat(0);
    else if (progress < 0.66) setCurrentBeat(1);
    else setCurrentBeat(2);
  });

  // Handle canvas resize with DPR
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const handleResize = () => {
      const dpr = window.devicePixelRatio || 1;
      dprRef.current = dpr;

      canvas.style.width = window.innerWidth + "px";
      canvas.style.height = window.innerHeight + "px";
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;

      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.scale(dpr, dpr);
      }

      if (lastFrameIndexRef.current >= 0) {
        drawFrame(lastFrameIndexRef.current);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [drawFrame]);

  // Draw first frame once loaded
  useEffect(() => {
    if (frames.length > 0 && lastFrameIndexRef.current < 0) {
      lastFrameIndexRef.current = 0;
      drawFrame(0);
    }
  }, [frames, drawFrame]);

  const styles = chapterStyles[chapterNum] || chapterStyles[1];
  const positions = beatPositions[chapterNum] || beatPositions[1];

  return (
    <div
      ref={containerRef}
      className="relative"
      style={{ height: "500vh", background: color }}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Canvas */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0"
        />

        {/* Warm overlay for cat3 */}
        {cat === 3 && (
          <div className="absolute inset-0 bg-amber-900/20 mix-blend-multiply pointer-events-none" />
        )}

        {/* Vignette overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.6) 100%)",
          }}
        />

        {/* ===== NAME ELEMENT — independent absolute positioned, top-left ===== */}
        {/* Scrim behind the name */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: 500,
            height: 300,
            background: `radial-gradient(ellipse at center, rgba(0,0,0,${styles.scrimOpacity}) 0%, transparent 70%)`,
            pointerEvents: "none",
            zIndex: 9,
          }}
        />
        <motion.div
          style={{
            position: "absolute",
            top: 32,
            left: 32,
            zIndex: 13,
          }}
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Emotion tag */}
          <span
            style={{
              fontFamily: "var(--font-inter), sans-serif",
              fontWeight: 300,
              fontSize: "13px",
              color: styles.emotionColor,
              letterSpacing: "0.5em",
              textTransform: "uppercase",
              display: "block",
              marginBottom: "8px",
              textShadow: "0 1px 4px rgba(0,0,0,0.8)",
            }}
          >
            {emotion}
          </span>

          {/* Chapter name */}
          <h2
            style={{
              fontFamily: "var(--font-bebas), sans-serif",
              fontSize: "96px",
              color: "white",
              letterSpacing: "0.3em",
              textShadow: styles.nameTextShadow,
              lineHeight: 0.9,
              margin: 0,
              padding: 0,
            }}
          >
            {title}
          </h2>
        </motion.div>

        {/* Chapter counter - top right */}
        <div style={{ position: "absolute", top: 32, right: 32, zIndex: 13 }}>
          <span
            style={{
              fontFamily: "var(--font-inter), sans-serif",
              color: "rgba(255,255,255,0.5)",
              fontSize: "12px",
              textShadow: "0 1px 4px rgba(0,0,0,0.6)",
            }}
          >
            Ch {chapterNum} / 3
          </span>
        </div>

        {/* ===== BEAT TEXT — independent absolute positioned, NEVER overlapping name ===== */}
        <AnimatePresence mode="wait">
          {beats.map((beat, i) =>
            currentBeat === i ? (
              <motion.div
                key={`beat-${chapterNum}-${i}`}
                // We pass nothing via className, everything inline
                style={{ ...positions[i].style, maxWidth: 420 }}
                initial={{
                  opacity: 0,
                  x: positions[i].slideFrom.x,
                  y: positions[i].slideFrom.y,
                }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
                {/* Scrim behind this beat */}
                <div
                  style={{
                    ...positions[i].scrimStyle,
                    background: `radial-gradient(ellipse at center, rgba(0,0,0,${styles.scrimOpacity}) 0%, transparent 70%)`,
                    pointerEvents: "none",
                  }}
                />
                <p
                  style={{
                    fontFamily: "var(--font-playfair), serif",
                    fontStyle: "italic",
                    fontSize: "22px",
                    color: styles.beatTextColor,
                    fontWeight: styles.beatFontWeight,
                    lineHeight: 1.6,
                    margin: 0,
                    padding: 0,
                    maxWidth: "420px",
                    textShadow: styles.beatTextShadow,
                    position: "relative",
                    zIndex: 2,
                  }}
                >
                  {beat}
                </p>
              </motion.div>
            ) : null
          )}
        </AnimatePresence>

        {/* Progress dots - right edge (desktop only) */}
        <div className="absolute right-6 top-1/2 -translate-y-1/2 hidden md:flex flex-col gap-3 z-10">
          {[1, 2, 3].map((dot) => {
            const dotColors: Record<number, string> = {
              1: "bg-blue-400 shadow-blue-400/60",
              2: "bg-purple-400 shadow-purple-400/60",
              3: "bg-amber-400 shadow-amber-400/60",
            };
            return (
              <div
                key={dot}
                className={`rounded-full transition-all duration-500 ${
                  dot === chapterNum
                    ? `w-2.5 h-2.5 ${dotColors[chapterNum]} shadow-lg`
                    : "w-1.5 h-1.5 bg-white/30"
                }`}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
