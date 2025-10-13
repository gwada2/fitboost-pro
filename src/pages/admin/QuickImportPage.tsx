import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Link as LinkIcon, Zap, ArrowLeft } from 'lucide-react';
import { useProducts } from '@/contexts/ProductContext';
import { Button } from '@/components/ui/Button';
import { generateId } from '@/utils/helpers';
import { Product } from '@/types';

export const QuickImportPage: React.FC = () => {
  const navigate = useNavigate();
  const { addProduct, categories } = useProducts();
  
  const [formData, setFormData] = useState({
    url: '',
    nameFr: '',
    nameEn: '',
    nameEs: '',
    category: 'cat-1',
    price: '',
    originalPrice: '',
    imageUrl: '',
    descriptionFr: '',
    affiliateSite: 'Amazon',
    tags: [] as string[]
  });

  const [success, setSuccess] = useState(false);

  // Templates par source
  const sourceTemplates = {
    Amazon: { commission: 4, logo: '🛒' },
    MyProtein: { commission: 12, logo: '💪' },
    Nutrimuscle: { commission: 10, logo: '⭐' },
    Decathlon: { commission: 5, logo: '🏃' },
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Créer le produit
    const newProduct: Product = {
      id: generateId(),
      slug: formData.nameFr.toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, ''),
      name: {
        fr: formData.nameFr,
        en: formData.nameEn || formData.nameFr,
        es: formData.nameEs || formData.nameFr
      },
      category: formData.category,
      images: {
        main: formData.imageUrl || 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800',
        gallery: [formData.imageUrl || 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800']
      },
      description: {
        short: {
          fr: formData.descriptionFr || formData.nameFr,
          en: formData.descriptionFr || formData.nameFr,
          es: formData.descriptionFr || formData.nameFr
        },
        full: {
          fr: formData.descriptionFr || formData.nameFr,
          en: formData.descriptionFr || formData.nameFr,
          es: formData.descriptionFr || formData.nameFr
        }
      },
      price: {
        current: parseFloat(formData.price),
        original: formData.originalPrice ? parseFloat(formData.originalPrice) : undefined,
        currency: '€'
      },
      rating: {
        average: 4.5,
        count: 0
      },
      features: [],
      tags: formData.tags,
      affiliation: {
        site: formData.affiliateSite,
        url: formData.url,
        trackingCode: ''
      },
      seo: {
        metaTitle: formData.nameFr,
        metaDescription: formData.descriptionFr || formData.nameFr,
        keywords: []
      },
      visibility: {
        status: 'active',
        showOnHomepage: true,
        showInTrending: true,
        showInNew: true
      },
      statistics: {
        clicks: 0,
        views: 0
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    // Ajouter au catalogue
    addProduct(newProduct);

    // Success message
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
      // Reset form
      setFormData({
        url: '',
        nameFr: '',
        nameEn: '',
        nameEs: '',
        category: 'cat-1',
        price: '',
        originalPrice: '',
        imageUrl: '',
        descriptionFr: '',
        affiliateSite: 'Amazon',
        tags: []
      });
    }, 2000);
  };

  const toggleTag = (tag: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.includes(tag)
        ? prev.tags.filter(t => t !== tag)
        : [...prev.tags, tag]
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/admin/auto-import')}
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Retour Admin
          </Button>
          
          <h1 className="text-4xl font-bold text-gray-900 mb-2 flex items-center gap-3">
            <Zap className="text-orange-600" />
            Import Rapide
          </h1>
          <p className="text-gray-600 text-lg">
            Ajoutez un nouveau produit en 30 secondes ⚡
          </p>
        </div>

        {/* Success Message */}
        {success && (
          <div className="bg-green-50 border-2 border-green-500 rounded-lg p-6 mb-8 text-center animate-bounce">
            <p className="text-2xl font-bold text-green-700 mb-2">
              ✅ Produit ajouté avec succès !
            </p>
            <p className="text-green-600">Visible immédiatement dans le catalogue</p>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-8">
          {/* Source et URL */}
          <div className="mb-8 p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border-2 border-blue-200">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <LinkIcon className="w-5 h-5" />
              1. Source du produit
            </h2>
            
            <div className="grid grid-cols-4 gap-3 mb-4">
              {Object.entries(sourceTemplates).map(([source, data]) => (
                <button
                  key={source}
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, affiliateSite: source }))}
                  className={`p-4 rounded-lg border-2 font-semibold transition-all ${
                    formData.affiliateSite === source
                      ? 'border-primary-600 bg-primary-50 text-primary-700'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="text-2xl mb-1">{data.logo}</div>
                  <div className="text-sm">{source}</div>
                  <div className="text-xs text-gray-500">{data.commission}%</div>
                </button>
              ))}
            </div>

            <input
              type="url"
              placeholder="🔗 Collez l'URL du produit (Amazon, MyProtein, etc.)"
              value={formData.url}
              onChange={(e) => setFormData(prev => ({ ...prev, url: e.target.value }))}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-primary-600 focus:outline-none"
              required
            />
          </div>

          {/* Informations produit */}
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Plus className="w-5 h-5" />
              2. Informations produit
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Nom du produit (Français) *
                </label>
                <input
                  type="text"
                  placeholder="Ex: Haltères Ajustables 24kg"
                  value={formData.nameFr}
                  onChange={(e) => setFormData(prev => ({ ...prev, nameFr: e.target.value }))}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-primary-600 focus:outline-none"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Nom (English)
                  </label>
                  <input
                    type="text"
                    placeholder="Adjustable Dumbbells 24kg"
                    value={formData.nameEn}
                    onChange={(e) => setFormData(prev => ({ ...prev, nameEn: e.target.value }))}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-primary-600 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Nom (Español)
                  </label>
                  <input
                    type="text"
                    placeholder="Mancuernas Ajustables 24kg"
                    value={formData.nameEs}
                    onChange={(e) => setFormData(prev => ({ ...prev, nameEs: e.target.value }))}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-primary-600 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Catégorie *
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-primary-600 focus:outline-none"
                  required
                >
                  {categories.map(cat => (
                    <option key={cat.id} value={cat.id}>{cat.name.fr}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Description courte
                </label>
                <textarea
                  placeholder="Description rapide du produit..."
                  value={formData.descriptionFr}
                  onChange={(e) => setFormData(prev => ({ ...prev, descriptionFr: e.target.value }))}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-primary-600 focus:outline-none"
                  rows={3}
                />
              </div>
            </div>
          </div>

          {/* Prix et Image */}
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              3. Prix et Image
            </h2>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Prix actuel (€) *
                </label>
                <input
                  type="number"
                  step="0.01"
                  placeholder="49.99"
                  value={formData.price}
                  onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-primary-600 focus:outline-none"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Prix barré (€)
                </label>
                <input
                  type="number"
                  step="0.01"
                  placeholder="79.99"
                  value={formData.originalPrice}
                  onChange={(e) => setFormData(prev => ({ ...prev, originalPrice: e.target.value }))}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-primary-600 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                URL de l'image
              </label>
              <input
                type="url"
                placeholder="https://... (optionnel, image par défaut sinon)"
                value={formData.imageUrl}
                onChange={(e) => setFormData(prev => ({ ...prev, imageUrl: e.target.value }))}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-primary-600 focus:outline-none"
              />
            </div>
          </div>

          {/* Tags */}
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              4. Tags (optionnel)
            </h2>
            <div className="flex flex-wrap gap-3">
              {['tendance', 'nouveau', 'promo', 'bio', 'premium'].map(tag => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => toggleTag(tag)}
                  className={`px-4 py-2 rounded-full font-medium transition-all ${
                    formData.tags.includes(tag)
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {/* Submit */}
          <div className="flex gap-4">
            <Button
              type="submit"
              size="lg"
              className="flex-1"
            >
              <Plus className="w-5 h-5 mr-2" />
              ✅ Ajouter au catalogue
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate('/admin/auto-import')}
            >
              Annuler
            </Button>
          </div>
        </form>

        {/* Tips */}
        <div className="mt-8 bg-blue-50 border-2 border-blue-200 rounded-lg p-6">
          <h3 className="font-bold text-blue-900 mb-3">💡 Conseils rapides</h3>
          <ul className="space-y-2 text-sm text-blue-800">
            <li>• <strong>URL :</strong> Utilisez le lien direct du produit (pas la recherche)</li>
            <li>• <strong>Nom :</strong> Copier-coller depuis la page produit</li>
            <li>• <strong>Prix :</strong> Utilisez le prix actuel visible sur le site</li>
            <li>• <strong>Image :</strong> Clic droit sur l'image → "Copier l'adresse de l'image"</li>
            <li>• <strong>Traductions :</strong> Si vides, le français sera utilisé automatiquement</li>
          </ul>
        </div>
      </div>
    </div>
  );
};
