import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Sprout, Camera, MessageSquare, CloudSun, BookOpen, Clock, ShieldCheck, Globe, UserCheck } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const Navbar: React.FC = () => {
  const { language, setLanguage, t } = useLanguage();
  const location = useLocation();

  const navLinks = [
    { to: '/dashboard', label: t('dashboard'), icon: Sprout },
    { to: '/scan', label: t('checkCrop'), icon: Camera, highlight: true },
    { to: '/assistant', label: t('assistant'), icon: MessageSquare },
    { to: '/farms', label: t('myFarm'), icon: Sprout },
    { to: '/history', label: t('history'), icon: Clock },
    { to: '/diseases', label: t('diseaseLibrary'), icon: BookOpen },
    { to: '/weather', label: t('weather'), icon: CloudSun },
    { to: '/expert', label: t('expertReview'), icon: ShieldCheck },
  ];

  return (
    <header className="sticky top-0 z-50 glass-panel border-b border-forest-100/80 transition-all duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="w-10 h-10 rounded-xl bg-forest-600 flex items-center justify-center text-white shadow-md shadow-forest-600/20 group-hover:bg-forest-500 transition-colors">
            <Sprout className="w-6 h-6 text-leaf-light" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-display font-extrabold text-xl text-forest-900 tracking-tight">
                {t('appName')}
              </span>
              <span className="text-[10px] uppercase font-semibold tracking-wider bg-forest-100 text-forest-700 px-1.5 py-0.5 rounded">
                AI
              </span>
            </div>
            <p className="text-[11px] text-forest-500 font-medium -mt-0.5 hidden sm:block">
              {t('tagline')}
            </p>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = location.pathname === link.to;

            if (link.highlight) {
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-forest-600 text-white font-medium text-sm hover:bg-forest-700 shadow-sm hover:shadow-forest-600/30 transition-all ml-1 mr-1"
                >
                  <Icon className="w-4 h-4 text-leaf-light" />
                  <span>{link.label}</span>
                </Link>
              );
            }

            return (
              <Link
                key={link.to}
                to={link.to}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                  isActive
                    ? 'text-forest-800 bg-forest-50/80 font-semibold'
                    : 'text-gray-600 hover:text-forest-700 hover:bg-forest-50/40'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-forest-600' : 'text-gray-400'}`} />
                <span>{link.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Right Section: Language Switcher & Demo Mode Status */}
        <div className="flex items-center gap-3">
          
          {/* Vernacular Toggle: English / हिन्दी */}
          <div className="flex items-center bg-gray-100/90 p-1 rounded-lg border border-gray-200">
            <Globe className="w-3.5 h-3.5 text-gray-500 ml-1.5 mr-1" />
            <button
              onClick={() => setLanguage('en')}
              className={`px-2 py-1 text-xs font-semibold rounded-md transition-all ${
                language === 'en'
                  ? 'bg-white text-forest-700 shadow-xs'
                  : 'text-gray-500 hover:text-gray-800'
              }`}
            >
              EN
            </button>
            <button
              onClick={() => setLanguage('hi')}
              className={`px-2 py-1 text-xs font-semibold rounded-md transition-all ${
                language === 'hi'
                  ? 'bg-forest-600 text-white shadow-xs'
                  : 'text-gray-500 hover:text-gray-800'
              }`}
            >
              हिन्दी
            </button>
          </div>

          {/* Profile / Demo Indicator */}
          <Link
            to="/profile"
            className="flex items-center gap-2 p-1.5 pr-2.5 rounded-lg border border-forest-200 bg-forest-50/50 hover:bg-forest-100/60 transition-colors"
          >
            <div className="w-7 h-7 rounded-full bg-forest-600 text-white flex items-center justify-center font-bold text-xs">
              R
            </div>
            <span className="text-xs font-medium text-forest-800 hidden sm:inline">
              Ramesh
            </span>
          </Link>

        </div>

      </div>
    </header>
  );
};
