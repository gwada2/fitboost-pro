import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Youtube, Mail, Phone } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAdmin } from '@/contexts/AdminContext';

export const Footer: React.FC = () => {
  const { language } = useLanguage();
  const { settings } = useAdmin();

  const footerLinks = {
    products: {
      title: { fr: 'Produits', en: 'Products', es: 'Productos' },
      links: [
        { name: { fr: 'Fitness & Musculation', en: 'Fitness & Bodybuilding', es: 'Fitness y Musculación' }, href: '/produits/fitness-musculation' },
        { name: { fr: 'Yoga & Pilates', en: 'Yoga & Pilates', es: 'Yoga y Pilates' }, href: '/produits/yoga-pilates' },
        { name: { fr: 'Running & Cardio', en: 'Running & Cardio', es: 'Running y Cardio' }, href: '/produits/running-cardio' },
        { name: { fr: 'Nutrition', en: 'Nutrition', es: 'Nutrición' }, href: '/produits/nutrition-supplements' },
      ],
    },
    company: {
      title: { fr: 'Entreprise', en: 'Company', es: 'Empresa' },
      links: [
        { name: { fr: 'À propos', en: 'About', es: 'Acerca' }, href: '/a-propos' },
        { name: { fr: 'Contact', en: 'Contact', es: 'Contacto' }, href: '/contact' },
        { name: { fr: 'Blog', en: 'Blog', es: 'Blog' }, href: '/blog' },
      ],
    },
    legal: {
      title: { fr: 'Légal', en: 'Legal', es: 'Legal' },
      links: [
        { name: { fr: 'Mentions légales', en: 'Legal Notice', es: 'Aviso Legal' }, href: '/mentions-legales' },
        { name: { fr: 'Politique de confidentialité', en: 'Privacy Policy', es: 'Política de Privacidad' }, href: '/politique-confidentialite' },
      ],
    },
  };

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <h3 className="text-xl font-bold mb-4">{settings.siteName}</h3>
            <p className="text-gray-400 mb-4">{settings.tagline}</p>
            <div className="flex gap-4">
              {settings.social.facebook && (
                <a href={settings.social.facebook} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                  <Facebook className="w-5 h-5" />
                </a>
              )}
              {settings.social.instagram && (
                <a href={settings.social.instagram} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                  <Instagram className="w-5 h-5" />
                </a>
              )}
              {settings.social.twitter && (
                <a href={settings.social.twitter} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                  <Twitter className="w-5 h-5" />
                </a>
              )}
              {settings.social.youtube && (
                <a href={settings.social.youtube} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                  <Youtube className="w-5 h-5" />
                </a>
              )}
            </div>
          </div>

          {/* Products */}
          <div>
            <h4 className="font-semibold mb-4">{footerLinks.products.title[language]}</h4>
            <ul className="space-y-2">
              {footerLinks.products.links.map((link) => (
                <li key={link.href}>
                  <Link to={link.href} className="text-gray-400 hover:text-white transition-colors">
                    {link.name[language]}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold mb-4">{footerLinks.company.title[language]}</h4>
            <ul className="space-y-2">
              {footerLinks.company.links.map((link) => (
                <li key={link.href}>
                  <Link to={link.href} className="text-gray-400 hover:text-white transition-colors">
                    {link.name[language]}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">
              {language === 'fr' ? 'Contact' : language === 'en' ? 'Contact' : 'Contacto'}
            </h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-gray-400">
                <Mail className="w-4 h-4" />
                <a href={`mailto:${settings.contact.email}`} className="hover:text-white transition-colors">
                  {settings.contact.email}
                </a>
              </li>
              {settings.contact.phone && (
                <li className="flex items-center gap-2 text-gray-400">
                  <Phone className="w-4 h-4" />
                  <a href={`tel:${settings.contact.phone}`} className="hover:text-white transition-colors">
                    {settings.contact.phone}
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} {settings.siteName}. {language === 'fr' ? 'Tous droits réservés.' : language === 'en' ? 'All rights reserved.' : 'Todos los derechos reservados.'}
          </p>
          <div className="flex gap-4">
            {footerLinks.legal.links.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className="text-gray-400 hover:text-white text-sm transition-colors"
              >
                {link.name[language]}
              </Link>
            ))}
            <Link to="/admin" className="text-gray-600 hover:text-gray-400 text-sm transition-colors">
              Admin
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
