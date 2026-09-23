import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Sprout, Activity, Globe, Menu, X, ArrowUpRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const LandingNavbar: React.FC = () => {
  const { language, setLanguage } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: language === 'hi' ? 'होम' : 'Home', href: '#hero' },
    { label: language === 'hi' ? 'कार्यप्रणाली' : 'How It Works', href: '#how-it-works' },
    { label: language === 'hi' ? 'एआई निदान' : 'AI Diagnosis', href: '#ai-diagnosis' },
    { label: language === 'hi' ? 'विशेषताएं' : 'Features', href: '#features' },
    { label: language === 'hi' ? 'परिचय' : 'About', href: '#about' },
  ];

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-out px-4 sm:px-6 lg:px-8 py-3 sm:py-4 ${
        scrolled
          ? 'bg-[#081c15]/90 backdrop-blur-md shadow-lg shadow-black/25 border-b border-forest-500/20'
          : 'bg-gradient-to-b from-forest-950/70 via-forest-950/20 to-transparent backdrop-blur-xs'
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Brand Logo: Leaf + Subtle AI Wave */}
        <a
          href="#hero"
          onClick={(e) => scrollToSection(e, '#hero')}
          className="flex items-center gap-2.5 group cursor-pointer"
        >
          <div className="relative flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-forest-800/90 border border-forest-400/40 text-leaf-light shadow-md shadow-forest-900/50 group-hover:border-leaf-light transition-all">
            <Sprout className="w-5 h-5 text-leaf-light group-hover:scale-105 transition-transform" />
            <Activity className="w-3 h-3 text-emerald-400 absolute -bottom-1 -right-1 animate-pulse" />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="font-display font-bold text-lg sm:text-xl text-white tracking-tight">
                AgriSathi
              </span>
              <span className="text-[9px] font-mono uppercase tracking-widest bg-forest-500/30 border border-forest-400/30 text-leaf-light px-1.5 py-0.5 rounded-full font-semibold">
                AI
              </span>
            </div>
            <span className="text-[10px] text-gray-300 tracking-wider hidden sm:inline -mt-0.5">
              Agricultural Intelligence
            </span>
          </div>
        </a>

        {/* Center Navigation Links (Desktop) */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2 px-4 py-1.5 rounded-full bg-forest-900/50 border border-white/10 backdrop-blur-md">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={(e) => scrollToSection(e, item.href)}
              className="px-3.5 py-1.5 rounded-full text-xs lg:text-sm font-medium text-gray-200 hover:text-white hover:bg-white/10 transition-colors"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Right Section: Language Switcher + Open AgriSathi */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* Vernacular Language Selector */}
          <div className="flex items-center bg-black/40 border border-white/15 p-0.5 rounded-lg backdrop-blur-md">
            <Globe className="w-3.5 h-3.5 text-gray-400 ml-1.5 mr-1" />
            <button
              onClick={() => setLanguage('en')}
              className={`px-2 py-1 text-xs font-semibold rounded-md transition-all ${
                language === 'en'
                  ? 'bg-forest-600 text-white shadow-xs'
                  : 'text-gray-300 hover:text-white'
              }`}
              aria-label="Switch to English"
            >
              EN
            </button>
            <button
              onClick={() => setLanguage('hi')}
              className={`px-2 py-1 text-xs font-semibold rounded-md transition-all ${
                language === 'hi'
                  ? 'bg-forest-600 text-white shadow-xs'
                  : 'text-gray-300 hover:text-white'
              }`}
              aria-label="हिन्दी में बदलें"
            >
              हिन्दी
            </button>
          </div>

          {/* Primary Action Button: "Open AgriSathi" -> /dashboard */}
          <Link
            to="/dashboard"
            className="flex items-center gap-1.5 px-3.5 sm:px-4 py-2 rounded-xl bg-forest-500 hover:bg-forest-400 text-white text-xs sm:text-sm font-semibold shadow-md shadow-forest-900/30 hover:shadow-forest-500/25 active:scale-95 transition-all"
          >
            <span>{language === 'hi' ? 'एग्रीसाथी खोलें' : 'Open AgriSathi'}</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg bg-black/40 border border-white/15 text-gray-200 hover:text-white"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

        </div>

      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-3 p-4 rounded-2xl bg-[#081c15]/95 border border-forest-500/30 backdrop-blur-xl shadow-2xl space-y-3">
          <div className="flex flex-col space-y-1">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => scrollToSection(e, item.href)}
                className="px-3 py-2 rounded-lg text-sm font-medium text-gray-200 hover:text-white hover:bg-forest-800/60 transition-colors"
              >
                {item.label}
              </a>
            ))}
          </div>

          <div className="pt-2 border-t border-forest-800/80 flex flex-col gap-2">
            <Link
              to="/scan"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm transition-all"
            >
              {language === 'hi' ? 'फसल जांचें' : 'Check My Crop'}
            </Link>
            <Link
              to="/assistant"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-2 rounded-xl bg-forest-900/80 border border-white/15 text-gray-200 font-medium text-sm transition-all"
            >
              {language === 'hi' ? 'पूछें एग्रीसाथी' : 'Ask AgriSathi'}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
