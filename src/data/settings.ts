import { SiteSettings } from '@/types';

export const initialSettings: SiteSettings = {
  siteName: 'FitBoost Pro',
  tagline: 'Boostez vos performances, optimisez vos résultats',
  description: 'FitBoost Pro : votre guide ultime pour trouver les meilleurs équipements fitness, nutrition et bien-être. Comparatifs détaillés, codes promos exclusifs et conseils d\'experts pour booster vos performances.',
  logo: '/logo.svg',
  favicon: '/favicon.ico',
  social: {
    facebook: 'https://facebook.com/fitboostpro',
    instagram: 'https://instagram.com/fitboostpro',
    twitter: 'https://twitter.com/fitboostpro',
    youtube: 'https://youtube.com/@fitboostpro',
  },
  contact: {
    email: 'contact@fitboostpro.com',
    phone: '+33 1 85 09 76 54',
  },
  seo: {
    metaDescription: 'FitBoost Pro : trouvez les meilleurs équipements fitness, nutrition et bien-être. Comparatifs experts, codes promos exclusifs et guides d\'achat pour booster vos performances sportives.',
    keywords: ['fitness', 'musculation', 'nutrition sportive', 'équipement sport', 'haltères', 'protéines', 'yoga', 'running', 'fitboost', 'comparatif fitness', 'code promo sport', 'guide achat fitness'],
  },
  defaultLanguage: 'fr',
  maintenanceMode: false,
};
