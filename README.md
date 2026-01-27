# 🥓 Charcuterie Felicita - E-commerce MVP

Site e-commerce complet pour la vente de charcuterie artisanale corse et italienne avec système de tarification différenciée selon le type de client.

## 📋 Fonctionnalités

### ✅ Authentification
- Inscription avec choix de catégorie (Particuliers, Restaurateurs, Comités d'entreprise)
- Connexion sécurisée avec NextAuth + credentials
- Gestion de session JWT
- Protection des routes

### 💰 Tarification dynamique
- **Charcuterie** :
  - Particuliers : 99€/kg
  - Restaurateurs : 79€/kg
  - Comités d'entreprise : 69€/kg (avec code obligatoire)
- **Fromage** :
  - Particuliers : 79€/kg
  - Restaurateurs : 79€/kg
  - Comités d'entreprise : 49€/kg (avec code obligatoire)

### 🛒 Boutique
- Catalogue de produits avec descriptions détaillées
- Ajout au panier avec sélection du poids (250g à 3kg)
- Gestion du panier avec LocalStorage
- Prix calculés automatiquement selon le rôle utilisateur

### 💳 Paiement
- Intégration Stripe Checkout
- Paiement sécurisé par carte bancaire
- Pages de succès/annulation
- Historique des commandes

### ⭐ Système d'avis modérés
- Soumission d'avis par les clients connectés
- Modération par email avec liens d'acceptation/refus
- Publication uniquement des avis approuvés
- Affichage des notes et commentaires

### 🔐 Validation code comité
- Code obligatoire à l'inscription pour les comités
- Blocage de l'accès boutique si code non validé
- Configuration via variable d'environnement

## 🚀 Installation

### Prérequis
- Node.js 18+
- npm ou yarn
- Un compte Stripe (mode test)
- Un serveur SMTP (Gmail, SendGrid, etc.)

### 1. Cloner et installer les dépendances

```bash
cd FELICITAS
npm install
```

### 2. Configuration de l'environnement

Copier le fichier `.env.example` vers `.env` :

```bash
cp .env.example .env
```

Éditer le fichier `.env` et remplir les variables :

```env
# Database
DATABASE_URL="file:./dev.db"

# NextAuth
NEXTAUTH_SECRET="votre-secret-aleatoire-ici"  # Générer avec: openssl rand -base64 32
NEXTAUTH_URL="http://localhost:3000"

# Stripe
STRIPE_SECRET_KEY="sk_test_votre_cle_stripe"
STRIPE_PUBLIC_KEY="pk_test_votre_cle_publique"
NEXT_PUBLIC_STRIPE_PUBLIC_KEY="pk_test_votre_cle_publique"

# Email (SMTP)
SMTP_HOST="smtp.gmail.com"
SMTP_PORT="587"
SMTP_USER="votre-email@gmail.com"
SMTP_PASS="votre-mot-de-passe-application"  # Pour Gmail, créer un mot de passe d'application
SMTP_FROM="Charcuterie Felicita <noreply@felicita.com>"

# Admin
ADMIN_REVIEWS_EMAIL="admin@felicita.com"  # Email pour recevoir les avis à modérer

# Comité Code
COMITE_CODE="FELICITA2024"  # Code pour les comités d'entreprise
```

### 3. Configuration Stripe

1. Créer un compte sur [stripe.com](https://stripe.com)
2. Activer le mode test
3. Récupérer les clés API dans Dashboard > Developers > API keys
4. Copier la clé secrète (`sk_test_...`) et la clé publique (`pk_test_...`)
5. Les ajouter dans le fichier `.env`

### 4. Configuration Email (Gmail)

1. Activer la validation en 2 étapes sur votre compte Gmail
2. Aller dans Compte Google > Sécurité > Validation en 2 étapes > Mots de passe des applications
3. Créer un mot de passe d'application pour "Mail"
4. Utiliser ce mot de passe dans `SMTP_PASS`

**Alternative :** Utiliser SendGrid, Mailgun ou un autre service SMTP

### 5. Initialiser la base de données

```bash
# Générer le client Prisma
npm run prisma:generate

# Créer la base de données et appliquer les migrations
npm run prisma:migrate

# Seeder les produits (optionnel)
npm run prisma:seed
```

### 6. Lancer le serveur de développement

```bash
npm run dev
```

Le site sera accessible sur [http://localhost:3000](http://localhost:3000)

## 📦 Structure du projet

```
FELICITAS/
├── app/                      # Pages Next.js (App Router)
│   ├── api/                  # API Routes
│   │   ├── auth/             # NextAuth
│   │   ├── register/         # Inscription
│   │   ├── reviews/          # Avis + modération
│   │   └── checkout/         # Stripe Checkout
│   ├── auth/                 # Pages authentification
│   ├── shop/                 # Boutiques par catégorie
│   ├── product/              # Fiches produits
│   ├── cart/                 # Panier
│   ├── account/              # Compte utilisateur
│   ├── success/              # Page succès paiement
│   └── cancel/               # Page annulation paiement
├── components/               # Composants React
├── lib/                      # Utilitaires
│   ├── prisma.ts             # Client Prisma
│   ├── auth.ts               # Configuration NextAuth
│   ├── pricing.ts            # Logique de prix
│   └── email.ts              # Envoi d'emails
├── prisma/                   # Schéma et seed DB
├── public/                   # Fichiers statiques
│   └── images/               # Images produits
├── types/                    # Types TypeScript
└── .env                      # Variables d'environnement
```

## 🧪 Tester le site

### 1. Créer un compte

1. Aller sur [http://localhost:3000](http://localhost:3000)
2. Cliquer sur une des 3 catégories de clients
3. Créer un compte avec email + mot de passe
4. Pour les comités : entrer le code `FELICITA2024` (ou celui configuré)

### 2. Parcourir la boutique

1. Après connexion, vous êtes redirigé vers la boutique
2. Les prix affichés correspondent à votre catégorie
3. Cliquer sur un produit pour voir les détails

### 3. Ajouter au panier

1. Sur une fiche produit, choisir le poids et la quantité
2. Cliquer sur "Ajouter au panier"
3. Le panier est sauvegardé dans le navigateur (localStorage)

### 4. Passer commande (mode test Stripe)

1. Aller sur le panier
2. Cliquer sur "Passer la commande"
3. Vous êtes redirigé vers Stripe Checkout
4. Utiliser une carte de test :
   - Numéro : `4242 4242 4242 4242`
   - Date : n'importe quelle date future
   - CVC : n'importe quel 3 chiffres
5. Valider le paiement
6. Vous êtes redirigé vers la page de succès

### 5. Laisser un avis

1. Sur une fiche produit, remplir le formulaire d'avis
2. L'avis est envoyé en modération
3. Un email est envoyé à `ADMIN_REVIEWS_EMAIL`
4. Cliquer sur "Accepter" dans l'email pour publier l'avis

## 🎨 Personnalisation

### Couleurs (Tailwind)

Éditer `tailwind.config.ts` :

```ts
colors: {
  primary: {
    DEFAULT: "#1a3a1a",  // Vert sombre principal
    light: "#2d5a2d",
    dark: "#0f1f0f",
  },
  accent: {
    DEFAULT: "#d4af37",  // Or/doré
    light: "#e6c961",
    dark: "#b8941f",
  },
  ivory: "#fffff0",
}
```

### Ajouter des produits

1. Via Prisma Studio (interface visuelle) :
```bash
npm run prisma:studio
```

2. Via le fichier seed :
Éditer `prisma/seed.ts` et relancer :
```bash
npm run prisma:seed
```

### Remplacer les images

Placer vos images dans `public/images/` :
- `tombrobicorse.jpg` : Étiquette Tombrobicorse
- `tomdechefcorse.jpg` : Tom de chef corse

## 📱 Contact

Numéro affiché partout sur le site : **06 04 11 05 50**

## 🛠️ Scripts disponibles

```bash
npm run dev          # Lancer le serveur de développement
npm run build        # Construire pour la production
npm run start        # Lancer le serveur de production
npm run lint         # Linter le code

npm run prisma:generate  # Générer le client Prisma
npm run prisma:migrate   # Appliquer les migrations
npm run prisma:seed      # Seeder la DB
npm run prisma:studio    # Ouvrir l'interface Prisma Studio
```

## 🚨 Important - Production

Avant de déployer en production :

1. **Générer un secret sécurisé** :
```bash
openssl rand -base64 32
```
Mettre ce secret dans `NEXTAUTH_SECRET`

2. **Utiliser les clés Stripe de production** (pas les clés de test)

3. **Configurer un serveur SMTP fiable** (SendGrid, Mailgun, etc.)

4. **Changer le code comité** dans `.env`

5. **Sécuriser la base de données** (utiliser PostgreSQL au lieu de SQLite)

6. **Activer HTTPS** obligatoire

## 🚀 Déploiement Vercel

### Configuration Prisma pour Vercel

**Problème résolu** : Vercel met en cache `node_modules`, ce qui peut rendre le client Prisma obsolète.

**Solution appliquée** dans [package.json](package.json) :
```json
"scripts": {
  "build": "prisma generate && next build",
  "postinstall": "prisma generate"
}
```

**Pourquoi les deux scripts ?**
- `postinstall` : Exécuté après `npm install`, garantit que le client Prisma est généré même avec le cache Vercel
- `build` avec `prisma generate` : Double sécurité + utile en développement local

### Étapes de déploiement

1. **Push sur GitHub/GitLab** :
```bash
git add .
git commit -m "Production ready"
git push origin main
```

2. **Importer dans Vercel** :
   - Aller sur [vercel.com](https://vercel.com)
   - Import Project > depuis votre repo Git
   - Vercel détecte automatiquement Next.js

3. **Configurer les variables d'environnement** :
   - Dans Vercel Dashboard > Settings > Environment Variables
   - Ajouter TOUTES les variables de `.env` sauf `DATABASE_URL` (SQLite)
   - Pour la production, utiliser PostgreSQL (voir ci-dessous)

4. **Déployer** :
   - Vercel lance automatiquement le build
   - Le script `postinstall` génère le client Prisma
   - Le build Next.js s'exécute

### Migration vers PostgreSQL (recommandé production)

SQLite ne fonctionne pas sur Vercel (filesystem read-only). Utiliser PostgreSQL :

1. **Créer une base PostgreSQL** :
   - [Vercel Postgres](https://vercel.com/docs/storage/vercel-postgres)
   - Ou [Supabase](https://supabase.com) (gratuit)
   - Ou [Neon](https://neon.tech) (gratuit)

2. **Mettre à jour `prisma/schema.prisma`** :
```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

3. **Ajouter `DATABASE_URL` dans Vercel** :
```
DATABASE_URL="postgresql://user:password@host:5432/database?schema=public"
```

4. **Générer et appliquer les migrations** :
```bash
npx prisma migrate deploy
```

### Bonnes pratiques Vercel + Prisma

✅ **Fait** :
- `prisma` dans `dependencies` (pas `devDependencies`)
- `postinstall` avec `prisma generate`
- `build` inclut `prisma generate`

⚠️ **À faire en production** :
- Utiliser PostgreSQL au lieu de SQLite
- Configurer `NEXTAUTH_SECRET` sécurisé
- Utiliser les clés Stripe de production
- Configurer un SMTP fiable (SendGrid, Mailgun)

## 🐛 Dépannage

### Erreur Prisma "Client not generated"
```bash
npm run prisma:generate
```

### Erreur "NEXTAUTH_URL not configured"
Vérifier que `NEXTAUTH_URL` est bien défini dans `.env`

### Emails non envoyés
- Vérifier les credentials SMTP
- Pour Gmail, utiliser un mot de passe d'application
- Vérifier les logs dans la console

### Stripe ne fonctionne pas
- Vérifier que les clés sont correctes
- S'assurer d'utiliser les clés de test (`sk_test_...` et `pk_test_...`)

## 📄 Licence

Projet propriétaire - Charcuterie Felicita © 2024

## 🎯 Roadmap

- [ ] Système de codes promo
- [ ] Gestion des stocks
- [ ] Suivi de livraison
- [ ] Multi-langues (corse/français/italien)
- [ ] Application mobile
- [ ] Programme de fidélité

---

**Développé avec ❤️ pour Charcuterie Felicita**

Pour toute question : 06 04 11 05 50

## 🔧 Résolution de problèmes techniques

### Warning : Multiple lockfiles détectés

Si vous voyez ce warning lors du build :
```
⚠ Warning: Next.js inferred your workspace root, but it may not be correct.
We detected multiple lockfiles...
```

**Solution** : Supprimer le lockfile parasite hors du projet :
```bash
rm ~/package-lock.json
```

Le projet ne doit avoir qu'UN SEUL `package-lock.json` à la racine (`~/Desktop/FELICITAS-SITE/package-lock.json`).

### Port 3000 déjà utilisé (EADDRINUSE)

Si `npm run start` échoue avec `EADDRINUSE: address already in use :::3000` :

**Option 1** : Libérer le port 3000
```bash
# Trouver le processus
lsof -i :3000

# Tuer le processus (remplacer <PID> par le numéro affiché)
kill -9 <PID>
```

**Option 2** : Utiliser un autre port
```bash
PORT=3001 npm run start
# Ou pour dev
PORT=3001 npm run dev
```

### Erreurs TypeScript Prisma (ReviewStatus, UserRole)

**Contexte** : SQLite ne supporte pas les enums natifs. Le projet utilise des constantes TypeScript.

**Si vous voyez** : `Module "@prisma/client" has no exported member 'ReviewStatus'` ou `UserRole`

**Solution déjà appliquée** :
- Les enums sont définis dans `lib/constants.ts`
- Utiliser `import { ReviewStatus, UserRole } from "@/lib/constants"` au lieu de `@prisma/client`

**Si problème persiste** :
```bash
# Régénérer le client Prisma
npx prisma generate

# Rebuild
npm run build
```

### Erreur useSearchParams() sans Suspense (Next.js 16+)

**Si vous voyez** : `useSearchParams() should be wrapped in a suspense boundary`

**Contexte** : Next.js 16+ nécessite que les composants utilisant `useSearchParams()` soient enveloppés dans un `<Suspense>`.

**Solution déjà appliquée** :
- Pages concernées : `/auth/signup` et `/success`
- Pattern utilisé : Composant interne + wrapper avec Suspense

**Exemple de fix** :
```tsx
"use client";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";

function MyPageContent() {
  const searchParams = useSearchParams();
  // ... reste du code
}

export default function MyPage() {
  return (
    <Suspense fallback={<div>Chargement...</div>}>
      <MyPageContent />
    </Suspense>
  );
}
```

## 📝 Notes techniques

### Prisma + SQLite + Enums

Ce projet utilise SQLite en développement. SQLite ne supporte PAS les enums natifs Prisma.

**Solution appliquée** :
- Schéma : `status String @default("PENDING")` 
- Code : Constantes TypeScript dans `lib/constants.ts`
- Types sûrs : `ReviewStatusType` et `UserRoleType`

**Pour migrer vers PostgreSQL** (recommandé en production) :
1. Changer `provider = "postgresql"` dans `prisma/schema.prisma`
2. Remplacer les String par des vrais enums
3. Mettre à jour `DATABASE_URL` vers PostgreSQL
4. Relancer les migrations

