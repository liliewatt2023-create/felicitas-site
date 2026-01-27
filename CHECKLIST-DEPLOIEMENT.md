# Checklist Avant Déploiement

Vérifiez tous ces points avant de déployer votre site.

## ✅ Fichiers et Médias

### Vidéos
- [ ] Le fichier `video2.mp4` est dans `/public/videos/`
- [ ] La vidéo fait moins de 50MB (sinon, la compresser)
- [ ] La vidéo se lance bien en local
- [ ] L'image de prévisualisation (poster) s'affiche

### Images
- [ ] Toutes les images sont dans `/public/images/`
  - [ ] `affinage.jpg`
  - [ ] `restaurateur.jpeg` (si utilisé)
  - [ ] `video-poster.jpg` (optionnel)
- [ ] Toutes les images s'affichent correctement en local
- [ ] Les images sont optimisées (pas trop lourdes)

## ✅ Fonctionnalités

### Page d'accueil
- [ ] La vidéo s'affiche avec l'image de prévisualisation
- [ ] Le bouton play apparaît et fonctionne
- [ ] La vidéo se lance quand on clique
- [ ] Toutes les sections s'affichent correctement
- [ ] Le FAQ (accordéon) fonctionne
- [ ] Les emojis s'affichent (🐷, 📍, 📦, 🔒)

### Navigation
- [ ] Le footer avec les liens fonctionne
- [ ] Les liens vers les pages légales fonctionnent
- [ ] La navigation ne cause pas de rechargement de page

### Pages légales
- [ ] Mentions légales : `/legal/mentions-legales`
- [ ] CGV : `/legal/cgv`
- [ ] Politique de confidentialité : `/legal/politique-confidentialite`
- [ ] CGU : `/legal/cgu`
- [ ] Toutes les informations de l'entreprise sont correctes

### Authentification
- [ ] Page d'inscription : `/auth/signup`
- [ ] On peut créer un compte Particulier
- [ ] On peut créer un compte Comité d'Entreprise (avec code)
- [ ] Le code comité fonctionne
- [ ] L'email de bienvenue est envoyé
- [ ] Le lien de vérification d'email fonctionne
- [ ] On ne peut pas se connecter sans vérifier l'email
- [ ] Après vérification, la connexion fonctionne

## ✅ Configuration

### Variables d'environnement (.env)
- [ ] `DATABASE_URL` configurée
- [ ] `NEXTAUTH_SECRET` configurée (générer avec `openssl rand -base64 32`)
- [ ] `NEXTAUTH_URL` configurée (`http://localhost:3000` en local)
- [ ] `RESEND_API_KEY` configurée
- [ ] `EMAIL_FROM` configurée
- [ ] `COMMITTEE_CODE` configurée
- [ ] Stripe configuré (clés de test pour commencer)

### Base de données
- [ ] La base de données PostgreSQL est créée
- [ ] `npx prisma generate` exécuté
- [ ] `npx prisma db push` exécuté
- [ ] Les tables sont créées (User, Product, Order, etc.)
- [ ] On peut créer un utilisateur de test

### Build
- [ ] `npm run build` fonctionne sans erreurs
- [ ] Pas d'erreurs TypeScript
- [ ] Pas d'erreurs de compilation

## ✅ Services Tiers

### Resend (Emails)
- [ ] Compte créé sur https://resend.com
- [ ] API Key générée
- [ ] Domaine vérifié (ou utiliser domaine de test)
- [ ] Test d'envoi d'email réussi

### Stripe (Paiements)
- [ ] Compte créé sur https://stripe.com
- [ ] Mode test activé
- [ ] Clés API récupérées
- [ ] Webhook endpoint créé (après déploiement)

### Base de données Production
Choisir un service :
- [ ] **Vercel Postgres** (recommandé si vous utilisez Vercel)
- [ ] **Supabase** (gratuit, facile)
- [ ] **Neon** (gratuit, serverless)
- [ ] **PlanetScale** (gratuit, scalable)

## ✅ Git et GitHub

- [ ] Compte GitHub créé
- [ ] Repository créé sur GitHub
- [ ] Code poussé sur GitHub
- [ ] Fichier `.env` est dans `.gitignore` (IMPORTANT!)
- [ ] Fichier `.env.example` créé avec exemples

### Vérifier que .env n'est PAS dans git
```bash
git status
# .env ne doit PAS apparaître
```

## ✅ Sécurité

- [ ] Les mots de passe sont bien hashés (bcrypt)
- [ ] `NEXTAUTH_SECRET` est unique et sécurisé
- [ ] `COMMITTEE_CODE` est secret
- [ ] Les clés Stripe sont sécurisées
- [ ] HTTPS activé en production (automatique avec Vercel/Netlify)

## ✅ Performance

### Images
- [ ] Images compressées (max 500KB par image)
- [ ] Utilisation de Next.js Image component

### Vidéo
- [ ] Vidéo compressée (max 50MB recommandé)
- [ ] Format MP4 (meilleure compatibilité)
- [ ] Attribut `preload="auto"` configuré

## ✅ Avant le Déploiement Final

- [ ] Tester TOUT en local une dernière fois
- [ ] Créer un compte de test et vérifier tout le processus
- [ ] Vérifier tous les emails reçus
- [ ] Tester la navigation sur mobile
- [ ] Vérifier que la vidéo fonctionne sur mobile

## ✅ Après le Déploiement

- [ ] Visiter le site en production
- [ ] Créer un compte de test
- [ ] Vérifier l'email de bienvenue
- [ ] Cliquer sur le lien de vérification
- [ ] Se connecter
- [ ] Tester la navigation
- [ ] Vérifier que la vidéo fonctionne
- [ ] Tester sur mobile
- [ ] Configurer le webhook Stripe avec la vraie URL
- [ ] Passer Stripe en mode live (production)

## 📝 Commandes Utiles

### Vérifier le build
```bash
npm run build
```

### Tester la version build localement
```bash
npm run build
npm run start
```

### Régénérer Prisma
```bash
npx prisma generate
```

### Reset database (⚠️ Efface toutes les données)
```bash
npx prisma db push --force-reset
```

### Voir les données
```bash
npx prisma studio
```

## 🚀 Prêt à déployer ?

Si tous les points sont cochés ✅, vous êtes prêt !

### Choix recommandé : Vercel
Suivez le guide : [DEPLOIEMENT-VERCEL.md](./DEPLOIEMENT-VERCEL.md)

### Alternative : Netlify
Suivez le guide : [DEPLOIEMENT-NETLIFY.md](./DEPLOIEMENT-NETLIFY.md)
