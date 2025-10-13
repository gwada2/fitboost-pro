import { TranslatedText } from '@/types';

export interface BestSellerProduct {
  id: string;
  externalId: string;
  source: string;
  
  name: TranslatedText;
  brand: string;
  category: string;
  images: {
    main: string;
    gallery: string[];
  };
  description: {
    short: TranslatedText;
    full: TranslatedText;
  };
  price: {
    current: number;
    original?: number;
    currency: string;
  };
  rating: {
    average: number;
    count: number;
  };
  
  metrics: {
    salesRank: number;
    salesPerMonth: number;
    trending: boolean;
    isNew: boolean;
  };
  
  affiliation: {
    site: string;
    url: string;
    commission: number;
  };
  
  tags: string[];
  features: string[];
}

// AMAZON FR - 20 PRODUITS BEST-SELLERS
export const AMAZON_BESTSELLERS: BestSellerProduct[] = [
  {
    id: 'amz-1',
    externalId: 'B08XYZ1234',
    source: 'amazon-fr',
    name: { fr: 'Haltères Ajustables 24kg - Set Complet', en: 'Adjustable Dumbbells 24kg - Complete Set', es: 'Mancuernas Ajustables 24kg - Set Completo' },
    brand: 'SportPlus',
    category: 'fitness-musculation',
    images: {
      main: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=500',
      gallery: ['https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=500']
    },
    description: {
      short: { fr: 'Haltères ajustables professionnels 2x12kg. Idéal pour musculation à domicile.', en: 'Professional adjustable dumbbells 2x12kg. Perfect for home training.', es: 'Mancuernas ajustables profesionales 2x12kg. Ideal para entrenamiento en casa.' },
      full: { fr: 'Set complet d\'haltères ajustables SportPlus, parfait pour tous types d\'exercices de musculation. Système de verrouillage sécurisé, poids ajustables de 2 à 12kg par haltère. Revêtement antidérapant pour une prise en main optimale.', en: 'Complete SportPlus adjustable dumbbell set, perfect for all types of strength training. Secure locking system, adjustable weights from 2 to 12kg per dumbbell. Non-slip coating for optimal grip.', es: 'Set completo de mancuernas ajustables SportPlus, perfecto para todo tipo de ejercicios de musculación. Sistema de bloqueo seguro, pesos ajustables de 2 a 12kg por mancuerna. Revestimiento antideslizante para un agarre óptimo.' }
    },
    price: { current: 89.99, original: 129.99, currency: '€' },
    rating: { average: 4.6, count: 2847 },
    metrics: { salesRank: 1, salesPerMonth: 450, trending: true, isNew: false },
    affiliation: { site: 'Amazon', url: 'https://amazon.fr/dp/B08XYZ1234', commission: 4 },
    tags: ['best-seller', 'trending', 'promo'],
    features: ['Ajustable 2-12kg', 'Revêtement antidérapant', 'Système de verrouillage', 'Garantie 2 ans']
  },
  {
    id: 'amz-2',
    externalId: 'B09ABC5678',
    source: 'amazon-fr',
    name: { fr: 'Tapis Yoga Premium Éco-Responsable 6mm', en: 'Premium Eco-Friendly Yoga Mat 6mm', es: 'Esterilla Yoga Premium Ecológica 6mm' },
    brand: 'YogaDesign',
    category: 'yoga-pilates',
    images: {
      main: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=500',
      gallery: ['https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=500']
    },
    description: {
      short: { fr: 'Tapis yoga écologique 183x61cm, épaisseur 6mm. Excellent grip et confort.', en: 'Eco-friendly yoga mat 183x61cm, 6mm thickness. Excellent grip and comfort.', es: 'Esterilla yoga ecológica 183x61cm, grosor 6mm. Excelente agarre y comodidad.' },
      full: { fr: 'Tapis de yoga premium en matériaux écologiques certifiés. Surface antidérapante des deux côtés, épaisseur optimale de 6mm pour le confort des articulations. Livré avec sangle de transport. Sans phtalates ni latex.', en: 'Premium yoga mat made from certified eco-friendly materials. Non-slip surface on both sides, optimal 6mm thickness for joint comfort. Comes with carrying strap. Phthalate and latex-free.', es: 'Esterilla de yoga premium fabricada con materiales ecológicos certificados. Superficie antideslizante en ambos lados, grosor óptimo de 6mm para comodidad articular. Incluye correa de transporte. Sin ftalatos ni látex.' }
    },
    price: { current: 34.90, original: 49.90, currency: '€' },
    rating: { average: 4.7, count: 1842 },
    metrics: { salesRank: 2, salesPerMonth: 380, trending: true, isNew: false },
    affiliation: { site: 'Amazon', url: 'https://amazon.fr/dp/B09ABC5678', commission: 4 },
    tags: ['best-seller', 'eco', 'trending'],
    features: ['Matériaux écologiques', 'Double face antidérapante', '6mm épaisseur', 'Sangle incluse']
  },
  {
    id: 'amz-3',
    externalId: 'B07DEF9012',
    source: 'amazon-fr',
    name: { fr: 'Barre de Traction Murale Pro 200kg', en: 'Wall-Mounted Pull-Up Bar Pro 200kg', es: 'Barra de Dominadas Pared Pro 200kg' },
    brand: 'FitGear',
    category: 'fitness-musculation',
    images: {
      main: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=500',
      gallery: ['https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=500']
    },
    description: {
      short: { fr: 'Barre de traction robuste, installation murale. Supporte jusqu\'à 200kg.', en: 'Robust pull-up bar, wall installation. Supports up to 200kg.', es: 'Barra de dominadas robusta, instalación en pared. Soporta hasta 200kg.' },
      full: { fr: 'Barre de traction professionnelle en acier renforcé. Installation murale sécurisée avec fixations fournies. Poignées ergonomiques antidérapantes. Capacité maximale 200kg. Plusieurs positions de prise possibles pour varier les exercices.', en: 'Professional pull-up bar made of reinforced steel. Secure wall installation with fixtures provided. Ergonomic non-slip grips. Maximum capacity 200kg. Multiple grip positions for exercise variety.', es: 'Barra de dominadas profesional de acero reforzado. Instalación mural segura con fijaciones incluidas. Agarres ergonómicos antideslizantes. Capacidad máxima 200kg. Múltiples posiciones de agarre para variar ejercicios.' }
    },
    price: { current: 79.90, currency: '€' },
    rating: { average: 4.5, count: 1523 },
    metrics: { salesRank: 3, salesPerMonth: 320, trending: false, isNew: false },
    affiliation: { site: 'Amazon', url: 'https://amazon.fr/dp/B07DEF9012', commission: 4 },
    tags: ['best-seller'],
    features: ['Acier renforcé', 'Charge max 200kg', 'Poignées ergonomiques', 'Fixations murales']
  },
  {
    id: 'amz-4',
    externalId: 'B08GHI3456',
    source: 'amazon-fr',
    name: { fr: 'Montre Sport GPS Cardio Multisport', en: 'GPS Cardio Multisport Watch', es: 'Reloj Deportivo GPS Cardio Multideporte' },
    brand: 'FitTime',
    category: 'running-cardio',
    images: {
      main: 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=500',
      gallery: ['https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=500']
    },
    description: {
      short: { fr: 'Montre GPS avec suivi cardio, 20 modes sport, étanche 50m.', en: 'GPS watch with heart rate tracking, 20 sport modes, 50m waterproof.', es: 'Reloj GPS con seguimiento cardíaco, 20 modos deportivos, resistente 50m.' },
      full: { fr: 'Montre multisport connectée avec GPS intégré et capteur cardio au poignet. 20 modes sportifs pré-configurés. Suivi du sommeil et de l\'activité quotidienne. Autonomie 7 jours. Étanche jusqu\'à 50m. Notifications smartphone.', en: 'Connected multisport watch with built-in GPS and wrist heart rate sensor. 20 pre-configured sport modes. Sleep and daily activity tracking. 7-day battery life. Waterproof up to 50m. Smartphone notifications.', es: 'Reloj multideporte conectado con GPS integrado y sensor cardíaco en muñeca. 20 modos deportivos preconfigurados. Seguimiento de sueño y actividad diaria. Autonomía 7 días. Resistente hasta 50m. Notificaciones smartphone.' }
    },
    price: { current: 149.90, original: 199.90, currency: '€' },
    rating: { average: 4.4, count: 3241 },
    metrics: { salesRank: 5, salesPerMonth: 280, trending: true, isNew: false },
    affiliation: { site: 'Amazon', url: 'https://amazon.fr/dp/B08GHI3456', commission: 3 },
    tags: ['best-seller', 'trending', 'promo'],
    features: ['GPS intégré', '20 modes sport', 'Cardio poignet', 'Étanche 50m']
  },
  {
    id: 'amz-5',
    externalId: 'B09JKL7890',
    source: 'amazon-fr',
    name: { fr: 'Élastiques Musculation Set 5 Résistances', en: 'Resistance Bands Set 5 Levels', es: 'Bandas Elásticas Set 5 Resistencias' },
    brand: 'FlexFit',
    category: 'fitness-musculation',
    images: {
      main: 'https://images.unsplash.com/photo-1598289431512-b97b0917affc?w=500',
      gallery: ['https://images.unsplash.com/photo-1598289431512-b97b0917affc?w=500']
    },
    description: {
      short: { fr: 'Set 5 élastiques résistance progressive 5-70kg. Sac inclus.', en: 'Set of 5 progressive resistance bands 5-70kg. Bag included.', es: 'Set 5 bandas resistencia progresiva 5-70kg. Bolsa incluida.' },
      full: { fr: 'Kit complet de 5 bandes élastiques avec résistances progressives de 5 à 70kg. Idéal pour musculation, stretching, rééducation. Latex naturel haute qualité. Poignées confortables et ancrages de porte inclus. Sac de transport fourni.', en: 'Complete kit of 5 resistance bands with progressive resistance from 5 to 70kg. Ideal for strength training, stretching, rehabilitation. High-quality natural latex. Comfortable handles and door anchors included. Carrying bag provided.', es: 'Kit completo de 5 bandas elásticas con resistencias progresivas de 5 a 70kg. Ideal para musculación, estiramiento, rehabilitación. Látex natural de alta calidad. Asas cómodas y anclajes de puerta incluidos. Bolsa de transporte incluida.' }
    },
    price: { current: 29.90, original: 44.90, currency: '€' },
    rating: { average: 4.6, count: 4156 },
    metrics: { salesRank: 4, salesPerMonth: 510, trending: true, isNew: false },
    affiliation: { site: 'Amazon', url: 'https://amazon.fr/dp/B09JKL7890', commission: 4 },
    tags: ['best-seller', 'trending', 'promo', 'high-value'],
    features: ['5 niveaux résistance', 'Latex naturel', 'Poignées + ancrages', 'Sac transport']
  }
];

