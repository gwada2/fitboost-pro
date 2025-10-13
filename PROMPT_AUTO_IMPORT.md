# 🤖 PROMPT - SYSTÈME D'AUTO-IMPORT SIMPLIFIÉ

## 🎯 OBJECTIF PRINCIPAL

Créer un système d'automatisation **SIMPLE** qui :
1. Scanne automatiquement les **top produits best-sellers** sur plusieurs sites (Amazon, MyProtein, etc.)
2. Importe automatiquement ces produits dans l'application FitBoost Pro
3. Fréquence **ajustable** : 1h, 6h, 12h ou 24h
4. Aucune validation manuelle requise (tout automatique)

---

## 📋 SPÉCIFICATIONS TECHNIQUES

### Stack Technique
- **Frontend** : React + TypeScript (existant)
- **State** : Context API + useState/useReducer
- **Styling** : Tailwind CSS
- **Icônes** : Lucide React
- **Storage** : UNIQUEMENT React State (❌ PAS de localStorage)
- **Mode** : Simulation complète (pas de vrai scraping)

### Contraintes
- ✅ Tout en React (pas de backend Node.js)
- ✅ Simulation réaliste qui fonctionne
- ✅ Intégration transparente avec l'app existante
- ✅ Composants réutilisables et propres
- ✅ TypeScript strict

---

## 🏗️ STRUCTURE À CRÉER

### 1. Context (State Management)

**Fichier** : `src/contexts/AutoImportContext.tsx`

```typescript
interface AutoImportSettings {
  enabled: boolean;                         // Système activé ou non
  frequency: '1h' | '6h' | '12h' | '24h';  // Fréquence des scans
  maxProductsPerScan: number;               // Max produits par scan (défaut: 20)
  sources: AutoImportSource[];              // Liste des sources actives
}

interface AutoImportSource {
  id: string;                    // 'amazon-fr', 'myprotein', etc.
  name: string;                  // 'Amazon FR'
  logo: string;                  // Emoji ou URL
  enabled: boolean;              // Active ou non
  priority: number;              // 1-10 (10 = max)
  topCount: number;              // Top 20, 50, 100 best-sellers
  category: string;              // 'Fitness', 'Nutrition', etc.
  lastScan?: string;             // ISO date dernière analyse
  productsImported: number;      // Compteur total
}

interface AutoImportJob {
  id: string;
  status: 'idle' | 'running' | 'completed' | 'error';
  startedAt: string;
  completedAt?: string;
  productsFound: number;
  productsImported: number;
  sources: string[];             // IDs des sources scannées
  logs: {
    timestamp: string;
    message: string;
    type: 'info' | 'success' | 'error';
  }[];
}

interface AutoImportStats {
  totalProductsImported: number;
  lastScanDate: string;
  nextScanDate: string;
  productsToday: number;
  productsThisWeek: number;
  clicksThisWeek: number;
  estimatedRevenueWeek: number;
}
```

**Fonctions du Context** :

```typescript
// Activer/désactiver le système
toggleAutoImport(enabled: boolean): void

// Changer la fréquence
setFrequency(frequency: '1h' | '6h' | '12h' | '24h'): void

// Activer/désactiver une source
toggleSource(sourceId: string, enabled: boolean): void

// Lancer un scan manuel immédiat
runScanNow(): Promise<void>

// Obtenir les stats
getStats(): AutoImportStats

// Obtenir l'historique
getHistory(): AutoImportJob[]
```

---

### 2. Page Admin

**Fichier** : `src/pages/admin/AutoImportPage.tsx`

**Route** : `/admin/auto-import`

**Layout** :

