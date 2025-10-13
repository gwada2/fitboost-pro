# 🚀 Guide de Démarrage Rapide

## Installation et Lancement

### 1. Installer les dépendances
```bash
cd "c:/Users/Win10/Desktop/sport et alimentation/sport-affiliation-react"
npm install
```

### 2. Lancer le serveur de développement
```bash
npm run dev
```

L'application sera accessible sur **http://localhost:5173**

### 3. Build pour production
```bash
npm run build
npm run preview
```

---

## 📋 Fonctionnalités Implémentées

### ✅ Frontend Public
- **Page d'accueil** avec hero section, catégories et produits tendances
- **Catalogue produits** avec filtres avancés (catégorie, prix, note)
- **Page détail produit** optimisée SEO avec affiliation tracking
- **Système multilingue** (FR/EN/ES) avec sélecteur dans le header
- **Comparateur de produits** (jusqu'à 4 produits)
- **Design responsive** mobile-first
- **20 produits mockés** réalistes avec données complètes
- **6 catégories** : Fitness, Yoga, Running, Nutrition, Récupération, Équipement

### ✅ Composants UI
- Button (5 variants)
- Badge (5 variants)
- StarRating
- PriceDisplay avec calcul réduction
- LoadingSpinner
- Modal
- Header avec navigation et langue
- Footer complet
- Breadcrumb
- ProductCard

### ✅ Gestion d'État
- **LanguageContext** : Multilingue FR/EN/ES
- **ProductContext** : CRUD produits, catégories, blog
- **AdminContext** : Authentification et paramètres
- **ComparisonContext** : Comparaison produits

### ✅ Données Initiales
- **20 produits** variés (Haltères, Bancs, Tapis yoga, Protéines, etc.)
- **6 catégories** avec icônes Lucide
- **5 articles blog** avec contenu complet
- **Paramètres site** configurables

### ⏳ À Compléter (Pages Placeholder)
- Page Blog Liste
- Page Article Blog Détail
- Page Comparateur
- Page À propos
- Page Contact
- Dashboard Admin complet

---

## 🎨 Design & UX

### Palette de Couleurs
- **Primary (Vert)** : `bg-primary-600` (#16a34a) - Sport/Santé
- **Secondary (Orange)** : `bg-secondary-500` (#f97316) - Actions
- **Neutral** : Gris moderne pour textes

### Responsive Breakpoints
- **Mobile** : < 768px (1 colonne)
- **Tablet** : 768px-1024px (2 colonnes)
- **Desktop** : > 1024px (3-4 colonnes)

---

## 📦 Structure du Projet

```
src/
├── components/
│   ├── layout/         # Header, Footer, Breadcrumb
│   ├── product/        # ProductCard
│   └── ui/             # Button, Badge, etc.
├── contexts/           # Context Providers
├── data/               # Données mockées
├── pages/              # Pages de l'application
├── types/              # Types TypeScript
├── utils/              # Fonctions utilitaires
├── App.tsx             # Configuration routes
├── main.tsx            # Point d'entrée
└── index.css           # Styles Tailwind
```

---

## 🔗 Routes Disponibles

### Public
- `/` - Page d'accueil
- `/produits` - Catalogue complet
- `/produits/:category` - Produits par catégorie
- `/produit/:slug` - Détail produit
- `/blog` - Liste articles (placeholder)
- `/blog/:slug` - Article détail (placeholder)
- `/comparer` - Comparateur (placeholder)
- `/a-propos` - À propos (placeholder)
- `/contact` - Contact (placeholder)

### Admin
- `/admin` - Dashboard admin (placeholder)
- **Mot de passe** : `admin123`

---

## 🌍 Multilingue

Cliquez sur l'icône 🌐 dans le header pour changer la langue.

- **FR** : Français (défaut)
- **EN** : English
- **ES** : Español

Toutes les interfaces et contenus sont traduits.

---

## 📊 Données & SEO

### Produits
- 20 produits réalistes avec :
  - Images (Unsplash)
  - Descriptions FR/EN/ES
  - Prix avec réductions
  - Notes et avis
  - Liens d'affiliation Amazon/MyProtein
  - Tags (nouveau, tendance, promo)
  - Statistiques (clics, vues)

### SEO Optimisé
- Meta tags dynamiques par page
- URLs SEO-friendly (slugs)
- Alt text sur images
- Hiérarchie headings (H1, H2, H3)
- Breadcrumb navigation

### Tracking
- Tracking clics liens d'affiliation
- Tracking vues produits
- Statistiques en temps réel

---

## 🛠️ Technologies

- **React 18** + TypeScript
- **React Router v6** (navigation)
- **Tailwind CSS** (styling)
- **Lucide React** (icônes)
- **Vite** (build tool)
- **Context API** (state management)

---

## 💡 Prochaines Étapes

### Phase 1 - Compléter les Pages
1. Page Blog Liste avec filtres
2. Page Article Blog avec contenu riche
3. Page Comparateur avec tableau comparatif
4. Pages statiques (À propos, Contact)

### Phase 2 - Admin Dashboard
1. Login/Logout sécurisé
2. Dashboard avec statistiques
3. Gestion produits (CRUD complet)
4. Gestion catégories
5. Gestion blog
6. Paramètres site

### Phase 3 - Fonctionnalités Avancées
1. Système de recherche intelligent
2. Filtres avancés (tags, sites)
3. Analytics détaillés
4. Export données
5. Newsletter

### Phase 4 - Optimisations
1. Lazy loading images
2. Code splitting par route
3. Performance optimizations
4. PWA (optionnel)
5. Tests unitaires

---

## 🐛 Dépannage

### Les modules ne sont pas trouvés
```bash
rm -rf node_modules package-lock.json
npm install
```

### Port 5173 déjà utilisé
Modifiez le port dans `vite.config.ts` :
```ts
export default defineConfig({
  server: { port: 3000 }
})
```

### Erreurs TypeScript
Vérifiez que toutes les dépendances sont installées :
```bash
npm install react react-dom react-router-dom lucide-react
npm install -D @types/react @types/react-dom typescript
```

---

## 📞 Support

Pour toute question ou problème :
- Consultez le README.md principal
- Vérifiez la structure des fichiers
- Assurez-vous que toutes les dépendances sont installées

---

**Créé avec ❤️ pour les passionnés de sport et bien-être**
