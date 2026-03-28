"use client";

import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section
      className="relative h-screen flex flex-col items-center justify-center text-center px-6"
      style={{ background: "#0A0E1A" }}
    >
      {/* Subtle radial glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-20"
          style={{
            background:
              "radial-gradient(circle, rgba(245,158,11,0.15) 0%, transparent 70%)",
          }}
        />
      </div>

      <motion.span
        className="font-bebas text-sm tracking-[0.3em] text-white/50 mb-6 uppercase"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        A Story Worth Telling
      </motion.span>

      <motion.h1
        className="font-playfair text-white/90 leading-[1.1] max-w-4xl"
        style={{
          fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
        }}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
      >
        They didn&apos;t choose the streets
      </motion.h1>

      <motion.p
        className="font-inter text-white/60 text-lg mt-6 max-w-md"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.9 }}
      >
        Three cats. Three stories. One chance.
      </motion.p>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.2 }}
      >
        <motion.span
          className="font-inter text-white/40 text-sm"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          ↓ Begin their story
        </motion.span>
      </motion.div>
    </section>
  );
}