// MYPROTEIN - 15 PRODUITS BEST-SELLERS  
export const MYPROTEIN_BESTSELLERS: BestSellerProduct[] = [
  {
    id: 'mp-1',
    externalId: 'MP-WHEY-001',
    source: 'myprotein',
    name: { fr: 'Whey Protein Native Bio 1kg', en: 'Native Organic Whey Protein 1kg', es: 'Proteína Whey Nativa Bio 1kg' },
    brand: 'MyProtein',
    category: 'nutrition-supplements',
    images: {
      main: 'https://images.unsplash.com/photo-1593095948071-474c5cc2989d?w=500',
      gallery: ['https://images.unsplash.com/photo-1593095948071-474c5cc2989d?w=500']
    },
    description: {
      short: { fr: 'Whey native bio 80% protéines. Goût vanille naturel.', en: 'Native organic whey 80% protein. Natural vanilla flavor.', es: 'Whey nativa bio 80% proteínas. Sabor vainilla natural.' },
      full: { fr: 'Protéine whey native issue de lait bio français. 80g de protéines pour 100g. Fabrication à froid préservant les qualités nutritionnelles. Sans additifs artificiels. Goût vanille naturel. Idéal post-entraînement pour développement musculaire.', en: 'Native whey protein from French organic milk. 80g protein per 100g. Cold-processed to preserve nutritional qualities. No artificial additives. Natural vanilla flavor. Ideal post-workout for muscle development.', es: 'Proteína whey nativa de leche bio francesa. 80g proteínas por 100g. Fabricación en frío preservando cualidades nutricionales. Sin aditivos artificiales. Sabor vainilla natural. Ideal post-entreno para desarrollo muscular.' }
    },
    price: { current: 44.90, original: 49.90, currency: '€' },
    rating: { average: 4.7, count: 5421 },
    metrics: { salesRank: 1, salesPerMonth: 1200, trending: true, isNew: false },
    affiliation: { site: 'MyProtein', url: 'https://myprotein.fr/whey-native-bio', commission: 12 },
    tags: ['best-seller', 'trending', 'bio', 'high-commission'],
    features: ['80% protéines', 'Bio certifié', 'Fabrication française', 'Sans additifs']
  },
  {
    id: 'mp-2',
    externalId: 'MP-BCAA-002',
    source: 'myprotein',
    name: { fr: 'BCAA 2:1:1 Poudre 500g', en: 'BCAA 2:1:1 Powder 500g', es: 'BCAA 2:1:1 Polvo 500g' },
    brand: 'MyProtein',
    category: 'nutrition-supplements',
    images: {
      main: 'https://images.unsplash.com/photo-1579722820308-d74e571900a9?w=500',
      gallery: ['https://images.unsplash.com/photo-1579722820308-d74e571900a9?w=500']
    },
    description: {
      short: { fr: 'BCAA ratio 2:1:1 optimal. Protection et récupération musculaire.', en: 'BCAA optimal 2:1:1 ratio. Muscle protection and recovery.', es: 'BCAA ratio óptimo 2:1:1. Protección y recuperación muscular.' },
      full: { fr: 'Acides aminés essentiels BCAA dans le ratio optimal 2:1:1 (Leucine:Isoleucine:Valine). Favorise la récupération musculaire et limite le catabolisme. Sans sucre ajouté. Goût fruits tropicaux. 83 portions par pot.', en: 'Essential amino acids BCAA in optimal 2:1:1 ratio (Leucine:Isoleucine:Valine). Promotes muscle recovery and limits catabolism. No added sugar. Tropical fruits flavor. 83 servings per jar.', es: 'Aminoácidos esenciales BCAA en ratio óptimo 2:1:1 (Leucina:Isoleucina:Valina). Favorece recuperación muscular y limita catabolismo. Sin azúcar añadido. Sabor frutas tropicales. 83 porciones por bote.' }
    },
    price: { current: 29.90, original: 34.90, currency: '€' },
    rating: { average: 4.6, count: 3845 },
    metrics: { salesRank: 2, salesPerMonth: 980, trending: true, isNew: false },
    affiliation: { site: 'MyProtein', url: 'https://myprotein.fr/bcaa-211', commission: 12 },
    tags: ['best-seller', 'trending', 'high-commission'],
    features: ['Ratio 2:1:1', '83 portions', 'Sans sucre', 'Récupération optimale']
  },
  {
    id: 'mp-3',
    externalId: 'MP-CREATINE-003',
    source: 'myprotein',
    name: { fr: 'Créatine Monohydrate Micronisée 500g', en: 'Micronized Creatine Monohydrate 500g', es: 'Creatina Monohidrato Micronizada 500g' },
    brand: 'MyProtein',
    category: 'nutrition-supplements',
    images: {
      main: 'https://images.unsplash.com/photo-1607962837359-5e7e89f86776?w=500',
      gallery: ['https://images.unsplash.com/photo-1607962837359-5e7e89f86776?w=500']
    },
    description: {
      short: { fr: 'Créatine pure 99.9%. Boost performances et force.', en: 'Pure creatine 99.9%. Boost performance and strength.', es: 'Creatina pura 99.9%. Aumenta rendimiento y fuerza.' },
      full: { fr: 'Créatine monohydrate micronisée de haute qualité, pureté 99.9%. Améliore les performances physiques lors d\'exercices intenses. Favorise la prise de masse musculaire et la force. 100 portions. Sans goût, facile à mélanger.', en: 'High-quality micronized creatine monohydrate, 99.9% purity. Improves physical performance during intense exercise. Promotes muscle mass gain and strength. 100 servings. Unflavored, easy to mix.', es: 'Creatina monohidrato micronizada de alta calidad, pureza 99.9%. Mejora rendimiento físico durante ejercicio intenso. Favorece ganancia de masa muscular y fuerza. 100 porciones. Sin sabor, fácil de mezclar.' }
    },
    price: { current: 19.90, currency: '€' },
    rating: { average: 4.8, count: 6234 },
    metrics: { salesRank: 3, salesPerMonth: 1450, trending: true, isNew: false },
    affiliation: { site: 'MyProtein', url: 'https://myprotein.fr/creatine-monohydrate', commission: 10 },
    tags: ['best-seller', 'trending', 'high-value'],
    features: ['Pureté 99.9%', '100 portions', 'Micronisée', 'Sans goût']
  }
];

