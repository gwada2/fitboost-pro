import React from 'react';
import { Clock, Users, ShoppingCart, AlertCircle } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface UrgencyBadgesProps {
  stockLevel?: 'low' | 'medium' | 'high';
  viewCount?: number;
  soldCount?: number;
  showTimer?: boolean;
}

export const UrgencyBadges: React.FC<UrgencyBadgesProps> = ({
  stockLevel = 'low',
  viewCount = 127,
  soldCount = 45,
  showTimer = true,
}) => {
  const { language } = useLanguage();

  const stockText = {
    fr: stockLevel === 'low' ? 'Stock limité - Plus que 3 disponibles' : 'Stock disponible',
    en: stockLevel === 'low' ? 'Limited stock - Only 3 left' : 'In stock',
    es: stockLevel === 'low' ? 'Stock limitado - Solo quedan 3' : 'En stock',
  };

  const timerText = {
    fr: 'Offre expire dans 2h 34min',
    en: 'Offer expires in 2h 34min',
    es: 'Oferta expira en 2h 34min',
  };

  const viewingText = {
    fr: `${viewCount} personnes consultent ce produit`,
    en: `${viewCount} people viewing this product`,
    es: `${viewCount} personas viendo este producto`,
  };

  const soldText = {
    fr: `${soldCount} vendus dans les dernières 24h`,
    en: `${soldCount} sold in the last 24h`,
    es: `${soldCount} vendidos en las últimas 24h`,
  };

  return (
    <div className="space-y-2 mb-6">
      {/* Stock Alert */}
      {stockLevel === 'low' && (
        <div className="flex items-center gap-2 text-orange-600 bg-orange-50 px-3 py-2 rounded-lg">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          <span className="font-semibold text-sm">{stockText[language]}</span>
        </div>
      )}

      {/* Timer */}
      {showTimer && (
        <div className="flex items-center gap-2 text-red-600 bg-red-50 px-3 py-2 rounded-lg">
          <Clock className="w-5 h-5 flex-shrink-0 animate-pulse" />
          <span className="font-semibold text-sm">{timerText[language]}</span>
        </div>
      )}

      {/* Viewers */}
      <div className="flex items-center gap-2 text-green-600 bg-green-50 px-3 py-2 rounded-lg">
        <Users className="w-5 h-5 flex-shrink-0" />
        <span className="text-sm">{viewingText[language]}</span>
      </div>

      {/* Sales */}
      <div className="flex items-center gap-2 text-blue-600 bg-blue-50 px-3 py-2 rounded-lg">
        <ShoppingCart className="w-5 h-5 flex-shrink-0" />
        <span className="text-sm font-medium">{soldText[language]}</span>
      </div>
    </div>
  );
};
