import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Clock, Calendar, ArrowRight } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useProducts } from '@/contexts/ProductContext';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { Badge } from '@/components/ui/Badge';
import { formatDate } from '@/utils/helpers';

export const BlogListPage: React.FC = () => {
  const { language, t } = useLanguage();
  const { blogPosts } = useProducts();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = ['all', 'Musculation', 'Nutrition', 'Yoga', 'Running', 'Récupération'];

  const filteredPosts = useMemo(() => {
    return blogPosts.filter(post => 
      post.status === 'published' && 
      (selectedCategory === 'all' || post.category === selectedCategory)
    ).sort((a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime());
  }, [blogPosts, selectedCategory]);

  const breadcrumbItems = [
    { label: language === 'fr' ? 'Blog' : language === 'en' ? 'Blog' : 'Blog' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-6">
        <Breadcrumb items={breadcrumbItems} />

        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {language === 'fr' ? 'Blog Sport & Bien-être' : language === 'en' ? 'Sport & Wellness Blog' : 'Blog Deporte y Bienestar'}
          </h1>
          <p className="text-lg text-gray-600">
            {language === 'fr' ? 'Conseils, guides et actualités pour optimiser vos performances' : language === 'en' ? 'Tips, guides and news to optimize your performance' : 'Consejos, guías y noticias para optimizar tu rendimiento'}
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full font-medium whitespace-nowrap transition-colors ${
                selectedCategory === cat
                  ? 'bg-primary-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              {cat === 'all' 
                ? (language === 'fr' ? 'Tous' : language === 'en' ? 'All' : 'Todos')
                : cat}
            </button>
          ))}
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post) => (
            <article key={post.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 group">
              <Link to={`/blog/${post.slug}`}>
                <div className="relative h-48 overflow-hidden bg-gray-100">
                  <img
                    src={post.coverImage}
                    alt={t(post.title)}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute top-3 left-3">
                    <Badge variant="primary">{post.category}</Badge>
                  </div>
                </div>
                <div className="p-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-primary-600 transition-colors">
                    {t(post.title)}
                  </h2>
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {t(post.excerpt)}
                  </p>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center gap-4">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {formatDate(post.publishDate, language)}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {post.readTime} min
                      </span>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center text-primary-600 font-medium">
                    {language === 'fr' ? 'Lire l\'article' : language === 'en' ? 'Read article' : 'Leer artículo'}
                    <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            </article>
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <p className="text-gray-600 text-lg">
              {language === 'fr' ? 'Aucun article trouvé dans cette catégorie.' : language === 'en' ? 'No articles found in this category.' : 'No se encontraron artículos en esta categoría.'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