```
┌──────────────────────────────────────────────────────────────┐
│  🤖 Auto-Import Intelligent                                  │
│                                                              │
│  ┌────────────────────────────────────────────────────────┐ │
│  │ STATUS                                                 │ │
│  │                                                        │ │
│  │ ✅ Système Actif                [🔴 Désactiver]       │ │
│  │                                                        │ │
│  │ ⏰ Prochain scan : dans 3h 24min                       │ │
│  │ 📅 Dernier scan : Il y a 24 minutes                   │ │
│  └────────────────────────────────────────────────────────┘ │
│                                                              │
│  ┌────────────────────────────────────────────────────────┐ │
│  │ ⚙️ PARAMÈTRES                                          │ │
│  │                                                        │ │
│  │ Fréquence de scan                                     │ │
│  │ ○ Toutes les heures                                   │ │
│  │ ○ Toutes les 6 heures                                 │ │
│  │ ○ Toutes les 12 heures                                │ │
│  │ ● Toutes les 24 heures (recommandé)                   │ │
│  │                                                        │ │
│  │ Produits maximum par scan : [20] ────────────────────│ │
│  └────────────────────────────────────────────────────────┘ │
│                                                              │
│  ┌────────────────────────────────────────────────────────┐ │
│  │ 🌐 SOURCES ACTIVES                                     │ │
│  │                                                        │ │
│  │ ✅ Amazon FR        Top 20 Fitness    [Configurer]    │ │
│  │ ✅ MyProtein        Top 20 Nutrition  [Configurer]    │ │
│  │ ✅ Nutrimuscle      Top 10 Premium    [Configurer]    │ │
│  │ ☐  Decathlon        Top 20 Équip.    [Configurer]    │ │
│  │ ☐  Prozis           Top 15 Nutrition [Configurer]    │ │
│  │                                                        │ │
│  │ [+ Ajouter une source]                                │ │
│  └────────────────────────────────────────────────────────┘ │
│                                                              │
│  [▶️ LANCER SCAN MAINTENANT]  (gros bouton vert)           │
│                                                              │
│  ┌────────────────────────────────────────────────────────┐ │
│  │ 📊 STATISTIQUES                                        │ │
│  │                                                        │ │
│  │ 🎯 Aujourd'hui                                         │ │
│  │ • 12 produits importés                                │ │
│  │ • Sources : Amazon (8), MyProtein (4)                 │ │
│  │                                                        │ │
│  │ 📈 Cette semaine                                       │ │
│  │ • 87 produits importés                                │ │
│  │ • 234 clics d'affiliation                             │ │
│  │ • ~450€ commissions estimées                          │ │
│  └────────────────────────────────────────────────────────┘ │
│                                                              │
│  ┌────────────────────────────────────────────────────────┐ │
│  │ 📜 HISTORIQUE DES SCANS (5 derniers)                   │ │
│  │                                                        │ │
│  │ ✅ Il y a 24 min  - 12 produits importés              │ │
│  │    Amazon FR (8) • MyProtein (4)                      │ │
│  │                                                        │ │
│  │ ✅ Il y a 1 jour  - 18 produits importés              │ │
│  │    Amazon FR (12) • MyProtein (6)                     │ │
│  │                                                        │ │
│  │ ✅ Il y a 2 jours - 15 produits importés              │ │
│  │    Amazon FR (10) • MyProtein (5)                     │ │
│  │                                                        │ │
│  │ [Voir tout l'historique]                              │ │
│  └────────────────────────────────────────────────────────┘ │
└──────────────────────────────────────────────────────────────┘
```

**Sections de la page** :

1. **Status Card** (En haut)
   - Badge statut (Actif/Inactif)
   - Toggle On/Off
   - Prochain scan (countdown)
   - Dernier scan

2. **Paramètres** (Milieu)
   - Radio buttons pour fréquence
   - Slider/Input pour max produits

3. **Sources Actives** (Milieu)
   - Liste avec checkbox
   - Icône + Nom + Détails
   - Bouton configurer par source

4. **CTA Principal** (Centre)
   - Gros bouton "Lancer scan maintenant"

5. **Statistiques** (Bas)
   - Cards avec chiffres clés
   - Aujourd'hui + Cette semaine

6. **Historique** (Bas)
   - Timeline des 5 derniers scans
   - Date, produits importés, sources

---

### 3. Composants Réutilisables

#### A. `ScanProgress.tsx`

Modal qui s'affiche pendant le scan :

```
┌──────────────────────────────────────┐
│  🔄 Scan en cours...                 │
│                                      │
│  ▓▓▓▓▓▓▓▓▓▓░░░░░░░░░░ 50%          │
│                                      │
│  🔍 Amazon FR : 8/20 produits       │
│  ⏳ Reste : MyProtein, Nutrimuscle  │
│                                      │
│  📋 LOGS                             │
│  • ✅ Whey Bio importée              │
│  • ✅ BCAA 2:1:1 importé             │
│  • ⏭️ Déjà existant : Créatine      │
│  • ✅ Haltères 24kg importés         │
│                                      │
│  [Annuler]                           │
└──────────────────────────────────────┘
```

#### B. `SourceCard.tsx`

Card pour chaque source :

```
┌───────────────────────────────────┐
│ ✅ [Logo] Amazon FR               │
│                                   │
│ Top 20 Best-sellers Fitness       │
│                                   │
│ 📊 87 produits importés           │
│ 🕐 Dernier scan : Il y a 24 min   │
│                                   │
│ [Configurer] [Désactiver]         │
└───────────────────────────────────┘
```

#### C. `StatCard.tsx`

