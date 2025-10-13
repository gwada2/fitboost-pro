import React, { useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Clock, Calendar, ArrowLeft, Tag } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useProducts } from '@/contexts/ProductContext';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { ProductCard } from '@/components/product/ProductCard';
import { formatDate } from '@/utils/helpers';

export const BlogPostPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { language, t } = useLanguage();
  const { getBlogPostBySlug, products } = useProducts();

  const post = slug ? getBlogPostBySlug(slug) : undefined;

  useEffect(() => {
    if (post) {
      document.title = `${t(post.title)} | Sport & Bien-être`;
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute('content', post.seo.metaDescription);
      }
    }
  }, [post]);

  if (!post) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          {language === 'fr' ? 'Article non trouvé' : language === 'en' ? 'Article not found' : 'Artículo no encontrado'}
        </h1>
        <Button onClick={() => navigate('/blog')}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          {language === 'fr' ? 'Retour au blog' : language === 'en' ? 'Back to blog' : 'Volver al blog'}
        </Button>
      </div>
    );
  }

  const relatedProducts = products.filter(p => 
    post.relatedProducts.includes(p.id) && p.visibility.status === 'active'
  );

  const breadcrumbItems = [
    { label: 'Blog', href: '/blog' },
    { label: t(post.title) },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-6">
        <Breadcrumb items={breadcrumbItems} />

        <article className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="bg-white rounded-lg shadow-md p-8 mb-8">
            <div className="flex items-center gap-3 mb-4">
              <Badge variant="primary">{post.category}</Badge>
              {post.tags.map((tag) => (
                <Badge key={tag} variant="info">
                  <Tag className="w-3 h-3 mr-1" />
                  {tag}
                </Badge>
              ))}
            </div>

            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {t(post.title)}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-gray-600 mb-6">
              <span className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                {formatDate(post.publishDate, language)}
              </span>
              <span className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                {post.readTime} {language === 'fr' ? 'min de lecture' : language === 'en' ? 'min read' : 'min de lectura'}
              </span>
              <span className="text-gray-500">
                {post.views} {language === 'fr' ? 'vues' : language === 'en' ? 'views' : 'vistas'}
              </span>
            </div>

            {/* Cover Image */}
            <div className="aspect-video rounded-lg overflow-hidden bg-gray-100 mb-6">
              <img
                src={post.coverImage}
                alt={t(post.title)}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Excerpt */}
            <p className="text-xl text-gray-700 leading-relaxed mb-6 font-medium">
              {t(post.excerpt)}
            </p>

            {/* Content */}
            <div className="prose prose-lg max-w-none">
              <div className="text-gray-700 leading-relaxed whitespace-pre-line">
                {t(post.content)}
              </div>
            </div>
          </div>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                {language === 'fr' ? '🔗 Produits recommandés' : language === 'en' ? '🔗 Recommended products' : '🔗 Productos recomendados'}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          )}

          {/* Back to Blog */}
          <div className="text-center">
            <Link to="/blog">
              <Button variant="outline" size="lg">
                <ArrowLeft className="w-4 h-4 mr-2" />
                {language === 'fr' ? 'Retour au blog' : language === 'en' ? 'Back to blog' : 'Volver al blog'}
              </Button>
            </Link>
          </div>
        </article>
      </div>
    </div>
  );
};
