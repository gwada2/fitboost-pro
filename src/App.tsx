import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { ProductProvider } from '@/contexts/ProductContext';
import { AdminProvider } from '@/contexts/AdminContext';
import { ComparisonProvider } from '@/contexts/ComparisonContext';
import { AutoImportProvider } from '@/contexts/AutoImportContext';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { HomePage } from '@/pages/HomePage';
import { ProductCatalogPage } from '@/pages/ProductCatalogPage';
import { ProductDetailPage } from '@/pages/ProductDetailPage';
import { BlogListPage } from '@/pages/BlogListPage';
import { BlogPostPage } from '@/pages/BlogPostPage';
import { ComparisonPage } from '@/pages/ComparisonPage';
import { AboutPage } from '@/pages/AboutPage';
import { ContactPage } from '@/pages/ContactPage';
import { AutoImportPage } from '@/pages/admin/AutoImportPage';
import { QuickImportPage } from '@/pages/admin/QuickImportPage';

// Admin Dashboard - to be completed
const AdminDashboard = () => <div className="container mx-auto px-4 py-8"><h1 className="text-3xl font-bold">Admin Dashboard</h1><p className="mt-4">Page en construction...</p></div>;

function App() {
  return (
    <Router>
      <LanguageProvider>
        <AdminProvider>
          <ProductProvider>
            <AutoImportProvider>
              <ComparisonProvider>
              <div className="flex flex-col min-h-screen">
                <Header />
                <main className="flex-grow">
                  <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/produits" element={<ProductCatalogPage />} />
                    <Route path="/produits/:category" element={<ProductCatalogPage />} />
                    <Route path="/produit/:slug" element={<ProductDetailPage />} />
                    <Route path="/blog" element={<BlogListPage />} />
                    <Route path="/blog/:slug" element={<BlogPostPage />} />
                    <Route path="/comparer" element={<ComparisonPage />} />
                    <Route path="/a-propos" element={<AboutPage />} />
                    <Route path="/contact" element={<ContactPage />} />
                    <Route path="/admin" element={<AdminDashboard />} />
                    <Route path="/admin/auto-import" element={<AutoImportPage />} />
                    <Route path="/admin/quick-import" element={<QuickImportPage />} />
                  </Routes>
                </main>
                <Footer />
              </div>
              </ComparisonProvider>
            </AutoImportProvider>
          </ProductProvider>
        </AdminProvider>
      </LanguageProvider>
    </Router>
  );
}

export default App;