Card de statistique simple :

```
┌────────────────────┐
│ 🎯                 │
│ 87                 │
│ Produits/semaine   │
└────────────────────┘
```

---

### 4. Produits Mockés Best-Sellers

**Fichier** : `src/data/bestSellers.ts`

Créer **50 produits best-sellers** réalistes avec :

```typescript
interface BestSellerProduct {
  id: string;
  externalId: string;           // ASIN, SKU externe
  source: string;                // 'amazon-fr', 'myprotein'
  
  // Données produit
  name: {
    fr: string;
    en: string;
    es: string;
  };
  brand: string;
  category: string;               // 'fitness-musculation', 'nutrition-supplements'
  images: {
    main: string;
    gallery: string[];
  };
  description: {
    short: { fr: string; en: string; es: string; };
    full: { fr: string; en: string; es: string; };
  };
  price: {
    current: number;
    original?: number;
    currency: string;
  };
  rating: {
    average: number;
    count: number;
  };
  
  // Métriques best-seller
  metrics: {
    salesRank: number;           // Position dans best-sellers
    salesPerMonth: number;        // Ventes estimées
    trending: boolean;            // Tendance actuelle
    isNew: boolean;               // Nouveau produit
  };
  
  // Affiliation
  affiliation: {
    site: string;
    url: string;
    commission: number;           // Pourcentage
  };
  
  // Tags
  tags: string[];                 // ['best-seller', 'trending', 'high-commission']
}
```

**Sources à mocker** :

1. **Amazon FR** (20 produits)
   - Catégories : Haltères, Tapis yoga, Protéines, Montres sport
   - Commission : 3-4%
   - Sales rank : 1-100

2. **MyProtein** (15 produits)
   - Catégories : Whey, BCAA, Créatine, Barres protéinées
   - Commission : 10-12%
   - Sales rank : 1-50

3. **Nutrimuscle** (10 produits)
   - Catégories : Protéines bio, Créatine, Vitamines
   - Commission : 10%
   - Sales rank : 1-30

4. **Decathlon** (5 produits)
   - Catégories : Équipement basique
   - Commission : 5%
   - Sales rank : 1-200

---

## 🔄 LOGIQUE D'AUTOMATISATION

### Simulation du Timer

```typescript
// Dans AutoImportContext

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
```

### Fonction de Scan

```typescript
async function runAutoScan() {
  // 1. Créer un job
  const job: AutoImportJob = {
    id: generateUUID(),
    status: 'running',
    startedAt: new Date().toISOString(),
    productsFound: 0,
    productsImported: 0,
    sources: settings.sources.filter(s => s.enabled).map(s => s.id),
    logs: []
  };
  
  // 2. Pour chaque source active
  for (const source of settings.sources.filter(s => s.enabled)) {
    // Log début
    job.logs.push({
      timestamp: new Date().toISOString(),
      message: `Scan de ${source.name} (Top ${source.topCount})`,
      type: 'info'
    });
    
    // Attendre 1 seconde (simulation)
    await sleep(1000);
    
    // 3. Récupérer les best-sellers de cette source
    const bestSellers = getBestSellersFromSource(source.id, source.topCount);
    
    job.productsFound += bestSellers.length;
    
    // 4. Importer chaque produit
    for (const product of bestSellers) {
      // Vérifier si le produit existe déjà
      const exists = products.find(p => p.externalId === product.externalId);
      
      if (!exists) {
        // Importer le produit
        const newProduct = convertBestSellerToProduct(product);
        addProduct(newProduct);
        
        job.productsImported++;
        job.logs.push({
          timestamp: new Date().toISOString(),
          message: `✅ ${product.name.fr} importé`,
          type: 'success'
        });
      } else {
        // Mettre à jour le prix si changé
        if (exists.price.current !== product.price.current) {
          updateProductPrice(exists.id, product.price.current);
          
          job.logs.push({
            timestamp: new Date().toISOString(),
            message: `💰 Prix mis à jour : ${product.name.fr}`,
            type: 'info'
          });
        }
      }
      
      // Attendre un peu (simulation)
      await sleep(200);
    }
  }
  
  // 5. Finaliser le job
  job.status = 'completed';
  job.completedAt = new Date().toISOString();
  
  // 6. Sauvegarder dans l'historique
  saveJobToHistory(job);
  
  // 7. Mettre à jour les stats
  updateStats(job);
  
  return job;
}
```

### Fonction d'Import Manuel

```typescript
async function runScanNow() {
  setScanningManual(true);
  setShowProgressModal(true);
  
  const job = await runAutoScan();
  
  setScanningManual(false);
  setShowProgressModal(false);
  
  // Notification de succès
  toast.success(`✅ ${job.productsImported} produits importés !`);
}
```

