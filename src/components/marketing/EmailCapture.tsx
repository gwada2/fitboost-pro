import React, { useState } from 'react';
import { Mail, Gift, Check } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/Button';
import { trackEmailCapture } from '@/utils/analytics';

interface EmailCaptureProps {
  source: 'homepage' | 'product_page' | 'blog';
  title?: string;
  subtitle?: string;
}

export const EmailCapture: React.FC<EmailCaptureProps> = ({ 
  source,
  title,
  subtitle 
}) => {
  const { language } = useLanguage();
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const defaultTitles = {
    fr: '💪 Rejoignez 12,847 athlètes passionnés',
    en: '💪 Join 12,847 passionate athletes',
    es: '💪 Únete a 12,847 atletas apasionados',
  };

  const defaultSubtitles = {
    fr: 'Recevez nos meilleurs deals, codes promos et conseils fitness',
    en: 'Get our best deals, promo codes and fitness tips',
    es: 'Recibe nuestras mejores ofertas, códigos promocionales y consejos fitness',
  };

  const placeholders = {
    fr: 'votre@email.fr',
    en: 'your@email.com',
    es: 'tu@email.es',
  };

  const buttonTexts = {
    fr: 'S\'inscrire 🎁',
    en: 'Subscribe 🎁',
    es: 'Suscribirse 🎁',
  };

  const benefits = {
    fr: ['✅ Codes promos exclusifs', '📚 Guides gratuits', '🚫 Zéro spam'],
    en: ['✅ Exclusive promo codes', '📚 Free guides', '🚫 No spam'],
    es: ['✅ Códigos promocionales exclusivos', '📚 Guías gratuitas', '🚫 Cero spam'],
  };

  const successMessage = {
    fr: '🎉 Merci ! Votre code promo arrive dans votre boîte mail.',
    en: '🎉 Thank you! Your promo code is coming to your inbox.',
    es: '🎉 ¡Gracias! Tu código promocional llegará a tu correo.',
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (email && email.includes('@')) {
      // Track dans analytics
      trackEmailCapture(source);
      
      // Simuler la soumission (à remplacer par un vrai backend)
      setSubmitted(true);
      setEmail('');
      
      // Reset après 5 secondes
      setTimeout(() => setSubmitted(false), 5000);
    }
  };

  if (submitted) {
    return (
      <div className="bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl p-8 text-center">
        <Check className="w-16 h-16 mx-auto mb-4" />
        <p className="text-xl font-semibold">{successMessage[language]}</p>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-r from-primary-600 to-secondary-600 text-white rounded-xl p-8 md:p-12 text-center shadow-xl">
      <Gift className="w-16 h-16 mx-auto mb-4 animate-pulse" />
      <h2 className="text-2xl md:text-3xl font-bold mb-4">
        {title || defaultTitles[language]}
      </h2>
      <p className="text-lg md:text-xl mb-6 opacity-90">
        {subtitle || defaultSubtitles[language]}
      </p>
      
      <form onSubmit={handleSubmit} className="max-w-lg mx-auto mb-6">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1 relative">
            <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={placeholders[language]}
              required
              className="w-full pl-12 pr-4 py-3 rounded-lg text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-white focus:outline-none"
            />
          </div>
          <Button 
            type="submit" 
            variant="secondary" 
            size="lg"
            className="whitespace-nowrap shadow-lg"
          >
            {buttonTexts[language]}
          </Button>
        </div>
      </form>
      
      <div className="flex flex-wrap justify-center gap-4 text-sm">
        {benefits[language].map((benefit, index) => (
          <span key={index} className="opacity-90">
            {benefit}
          </span>
        ))}
      </div>
    </div>
  );
};
