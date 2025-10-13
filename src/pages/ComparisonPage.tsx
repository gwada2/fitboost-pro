import React from 'react';
import { Link } from 'react-router-dom';
import { X, ExternalLink, Check, Minus, ArrowLeft } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useComparison } from '@/contexts/ComparisonContext';
import { useProducts } from '@/contexts/ProductContext';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { Button } from '@/components/ui/Button';
import { StarRating } from '@/components/ui/StarRating';
import { PriceDisplay } from '@/components/ui/PriceDisplay';
import { Badge } from '@/components/ui/Badge';

export const ComparisonPage: React.FC = () => {
  const { language, t } = useLanguage();
  const { comparisonProducts, removeFromComparison, clearComparison } = useComparison();
  const { trackProductClick } = useProducts();

  const breadcrumbItems = [
    { label: language === 'fr' ? 'Comparateur' : language === 'en' ? 'Compare' : 'Comparador' },
  ];

  const handleAffiliateClick = (productId: string, url: string) => {
    trackProductClick(productId);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  if (comparisonProducts.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            {language === 'fr' ? 'Aucun produit à comparer' : language === 'en' ? 'No products to compare' : 'No hay productos para comparar'}
          </h1>
          <p className="text-gray-600 mb-8">
            {language === 'fr' ? 'Ajoutez des produits à votre comparateur depuis le catalogue.' : language === 'en' ? 'Add products to your comparison from the catalog.' : 'Agrega productos a tu comparador desde el catálogo.'}
          </p>
          <Link to="/produits">
            <Button size="lg">
              <ArrowLeft className="w-4 h-4 mr-2" />
              {language === 'fr' ? 'Parcourir les produits' : language === 'en' ? 'Browse products' : 'Explorar productos'}
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-6">
        <Breadcrumb items={breadcrumbItems} />

        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              {language === 'fr' ? 'Comparateur de Produits' : language === 'en' ? 'Product Comparison' : 'Comparador de Productos'}
            </h1>
            <p className="text-gray-600">
              {comparisonProducts.length} {language === 'fr' ? 'produits sélectionnés' : language === 'en' ? 'products selected' : 'productos seleccionados'}
            </p>
          </div>
          {comparisonProducts.length > 0 && (
            <Button variant="outline" onClick={clearComparison}>
              {language === 'fr' ? 'Tout effacer' : language === 'en' ? 'Clear all' : 'Borrar todo'}
            </Button>
          )}
        </div>

        {/* Comparison Table */}
        <div className="bg-white rounded-lg shadow-md overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="p-4 text-left font-semibold text-gray-700 bg-gray-50 sticky left-0 z-10">
                  {language === 'fr' ? 'Caractéristique' : language === 'en' ? 'Feature' : 'Característica'}
                </th>
                {comparisonProducts.map((product) => (
                  <th key={product.id} className="p-4 text-center min-w-[250px]">
                    <div className="relative">
                      <button
                        onClick={() => removeFromComparison(product.id)}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {/* Images */}
              <tr className="border-b">
                <td className="p-4 font-medium text-gray-700 bg-gray-50 sticky left-0">Image</td>
                {comparisonProducts.map((product) => (
                  <td key={product.id} className="p-4">
                    <img
                      src={product.images.main}
                      alt={t(product.name)}
                      className="w-full h-48 object-cover rounded-lg"
                    />
                  </td>
                ))}
              </tr>

              {/* Names */}
              <tr className="border-b bg-gray-50">
                <td className="p-4 font-medium text-gray-700 sticky left-0 bg-gray-50">
                  {language === 'fr' ? 'Nom' : language === 'en' ? 'Name' : 'Nombre'}
                </td>
                {comparisonProducts.map((product) => (
                  <td key={product.id} className="p-4">
                    <Link to={`/produit/${product.slug}`} className="font-semibold text-gray-900 hover:text-primary-600">
                      {t(product.name)}
                    </Link>
                  </td>
                ))}
              </tr>

              {/* Price */}
              <tr className="border-b">
                <td className="p-4 font-medium text-gray-700 bg-gray-50 sticky left-0">Prix</td>
                {comparisonProducts.map((product) => (
                  <td key={product.id} className="p-4">
                    <PriceDisplay
                      current={product.price.current}
                      original={product.price.original}
                      currency={product.price.currency}
                      size="sm"
                    />
                  </td>
                ))}
              </tr>

              {/* Rating */}
              <tr className="border-b bg-gray-50">
                <td className="p-4 font-medium text-gray-700 sticky left-0 bg-gray-50">
                  {language === 'fr' ? 'Note' : language === 'en' ? 'Rating' : 'Calificación'}
                </td>
                {comparisonProducts.map((product) => (
                  <td key={product.id} className="p-4">
                    <StarRating rating={product.rating.average} count={product.rating.count} size="sm" />
                  </td>
                ))}
              </tr>

              {/* Site */}
              <tr className="border-b">
                <td className="p-4 font-medium text-gray-700 bg-gray-50 sticky left-0">Site</td>
                {comparisonProducts.map((product) => (
                  <td key={product.id} className="p-4">
                    <Badge variant="info">{product.affiliation.site}</Badge>
                  </td>
                ))}
              </tr>

              {/* Description */}
              <tr className="border-b bg-gray-50">
                <td className="p-4 font-medium text-gray-700 sticky left-0 bg-gray-50">Description</td>
                {comparisonProducts.map((product) => (
                  <td key={product.id} className="p-4 text-sm text-gray-600">
                    {t(product.description.short)}
                  </td>
                ))}
              </tr>

              {/* Features */}
              <tr className="border-b">
                <td className="p-4 font-medium text-gray-700 bg-gray-50 sticky left-0">
                  {language === 'fr' ? 'Caractéristiques' : language === 'en' ? 'Features' : 'Características'}
                </td>
                {comparisonProducts.map((product) => (
                  <td key={product.id} className="p-4">
                    <ul className="space-y-2 text-sm">
                      {product.features.slice(0, 4).map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <Check className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </td>
                ))}
              </tr>

              {/* CTA */}
              <tr>
                <td className="p-4 font-medium text-gray-700 bg-gray-50 sticky left-0">Action</td>
                {comparisonProducts.map((product) => (
                  <td key={product.id} className="p-4">
                    <Button
                      className="w-full"
                      onClick={() => handleAffiliateClick(product.id, product.affiliation.url)}
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      {language === 'fr' ? 'Voir' : language === 'en' ? 'View' : 'Ver'}
                    </Button>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