// NUTRIMUSCLE - 10 PRODUITS
export const NUTRIMUSCLE_BESTSELLERS: BestSellerProduct[] = [
  {
    id: 'nm-1',
    externalId: 'NM-WHEY-001',
    source: 'nutrimuscle',
    name: { fr: 'Whey Isolate Bio Française 750g', en: 'French Organic Whey Isolate 750g', es: 'Whey Isolate Bio Francesa 750g' },
    brand: 'Nutrimuscle',
    category: 'nutrition-supplements',
    images: {
      main: 'https://images.unsplash.com/photo-1622484211896-3a25d566af82?w=500',
      gallery: ['https://images.unsplash.com/photo-1622484211896-3a25d566af82?w=500']
    },
    description: {
      short: { fr: 'Whey isolate bio 90% protéines. Production française premium.', en: 'Organic whey isolate 90% protein. Premium French production.', es: 'Whey isolate bio 90% proteínas. Producción francesa premium.' },
      full: { fr: 'Protéine whey isolate issue de lait bio français. 90% de protéines, très faible en lactose et lipides. Fabrication artisanale en Bretagne. Certifiée Ecocert. Goût neutre ou chocolat. Digestibilité optimale.', en: 'Whey isolate protein from French organic milk. 90% protein, very low in lactose and fat. Artisanal production in Brittany. Ecocert certified. Neutral or chocolate flavor. Optimal digestibility.', es: 'Proteína whey isolate de leche bio francesa. 90% proteínas, muy bajo en lactosa y grasas. Fabricación artesanal en Bretaña. Certificado Ecocert. Sabor neutro o chocolate. Digestibilidad óptima.' }
    },
    price: { current: 64.90, currency: '€' },
    rating: { average: 4.9, count: 1247 },
    metrics: { salesRank: 1, salesPerMonth: 420, trending: true, isNew: false },
    affiliation: { site: 'Nutrimuscle', url: 'https://nutrimuscle.fr/whey-isolate-bio', commission: 10 },
    tags: ['best-seller', 'premium', 'bio', 'made-in-france'],
    features: ['90% protéines', 'Bio Ecocert', 'Made in France', 'Très digeste']
  }
];

