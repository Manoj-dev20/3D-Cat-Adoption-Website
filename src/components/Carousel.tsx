"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";

interface CatCard {
  name: string;
  cat: number;
  emotion: string;
  emotionColor: string;
  summary: string;
  happyTitle: string;
  happyEmotion: string;
  happyText: string;
  thumbnail: string;
}

const cats: CatCard[] = [
  {
    name: "Shadow",
    cat: 1,
    emotion: "😨 FEAR",
    emotionColor: "bg-blue-500/30 text-blue-300 border-blue-500/40",
    summary: "3 winters alone. Still waiting.",
    happyTitle: "Shadow is finally home 🏠",
    happyEmotion: "😊 Finally Home",
    happyText: "Curled up on a warm couch, finally safe.",
    thumbnail: "/demo/cat1/ezgif-frame-001.jpg",
  },
  {
    name: "Ember",
    cat: 2,
    emotion: "🥺 LONGING",
    emotionColor: "bg-purple-500/30 text-purple-300 border-purple-500/40",
    summary: "Watches through glass every night.",
    happyTitle: "Ember is finally home 🏠",
    happyEmotion: "😊 Finally Home",
    happyText: "Fed every morning, loved every day.",
    thumbnail: "/demo/cat2/ezgif-frame-001.jpg",
  },
  {
    name: "Blaze",
    cat: 3,
    emotion: "✨ HOPE",
    emotionColor: "bg-amber-500/30 text-amber-300 border-amber-500/40",
    summary: "Waited 3 weeks. Still has hope.",
    happyTitle: "Blaze is finally home 🏠",
    happyEmotion: "😊 Finally Home",
    happyText: "Found his forever person. He knew they'd come.",
    thumbnail: "/demo/cat3/ezgif-frame-001.jpg",
  },
];

const emotionBadgeColors: Record<string, { bg: string; text: string; border: string }> = {
  "😨 FEAR": { bg: "rgba(59,130,246,0.3)", text: "#93c5fd", border: "rgba(59,130,246,0.4)" },
  "🥺 LONGING": { bg: "rgba(168,85,247,0.3)", text: "#d8b4fe", border: "rgba(168,85,247,0.4)" },
  "✨ HOPE": { bg: "rgba(245,158,11,0.3)", text: "#fcd34d", border: "rgba(245,158,11,0.4)" },
};

