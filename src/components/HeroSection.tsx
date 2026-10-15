import React from 'react';
import { WavesBackground } from './WavesBackground.tsx';

interface HeroSectionProps {
  onScrollClick: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onScrollClick }) => {
  return (
    <section className="relative h-screen w-full bg-black flex flex-col items-center justify-center px-4 sm:px-6 text-center select-none overflow-hidden">
      {/* 21st.dev Waves WebGL Shader Background */}
      <WavesBackground />

      {/* Subtle radial dark overlay for cinematic depth and text legibility */}
      <div className="absolute inset-0 bg-radial-gradient from-black/10 via-black/40 to-black/80 pointer-events-none z-1" />

      {/* Hero Content */}
      <div className="relative z-10 flex flex-col items-center">
        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-bold text-white tracking-tight leading-[1.08] drop-shadow-xl">
          Explore our works<br />
          collections below
        </h1>

        <button
          onClick={onScrollClick}
          className="mt-16 sm:mt-24 inline-flex items-center gap-1.5 text-sm md:text-base font-normal text-white hover:text-neutral-300 transition-colors cursor-pointer"
        >
          <span>Scroll down</span>
          <span className="text-base">↓</span>
        </button>
      </div>
    </section>
  );
};
