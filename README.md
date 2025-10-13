# ⚡ FitBoost Pro - Site d'Affiliation Premium

Application web moderne d'affiliation pour produits fitness, nutrition et bien-être avec système d'administration complet. Boostez vos performances avec les meilleurs équipements !

## 🚀 Fonctionnalités

### Frontend Public
- **Page d'accueil** avec hero section dynamique et produits tendances
- **Catalogue produits** avec filtres avancés (catégorie, prix, note, marque)
- **Pages produits détaillées** optimisées SEO
- **Comparateur de produits** (jusqu'à 4 produits)
- **Blog** avec articles conseils sport/nutrition
- **Multilingue** : Français, Anglais, Espagnol
- **Responsive** : Mobile-first design

### Admin Dashboard
- **Gestion produits** : CRUD complet avec formulaire avancé
- **Gestion catégories** avec icônes personnalisées
- **Gestion blog** avec éditeur riche
- **Statistiques** : Clics, vues, top produits
- **Paramètres globaux** du site

## 🛠️ Stack Technique

- **React 18** + TypeScript
- **React Router** v6 pour navigation
- **Tailwind CSS** pour le styling
- **Lucide React** pour les icônes
- **Vite** pour le build
- **Context API** pour la gestion d'état (pas de localStorage)

## 📦 Installation

```bash
# Installer les dépendances
npm install

# Lancer en mode développement
npm run dev

# Build pour production
npm run build

# Prévisualiser le build
npm run preview
```

## 🎨 Structure du Projet

```
src/
├── components/        # Composants réutilisables
│   ├── layout/       # Header, Footer, Navigation
│   ├── product/      # Cards, grilles, détails produits
│   ├── admin/        # Composants admin
│   ├── blog/         # Composants blog
│   └── ui/           # Composants UI génériques
├── contexts/         # Context Providers (Product, Language, Admin)
├── pages/            # Pages de l'application
│   ├── public/       # Pages publiques
│   └── admin/        # Pages admin
├── types/            # Types TypeScript
├── utils/            # Fonctions utilitaires
├── data/             # Données mockées initiales
└── hooks/            # Custom hooks

```

## 🔐 Accès Admin

- **URL** : `/admin`
- **Mot de passe** : `admin123` (à changer en production)

## 📱 Pages Disponibles

### Public
- `/` - Page d'accueil
- `/produits` - Catalogue complet
- `/produits/:category` - Produits par catégorie
- `/produit/:slug` - Détail produit
- `/comparer` - Comparateur produits
- `/blog` - Liste articles blog
- `/blog/:slug` - Article détaillé
- `/a-propos` - À propos
- `/contact` - Contact

### Admin (protégé)
- `/admin` - Dashboard
- `/admin/produits` - Gestion produits
- `/admin/produits/nouveau` - Nouveau produit
- `/admin/categories` - Gestion catégories
- `/admin/blog` - Gestion blog
- `/admin/statistiques` - Analytics
- `/admin/parametres` - Paramètres

## 🌍 Multilingue

Changez la langue via le sélecteur dans le header. Toutes les interfaces et contenus sont traduits en FR/EN/ES.

## 🎯 SEO

- Meta tags dynamiques sur chaque page
- URLs SEO-friendly avec slugs
- Schema.org markup (Product, Article, BreadcrumbList)
- Alt text sur toutes les images
- Hiérarchie headings optimisée
- Sitemap conceptuel

## 📊 Données Initiales

L'application contient 20 produits exemples réalistes couvrant 6 catégories :
- Fitness/Musculation
- Yoga/Pilates
- Running/Cardio
- Nutrition/Suppléments
- Récupération/Bien-être
- Équipement sportif

## 🎨 Thème & Design

Palette de couleurs :
- **Primary** : Vert énergique (#16a34a) - Sport/Santé
- **Secondary** : Orange dynamique (#f97316) - Actions
- **Neutral** : Gris moderne pour textes

Design inspiré des meilleurs sites sport (MyProtein, Gymshark).

## 📝 Notes Importantes

- ⚠️ **Pas de localStorage** : Tout le state est géré en mémoire React
- 🔗 Liens d'affiliation avec tracking des clics
- 📈 Statistiques en temps réel dans l'admin
- 🎨 Design moderne avec animations fluides
- ⚡ Performance optimisée (lazy loading, code splitting)

## 🚀 Déploiement

Recommandé : Vercel, Netlify, ou tout hébergeur static hosting.

```bash
npm run build
# Upload le dossier dist/
```

---

Créé avec ❤️ pour les passionnés de sport et bien-être
