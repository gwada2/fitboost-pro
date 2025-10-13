import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Dumbbell, Heart, Footprints, Apple, Sparkles, Target } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useProducts } from '@/contexts/ProductContext';
import { ProductCard } from '@/components/product/ProductCard';
import { Button } from '@/components/ui/Button';
import { EmailCapture } from '@/components/marketing/EmailCapture';

export const HomePage: React.FC = () => {
  const { language, t } = useLanguage();
  const { products, categories } = useProducts();

  const trendingProducts = products.filter(p => p.visibility.showInTrending && p.visibility.status === 'active').slice(0, 6);
  const newProducts = products.filter(p => p.visibility.showInNew && p.visibility.status === 'active').slice(0, 4);

  const categoryIcons: Record<string, any> = {
    Dumbbell,
    Heart,
    Footprints,
    Apple,
    Sparkles,
    Target,
  };

  const heroText = {
    fr: {
      title: '⚡ Boostez Vos Performances',
      subtitle: 'FitBoost Pro',
      description: 'Découvrez les meilleurs équipements fitness, nutrition et bien-être. Comparatifs détaillés, codes promos exclusifs et conseils d\'experts.',
      cta: 'Découvrir les produits',
    },
    en: {
      title: '⚡ Boost Your Performance',
      subtitle: 'FitBoost Pro',
      description: 'Discover the best fitness, nutrition and wellness equipment. Detailed comparisons, exclusive promo codes and expert advice.',
      cta: 'Discover products',
    },
    es: {
      title: '⚡ Impulsa Tu Rendimiento',
      subtitle: 'FitBoost Pro',
      description: 'Descubre los mejores equipos de fitness, nutrición y bienestar. Comparaciones detalladas, códigos promocionales exclusivos y consejos expertos.',
      cta: 'Descubrir productos',
    },
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-600 via-primary-700 to-secondary-600 text-white py-20 md:py-32">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              {heroText[language].title}
            </h1>
            <p className="text-2xl md:text-3xl font-semibold mb-6 text-secondary-200">
              {heroText[language].subtitle}
            </p>
            <p className="text-lg md:text-xl mb-8 text-gray-100">
              {heroText[language].description}
            </p>
            <Link to="/produits">
              <Button size="lg" variant="secondary" className="text-lg">
                {heroText[language].cta}
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
            {language === 'fr' ? 'Catégories Principales' : language === 'en' ? 'Main Categories' : 'Categorías Principales'}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {categories.map((category) => {
              const IconComponent = categoryIcons[category.icon] || Target;
              return (
                <Link
                  key={category.id}
                  to={`/produits/${category.slug}`}
                  className="bg-white rounded-lg p-6 text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="w-16 h-16 mx-auto mb-4 bg-primary-100 rounded-full flex items-center justify-center">
                    <IconComponent className="w-8 h-8 text-primary-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900">{t(category.name)}</h3>
                  <p className="text-sm text-gray-500 mt-1">{category.productCount} produits</p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Trending Products */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-900">
              {language === 'fr' ? '🔥 Produits Tendances' : language === 'en' ? '🔥 Trending Products' : '🔥 Productos Tendencia'}
            </h2>
            <Link to="/produits">
              <Button variant="outline">
                {language === 'fr' ? 'Voir tout' : language === 'en' ? 'View all' : 'Ver todo'}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {trendingProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Email Capture Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <EmailCapture source="homepage" />
        </div>
      </section>

      {/* New Products */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-900">
              {language === 'fr' ? '✨ Nouveautés' : language === 'en' ? '✨ New Arrivals' : '✨ Novedades'}
            </h2>
            <Link to="/produits">
              <Button variant="outline">
                {language === 'fr' ? 'Voir tout' : language === 'en' ? 'View all' : 'Ver todo'}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {newProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary-600 to-secondary-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            {language === 'fr' ? 'Prêt à commencer votre transformation ?' : language === 'en' ? 'Ready to start your transformation?' : '¿Listo para comenzar tu transformación?'}
          </h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            {language === 'fr' ? 'Parcourez notre catalogue complet et trouvez les produits parfaits pour atteindre vos objectifs fitness.' : language === 'en' ? 'Browse our complete catalog and find the perfect products to reach your fitness goals.' : 'Explora nuestro catálogo completo y encuentra los productos perfectos para alcanzar tus objetivos fitness.'}
          </p>
          <Link to="/produits">
            <Button size="lg" variant="secondary">
              {language === 'fr' ? 'Voir tous les produits' : language === 'en' ? 'View all products' : 'Ver todos los productos'}
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};
