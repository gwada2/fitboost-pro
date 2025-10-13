# 🚀 COMMENCEZ ICI - Sport & Bien-être

## ⚡ Installation en 3 Étapes

### Étape 1 : Ouvrir le Terminal PowerShell
1. Appuyez sur `Windows + X`
2. Sélectionnez "Windows PowerShell" ou "Terminal"

### Étape 2 : Naviguer vers le Projet
```powershell
cd "c:\Users\Win10\Desktop\sport et alimentation\sport-affiliation-react"
```

### Étape 3 : Installer et Lancer
```powershell
npm install
npm run dev
```

**⏱️ Temps total : 3-5 minutes**

---

## 🌐 Accès à l'Application

Une fois lancé, ouvrez votre navigateur à :
### **http://localhost:5173**

---

## 📱 Que Pouvez-vous Faire ?

### ✅ Pages Disponibles

| Page | URL | Description |
|------|-----|-------------|
| 🏠 Accueil | `/` | Hero, catégories, produits tendances |
| 🛍️ Catalogue | `/produits` | 20 produits avec filtres |
| 📦 Détail Produit | `/produit/halteres-ajustables-24kg` | Exemple de produit |
| 📝 Blog | `/blog` | 5 articles conseils |
| ⚖️ Comparateur | `/comparer` | Comparer jusqu'à 4 produits |
| ℹ️ À propos | `/a-propos` | Présentation |
| 📧 Contact | `/contact` | Formulaire contact |

### 🎯 Fonctionnalités Clés

#### 1. Navigation Multilingue 🌍
- Cliquez sur l'icône 🌐 dans le header
- Choisissez : Français, English, Español
- Toute l'interface change instantanément

#### 2. Filtrage Produits 🔍
- Allez sur `/produits`
- Utilisez les filtres à gauche :
  - Catégories
  - Prix (slider)
  - Note minimale
- Recherchez par nom
- Triez par prix, popularité, nouveauté

#### 3. Comparateur ⚖️
- Sur une card produit, cliquez sur l'icône balance
- Ajoutez jusqu'à 4 produits
- Allez sur `/comparer` pour voir le tableau comparatif
- Comparez prix, notes, caractéristiques

#### 4. Blog 📝
- Accédez à `/blog`
- Filtrez par catégorie (Musculation, Nutrition, etc.)
- Cliquez sur un article pour lire
- Produits recommandés en bas de l'article

#### 5. Liens d'Affiliation 💰
- Cliquez sur "Voir sur Amazon" ou "Voir sur MyProtein"
- Le lien s'ouvre dans un nouvel onglet
- Les clics sont trackés automatiquement

---

## 📊 Données Disponibles

### 20 Produits Réalistes
- 6 produits Fitness & Musculation
- 3 produits Yoga & Pilates
- 4 produits Running & Cardio
- 4 produits Nutrition & Suppléments
- 2 produits Récupération
- 1 produit Équipement sportif

### 5 Articles Blog
1. 10 Exercices Essentiels Musculation
2. Guide Nutrition Sportive Débutants
3. Yoga pour Sportifs - Récupération
4. Débuter le Running - Programme 8 Semaines
5. Bienfaits Massage Sportif

### 6 Catégories
- 💪 Fitness & Musculation
- 🧘 Yoga & Pilates
- 🏃 Running & Cardio
- 🥗 Nutrition & Suppléments
- ✨ Récupération & Bien-être
- 🎯 Équipement Sportif

---

## 🎨 Design & Interface

### Couleurs
- **Vert** (#16a34a) : Sport & Santé
- **Orange** (#f97316) : Actions & CTA
- **Gris** : Textes & Backgrounds

### Responsive
- 📱 Mobile : < 768px
- 📱 Tablet : 768px - 1024px
- 💻 Desktop : > 1024px

### Animations
- Hover sur cards produits
- Transitions douces
- Loading states
- Scroll smooth

---

## 🛠️ Commandes Utiles

```powershell
# Développement
npm run dev              # Lance le serveur (http://localhost:5173)

# Production
npm run build            # Compile pour production
npm run preview          # Prévisualise le build

# Code Quality
npm run lint             # Vérifie le code
```

---

## 📚 Documentation Complète

| Fichier | Contenu |
|---------|---------|
| **README.md** | Documentation principale complète |
| **INSTALLATION.md** | Guide d'installation détaillé |
| **QUICK_START.md** | Guide des fonctionnalités |
| **PROJECT_SUMMARY.md** | Résumé technique du projet |
| **START_HERE.md** | Ce fichier - démarrage rapide |

---

## 🎯 Exemples d'URLs à Tester

Après avoir lancé `npm run dev`, testez ces URLs :

```
http://localhost:5173/
http://localhost:5173/produits
http://localhost:5173/produits/fitness-musculation
http://localhost:5173/produit/halteres-ajustables-24kg
http://localhost:5173/produit/tapis-yoga-premium-6mm
http://localhost:5173/blog
http://localhost:5173/blog/guide-nutrition-sportive-debutants
http://localhost:5173/comparer
http://localhost:5173/a-propos
http://localhost:5173/contact
```

---

## ⚠️ Dépannage Rapide

### Erreur "npm not found"
➡️ Installez Node.js : https://nodejs.org/

### Port 5173 déjà utilisé
➡️ Vite choisira automatiquement un autre port (5174, 5175, etc.)

### Modules manquants
```powershell
rm -rf node_modules
rm package-lock.json
npm install
```

### Le site ne se charge pas
➡️ Vérifiez que `npm run dev` est toujours actif dans le terminal

---

## 🎉 Première Visite Recommandée

1. **Page d'accueil** (`/`)
   - Admirez le hero section
   - Cliquez sur les catégories
   - Voyez les produits tendances

2. **Catalogue** (`/produits`)
   - Testez les filtres
   - Changez le tri
   - Recherchez un produit

3. **Détail Produit** (cliquez sur une card)
   - Voyez les images
   - Lisez la description
   - Cliquez sur "Comparer"
   - Testez le lien d'affiliation

4. **Comparateur** (`/comparer`)
   - Comparez vos produits sélectionnés
   - Voyez le tableau comparatif

5. **Blog** (`/blog`)
   - Lisez un article
   - Voyez les produits recommandés

6. **Multilingue** (icône 🌐)
   - Changez en anglais
   - Puis en espagnol
   - Revenez en français

---

## 📱 Navigation Mobile

Sur mobile :
- Menu hamburger (☰) en haut à droite
- Navigation tactile fluide
- Cards produits en 1 colonne
- Filtres en modal plein écran

---

## 💡 Conseils

1. **Utilisez Chrome/Edge** pour la meilleure expérience
2. **Ouvrez DevTools** (F12) pour voir la console
3. **Testez le responsive** avec DevTools (Ctrl+Shift+M)
4. **Explorez toutes les pages** pour voir les fonctionnalités
5. **Changez la langue** pour tester le multilingue

---

## 🚀 C'est Parti !

```powershell
cd "c:\Users\Win10\Desktop\sport et alimentation\sport-affiliation-react"
npm install
npm run dev
```

Puis ouvrez **http://localhost:5173** dans votre navigateur !

---

**🎊 Bon test de l'application !**

_Pour plus de détails, consultez README.md_
