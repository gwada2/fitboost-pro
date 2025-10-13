import { Product } from '@/types';

// Interface pour Google Analytics 4
declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    dataLayer?: any[];
  }
}

/**
 * Fonction générique pour tracker un événement
 */
export const trackEvent = (eventName: string, params?: Record<string, any>) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, params);
  }
  
  // Log en dev pour debug
  if (process.env.NODE_ENV === 'development') {
    console.log('📊 Analytics Event:', eventName, params);
  }
};

/**
 * Track les clics sur les liens d'affiliation
 * CRUCIAL pour mesurer le ROI
 */
export const trackAffiliateClick = (product: Product) => {
  // Commission estimée selon le site (Amazon ~4%, MyProtein ~10%)
  const estimatedCommission = product.affiliation.site === 'MyProtein' ? 10 : 4;
  
  trackEvent('affiliate_click', {
    product_id: product.id,
    product_name: product.name.fr,
    product_category: product.category,
    affiliate_site: product.affiliation.site,
    price: product.price.current,
    currency: product.price.currency,
    estimated_commission: estimatedCommission,
    event_label: `${product.affiliation.site} - ${product.name.fr}`,
    value: product.price.current * (estimatedCommission / 100), // Valeur commission estimée
  });
};

/**
 * Track les vues de produits
 * Important pour Google Analytics Enhanced Ecommerce
 */
export const trackProductView = (product: Product) => {
  trackEvent('view_item', {
    currency: product.price.currency,
    value: product.price.current,
    items: [{
      item_id: product.id,
      item_name: product.name.fr,
      item_category: product.category,
      item_brand: product.affiliation.site,
      price: product.price.current,
      discount: product.price.original ? product.price.original - product.price.current : 0,
    }]
  });
};

/**
 * Track l'ajout au comparateur
 */
export const trackAddToComparison = (product: Product) => {
  trackEvent('add_to_comparison', {
    product_id: product.id,
    product_name: product.name.fr,
    price: product.price.current,
  });
};

/**
 * Track les vues de la page comparateur
 */
export const trackComparisonView = (productIds: string[]) => {
  trackEvent('view_comparison', {
    product_count: productIds.length,
    product_ids: productIds.join(','),
  });
};

/**
 * Track les recherches
 */
export const trackSearch = (searchQuery: string, resultsCount: number) => {
  trackEvent('search', {
    search_term: searchQuery,
    results_count: resultsCount,
  });
};

/**
 * Track l'utilisation des filtres
 */
export const trackFilter = (filterType: string, filterValue: string) => {
  trackEvent('filter_used', {
    filter_type: filterType,
    filter_value: filterValue,
  });
};

/**
 * Track le clic sur un code promo
 */
export const trackPromoCodeCopy = (code: string, productId?: string) => {
  trackEvent('promo_code_copied', {
    code: code,
    product_id: productId,
  });
};

/**
 * Track la soumission du formulaire email
 */
export const trackEmailCapture = (source: string) => {
  trackEvent('email_capture', {
    source: source, // 'homepage', 'exit_intent', 'product_page', etc.
  });
};

/**
 * Track les clics sur les articles de blog
 */
export const trackBlogClick = (postId: string, postTitle: string) => {
  trackEvent('blog_click', {
    post_id: postId,
    post_title: postTitle,
  });
};

/**
 * Track le partage social
 */
export const trackSocialShare = (platform: string, url: string) => {
  trackEvent('share', {
    method: platform,
    content_type: 'product',
    item_id: url,
  });
};

/**
 * Track l'engagement utilisateur (temps passé sur une page)
 */
export const trackEngagement = (pageName: string, timeSpent: number) => {
  trackEvent('user_engagement', {
    page_name: pageName,
    time_spent_seconds: timeSpent,
  });
};

/**
 * Initialize Google Analytics 4
 * À appeler dans main.tsx ou App.tsx
 */
export const initAnalytics = (measurementId: string) => {
  if (typeof window === 'undefined') return;

  // Créer le script GA4
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
  document.head.appendChild(script);

  // Initialize dataLayer
  window.dataLayer = window.dataLayer || [];
  window.gtag = function() {
    window.dataLayer?.push(arguments);
  };
  
  window.gtag('js', new Date());
  window.gtag('config', measurementId, {
    page_path: window.location.pathname,
  });

  console.log('✅ Google Analytics initialized:', measurementId);
};

// Export tout pour faciliter l'utilisation
export const analytics = {
  trackEvent,
  trackAffiliateClick,
  trackProductView,
  trackAddToComparison,
  trackComparisonView,
  trackSearch,
  trackFilter,
  trackPromoCodeCopy,
  trackEmailCapture,
  trackBlogClick,
  trackSocialShare,
  trackEngagement,
  initAnalytics,
};