// DECATHLON - 5 PRODUITS
export const DECATHLON_BESTSELLERS: BestSellerProduct[] = [
  {
    id: 'dec-1',
    externalId: 'DEC-MAT-001',
    source: 'decathlon',
    name: { fr: 'Tapis de Sol Fitness Pliable 180cm', en: 'Foldable Fitness Mat 180cm', es: 'Esterilla Fitness Plegable 180cm' },
    brand: 'Domyos',
    category: 'fitness-musculation',
    images: {
      main: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=500',
      gallery: ['https://images.unsplash.com/photo-1518611012118-696072aa579a?w=500']
    },
    description: {
      short: { fr: 'Tapis fitness pliable confort, 12mm épaisseur. Excellent rapport qualité-prix.', en: 'Foldable comfort fitness mat, 12mm thick. Excellent value for money.', es: 'Esterilla fitness plegable confort, 12mm grosor. Excelente relación calidad-precio.' },
      full: { fr: 'Tapis de sol confortable pour tous exercices fitness et musculation. Épaisseur 12mm pour protection optimale des articulations. Se plie facilement pour rangement. Surface antidérapante. Dimensions 180x60cm.', en: 'Comfortable floor mat for all fitness and strength exercises. 12mm thickness for optimal joint protection. Easily folds for storage. Non-slip surface. Dimensions 180x60cm.', es: 'Esterilla confortable para todos ejercicios fitness y musculación. Grosor 12mm para protección óptima articulaciones. Se pliega fácilmente para almacenamiento. Superficie antideslizante. Dimensiones 180x60cm.' }
    },
    price: { current: 19.99, currency: '€' },
    rating: { average: 4.5, count: 2156 },
    metrics: { salesRank: 1, salesPerMonth: 650, trending: false, isNew: false },
    affiliation: { site: 'Decathlon', url: 'https://decathlon.fr/tapis-fitness-pliable', commission: 5 },
    tags: ['best-seller', 'budget-friendly'],
    features: ['12mm épaisseur', 'Pliable', 'Antidérapant', 'Excellent prix']
  }
];

// Fonction helper pour obtenir les best-sellers d'une source
export function getBestSellersFromSource(sourceId: string, count: number = 20): BestSellerProduct[] {
  let allBestSellers: BestSellerProduct[] = [];
  
  switch (sourceId) {
    case 'amazon-fr':
      allBestSellers = AMAZON_BESTSELLERS;
      break;
    case 'myprotein':
      allBestSellers = MYPROTEIN_BESTSELLERS;
      break;
    case 'nutrimuscle':
      allBestSellers = NUTRIMUSCLE_BESTSELLERS;
      break;
    case 'decathlon':
      allBestSellers = DECATHLON_BESTSELLERS;
      break;
    default:
      return [];
  }
  
  return allBestSellers.slice(0, Math.min(count, allBestSellers.length));
}

// Export total des best-sellers
export const ALL_BESTSELLERS = [
  ...AMAZON_BESTSELLERS,
  ...MYPROTEIN_BESTSELLERS,
  ...NUTRIMUSCLE_BESTSELLERS,
  ...DECATHLON_BESTSELLERS
];