function CarouselCard({ card }: { card: CatCard }) {
  const [isFlipped, setIsFlipped] = useState(false);

  const badge = emotionBadgeColors[card.emotion] || { bg: "rgba(255,255,255,0.1)", text: "#fff", border: "rgba(255,255,255,0.2)" };

  return (
    <div
      style={{
        width: "420px",
        height: "560px",
        flexShrink: 0,
        perspective: 1000,
      }}
    >
      <motion.div
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          transformStyle: "preserve-3d",
        }}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
      >
        {/* Front face */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            borderRadius: "16px",
            overflow: "hidden",
            border: "1px solid rgba(255,255,255,0.1)",
            backgroundColor: "#111111",
            backfaceVisibility: "hidden",
          }}
        >
          {/* Image section — top 60% */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: "60%",
              overflow: "hidden",
            }}
          >
            <img
              src={card.thumbnail}
              alt={card.name}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "center",
                display: "block",
              }}
            />
            {/* Gradient fade to card bg */}
            <div
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                height: "60px",
                background: "linear-gradient(to top, #111111, transparent)",
              }}
            />
          </div>

          {/* Text section — bottom 40% */}
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: "40%",
              padding: "20px",
              backgroundColor: "#111111",
              display: "flex",
              flexDirection: "column" as const,
              justifyContent: "space-between",
            }}
          >
            <div>
              <h3
                style={{
                  fontFamily: "var(--font-playfair), serif",
                  color: "rgba(255,255,255,0.9)",
                  fontSize: "24px",
                  margin: 0,
                }}
              >
                {card.name}
              </h3>

              <span
                style={{
                  display: "inline-block",
                  padding: "4px 12px",
                  marginTop: "8px",
                  borderRadius: "9999px",
                  fontSize: "12px",
                  fontFamily: "var(--font-inter), sans-serif",
                  border: `1px solid ${badge.border}`,
                  backgroundColor: badge.bg,
                  color: badge.text,
                }}
              >
                {card.emotion}
              </span>

              <p
                style={{
                  fontFamily: "var(--font-inter), sans-serif",
                  color: "rgba(255,255,255,0.6)",
                  fontSize: "14px",
                  marginTop: "12px",
                  lineHeight: 1.6,
                }}
              >
                {card.summary}
              </p>
            </div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsFlipped(true);
              }}
              style={{
                border: "1px solid rgba(255,255,255,0.3)",
                borderRadius: "9999px",
                padding: "8px 16px",
                fontSize: "14px",
                color: "rgba(255,255,255,0.7)",
                fontFamily: "var(--font-inter), sans-serif",
                background: "transparent",
                cursor: "none",
                transition: "all 0.3s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "white";
                e.currentTarget.style.color = "black";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.color = "rgba(255,255,255,0.7)";
              }}
            >
              ✨ Change Their Story
            </button>
          </div>
        </div>

        {/* Back face */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            borderRadius: "16px",
            overflow: "hidden",
            border: "1px solid rgba(245,158,11,0.2)",
            backgroundColor: "#2C1500",
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            display: "flex",
            flexDirection: "column" as const,
            alignItems: "center",
            justifyContent: "center",
            padding: "32px",
            textAlign: "center" as const,
          }}
        >
          <h3
            style={{
              fontFamily: "var(--font-playfair), serif",
              color: "rgba(255,255,255,0.9)",
              fontSize: "24px",
              marginBottom: "12px",
            }}
          >
            {card.happyTitle}
          </h3>

          <span
            style={{
              display: "inline-block",
              padding: "4px 12px",
              borderRadius: "9999px",
              fontSize: "12px",
              fontFamily: "var(--font-inter), sans-serif",
              border: "1px solid rgba(34,197,94,0.4)",
              backgroundColor: "rgba(34,197,94,0.3)",
              color: "#86efac",
            }}
          >
            {card.happyEmotion}
          </span>

          <p
            style={{
              fontFamily: "var(--font-inter), sans-serif",
              color: "rgba(255,255,255,0.7)",
              fontSize: "14px",
              marginTop: "16px",
              lineHeight: 1.6,
            }}
          >
            {card.happyText}
          </p>

          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsFlipped(false);
            }}
            style={{
              marginTop: "24px",
              backgroundColor: "#f59e0b",
              color: "black",
              borderRadius: "9999px",
              padding: "8px 24px",
              fontSize: "14px",
              fontWeight: 600,
              fontFamily: "var(--font-inter), sans-serif",
              border: "none",
              cursor: "none",
              transition: "all 0.3s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#fbbf24";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "#f59e0b";
            }}
          >
            Adopt {card.name} →
          </button>
        </div>
      </motion.div>
    </div>
  );
}

export default function Carousel() {
  const [isPaused, setIsPaused] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);

  // totalWidth of one set = (420 + 12) * 3 = 1296px
  const totalWidth = (420 + 12) * cats.length;

  // Duplicate cards for seamless loop
  const duplicatedCats = [...cats, ...cats];

  return (
    <section className="relative py-24 overflow-hidden" style={{ background: "#080808" }}>
      {/* Header */}
      <div className="text-center mb-16 px-6">
        <motion.h2
          className="font-playfair text-white/90 text-4xl md:text-5xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          Their stories. Their wait.
        </motion.h2>
        <motion.p
          className="font-inter text-white/50 text-base mt-2"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Still on the streets
        </motion.p>
      </div>

      {/* Continuous train carousel */}
      <div
        className="relative cursor-none"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <motion.div
          ref={trackRef}
          className="flex gap-3"
          animate={{
            x: isPaused ? undefined : [0, -totalWidth],
          }}
          transition={{
            x: {
              duration: 20,
              ease: "linear",
              repeat: Infinity,
              repeatType: "loop",
            },
          }}
          style={{ width: "fit-content" }}
        >
          {duplicatedCats.map((card, i) => (
            <CarouselCard key={`${card.name}-${i}`} card={card} />
          ))}
        </motion.div>
      </div>

      {/* Subtle film-strip indicator dots */}
      <div className="flex justify-center gap-2 mt-12">
        {cats.map((_, i) => (
          <div
            key={i}
            className="w-2 h-2 rounded-full bg-white/20"
          />
        ))}
      </div>
    </section>
  );
}
