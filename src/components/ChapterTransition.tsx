"use client";

import { motion } from "framer-motion";

interface ChapterTransitionProps {
  title: string;
}

export default function ChapterTransition({ title }: ChapterTransitionProps) {
  return (
    <section className="relative h-[30vh] bg-black flex items-center justify-center overflow-hidden">
      {/* Subtle gradient edges */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 w-full h-16 bg-gradient-to-b from-black to-transparent" />
        <div className="absolute bottom-0 w-full h-16 bg-gradient-to-t from-black to-transparent" />
      </div>

      <motion.h2
        className="font-playfair italic text-white/70 text-3xl md:text-4xl text-center px-6"
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: false, amount: 0.5 }}
        transition={{ duration: 0.8 }}
      >
        {title}
      </motion.h2>
    </section>
  );
}
