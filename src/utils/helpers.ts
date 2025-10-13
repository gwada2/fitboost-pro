import { Product, Language, TranslatedText } from '@/types';

/**
 * Format price according to currency and language
 */
export const formatPrice = (price: number, currency: string = 'EUR', lang: Language = 'fr'): string => {
  const locale = lang === 'fr' ? 'fr-FR' : lang === 'en' ? 'en-US' : 'es-ES';
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
  }).format(price);
};

/**
 * Calculate discount percentage
 */
export const calculateDiscount = (current: number, original: number): number => {
  if (!original || original <= current) return 0;
  return Math.round(((original - current) / original) * 100);
};

/**
 * Generate SEO-friendly slug from text
 */
export const generateSlug = (text: string): string => {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove diacritics
    .replace(/[^a-z0-9\s-]/g, '') // Remove special chars
    .trim()
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-'); // Remove consecutive hyphens
};

/**
 * Get translated text based on current language
 */
export const getTranslation = (text: TranslatedText, lang: Language): string => {
  return text[lang] || text.fr; // Fallback to French
};

/**
 * Filter products based on criteria
 */
export const filterProducts = (
  products: Product[],
  searchQuery: string,
  categories: string[],
  priceRange: [number, number],
  minRating: number,
  tags: string[],
  sites: string[],
  lang: Language
): Product[] => {
  return products.filter((product) => {
    // Search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      const name = getTranslation(product.name, lang).toLowerCase();
      const description = getTranslation(product.description.short, lang).toLowerCase();
      if (!name.includes(query) && !description.includes(query)) {
        return false;
      }
    }

    // Category filter
    if (categories.length > 0 && !categories.includes(product.category)) {
      return false;
    }

    // Price range filter
    if (
      product.price.current < priceRange[0] ||
      product.price.current > priceRange[1]
    ) {
      return false;
    }

    // Rating filter
    if (product.rating.average < minRating) {
      return false;
    }

    // Tags filter
    if (tags.length > 0 && !tags.some((tag) => product.tags.includes(tag))) {
      return false;
    }

    // Site filter
    if (sites.length > 0 && !sites.includes(product.affiliation.site)) {
      return false;
    }

    // Only show active products
    return product.visibility.status === 'active';
  });
};

/**
 * Sort products based on criteria
 */
export const sortProducts = (
  products: Product[],
  sortBy: 'price-asc' | 'price-desc' | 'popularity' | 'newest' | 'rating'
): Product[] => {
  const sorted = [...products];

  switch (sortBy) {
    case 'price-asc':
      return sorted.sort((a, b) => a.price.current - b.price.current);
    case 'price-desc':
      return sorted.sort((a, b) => b.price.current - a.price.current);
    case 'popularity':
      return sorted.sort((a, b) => b.statistics.clicks - a.statistics.clicks);
    case 'newest':
      return sorted.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    case 'rating':
      return sorted.sort((a, b) => b.rating.average - a.rating.average);
    default:
      return sorted;
  }
};

/**
 * Track affiliate link click
 */
export const trackClick = (productId: string, products: Product[]): Product[] => {
  return products.map((p) =>
    p.id === productId
      ? { ...p, statistics: { ...p.statistics, clicks: p.statistics.clicks + 1 } }
      : p
  );
};

/**
 * Track product view
 */
export const trackView = (productId: string, products: Product[]): Product[] => {
  return products.map((p) =>
    p.id === productId
      ? { ...p, statistics: { ...p.statistics, views: p.statistics.views + 1 } }
      : p
  );
};

/**
 * Generate UUID
 */
export const generateId = (): string => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

/**
 * Truncate text to specified length
 */
export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength).trim() + '...';
};

/**
 * Calculate estimated reading time
 */
export const calculateReadTime = (text: string): number => {
  const wordsPerMinute = 200;
  const words = text.trim().split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
};

/**
 * Format date according to language
 */
export const formatDate = (dateString: string, lang: Language): string => {
  const date = new Date(dateString);
  const locale = lang === 'fr' ? 'fr-FR' : lang === 'en' ? 'en-US' : 'es-ES';
  return date.toLocaleDateString(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

/**
 * Debounce function for search
 */
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};
