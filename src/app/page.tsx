"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Preloader from "@/components/Preloader";
import PawCursor from "@/components/PawCursor";
import Hero from "@/components/Hero";
import CatScrollScene from "@/components/CatScrollScene";
import ChapterTransition from "@/components/ChapterTransition";
import Carousel from "@/components/Carousel";
import FinalCTA from "@/components/FinalCTA";

export default function Home() {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      <Preloader onComplete={() => setLoaded(true)} />
      <PawCursor />

      <AnimatePresence>
        {loaded && (
          <motion.main
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            {/* HERO */}
            <Hero />

            {/* CHAPTER 1 — SHADOW */}
            <CatScrollScene
              cat={1}
              totalFrames={72}
              title="SHADOW"
              emotion="😨 FEAR"
              emotionColor="blue"
              beats={[
                "Born behind a restaurant on the coldest night of winter...",
                "Survived 3 winters alone in this alley...",
                "Still waits every night for someone to notice him.",
              ]}
              color="#0A0E1A"
              chapterNum={1}
            />

            {/* TRANSITION 1 */}
            <ChapterTransition title="Chapter 2 — Ember" />

            {/* CHAPTER 2 — EMBER */}
            <CatScrollScene
              cat={2}
              totalFrames={76}
              title="EMBER"
              emotion="🥺 LONGING"
              emotionColor="purple"
              beats={[
                "She watches families eat through the restaurant glass every night...",
                "Gets chased away every morning before the city wakes...",
                "But she never stops coming back. She never stops hoping.",
              ]}
              color="#0D1117"
              chapterNum={2}
            />

            {/* TRANSITION 2 */}
            <ChapterTransition title="Chapter 3 — Blaze" />

            {/* CHAPTER 3 — BLAZE */}
            <CatScrollScene
              cat={3}
              totalFrames={96}
              title="BLAZE"
              emotion="✨ HOPE"
              emotionColor="amber"
              beats={[
                "A kind stranger fed him every day for a month...",
                "One day they stopped coming. He waited 3 weeks.",
                "He still believes the next person who finds him will stay.",
              ]}
              color="#1A0F00"
              chapterNum={3}
            />

            {/* CAROUSEL */}
            <Carousel />

            {/* FINAL CTA */}
            <FinalCTA />
          </motion.main>
        )}
      </AnimatePresence>
    </>
  );
}
