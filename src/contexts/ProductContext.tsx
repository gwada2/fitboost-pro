import React, { createContext, useContext, useState, ReactNode, useCallback, useEffect } from 'react';
import { Product, Category, BlogPost } from '@/types';
import { initialProducts } from '@/data/products';
import { initialCategories } from '@/data/categories';
import { initialBlogPosts } from '@/data/blogPosts';
import { trackClick as trackClickHelper, trackView as trackViewHelper } from '@/utils/helpers';
import autoProducts from '@/data/auto-products.json';

interface ProductContextType {
  products: Product[];
  categories: Category[];
  blogPosts: BlogPost[];
  addProduct: (product: Product) => void;
  updateProduct: (id: string, product: Product) => void;
  deleteProduct: (id: string) => void;
  getProductById: (id: string) => Product | undefined;
  getProductBySlug: (slug: string) => Product | undefined;
  trackProductClick: (id: string) => void;
  trackProductView: (id: string) => void;
  addBlogPost: (post: BlogPost) => void;
  updateBlogPost: (id: string, post: BlogPost) => void;
  deleteBlogPost: (id: string) => void;
  getBlogPostBySlug: (slug: string) => BlogPost | undefined;
  addCategory: (category: Category) => void;
  updateCategory: (id: string, category: Category) => void;
  deleteCategory: (id: string) => void;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [categories, setCategories] = useState<Category[]>(initialCategories);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>(initialBlogPosts);

  // Charger les produits auto-importés au démarrage
  useEffect(() => {
    if (autoProducts && Array.isArray(autoProducts) && autoProducts.length > 0) {
      console.log(`🤖 Loading ${autoProducts.length} auto-imported products...`);
      setProducts(prev => {
        // Éviter les doublons basés sur le slug
        const existingSlugs = new Set(prev.map(p => p.slug));
        const newProducts = (autoProducts as Product[]).filter(
          p => !existingSlugs.has(p.slug)
        );
        if (newProducts.length > 0) {
          console.log(`✅ Added ${newProducts.length} new auto-imported products`);
        }
        return [...prev, ...newProducts];
      });
    }
  }, []);

  const addProduct = useCallback((product: Product) => {
    setProducts((prev) => [...prev, product]);
  }, []);

  const updateProduct = useCallback((id: string, product: Product) => {
    setProducts((prev) => prev.map((p) => (p.id === id ? product : p)));
  }, []);

  const deleteProduct = useCallback((id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  }, []);

  const getProductById = useCallback(
    (id: string) => {
      return products.find((p) => p.id === id);
    },
    [products]
  );

  const getProductBySlug = useCallback(
    (slug: string) => {
      return products.find((p) => p.slug === slug);
    },
    [products]
  );

  const trackProductClick = useCallback((id: string) => {
    setProducts((prev) => trackClickHelper(id, prev));
  }, []);

  const trackProductView = useCallback((id: string) => {
    setProducts((prev) => trackViewHelper(id, prev));
  }, []);

  const addBlogPost = useCallback((post: BlogPost) => {
    setBlogPosts((prev) => [...prev, post]);
  }, []);

  const updateBlogPost = useCallback((id: string, post: BlogPost) => {
    setBlogPosts((prev) => prev.map((p) => (p.id === id ? post : p)));
  }, []);

  const deleteBlogPost = useCallback((id: string) => {
    setBlogPosts((prev) => prev.filter((p) => p.id !== id));
  }, []);

  const getBlogPostBySlug = useCallback(
    (slug: string) => {
      return blogPosts.find((p) => p.slug === slug);
    },
    [blogPosts]
  );

  const addCategory = useCallback((category: Category) => {
    setCategories((prev) => [...prev, category]);
  }, []);

  const updateCategory = useCallback((id: string, category: Category) => {
    setCategories((prev) => prev.map((c) => (c.id === id ? category : c)));
  }, []);

  const deleteCategory = useCallback((id: string) => {
    setCategories((prev) => prev.filter((c) => c.id !== id));
  }, []);

  return (
    <ProductContext.Provider
      value={{
        products,
        categories,
        blogPosts,
        addProduct,
        updateProduct,
        deleteProduct,
        getProductById,
        getProductBySlug,
        trackProductClick,
        trackProductView,
        addBlogPost,
        updateBlogPost,
        deleteBlogPost,
        getBlogPostBySlug,
        addCategory,
        updateCategory,
        deleteCategory,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProducts must be used within ProductProvider');
  }
  return context;
};
