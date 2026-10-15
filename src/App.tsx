/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { SiteNav } from './components/SiteNav.tsx';
import { HeroSection } from './components/HeroSection.tsx';
import { ParallaxGallery } from './components/ParallaxGallery.tsx';
import { PrintsSection } from './components/PrintsSection.tsx';
import { AuthPage } from './components/AuthPage.tsx';

export default function App() {
  const [activeCategory, setActiveCategory] = useState<number>(0);
  const [showAuth, setShowAuth] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');

  const handleScrollDown = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    });
  };

  const handleSelectCategory = (index: number) => {
    setActiveCategory(index);
    const el = document.getElementById('collections');
    if (el) {
      const start = el.offsetTop;
      const height = el.offsetHeight - window.innerHeight;
      const target = start + (index / 3) * height;
      window.scrollTo({ top: target, behavior: 'smooth' });
    }
  };

  const handleOpenAuth = (mode: 'login' | 'signup' = 'login') => {
    setAuthMode(mode);
    setShowAuth(true);
  };

  return (
    <div className="min-h-screen bg-black text-white selection:bg-white selection:text-black">
      {/* Site Navigation Section */}
      <SiteNav
        onSelectCategory={handleSelectCategory}
        activeCategory={activeCategory}
        onOpenAuth={handleOpenAuth}
      />

      {/* Frame 00:00: Explore our works collections below */}
      <HeroSection onScrollClick={handleScrollDown} />

      {/* Frames 00:01 - 00:05: Horizontal Gallery with Clothing, Product, Course, Others */}
      <ParallaxGallery />

      {/* Frame 00:06: Build you're website with us for you're brand */}
      <PrintsSection onOrderNow={() => handleOpenAuth('signup')} />

      {/* Three.js Animated Login / Sign Up Page */}
      {showAuth && (
        <AuthPage
          onClose={() => setShowAuth(false)}
          initialMode={authMode}
        />
      )}
    </div>
  );
}
