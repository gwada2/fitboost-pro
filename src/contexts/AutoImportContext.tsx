import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useProducts } from './ProductContext';
import { getBestSellersFromSource, BestSellerProduct } from '@/data/bestSellers';
import { Product } from '@/types';
import { generateId } from '@/utils/helpers';

// Types
export interface AutoImportSource {
  id: string;
  name: string;
  logo: string;
  enabled: boolean;
  priority: number;
  topCount: number;
  category: string;
  lastScan?: string;
  productsImported: number;
}

export interface AutoImportSettings {
  enabled: boolean;
  frequency: '1h' | '6h' | '12h' | '24h';
  maxProductsPerScan: number;
  sources: AutoImportSource[];
}

export interface AutoImportJob {
  id: string;
  status: 'idle' | 'running' | 'completed' | 'error';
  startedAt: string;
  completedAt?: string;
  productsFound: number;
  productsImported: number;
  productsUpdated: number;
  sources: string[];
  logs: {
    timestamp: string;
    message: string;
    type: 'info' | 'success' | 'error';
  }[];
}

export interface AutoImportStats {
  totalProductsImported: number;
  lastScanDate: string;
  nextScanDate: string;
  productsToday: number;
  productsThisWeek: number;
  clicksThisWeek: number;
  estimatedRevenueWeek: number;
}

interface AutoImportContextType {
  settings: AutoImportSettings;
  currentJob: AutoImportJob | null;
  jobHistory: AutoImportJob[];
  stats: AutoImportStats;
  isScanning: boolean;
  
  toggleAutoImport: (enabled: boolean) => void;
  setFrequency: (frequency: '1h' | '6h' | '12h' | '24h') => void;
  toggleSource: (sourceId: string, enabled: boolean) => void;
  setMaxProductsPerScan: (max: number) => void;
  runScanNow: () => Promise<void>;
  getNextScanTime: () => Date;
}

const AutoImportContext = createContext<AutoImportContextType | undefined>(undefined);

// Sources initiales
const INITIAL_SOURCES: AutoImportSource[] = [
  {
    id: 'amazon-fr',
    name: 'Amazon FR',
    logo: '🛒',
    enabled: true,
    priority: 8,
    topCount: 20,
    category: 'Fitness',
    productsImported: 0
  },
  {
    id: 'myprotein',
    name: 'MyProtein',
    logo: '💪',
    enabled: true,
    priority: 9,
    topCount: 20,
    category: 'Nutrition',
    productsImported: 0
  },
  {
    id: 'nutrimuscle',
    name: 'Nutrimuscle',
    logo: '⭐',
    enabled: true,
    priority: 10,
    topCount: 10,
    category: 'Premium',
    productsImported: 0
  },
  {
    id: 'decathlon',
    name: 'Decathlon',
    logo: '🏃',
    enabled: false,
    priority: 7,
    topCount: 20,
    category: 'Équipement',
    productsImported: 0
  },
  {
    id: 'prozis',
    name: 'Prozis',
    logo: '🥗',
    enabled: false,
    priority: 8,
    topCount: 15,
    category: 'Nutrition',
    productsImported: 0
  }
];

