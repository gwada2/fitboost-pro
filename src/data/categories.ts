import { Category } from '@/types';

export const initialCategories: Category[] = [
  {
    id: 'cat-1',
    name: {
      fr: 'Fitness & Musculation',
      en: 'Fitness & Bodybuilding',
      es: 'Fitness y Musculación',
    },
    slug: 'fitness-musculation',
    icon: 'Dumbbell',
    description: 'Équipement et accessoires pour la musculation et le fitness',
    order: 1,
    productCount: 6,
  },
  {
    id: 'cat-2',
    name: {
      fr: 'Yoga & Pilates',
      en: 'Yoga & Pilates',
      es: 'Yoga y Pilates',
    },
    slug: 'yoga-pilates',
    icon: 'Heart',
    description: 'Matériel pour la pratique du yoga et pilates',
    order: 2,
    productCount: 3,
  },
  {
    id: 'cat-3',
    name: {
      fr: 'Running & Cardio',
      en: 'Running & Cardio',
      es: 'Running y Cardio',
    },
    slug: 'running-cardio',
    icon: 'Footprints',
    description: 'Chaussures et équipement pour la course à pied',
    order: 3,
    productCount: 4,
  },
  {
    id: 'cat-4',
    name: {
      fr: 'Nutrition & Suppléments',
      en: 'Nutrition & Supplements',
      es: 'Nutrición y Suplementos',
    },
    slug: 'nutrition-supplements',
    icon: 'Apple',
    description: 'Compléments alimentaires et nutrition sportive',
    order: 4,
    productCount: 4,
  },
  {
    id: 'cat-5',
    name: {
      fr: 'Récupération & Bien-être',
      en: 'Recovery & Wellness',
      es: 'Recuperación y Bienestar',
    },
    slug: 'recuperation-bien-etre',
    icon: 'Sparkles',
    description: 'Produits pour la récupération et le bien-être',
    order: 5,
    productCount: 2,
  },
  {
    id: 'cat-6',
    name: {
      fr: 'Équipement Sportif',
      en: 'Sports Equipment',
      es: 'Equipo Deportivo',
    },
    slug: 'equipement-sportif',
    icon: 'Target',
    description: 'Accessoires et équipement sportif général',
    order: 6,
    productCount: 1,
  },
];
