import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'motion/react';
import { COLLECTIONS } from '../data/collections.ts';
import { LandscapeArt } from './LandscapeArt.tsx';

export const ParallaxGallery: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Monitor scroll progress across this multi-height section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  });

  // Smooth out scroll value with physics spring for a luxury, fluid feel
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 26,
    mass: 0.8
  });

  // Exactly 4 cards: translate from 0vw to -300vw across 4 screen widths
  const x = useTransform(smoothProgress, [0, 1], ['0vw', '-300vw']);

  return (
    <div ref={containerRef} id="collections" className="relative h-[400vh] bg-black">
      {/* Pinned Sticky Viewport */}
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-black flex items-center">
        {/* Horizontal Track */}
        <motion.div
          style={{ x }}
          className="flex h-screen will-change-transform"
        >
          {COLLECTIONS.map((item, index) => (
            <Card
              key={item.id}
              item={item}
              index={index}
              total={COLLECTIONS.length}
              smoothProgress={smoothProgress}
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
};

interface CardProps {
  item: typeof COLLECTIONS[0];
  index: number;
  total: number;
  smoothProgress: any;
}

const Card: React.FC<CardProps> = ({ item, index, total, smoothProgress }) => {
  // Inner parallax calculation for the landscape artwork
  const startInput = Math.max(0, (index - 0.8) / (total - 1));
  const endInput = Math.min(1, (index + 0.8) / (total - 1));

  const innerX = useTransform(smoothProgress, [startInput, endInput], ['-4%', '4%']);
  const innerScale = useTransform(
    smoothProgress,
    [startInput, (startInput + endInput) / 2, endInput],
    [1.06, 1.0, 1.06]
  );

  return (
    <div className="w-screen h-screen flex items-center justify-center p-3 sm:p-5 md:p-6 lg:p-7 shrink-0 select-none">
      <div className="w-full h-full rounded-2xl sm:rounded-3xl md:rounded-[32px] overflow-hidden relative bg-neutral-950">
        {/* Landscape Artwork with inner parallax */}
        <motion.div
          style={{
            x: innerX,
            scale: innerScale
          }}
          className="absolute -inset-6 will-change-transform"
        >
          <LandscapeArt id={item.id} className="w-full h-full object-cover" />
        </motion.div>

        {/* Bottom dark gradient overlay for text legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent pointer-events-none" />

        {/* Title at bottom-left - Exactly matching the video */}
        <div className="absolute bottom-6 sm:bottom-10 md:bottom-12 lg:bottom-14 left-6 sm:left-10 md:left-12 lg:left-14 z-10 pointer-events-none">
          <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white tracking-tight leading-none drop-shadow-md">
            {item.title}
          </h2>
        </div>
      </div>
    </div>
  );
};