export const AutoImportProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { products, addProduct, updateProduct, categories } = useProducts();
  
  const [settings, setSettings] = useState<AutoImportSettings>({
    enabled: false,
    frequency: '24h',
    maxProductsPerScan: 20,
    sources: INITIAL_SOURCES
  });
  
  const [currentJob, setCurrentJob] = useState<AutoImportJob | null>(null);
  const [jobHistory, setJobHistory] = useState<AutoImportJob[]>([]);
  const [isScanning, setIsScanning] = useState(false);
  const [lastScanTime, setLastScanTime] = useState<Date>(new Date());
  
  // Fonction helper pour sleep
  const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
  
  // Convertir un BestSellerProduct en Product
  const convertBestSellerToProduct = (bestSeller: BestSellerProduct): any => {
    // Trouver la catégorie correspondante
    const category = categories.find(c => c.slug === bestSeller.category);
    
    return {
      id: generateId(),
      slug: bestSeller.name.fr.toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, ''),
      name: bestSeller.name,
      category: category?.id || categories[0].id,
      images: bestSeller.images,
      description: bestSeller.description,
      price: bestSeller.price,
      rating: bestSeller.rating,
      features: bestSeller.features,
      tags: bestSeller.tags,
      affiliation: {
        site: bestSeller.affiliation.site,
        url: bestSeller.affiliation.url,
        trackingCode: ''
      },
      seo: {
        metaTitle: bestSeller.name.fr,
        metaDescription: bestSeller.description.short.fr,
        keywords: bestSeller.tags
      },
      visibility: {
        status: 'active',
        showOnHomepage: bestSeller.metrics.trending,
        showInTrending: bestSeller.metrics.trending,
        showInNew: bestSeller.metrics.isNew
      },
      stats: {
        views: bestSeller.metrics.salesPerMonth * 10,
        clicks: Math.floor(bestSeller.metrics.salesPerMonth * 0.3)
      },
      statistics: {
        clicks: Math.floor(bestSeller.metrics.salesPerMonth * 0.3),
        views: bestSeller.metrics.salesPerMonth * 10
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    } as unknown as Product;
  };
  
  // Fonction principale de scan
  const runAutoScan = async (): Promise<AutoImportJob> => {
    const job: AutoImportJob = {
      id: generateId(),
      status: 'running',
      startedAt: new Date().toISOString(),
      productsFound: 0,
      productsImported: 0,
      productsUpdated: 0,
      sources: settings.sources.filter(s => s.enabled).map(s => s.id),
      logs: []
    };
    
    setCurrentJob(job);
    setIsScanning(true);
    
    try {
      job.logs.push({
        timestamp: new Date().toISOString(),
        message: '🔄 Démarrage du scan automatique...',
        type: 'info'
      });
      
      // Pour chaque source active
      for (const source of settings.sources.filter(s => s.enabled)) {
        job.logs.push({
          timestamp: new Date().toISOString(),
          message: `🔍 Scan de ${source.name} (Top ${source.topCount})...`,
          type: 'info'
        });
        
        setCurrentJob({ ...job });
        await sleep(1000);
        
        // Récupérer les best-sellers
        const bestSellers = getBestSellersFromSource(source.id, source.topCount);
        job.productsFound += bestSellers.length;
        
        // Importer chaque produit
        for (const bestSeller of bestSellers) {
          // Vérifier si existe déjà par slug (car externalId n'est pas dans le type Product de base)
          const existingProduct = products.find(p => p.slug === bestSeller.name.fr.toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, ''));
          
          if (!existingProduct) {
            // Nouveau produit : importer
            const newProduct = convertBestSellerToProduct(bestSeller);
            addProduct(newProduct);
            
            job.productsImported++;
            job.logs.push({
              timestamp: new Date().toISOString(),
              message: `✅ ${bestSeller.name.fr} importé`,
              type: 'success'
            });
            
            // Mettre à jour le compteur de la source
            setSettings(prev => ({
              ...prev,
              sources: prev.sources.map(s =>
                s.id === source.id
                  ? { ...s, productsImported: s.productsImported + 1, lastScan: new Date().toISOString() }
                  : s
              )
            }));
          } else {
            // Produit existant : vérifier le prix
            if (existingProduct.price.current !== bestSeller.price.current) {
              updateProduct(existingProduct.id, {
                ...existingProduct,
                price: bestSeller.price,
                updatedAt: new Date().toISOString()
              });
              
              job.productsUpdated++;
              job.logs.push({
                timestamp: new Date().toISOString(),
                message: `💰 Prix mis à jour: ${bestSeller.name.fr} (${bestSeller.price.current}€)`,
                type: 'info'
              });
            } else {
              job.logs.push({
                timestamp: new Date().toISOString(),
                message: `⏭️ ${bestSeller.name.fr} déjà existant`,
                type: 'info'
              });
            }
          }
          
          setCurrentJob({ ...job });
          await sleep(200);
          
          // Limite max par scan
          if (job.productsImported >= settings.maxProductsPerScan) {
            job.logs.push({
              timestamp: new Date().toISOString(),
              message: `⚠️ Limite de ${settings.maxProductsPerScan} produits atteinte`,
              type: 'info'
            });
            break;
          }
        }
        
        if (job.productsImported >= settings.maxProductsPerScan) break;
      }
      
      // Finaliser
      job.status = 'completed';
      job.completedAt = new Date().toISOString();
      job.logs.push({
        timestamp: new Date().toISOString(),
        message: `✅ Scan terminé: ${job.productsImported} importés, ${job.productsUpdated} mis à jour`,
        type: 'success'
      });
      
    } catch (error) {
      job.status = 'error';
      job.completedAt = new Date().toISOString();
      job.logs.push({
        timestamp: new Date().toISOString(),
        message: `❌ Erreur: ${error}`,
        type: 'error'
      });
    }
    
    setCurrentJob(job);
    setIsScanning(false);
    setLastScanTime(new Date());
    
    // Ajouter à l'historique
    setJobHistory(prev => [job, ...prev].slice(0, 10));
    
    return job;
  };
  
  // Scan manuel
  const runScanNow = async () => {
    await runAutoScan();
  };
  
  // Timer automatique
  useEffect(() => {
    if (!settings.enabled) return;
    
    const getIntervalMs = (frequency: string) => {
      switch (frequency) {
        case '1h': return 60 * 60 * 1000;
        case '6h': return 6 * 60 * 60 * 1000;
        case '12h': return 12 * 60 * 60 * 1000;
        case '24h': return 24 * 60 * 60 * 1000;
        default: return 24 * 60 * 60 * 1000;
      }
    };
    
    const interval = setInterval(() => {
      runAutoScan();
    }, getIntervalMs(settings.frequency));
    
    return () => clearInterval(interval);
  }, [settings.enabled, settings.frequency]);
  
  // Actions
  const toggleAutoImport = (enabled: boolean) => {
    setSettings(prev => ({ ...prev, enabled }));
    if (enabled) {
      setLastScanTime(new Date());
    }
  };
  
  const setFrequency = (frequency: '1h' | '6h' | '12h' | '24h') => {
    setSettings(prev => ({ ...prev, frequency }));
  };
  
  const toggleSource = (sourceId: string, enabled: boolean) => {
    setSettings(prev => ({
      ...prev,
      sources: prev.sources.map(s =>
        s.id === sourceId ? { ...s, enabled } : s
      )
    }));
  };
  
  const setMaxProductsPerScan = (max: number) => {
    setSettings(prev => ({ ...prev, maxProductsPerScan: max }));
  };
  
  const getNextScanTime = (): Date => {
    const getIntervalMs = (frequency: string) => {
      switch (frequency) {
        case '1h': return 60 * 60 * 1000;
        case '6h': return 6 * 60 * 60 * 1000;
        case '12h': return 12 * 60 * 60 * 1000;
        case '24h': return 24 * 60 * 60 * 1000;
        default: return 24 * 60 * 60 * 1000;
      }
    };
    
    return new Date(lastScanTime.getTime() + getIntervalMs(settings.frequency));
  };
  
  // Stats calculées
  const stats: AutoImportStats = {
    totalProductsImported: settings.sources.reduce((sum, s) => sum + s.productsImported, 0),
    lastScanDate: lastScanTime.toISOString(),
    nextScanDate: getNextScanTime().toISOString(),
    productsToday: jobHistory.filter(j => {
      const today = new Date().setHours(0, 0, 0, 0);
      const jobDate = new Date(j.startedAt).setHours(0, 0, 0, 0);
      return jobDate === today;
    }).reduce((sum, j) => sum + j.productsImported, 0),
    productsThisWeek: jobHistory.filter(j => {
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      return new Date(j.startedAt) > weekAgo;
    }).reduce((sum, j) => sum + j.productsImported, 0),
    clicksThisWeek: Math.floor(Math.random() * 300) + 200, // Simulé
    estimatedRevenueWeek: Math.floor(Math.random() * 600) + 400 // Simulé
  };
  
  return (
    <AutoImportContext.Provider
      value={{
        settings,
        currentJob,
        jobHistory,
        stats,
        isScanning,
        toggleAutoImport,
        setFrequency,
        toggleSource,
        setMaxProductsPerScan,
        runScanNow,
        getNextScanTime
      }}
    >
      {children}
    </AutoImportContext.Provider>
  );
};

export const useAutoImport = () => {
  const context = useContext(AutoImportContext);
  if (!context) {
    throw new Error('useAutoImport must be used within AutoImportProvider');
  }
  return context;
};
