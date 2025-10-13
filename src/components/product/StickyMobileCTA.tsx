import React from 'react';
import { ExternalLink } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/Button';
import { PriceDisplay } from '@/components/ui/PriceDisplay';

interface StickyMobileCTAProps {
  productName: string;
  currentPrice: number;
  originalPrice?: number;
  currency?: string;
  affiliateSite: string;
  onCTAClick: () => void;
}

export const StickyMobileCTA: React.FC<StickyMobileCTAProps> = ({
  productName,
  currentPrice,
  originalPrice,
  currency = '€',
  affiliateSite,
  onCTAClick,
}) => {
  const { language } = useLanguage();

  const ctaText = {
    fr: `Voir sur ${affiliateSite}`,
    en: `View on ${affiliateSite}`,
    es: `Ver en ${affiliateSite}`,
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white shadow-2xl border-t-4 border-primary-600 p-4 md:hidden z-50 animate-fade-in">
      <div className="flex items-center justify-between gap-4">
        <div className="flex-1 min-w-0">
          <p className="text-xs text-gray-600 truncate mb-1">{productName}</p>
          <PriceDisplay
            current={currentPrice}
            original={originalPrice}
            currency={currency}
            size="sm"
          />
        </div>
        <Button 
          size="lg" 
          onClick={onCTAClick}
          className="whitespace-nowrap shadow-lg"
        >
          <ExternalLink className="w-5 h-5 mr-2" />
          {ctaText[language]}
        </Button>
      </div>
    </div>
  );
};