---

## 🎨 DESIGN GUIDELINES

### Couleurs

```typescript
const COLORS = {
  active: 'bg-green-500',       // Système actif
  inactive: 'bg-gray-400',      // Système inactif
  scanning: 'bg-blue-500',      // En cours de scan
  success: 'bg-green-100',      // Succès
  info: 'bg-blue-100',          // Info
  warning: 'bg-orange-100',     // Attention
};
```

### Icônes

```typescript
const ICONS = {
  active: '✅',
  inactive: '⏸️',
  scanning: '🔄',
  sources: '🌐',
  stats: '📊',
  timer: '⏰',
  product: '📦',
  money: '💰',
  success: '✅',
  error: '❌',
};
```

### Animations

- **Scan en cours** : Spinner rotatif
- **Progress bar** : Animation de remplissage
- **Logs** : Apparition avec fade-in
- **Stats** : Compteurs animés (count-up)

---

## 📊 DONNÉES MOCKÉES À CRÉER

### 1. Best-Sellers Amazon FR (20 produits)

```typescript
const AMAZON_BESTSELLERS = [
  {
    name: { fr: 'Haltères Ajustables 24kg - Set Complet' },
    brand: 'SportPlus',
    category: 'fitness-musculation',
    price: { current: 89.99, original: 129.99 },
    rating: { average: 4.6, count: 2847 },
    metrics: { salesRank: 1, salesPerMonth: 450 },
    affiliation: { commission: 4 },
  },
  // ... 19 autres
];
```

### 2. Best-Sellers MyProtein (15 produits)

```typescript
const MYPROTEIN_BESTSELLERS = [
  {
    name: { fr: 'Whey Protein Native Bio 1kg' },
    brand: 'MyProtein',
    category: 'nutrition-supplements',
    price: { current: 44.90, original: 49.90 },
    rating: { average: 4.7, count: 5421 },
    metrics: { salesRank: 1, salesPerMonth: 1200 },
    affiliation: { commission: 12 },
  },
  // ... 14 autres
];
```

### 3. Best-Sellers Nutrimuscle (10 produits)

### 4. Best-Sellers Decathlon (5 produits)

---

## ✅ CHECKLIST D'IMPLÉMENTATION

### Phase 1 : Structure
- [ ] Créer `AutoImportContext.tsx`
- [ ] Créer `AutoImportPage.tsx`
- [ ] Créer `bestSellers.ts` avec 50 produits

### Phase 2 : Composants
- [ ] `ScanProgress.tsx` (modal)
- [ ] `SourceCard.tsx`
- [ ] `StatCard.tsx`
- [ ] `ScanHistoryItem.tsx`

### Phase 3 : Logique
- [ ] Timer automatique avec `useEffect`
- [ ] Fonction `runAutoScan()`
- [ ] Fonction `runScanNow()`
- [ ] Import des produits dans ProductContext
- [ ] Calcul des stats

### Phase 4 : UI/UX
- [ ] Page responsive
- [ ] Animations fluides
- [ ] Toasts de notification
- [ ] Loading states

### Phase 5 : Intégration
- [ ] Ajouter route dans App.tsx
- [ ] Lien dans menu admin
- [ ] Test complet du workflow

---

## 🎯 RÉSULTAT ATTENDU

**Fonctionnalités :**
- ✅ Page admin complète et professionnelle
- ✅ Système On/Off simple
- ✅ Fréquence ajustable (1h, 6h, 12h, 24h)
- ✅ Sources activables/désactivables
- ✅ Scan manuel avec bouton
- ✅ Progress en temps réel
- ✅ Historique des imports
- ✅ Stats claires et utiles
- ✅ 50 produits best-sellers prêts
- ✅ Simulation réaliste qui fonctionne

**Expérience utilisateur :**
1. L'admin active le système
2. Choisit la fréquence (ex: 24h)
3. Sélectionne les sources (Amazon + MyProtein)
4. Le système tourne automatiquement
5. Chaque jour, 20 nouveaux top produits sont ajoutés
6. L'admin voit les stats et l'historique

**Temps d'implémentation estimé :** 1-2 heures

---

## 🚀 PRÊT À IMPLÉMENTER

Ce prompt contient TOUT ce qu'il faut pour créer le système :
- Structure de données claire
- Logique d'automatisation détaillée
- Design de l'interface
- Composants à créer
- Données mockées à générer

**Prochaine étape :** Implémenter ce prompt étape par étape.

---

**FIN DU PROMPT** ✅
