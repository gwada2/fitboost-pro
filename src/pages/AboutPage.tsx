import React from 'react';
import { Target, Award, Users, Heart } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Breadcrumb } from '@/components/layout/Breadcrumb';

export const AboutPage: React.FC = () => {
  const { language } = useLanguage();

  const breadcrumbItems = [
    { label: language === 'fr' ? 'À Propos' : language === 'en' ? 'About' : 'Acerca' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-6">
        <Breadcrumb items={breadcrumbItems} />

        <div className="bg-gradient-to-r from-primary-600 to-secondary-600 text-white rounded-lg p-12 mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {language === 'fr' ? 'À Propos' : language === 'en' ? 'About Us' : 'Acerca'}
          </h1>
          <p className="text-xl">
            {language === 'fr' ? 'Votre partenaire pour une vie plus saine' : language === 'en' ? 'Your partner for a healthier life' : 'Tu compañero para una vida más saludable'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-primary-100 rounded-full flex items-center justify-center">
              <Target className="w-8 h-8 text-primary-600" />
            </div>
            <h3 className="font-bold text-lg mb-2">Excellence</h3>
            <p className="text-gray-600">{language === 'fr' ? 'Meilleurs produits' : language === 'en' ? 'Best products' : 'Mejores productos'}</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-primary-100 rounded-full flex items-center justify-center">
              <Award className="w-8 h-8 text-primary-600" />
            </div>
            <h3 className="font-bold text-lg mb-2">Expertise</h3>
            <p className="text-gray-600">{language === 'fr' ? 'Conseils d\'experts' : language === 'en' ? 'Expert advice' : 'Consejos expertos'}</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-primary-100 rounded-full flex items-center justify-center">
              <Users className="w-8 h-8 text-primary-600" />
            </div>
            <h3 className="font-bold text-lg mb-2">Communauté</h3>
            <p className="text-gray-600">{language === 'fr' ? 'Communauté active' : language === 'en' ? 'Active community' : 'Comunidad activa'}</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-primary-100 rounded-full flex items-center justify-center">
              <Heart className="w-8 h-8 text-primary-600" />
            </div>
            <h3 className="font-bold text-lg mb-2">Authenticité</h3>
            <p className="text-gray-600">{language === 'fr' ? 'Avis transparents' : language === 'en' ? 'Transparent reviews' : 'Reseñas transparentes'}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
