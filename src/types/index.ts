// Core data types for the affiliate sports & wellness application

export type Language = 'fr' | 'en' | 'es';

export type TranslatedText = {
  fr: string;
  en: string;
  es: string;
};

export interface Product {
  id: string;
  name: TranslatedText;
  slug: string;
  category: string;
  subCategory?: string;
  tags: string[]; // 'nouveau', 'tendance', 'promo', etc.
  price: {
    current: number;
    original?: number;
    currency: string;
  };
  images: {
    main: string;
    gallery: string[];
    video?: string;
  };
  description: {
    short: TranslatedText;
    full: TranslatedText;
  };
  features: string[]; // Technical characteristics
  seo: {
    metaTitle: string;
    metaDescription: string;
    keywords: string[];
  };
  affiliation: {
    site: string; // 'Amazon', 'MyProtein', etc.
    url: string;
    trackingCode?: string;
  };
  rating: {
    average: number; // 0-5
    count: number;
  };
  visibility: {
    status: 'active' | 'draft';
    showOnHomepage: boolean;
    showInTrending: boolean;
    showInNew: boolean;
  };
  statistics: {
    clicks: number;
    views: number;
  };
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  id: string;
  name: TranslatedText;
  slug: string;
  icon: string; // Lucide icon name
  description: string;
  headerImage?: string;
  order: number;
  productCount: number;
}

export interface BlogPost {
  id: string;
  title: TranslatedText;
  slug: string;
  coverImage: string;
  excerpt: TranslatedText;
  content: TranslatedText;
  category: string;
  tags: string[];
  relatedProducts: string[]; // Product IDs
  seo: {
    metaTitle: string;
    metaDescription: string;
    keywords: string[];
  };
  status: 'published' | 'draft';
  publishDate: string;
  views: number;
  readTime: number; // minutes
}

export interface SiteSettings {
  siteName: string;
  tagline: string;
  description: string;
  logo: string;
  favicon: string;
  social: {
    facebook?: string;
    instagram?: string;
    twitter?: string;
    youtube?: string;
  };
  contact: {
    email: string;
    phone?: string;
  };
  seo: {
    metaDescription: string;
    keywords: string[];
  };
  defaultLanguage: Language;
  maintenanceMode: boolean;
}

export interface FilterOptions {
  categories: string[];
  priceRange: [number, number];
  minRating: number;
  tags: string[];
  sites: string[];
  sortBy: 'price-asc' | 'price-desc' | 'popularity' | 'newest' | 'rating';
}

export interface AdminStats {
  totalProducts: number;
  productsByCategory: Record<string, number>;
  totalClicks: number;
  clicksLast7Days: { date: string; clicks: number }[];
  topProducts: { id: string; name: string; clicks: number }[];
  newProductsThisWeek: number;
}
