"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function FinalCTA() {
  const [thankYou, setThankYou] = useState(false);

  const catNames = ["Shadow", "Ember", "Blaze"];

  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-center text-center px-6"
      style={{
        background: "linear-gradient(to bottom, #2C1500, #0A0000)",
      }}
    >
      {/* Ambient glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full opacity-15"
          style={{
            background:
              "radial-gradient(ellipse, rgba(245,158,11,0.3) 0%, transparent 70%)",
          }}
        />
      </div>

      <motion.span
        className="font-bebas text-amber-500/60 text-sm tracking-[0.3em] uppercase mb-6"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        Make a difference today
      </motion.span>

      <motion.h2
        className="font-playfair text-white/90 max-w-3xl leading-[1.1]"
        style={{ fontSize: "clamp(2.25rem, 5vw, 4rem)" }}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        One home changes everything
      </motion.h2>

      <motion.p
        className="font-inter text-white/60 text-lg mt-4"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        Shadow, Ember, and Blaze are waiting.
      </motion.p>

      {/* Adopt buttons */}
      <div className="flex flex-col md:flex-row gap-3 md:gap-4 mt-10">
        {catNames.map((name, i) => (
          <motion.button
            key={name}
            className="border border-amber-500/50 text-amber-400 rounded-full px-8 py-3 font-inter font-semibold text-sm hover:bg-amber-500 hover:text-black transition-all duration-300 cursor-none"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 + i * 0.2 }}
            onClick={() => setThankYou(true)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            🐾 Adopt {name}
          </motion.button>
        ))}
      </div>

      <motion.p
        className="font-inter text-white/40 text-sm mt-6"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 1.2 }}
      >
        Free adoption. Forever love.
      </motion.p>

      {/* Thank you message */}
      <AnimatePresence>
        {thankYou && (
          <motion.p
            className="font-playfair italic text-amber-400/80 text-lg mt-8"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            🐾 Thank you! We&apos;ll be in touch soon.
          </motion.p>
        )}
      </AnimatePresence>
    </section>
  );
}
