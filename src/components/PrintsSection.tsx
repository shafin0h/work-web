import React from 'react';

interface PrintsSectionProps {
  onOrderNow?: () => void;
}

export const PrintsSection: React.FC<PrintsSectionProps> = ({ onOrderNow }) => {
  return (
    <section
      id="prints"
      className="h-screen w-full bg-black flex flex-col items-center justify-center px-4 sm:px-6 text-center select-none gap-10 sm:gap-14"
    >
      <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-bold text-white tracking-tight leading-[1.08]">
        Build you're website with us<br />
        for you're brand
      </h2>

      {/* Meridian Keycap Primary Button */}
      <button
        type="button"
        onClick={onOrderNow}
        className="threeui-page-button threeui-page-button--meridian threeui-page-button--meridian-primary"
      >
        <span className="threeui-page-button__led" />
        <span>Order Now</span>
      </button>
    </section>
  );
};
