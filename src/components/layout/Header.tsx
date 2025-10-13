import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Search, Globe, Scale, Settings } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useComparison } from '@/contexts/ComparisonContext';
import { Language } from '@/types';

export const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { language, setLanguage } = useLanguage();
  const { comparisonProducts } = useComparison();

  const languages: { code: Language; label: string }[] = [
    { code: 'fr', label: 'Français' },
    { code: 'en', label: 'English' },
    { code: 'es', label: 'Español' },
  ];

  const navigation = [
    { name: { fr: 'Accueil', en: 'Home', es: 'Inicio' }, href: '/' },
    { name: { fr: 'Produits', en: 'Products', es: 'Productos' }, href: '/produits' },
    { name: { fr: 'Blog', en: 'Blog', es: 'Blog' }, href: '/blog' },
    { name: { fr: 'À propos', en: 'About', es: 'Acerca' }, href: '/a-propos' },
    { name: { fr: 'Contact', en: 'Contact', es: 'Contacto' }, href: '/contact' },
  ];

  const adminNavigation = [
    { name: { fr: '🔧 Admin', en: '🔧 Admin', es: '🔧 Admin' }, href: '/admin/auto-import' },
  ];

  return (
    <header className="bg-white shadow-md sticky top-0 z-40">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-primary-600 to-secondary-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">S</span>
            </div>
            <span className="text-xl font-bold text-gray-900 hidden sm:block">
              FitBoost Pro
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {navigation.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className="text-gray-700 hover:text-primary-600 font-medium transition-colors"
              >
                {item.name[language]}
              </Link>
            ))}
            
            {/* Admin Link */}
            {adminNavigation.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className="flex items-center gap-1 text-orange-600 hover:text-orange-700 font-semibold transition-colors border-l-2 border-gray-200 pl-6"
              >
                <Settings className="w-4 h-4" />
                {item.name[language]}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-4">
            {/* Language Selector */}
            <div className="relative group">
              <button className="flex items-center gap-1 text-gray-700 hover:text-primary-600">
                <Globe className="w-5 h-5" />
                <span className="hidden sm:inline text-sm font-medium">
                  {language.toUpperCase()}
                </span>
              </button>
              <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-lg py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => setLanguage(lang.code)}
                    className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${
                      language === lang.code ? 'text-primary-600 font-semibold' : 'text-gray-700'
                    }`}
                  >
                    {lang.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Comparison */}
            <Link
              to="/comparer"
              className="relative text-gray-700 hover:text-primary-600 transition-colors"
            >
              <Scale className="w-6 h-6" />
              {comparisonProducts.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-secondary-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {comparisonProducts.length}
                </span>
              )}
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-gray-700 hover:text-primary-600"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <nav className="md:hidden py-4 border-t">
            {navigation.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2 text-gray-700 hover:text-primary-600 font-medium"
              >
                {item.name[language]}
              </Link>
            ))}
            
            {/* Admin Link Mobile */}
            {adminNavigation.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 py-2 text-orange-600 hover:text-orange-700 font-semibold border-t border-gray-200 mt-2 pt-3"
              >
                <Settings className="w-4 h-4" />
                {item.name[language]}
              </Link>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
};
