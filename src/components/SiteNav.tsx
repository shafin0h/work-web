import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';

interface SiteNavProps {
  onSelectCategory?: (index: number) => void;
  activeCategory?: number;
  onOpenAuth?: (mode: 'login' | 'signup') => void;
}

const GlowGetStartedButton: React.FC<{ onClick: () => void; className?: string }> = ({ onClick, className = '' }) => (
  <button type="button" onClick={onClick} className={`glow-button ${className}`}>
    <div className="points_wrapper">
      <i className="point"></i>
      <i className="point"></i>
      <i className="point"></i>
      <i className="point"></i>
      <i className="point"></i>
      <i className="point"></i>
      <i className="point"></i>
      <i className="point"></i>
      <i className="point"></i>
      <i className="point"></i>
    </div>

    <span className="inner">
      Get Start
      <svg
        className="icon"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      >
        <path d="M5 12h14"></path>
        <path d="m12 5 7 7-7 7"></path>
      </svg>
    </span>
  </button>
);

export const SiteNav: React.FC<SiteNavProps> = ({ onSelectCategory, activeCategory = 0, onOpenAuth }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'home' | 'works' | 'contact' | 'order'>('home');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
      const collectionsEl = document.getElementById('collections');
      const printsEl = document.getElementById('prints');
      const scrollPos = window.scrollY + 200;

      if (printsEl && scrollPos >= printsEl.offsetTop) {
        setActiveTab('contact');
      } else if (collectionsEl && scrollPos >= collectionsEl.offsetTop) {
        setActiveTab('works');
      } else {
        setActiveTab('home');
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const handleNavClick = (target: 'home' | 'works' | 'contact' | 'order') => {
    setActiveTab(target);
    setIsMobileMenuOpen(false);

    if (target === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (target === 'works') {
      const el = document.getElementById('collections');
      if (el) {
        window.scrollTo({ top: el.offsetTop, behavior: 'smooth' });
      }
    } else if (target === 'contact' || target === 'order') {
      const el = document.getElementById('prints');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <>
      <header className={`site-nav ${isScrolled ? 'site-nav--scrolled' : ''}`}>
        <div className="site-nav__inner">
          {/* Left Side: Brand Logo & Mobile Trigger */}
          <div className="site-nav__left">
            <button
              type="button"
              className="site-nav__menu"
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="Open mobile menu"
            >
              <Menu />
            </button>

            {/* Logo positioned on the Left Side */}
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="site-nav__logo"
              aria-label="Home"
            >
              <svg
                viewBox="0 0 140 22"
                fill="none"
                className="w-full h-auto"
                xmlns="http://www.w3.org/2000/svg"
              >
                <text
                  x="0"
                  y="16"
                  textAnchor="start"
                  fill="#ffffff"
                  fontFamily="'Outfit', system-ui, sans-serif"
                  fontWeight="800"
                  fontSize="15"
                  letterSpacing="0.22em"
                >
                  TERRAFORM
                </text>
              </svg>
            </a>
          </div>

          {/* Center: Primary Navigation Links */}
          <nav className="site-nav__links" aria-label="Main Navigation">
            <div className="site-nav__primary-links">
              <button
                type="button"
                onClick={() => handleNavClick('home')}
                className={`site-nav__link ${activeTab === 'home' ? 'site-nav__link--active' : ''}`}
              >
                Home
              </button>
              <button
                type="button"
                onClick={() => handleNavClick('works')}
                className={`site-nav__link ${activeTab === 'works' ? 'site-nav__link--active' : ''}`}
              >
                Works
              </button>
              <button
                type="button"
                onClick={() => handleNavClick('contact')}
                className={`site-nav__link ${activeTab === 'contact' ? 'site-nav__link--active' : ''}`}
              >
                Contact
              </button>
              <button
                type="button"
                onClick={() => handleNavClick('order')}
                className={`site-nav__link ${activeTab === 'order' ? 'site-nav__link--active' : ''}`}
              >
                How to Order
              </button>
            </div>
          </nav>

          {/* Right Side: Sign In & Get Start Buttons */}
          <div className="site-nav__right hidden sm:flex items-center gap-2.5">
            <button
              type="button"
              onClick={() => {
                if (onOpenAuth) {
                  onOpenAuth('login');
                } else {
                  const el = document.getElementById('prints');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="text-xs font-medium text-neutral-300 hover:text-white px-2.5 py-1.5 transition-colors cursor-pointer"
            >
              Sign In
            </button>
            <GlowGetStartedButton
              onClick={() => {
                if (onOpenAuth) {
                  onOpenAuth('signup');
                } else {
                  const el = document.getElementById('collections');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }
              }}
            />
          </div>
        </div>
      </header>

      {/* Fullscreen Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="site-nav__mobile" role="dialog" aria-modal="true">
          <div className="site-nav__mobile-inner">
            <div className="site-nav__mobile-top">
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setIsMobileMenuOpen(false);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              >
                <svg
                  viewBox="0 0 140 22"
                  fill="none"
                  className="w-32 h-auto"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <text
                    x="50%"
                    y="16"
                    textAnchor="middle"
                    fill="#ffffff"
                    fontFamily="'Outfit', system-ui, sans-serif"
                    fontWeight="800"
                    fontSize="15"
                    letterSpacing="0.22em"
                  >
                    TERRAFORM
                  </text>
                </svg>
              </a>
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(false)}
                aria-label="Close menu"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <nav className="site-nav__mobile-links">
              <button
                type="button"
                onClick={() => handleNavClick('home')}
                className="text-left w-full flex items-center justify-between"
              >
                <span>Home</span>
                <ArrowUpRight className="w-8 h-8 opacity-60" />
              </button>
              <button
                type="button"
                onClick={() => handleNavClick('works')}
                className="text-left w-full flex items-center justify-between"
              >
                <span>Works</span>
                <ArrowUpRight className="w-8 h-8 opacity-60" />
              </button>
              <button
                type="button"
                onClick={() => handleNavClick('contact')}
                className="text-left w-full flex items-center justify-between"
              >
                <span>Contact</span>
                <ArrowUpRight className="w-8 h-8 opacity-60" />
              </button>
              <button
                type="button"
                onClick={() => handleNavClick('order')}
                className="text-left w-full flex items-center justify-between"
              >
                <span>How to Order</span>
                <ArrowUpRight className="w-8 h-8 opacity-60" />
              </button>
            </nav>

            {/* Mobile Auth Buttons */}
            <div className="flex items-center gap-3 mt-8 pt-6 border-t border-white/10">
              <button
                type="button"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  if (onOpenAuth) onOpenAuth('login');
                }}
                className="flex-1 py-3 text-center text-sm font-medium text-white border border-white/20 rounded-full hover:bg-white/5 transition-colors cursor-pointer"
              >
                Sign In
              </button>
              <GlowGetStartedButton
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  if (onOpenAuth) onOpenAuth('signup');
                }}
                className="flex-1 py-2 text-center"
              />
            </div>

            <div className="site-nav__mobile-footer">
              <p>© 2026 Terraform Collections. All rights reserved.</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
