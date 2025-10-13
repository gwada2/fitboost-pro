import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/Button';

interface PromoCodeProps {
  code: string;
  discount?: string;
  site?: string;
}

export const PromoCode: React.FC<PromoCodeProps> = ({ 
  code = 'FITBOOST10', 
  discount = '10%',
  site = 'Amazon'
}) => {
  const { language } = useLanguage();
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const exclusiveText = {
    fr: '💰 CODE PROMO EXCLUSIF',
    en: '💰 EXCLUSIVE PROMO CODE',
    es: '💰 CÓDIGO PROMO EXCLUSIVO',
  };

  const discountText = {
    fr: `${discount} supplémentaires sur ${site}`,
    en: `${discount} extra on ${site}`,
    es: `${discount} adicional en ${site}`,
  };

  const copyText = {
    fr: copied ? 'Copié !' : 'Copier',
    en: copied ? 'Copied!' : 'Copy',
    es: copied ? '¡Copiado!' : 'Copiar',
  };

  return (
    <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white p-6 rounded-xl mb-6 relative overflow-hidden shadow-lg">
      {/* Decorative circles */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full -mr-16 -mt-16"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-white opacity-10 rounded-full -ml-12 -mb-12"></div>
      
      <div className="relative z-10">
        <p className="text-sm font-semibold mb-3 uppercase tracking-wide">{exclusiveText[language]}</p>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <code className="bg-white text-orange-600 px-6 py-3 rounded-lg font-bold text-2xl tracking-wider shadow-md">
                {code}
              </code>
              <Button 
                variant="secondary" 
                size="sm"
                onClick={handleCopy}
                className="whitespace-nowrap"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 mr-1" />
                    {copyText[language]}
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 mr-1" />
                    {copyText[language]}
                  </>
                )}
              </Button>
            </div>
            <p className="text-sm opacity-90">{discountText[language]}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
