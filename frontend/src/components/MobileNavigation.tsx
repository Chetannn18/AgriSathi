import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Camera, MessageSquare, Clock, BookOpen } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const MobileNavigation: React.FC = () => {
  const { t } = useLanguage();
  const location = useLocation();

  const navItems = [
    { to: '/dashboard', label: t('dashboard'), icon: LayoutDashboard },
    { to: '/history', label: t('history'), icon: Clock },
    { to: '/scan', label: t('checkCrop'), icon: Camera, isCenterFab: true },
    { to: '/assistant', label: t('assistant'), icon: MessageSquare },
    { to: '/diseases', label: t('diseaseLibrary'), icon: BookOpen },
  ];

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-t border-forest-100 shadow-lg px-2 py-1.5">
      <div className="flex items-center justify-around max-w-md mx-auto relative">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.to;

          if (item.isCenterFab) {
            return (
              <div key={item.to} className="relative -top-5">
                <Link
                  to={item.to}
                  className="flex flex-col items-center justify-center w-14 h-14 rounded-full bg-forest-600 text-white shadow-lg shadow-forest-600/40 border-4 border-white hover:bg-forest-500 active:scale-95 transition-all"
                  aria-label={item.label}
                >
                  <Icon className="w-6 h-6 text-leaf-light" />
                </Link>
                <span className="text-[10px] font-bold text-forest-700 block text-center mt-1">
                  {item.label}
                </span>
              </div>
            );
          }

          return (
            <Link
              key={item.to}
              to={item.to}
              className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-lg transition-colors ${
                isActive ? 'text-forest-700 font-semibold' : 'text-gray-500 hover:text-forest-600'
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'text-forest-600' : 'text-gray-400'}`} />
              <span className="text-[10px] mt-0.5">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};
