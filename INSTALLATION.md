# 📦 Installation et Démarrage

## Prérequis

- **Node.js** version 18+ ([Télécharger ici](https://nodejs.org/))
- **npm** (inclus avec Node.js)

## Installation Rapide

### 1. Ouvrir un terminal dans le dossier du projet

```bash
cd "c:/Users/Win10/Desktop/sport et alimentation/sport-affiliation-react"
```

### 2. Installer toutes les dépendances

```bash
npm install
```

Cette commande va installer :
- React 18.2.0
- React Router DOM 6.22.0
- Lucide React (icônes)
- Tailwind CSS
- TypeScript
- Vite (build tool)

**⏱️ Temps d'installation : 2-3 minutes**

### 3. Lancer le serveur de développement

```bash
npm run dev
```

L'application sera accessible sur : **http://localhost:5173**

### 4. Ouvrir dans votre navigateur

Ouvrez votre navigateur et accédez à `http://localhost:5173`

---

## 🎉 C'est prêt !

Vous devriez voir :
- ✅ Page d'accueil avec hero section
- ✅ 6 catégories de produits
- ✅ Produits tendances et nouveautés
- ✅ Navigation multilingue (FR/EN/ES)
- ✅ Header et Footer complets

---

## 📋 Structure de l'Application

### Pages Fonctionnelles

| Route | Description | Statut |
|-------|-------------|--------|
| `/` | Page d'accueil | ✅ Complète |
| `/produits` | Catalogue complet | ✅ Complète |
| `/produits/:category` | Produits par catégorie | ✅ Complète |
| `/produit/:slug` | Détail produit | ✅ Complète |
| `/blog` | Liste articles blog | ✅ Complète |
| `/blog/:slug` | Article détaillé | ✅ Complète |
| `/comparer` | Comparateur produits | ✅ Complète |
| `/a-propos` | À propos | ✅ Complète |
| `/contact` | Contact | ✅ Complète |
| `/admin` | Dashboard admin | ⏳ Placeholder |

### Données Disponibles

- **20 produits** réalistes avec images, prix, descriptions (FR/EN/ES)
- **6 catégories** : Fitness, Yoga, Running, Nutrition, Récupération, Équipement
- **5 articles blog** avec contenu complet
- **Liens d'affiliation** Amazon et MyProtein configurés

---

## 🧪 Tester les Fonctionnalités

### Navigation
1. Cliquez sur les catégories dans la page d'accueil
2. Utilisez les filtres dans le catalogue (prix, note, catégorie)
3. Changez la langue avec l'icône 🌐 dans le header

### Produits
1. Cliquez sur un produit pour voir les détails
2. Utilisez le bouton "Comparer" (icône balance) pour ajouter au comparateur
3. Cliquez sur "Voir sur Amazon/MyProtein" pour ouvrir le lien d'affiliation

### Blog
1. Accédez à `/blog` pour voir les articles
2. Filtrez par catégorie
3. Cliquez sur un article pour lire le contenu complet

### Comparateur
1. Ajoutez 2-4 produits au comparateur
2. Accédez à `/comparer` pour voir la comparaison
3. Comparez prix, notes, caractéristiques côte à côte

---

## 🛠️ Commandes Disponibles

```bash
# Développement
npm run dev              # Lance le serveur de développement

# Production
npm run build            # Compile pour production
npm run preview          # Prévisualise le build de production

# Qualité du code
npm run lint             # Vérifie le code avec ESLint
```

---

## 🎨 Personnalisation

### Modifier les couleurs

Éditez `tailwind.config.js` :

```javascript
colors: {
  primary: { /* Vert - Sport/Santé */ },
  secondary: { /* Orange - Actions */ },
}
```

### Ajouter des produits

Éditez `src/data/productsData1.ts` ou `productsData2.ts` et ajoutez vos produits.

### Changer les paramètres du site

Éditez `src/data/settings.ts` pour modifier :
- Nom du site
- Logo
- Réseaux sociaux
- Contact

---

## 🚨 Dépannage

### Erreur "Cannot find module"

Si vous voyez des erreurs TypeScript sur les modules manquants :

```bash
rm -rf node_modules package-lock.json
npm install
```

### Port déjà utilisé

Si le port 5173 est déjà utilisé, Vite proposera automatiquement un autre port (5174, 5175, etc.)

### Build échoue

Vérifiez que vous avez Node.js 18+ :

```bash
node --version
```

---

## 📦 Structure des Fichiers

```
sport-affiliation-react/
├── src/
│   ├── components/
│   │   ├── layout/          # Header, Footer, Breadcrumb
│   │   ├── product/         # ProductCard
│   │   └── ui/              # Button, Badge, StarRating, etc.
│   ├── contexts/            # State management
│   │   ├── LanguageContext.tsx
│   │   ├── ProductContext.tsx
│   │   ├── AdminContext.tsx
│   │   └── ComparisonContext.tsx
│   ├── data/                # Données mockées
│   │   ├── products.ts
│   │   ├── categories.ts
│   │   ├── blogPosts.ts
│   │   └── settings.ts
│   ├── pages/               # Pages de l'application
│   │   ├── HomePage.tsx
│   │   ├── ProductCatalogPage.tsx
│   │   ├── ProductDetailPage.tsx
│   │   ├── BlogListPage.tsx
│   │   ├── BlogPostPage.tsx
│   │   ├── ComparisonPage.tsx
│   │   ├── AboutPage.tsx
│   │   └── ContactPage.tsx
│   ├── types/               # Types TypeScript
│   │   └── index.ts
│   ├── utils/               # Fonctions utilitaires
│   │   └── helpers.ts
│   ├── App.tsx              # Configuration des routes
│   ├── main.tsx             # Point d'entrée
│   └── index.css            # Styles Tailwind
├── public/                  # Fichiers statiques
├── index.html               # Template HTML
├── package.json             # Dépendances
├── tsconfig.json            # Configuration TypeScript
├── tailwind.config.js       # Configuration Tailwind
├── vite.config.ts           # Configuration Vite
├── README.md                # Documentation principale
├── QUICK_START.md           # Guide rapide
└── INSTALLATION.md          # Ce fichier

```

---

## 🌟 Fonctionnalités Clés

### ✅ Implémenté
- Navigation complète avec React Router
- Système multilingue (FR/EN/ES)
- 20 produits avec données complètes
- Filtres et tri avancés
- Comparateur de produits (max 4)
- Blog avec 5 articles
- Tracking des clics d'affiliation
- Design responsive mobile-first
- SEO optimisé (meta tags, slugs)
- Breadcrumb navigation
- Système de badges (Nouveau, Tendance, Promo)

### ⏳ À Développer
- Dashboard Admin complet
- CRUD produits/blog en interface admin
- Système de recherche avancé
- Analytics détaillés
- Newsletter
- Système de commentaires

---

## 🔗 Liens Utiles

- [Documentation React](https://react.dev/)
- [Documentation React Router](https://reactrouter.com/)
- [Documentation Tailwind CSS](https://tailwindcss.com/)
- [Lucide Icons](https://lucide.dev/)
- [TypeScript](https://www.typescriptlang.org/)

---

## 📞 Support

Pour toute question :
1. Consultez le `README.md` principal
2. Vérifiez `QUICK_START.md` pour les fonctionnalités
3. Assurez-vous que toutes les dépendances sont installées

---

**🎉 Bon développement !**
