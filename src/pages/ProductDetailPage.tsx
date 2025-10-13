import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ExternalLink, Scale, Share2, ArrowLeft, Check } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useProducts } from '@/contexts/ProductContext';
import { useComparison } from '@/contexts/ComparisonContext';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { StarRating } from '@/components/ui/StarRating';
import { PriceDisplay } from '@/components/ui/PriceDisplay';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { ProductCard } from '@/components/product/ProductCard';
import { UrgencyBadges } from '@/components/product/UrgencyBadges';
import { PromoCode } from '@/components/product/PromoCode';
import { StickyMobileCTA } from '@/components/product/StickyMobileCTA';
import { calculateDiscount } from '@/utils/helpers';
import { trackAffiliateClick as analyticsTrackClick } from '@/utils/analytics';

export const ProductDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { language, t } = useLanguage();
  const { getProductBySlug, trackProductView, trackProductClick, products, categories } = useProducts();
  const { addToComparison, isInComparison } = useComparison();

  const product = slug ? getProductBySlug(slug) : undefined;

  useEffect(() => {
    if (product) {
      trackProductView(product.id);
      // Update document title for SEO
      document.title = `${t(product.name)} | FitBoost Pro`;
      // Update meta description
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute('content', product.seo.metaDescription);
      }
    }
  }, [product]);

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          {language === 'fr' ? 'Produit non trouvé' : language === 'en' ? 'Product not found' : 'Producto no encontrado'}
        </h1>
        <Button onClick={() => navigate('/produits')}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          {language === 'fr' ? 'Retour aux produits' : language === 'en' ? 'Back to products' : 'Volver a productos'}
        </Button>
      </div>
    );
  }

  const category = categories.find(c => c.id === product.category);
  const discount = product.price.original ? calculateDiscount(product.price.current, product.price.original) : 0;
  const similarProducts = products.filter(p => 
    p.category === product.category && 
    p.id !== product.id && 
    p.visibility.status === 'active'
  ).slice(0, 4);

  const breadcrumbItems = category
    ? [
        { label: language === 'fr' ? 'Produits' : language === 'en' ? 'Products' : 'Productos', href: '/produits' },
        { label: t(category.name), href: `/produits/${category.slug}` },
        { label: t(product.name) },
      ]
    : [
        { label: language === 'fr' ? 'Produits' : language === 'en' ? 'Products' : 'Productos', href: '/produits' },
        { label: t(product.name) },
      ];

  const handleAffiliateClick = () => {
    trackProductClick(product.id);
    analyticsTrackClick(product); // Analytics avancés
    window.open(product.affiliation.url, '_blank', 'noopener,noreferrer');
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: t(product.name),
          text: t(product.description.short),
          url: window.location.href,
        });
      } catch (err) {
        console.log('Share failed:', err);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-6">
        <Breadcrumb items={breadcrumbItems} />

        <div className="bg-white rounded-lg shadow-md p-6 md:p-8 mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Images */}
            <div>
              <div className="relative aspect-square rounded-lg overflow-hidden bg-gray-100 mb-4">
                <img
                  src={product.images.main}
                  alt={t(product.name)}
                  className="w-full h-full object-cover"
                />
                {discount > 0 && (
                  <div className="absolute top-4 left-4">
                    <Badge variant="danger" className="text-lg px-3 py-1">-{discount}%</Badge>
                  </div>
                )}
              </div>
              <div className="grid grid-cols-4 gap-2">
                {product.images.gallery.slice(0, 4).map((img, idx) => (
                  <div key={idx} className="aspect-square rounded-lg overflow-hidden bg-gray-100">
                    <img src={img} alt={`${t(product.name)} ${idx + 1}`} className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            </div>

            {/* Info */}
            <div>
              <div className="flex gap-2 mb-3">
                {product.tags.map((tag) => (
                  <Badge key={tag} variant="primary">
                    {tag === 'nouveau' ? (language === 'fr' ? 'Nouveau' : language === 'en' ? 'New' : 'Nuevo') :
                     tag === 'tendance' ? (language === 'fr' ? 'Tendance' : language === 'en' ? 'Trending' : 'Tendencia') :
                     tag === 'promo' ? 'Promo' : tag}
                  </Badge>
                ))}
                <Badge variant="info">{product.affiliation.site}</Badge>
              </div>

              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {t(product.name)}
              </h1>

              <div className="mb-4">
                <StarRating rating={product.rating.average} count={product.rating.count} size="lg" />
              </div>

              {/* Badges d'urgence et scarcité */}
              <UrgencyBadges 
                stockLevel="low"
                viewCount={127}
                soldCount={45}
                showTimer={true}
              />

              <div className="mb-6">
                <PriceDisplay
                  current={product.price.current}
                  original={product.price.original}
                  currency={product.price.currency}
                  size="lg"
                />
                {discount > 0 && (
                  <p className="text-green-600 font-semibold mt-2">
                    {language === 'fr' ? `Économisez ${(product.price.original! - product.price.current).toFixed(2)}€` :
                     language === 'en' ? `Save ${(product.price.original! - product.price.current).toFixed(2)}€` :
                     `Ahorre ${(product.price.original! - product.price.current).toFixed(2)}€`}
                  </p>
                )}
              </div>

              {/* Code Promo Exclusif */}
              <PromoCode 
                code="FITBOOST10"
                discount="10%"
                site={product.affiliation.site}
              />

              <p className="text-gray-700 text-lg mb-6">
                {t(product.description.short)}
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 mb-6">
                <Button
                  size="lg"
                  className="flex-1"
                  onClick={handleAffiliateClick}
                >
                  <ExternalLink className="w-5 h-5 mr-2" />
                  {language === 'fr' ? `Voir sur ${product.affiliation.site}` :
                   language === 'en' ? `View on ${product.affiliation.site}` :
                   `Ver en ${product.affiliation.site}`}
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => addToComparison(product)}
                  disabled={isInComparison(product.id)}
                >
                  <Scale className="w-5 h-5 mr-2" />
                  {isInComparison(product.id) ? 
                    (language === 'fr' ? 'Déjà ajouté' : language === 'en' ? 'Already added' : 'Ya agregado') :
                    (language === 'fr' ? 'Comparer' : language === 'en' ? 'Compare' : 'Comparar')}
                </Button>
                <Button
                  variant="ghost"
                  size="lg"
                  onClick={handleShare}
                >
                  <Share2 className="w-5 h-5" />
                </Button>
              </div>

              {/* Features */}
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="font-semibold text-lg mb-3">
                  {language === 'fr' ? 'Caractéristiques' : language === 'en' ? 'Features' : 'Características'}
                </h3>
                <ul className="space-y-2">
                  {product.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-primary-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* CTA Secondaire après description */}
          <div className="bg-gradient-to-r from-primary-600 to-secondary-600 text-white p-8 rounded-xl my-8 text-center">
            <h3 className="text-2xl font-bold mb-2">🎁 {language === 'fr' ? 'Offre Exclusive FitBoost Pro' : language === 'en' ? 'FitBoost Pro Exclusive Offer' : 'Oferta Exclusiva FitBoost Pro'}</h3>
            <p className="text-lg mb-6">
              {language === 'fr' ? 'Profitez de -10% supplémentaires avec le code FITBOOST10' : language === 'en' ? 'Get an extra 10% off with code FITBOOST10' : 'Obtén un 10% adicional con el código FITBOOST10'}
            </p>
            <Button 
              variant="secondary" 
              size="lg"
              onClick={handleAffiliateClick}
              className="shadow-xl"
            >
              <ExternalLink className="w-5 h-5 mr-2" />
              {language === 'fr' ? 'J\'en profite maintenant →' : language === 'en' ? 'Get it now →' : 'Obtenerlo ahora →'}
            </Button>
          </div>

          {/* Full Description */}
          <div className="mt-12 border-t pt-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              {language === 'fr' ? 'Description détaillée' : language === 'en' ? 'Detailed description' : 'Descripción detallada'}
            </h2>
            <div className="prose max-w-none text-gray-700">
              <p className="text-lg leading-relaxed">{t(product.description.full)}</p>
            </div>
          </div>
        </div>

        {/* Similar Products */}
        {similarProducts.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              {language === 'fr' ? 'Produits similaires' : language === 'en' ? 'Similar products' : 'Productos similares'}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {similarProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}

        {/* Sticky Mobile CTA */}
        <StickyMobileCTA 
          productName={t(product.name)}
          currentPrice={product.price.current}
          originalPrice={product.price.original}
          currency={product.price.currency}
          affiliateSite={product.affiliation.site}
          onCTAClick={handleAffiliateClick}
        />
      </div>
    </div>
  );
};
