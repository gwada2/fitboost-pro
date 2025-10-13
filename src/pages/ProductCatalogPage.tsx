import React, { useState, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { Filter, Grid, List, SlidersHorizontal } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useProducts } from '@/contexts/ProductContext';
import { ProductCard } from '@/components/product/ProductCard';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { Button } from '@/components/ui/Button';
import { filterProducts, sortProducts } from '@/utils/helpers';

export const ProductCatalogPage: React.FC = () => {
  const { category } = useParams();
  const { language, t } = useLanguage();
  const { products, categories } = useProducts();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>(category ? [category] : []);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500]);
  const [minRating, setMinRating] = useState(0);
  const [sortBy, setSortBy] = useState<'price-asc' | 'price-desc' | 'popularity' | 'newest' | 'rating'>('popularity');
  const [showFilters, setShowFilters] = useState(false);

  const filteredAndSortedProducts = useMemo(() => {
    const categoryIds = selectedCategories.map(slug => 
      categories.find(c => c.slug === slug)?.id
    ).filter(Boolean) as string[];

    let filtered = filterProducts(
      products,
      searchQuery,
      categoryIds,
      priceRange,
      minRating,
      [],
      [],
      language
    );
    
    return sortProducts(filtered, sortBy);
  }, [products, searchQuery, selectedCategories, priceRange, minRating, sortBy, language, categories]);

  const currentCategory = category ? categories.find(c => c.slug === category) : null;

  const breadcrumbItems = currentCategory
    ? [
        { label: language === 'fr' ? 'Produits' : language === 'en' ? 'Products' : 'Productos', href: '/produits' },
        { label: t(currentCategory.name) },
      ]
    : [{ label: language === 'fr' ? 'Produits' : language === 'en' ? 'Products' : 'Productos' }];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-6">
        <Breadcrumb items={breadcrumbItems} />

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            {currentCategory ? t(currentCategory.name) : (language === 'fr' ? 'Tous les Produits' : language === 'en' ? 'All Products' : 'Todos los Productos')}
          </h1>
          <p className="text-gray-600">
            {filteredAndSortedProducts.length} {language === 'fr' ? 'produits trouvés' : language === 'en' ? 'products found' : 'productos encontrados'}
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <aside className={`lg:w-64 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-lg flex items-center gap-2">
                  <Filter className="w-5 h-5" />
                  {language === 'fr' ? 'Filtres' : language === 'en' ? 'Filters' : 'Filtros'}
                </h3>
              </div>

              {/* Search */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {language === 'fr' ? 'Rechercher' : language === 'en' ? 'Search' : 'Buscar'}
                </label>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={language === 'fr' ? 'Nom du produit...' : language === 'en' ? 'Product name...' : 'Nombre del producto...'}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>

              {/* Categories */}
              {!category && (
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {language === 'fr' ? 'Catégories' : language === 'en' ? 'Categories' : 'Categorías'}
                  </label>
                  <div className="space-y-2">
                    {categories.map((cat) => (
                      <label key={cat.id} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={selectedCategories.includes(cat.slug)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedCategories([...selectedCategories, cat.slug]);
                            } else {
                              setSelectedCategories(selectedCategories.filter(c => c !== cat.slug));
                            }
                          }}
                          className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                        />
                        <span className="ml-2 text-sm text-gray-700">{t(cat.name)}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {/* Price Range */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {language === 'fr' ? 'Prix' : language === 'en' ? 'Price' : 'Precio'}: {priceRange[0]}€ - {priceRange[1]}€
                </label>
                <input
                  type="range"
                  min="0"
                  max="500"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                  className="w-full"
                />
              </div>

              {/* Rating */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {language === 'fr' ? 'Note minimale' : language === 'en' ? 'Minimum rating' : 'Calificación mínima'}
                </label>
                <select
                  value={minRating}
                  onChange={(e) => setMinRating(parseFloat(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                >
                  <option value="0">{language === 'fr' ? 'Toutes' : language === 'en' ? 'All' : 'Todas'}</option>
                  <option value="4">4+ ⭐</option>
                  <option value="4.5">4.5+ ⭐</option>
                </select>
              </div>

              <Button
                variant="outline"
                className="w-full"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategories(category ? [category] : []);
                  setPriceRange([0, 500]);
                  setMinRating(0);
                }}
              >
                {language === 'fr' ? 'Réinitialiser' : language === 'en' ? 'Reset' : 'Restablecer'}
              </Button>
            </div>
          </aside>

          {/* Products Grid */}
          <div className="flex-1">
            {/* Toolbar */}
            <div className="bg-white rounded-lg shadow-md p-4 mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <Button
                variant="outline"
                size="sm"
                className="lg:hidden"
                onClick={() => setShowFilters(!showFilters)}
              >
                <SlidersHorizontal className="w-4 h-4 mr-2" />
                {language === 'fr' ? 'Filtres' : language === 'en' ? 'Filters' : 'Filtros'}
              </Button>

              <div className="flex items-center gap-2">
                <label className="text-sm font-medium text-gray-700">
                  {language === 'fr' ? 'Trier par:' : language === 'en' ? 'Sort by:' : 'Ordenar por:'}
                </label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="px-3 py-1.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 text-sm"
                >
                  <option value="popularity">
                    {language === 'fr' ? 'Popularité' : language === 'en' ? 'Popularity' : 'Popularidad'}
                  </option>
                  <option value="newest">
                    {language === 'fr' ? 'Nouveautés' : language === 'en' ? 'Newest' : 'Novedades'}
                  </option>
                  <option value="price-asc">
                    {language === 'fr' ? 'Prix croissant' : language === 'en' ? 'Price: Low to High' : 'Precio: Menor a Mayor'}
                  </option>
                  <option value="price-desc">
                    {language === 'fr' ? 'Prix décroissant' : language === 'en' ? 'Price: High to Low' : 'Precio: Mayor a Menor'}
                  </option>
                  <option value="rating">
                    {language === 'fr' ? 'Meilleures notes' : language === 'en' ? 'Top Rated' : 'Mejor Valorados'}
                  </option>
                </select>
              </div>
            </div>

            {/* Products */}
            {filteredAndSortedProducts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredAndSortedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-md p-12 text-center">
                <p className="text-gray-600 text-lg">
                  {language === 'fr' ? 'Aucun produit trouvé. Essayez de modifier vos filtres.' : language === 'en' ? 'No products found. Try modifying your filters.' : 'No se encontraron productos. Intenta modificar tus filtros.'}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
