import React from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink, Scale } from 'lucide-react';
import { Product } from '@/types';
import { useLanguage } from '@/contexts/LanguageContext';
import { useComparison } from '@/contexts/ComparisonContext';
import { Badge } from '@/components/ui/Badge';
import { StarRating } from '@/components/ui/StarRating';
import { PriceDisplay } from '@/components/ui/PriceDisplay';
import { Button } from '@/components/ui/Button';
import { calculateDiscount } from '@/utils/helpers';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { language, t } = useLanguage();
  const { addToComparison, isInComparison } = useComparison();

  const discount = product.price.original
    ? calculateDiscount(product.price.current, product.price.original)
    : 0;

  const handleCompareClick = (e: React.MouseEvent) => {
    e.preventDefault();
    addToComparison(product);
  };

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group">
      <Link to={`/produit/${product.slug}`} className="block relative">
        {/* Image */}
        <div className="relative h-64 overflow-hidden bg-gray-100">
          <img
            src={product.images.main}
            alt={t(product.name)}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
            loading="lazy"
          />
          
          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {product.tags.includes('nouveau') && (
              <Badge variant="success">
                {language === 'fr' ? 'Nouveau' : language === 'en' ? 'New' : 'Nuevo'}
              </Badge>
            )}
            {product.tags.includes('tendance') && (
              <Badge variant="warning">
                {language === 'fr' ? '🔥 Tendance' : language === 'en' ? '🔥 Trending' : '🔥 Tendencia'}
              </Badge>
            )}
            {discount > 0 && (
              <Badge variant="danger">-{discount}%</Badge>
            )}
          </div>

          {/* Site Badge */}
          <div className="absolute top-3 right-3">
            <Badge variant="info">{product.affiliation.site}</Badge>
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          <h3 className="font-semibold text-lg text-gray-900 line-clamp-2 mb-2 h-14">
            {t(product.name)}
          </h3>

          <p className="text-sm text-gray-600 line-clamp-2 mb-3">
            {t(product.description.short)}
          </p>

          <div className="mb-3">
            <StarRating rating={product.rating.average} count={product.rating.count} size="sm" />
          </div>

          <PriceDisplay
            current={product.price.current}
            original={product.price.original}
            currency={product.price.currency}
            size="sm"
          />
        </div>
      </Link>

      {/* Actions */}
      <div className="px-4 pb-4 flex gap-2">
        <Button
          size="sm"
          className="flex-1"
          onClick={() => window.open(product.affiliation.url, '_blank', 'noopener,noreferrer')}
        >
          <ExternalLink className="w-4 h-4 mr-1" />
          {language === 'fr' ? 'Voir' : language === 'en' ? 'View' : 'Ver'}
        </Button>
        <Button
          variant={isInComparison(product.id) ? 'primary' : 'outline'}
          size="sm"
          onClick={handleCompareClick}
          disabled={isInComparison(product.id)}
          title={language === 'fr' ? 'Comparer' : language === 'en' ? 'Compare' : 'Comparar'}
        >
          <Scale className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};
