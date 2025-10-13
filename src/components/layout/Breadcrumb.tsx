import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({ items }) => {
  const { language } = useLanguage();

  const homeLabel = language === 'fr' ? 'Accueil' : language === 'en' ? 'Home' : 'Inicio';

  return (
    <nav className="flex items-center gap-2 text-sm text-gray-600 py-4">
      <Link to="/" className="flex items-center gap-1 hover:text-primary-600 transition-colors">
        <Home className="w-4 h-4" />
        <span>{homeLabel}</span>
      </Link>
      
      {items.map((item, index) => (
        <React.Fragment key={index}>
          <ChevronRight className="w-4 h-4" />
          {item.href && index < items.length - 1 ? (
            <Link to={item.href} className="hover:text-primary-600 transition-colors">
              {item.label}
            </Link>
          ) : (
            <span className="text-gray-900 font-medium">{item.label}</span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};
