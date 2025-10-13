import React from 'react';
import { formatPrice, calculateDiscount } from '@/utils/helpers';
import { useLanguage } from '@/contexts/LanguageContext';

interface PriceDisplayProps {
  current: number;
  original?: number;
  currency?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const PriceDisplay: React.FC<PriceDisplayProps> = ({
  current,
  original,
  currency = 'EUR',
  size = 'md',
}) => {
  const { language } = useLanguage();
  const discount = original ? calculateDiscount(current, original) : 0;

  const sizeClasses = {
    sm: { current: 'text-lg', original: 'text-sm', discount: 'text-xs' },
    md: { current: 'text-2xl', original: 'text-base', discount: 'text-sm' },
    lg: { current: 'text-3xl', original: 'text-lg', discount: 'text-base' },
  };

  return (
    <div className="flex items-center gap-2 flex-wrap">
      <span className={`font-bold text-primary-600 ${sizeClasses[size].current}`}>
        {formatPrice(current, currency, language)}
      </span>
      {original && original > current && (
        <>
          <span className={`line-through text-gray-500 ${sizeClasses[size].original}`}>
            {formatPrice(original, currency, language)}
          </span>
          <span className={`bg-red-500 text-white px-2 py-1 rounded-full font-semibold ${sizeClasses[size].discount}`}>
            -{discount}%
          </span>
        </>
      )}
    </div>
  );
};
