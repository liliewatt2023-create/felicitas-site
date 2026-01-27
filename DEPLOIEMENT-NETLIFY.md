# Guide de Déploiement sur Netlify (Alternative)

⚠️ **ATTENTION** : Netlify n'est pas optimal pour Next.js 13+ avec API Routes et Prisma.
Nous recommandons **fortement Vercel** (voir DEPLOIEMENT-VERCEL.md).

Si vous voulez quand même utiliser Netlify, voici le guide.

## Étape 1 : Installer le plugin Next.js pour Netlify

```bash
npm install -D @netlify/plugin-nextjs
```

## Étape 2 : Créer le fichier netlify.toml

Le fichier `netlify.toml` a déjà été créé à la racine du projet.

## Étape 3 : Modifier next.config.js

Le fichier a déjà été configuré pour Netlify.

## Étape 4 : Pousser sur GitHub

```bash
git add .
git commit -m "Configuration pour Netlify"
git push origin main
```

## Étape 5 : Créer un compte Netlify

1. Allez sur https://netlify.com
2. Cliquez sur "Sign up"
3. Connectez-vous avec GitHub

## Étape 6 : Importer le projet

1. Cliquez sur "Add new site" → "Import an existing project"
2. Choisissez "Deploy with GitHub"
3. Sélectionnez votre repository FELICITAS-SITE
4. Netlify détectera automatiquement Next.js

## Étape 7 : Configurer les variables d'environnement

Dans Site settings → Environment variables, ajoutez :

```
DATABASE_URL=votre_url_postgresql
NEXTAUTH_SECRET=votre_secret
NEXTAUTH_URL=https://votre-site.netlify.app
RESEND_API_KEY=votre_cle_resend
EMAIL_FROM=noreply@votredomaine.com
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
COMMITTEE_CODE=votre_code
```

## Étape 8 : Déployer

Cliquez sur "Deploy site" et attendez.

## Problèmes connus avec Netlify + Next.js

### 1. API Routes peuvent ne pas fonctionner
**Solution** : Utiliser Netlify Functions séparées au lieu d'API Routes Next.js

### 2. Connexion base de données instable
**Solution** : Utiliser un service serverless-friendly comme Supabase ou PlanetScale

### 3. Images Next.js non optimisées
**Solution** : Désactiver l'optimisation d'images dans `next.config.js`

### 4. Déploiement lent
**Solution** : Netlify est plus lent que Vercel pour Next.js

## Recommandation finale

Pour un site Next.js avec :
- ✅ Authentification (NextAuth)
- ✅ Base de données (Prisma)
- ✅ Paiements (Stripe)
- ✅ Emails (Resend)
- ✅ Vidéos et images

👉 **Utilisez Vercel** (voir DEPLOIEMENT-VERCEL.md)

Netlify est excellent pour :
- Sites statiques
- Sites Gatsby
- Sites Hugo
- Sites sans backend complexe

Mais pas optimal pour Next.js 13+ avec fonctionnalités serveur.
