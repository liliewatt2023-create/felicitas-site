# Guide de Déploiement sur Vercel

## Étape 1 : Préparer votre projet

### 1.1 Vérifier que tout fonctionne localement
```bash
npm run build
npm run dev
```

### 1.2 Pousser votre code sur GitHub
```bash
# Si vous n'avez pas encore initialisé git
git init
git add .
git commit -m "Prêt pour déploiement"

# Créer un nouveau repo sur GitHub, puis :
git remote add origin https://github.com/VOTRE-USERNAME/VOTRE-REPO.git
git branch -M main
git push -u origin main
```

## Étape 2 : Créer un compte Vercel

1. Allez sur https://vercel.com
2. Cliquez sur "Sign Up" (S'inscrire)
3. Connectez-vous avec votre compte GitHub
4. Autorisez Vercel à accéder à vos repositories

## Étape 3 : Importer votre projet

1. Dans le dashboard Vercel, cliquez sur "Add New..." → "Project"
2. Sélectionnez votre repository GitHub (FELICITAS-SITE)
3. Vercel détectera automatiquement que c'est un projet Next.js

## Étape 4 : Configurer les variables d'environnement

Dans les paramètres du projet sur Vercel, ajoutez ces variables :

### Base de données
```
DATABASE_URL=votre_url_postgresql_production
```

### NextAuth
```
NEXTAUTH_SECRET=votre_secret_production
NEXTAUTH_URL=https://votre-site.vercel.app
```

### Email (Resend)
```
RESEND_API_KEY=votre_cle_resend
EMAIL_FROM=noreply@votredomaine.com
```

### Stripe (Paiements)
```
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
```

### Code Comité d'Entreprise
```
COMMITTEE_CODE=votre_code_secret
```

## Étape 5 : Configurer la base de données de production

### Option A : Utiliser Vercel Postgres (Recommandé)
1. Dans votre projet Vercel, allez dans "Storage"
2. Créez une nouvelle base de données Postgres
3. Copiez la `DATABASE_URL` fournie
4. Ajoutez-la dans les variables d'environnement

### Option B : Utiliser Supabase (Gratuit)
1. Créez un compte sur https://supabase.com
2. Créez un nouveau projet
3. Dans Settings → Database, copiez la "Connection string"
4. Format : `postgresql://postgres:[PASSWORD]@[HOST]:5432/postgres`

### Option C : Utiliser Neon (Gratuit)
1. Créez un compte sur https://neon.tech
2. Créez un nouveau projet
3. Copiez la connection string fournie

## Étape 6 : Initialiser la base de données

Après avoir configuré DATABASE_URL, exécutez :

```bash
# En local, avec la DATABASE_URL de production
npx prisma generate
npx prisma db push
```

Ou utilisez Vercel CLI :
```bash
vercel env pull
npx prisma generate
npx prisma db push
```

## Étape 7 : Déployer

1. Cliquez sur "Deploy" dans Vercel
2. Attendez la fin du build (2-5 minutes)
3. Votre site sera disponible sur `https://votre-projet.vercel.app`

## Étape 8 : Configurer votre domaine personnalisé (Optionnel)

1. Dans Vercel, allez dans Settings → Domains
2. Ajoutez votre domaine : `charcuteriefelicita.fr`
3. Suivez les instructions pour configurer vos DNS

## Étape 9 : Vérifier que tout fonctionne

✅ Testez ces fonctionnalités :

1. **Page d'accueil**
   - Vidéo s'affiche et se lance
   - Images chargent correctement
   - FAQ fonctionne (accordéon)

2. **Création de compte**
   - Aller sur /auth/signup
   - Créer un compte Particulier
   - Vérifier que l'email de bienvenue arrive
   - Cliquer sur le lien de vérification d'email

3. **Connexion**
   - Se connecter avec les identifiants
   - Vérifier que ça fonctionne après vérification email

4. **Paiement Stripe** (en mode test)
   - Tester un paiement
   - Vérifier que tout fonctionne

## Étape 10 : Activer les webhooks Stripe

1. Dans Stripe Dashboard → Developers → Webhooks
2. Ajoutez un endpoint : `https://votre-site.vercel.app/api/webhooks/stripe`
3. Sélectionnez les événements :
   - `payment_intent.succeeded`
   - `payment_intent.payment_failed`
   - `checkout.session.completed`
4. Copiez le secret de signature webhook
5. Ajoutez-le dans Vercel : `STRIPE_WEBHOOK_SECRET`

## Commandes Vercel utiles

```bash
# Installer Vercel CLI
npm i -g vercel

# Se connecter
vercel login

# Déployer depuis votre terminal
vercel

# Déployer en production
vercel --prod

# Voir les logs
vercel logs

# Télécharger les variables d'environnement
vercel env pull
```

## Déploiement automatique

Vercel redéploie automatiquement à chaque push sur main :
```bash
git add .
git commit -m "Mes changements"
git push origin main
# Vercel déploie automatiquement !
```

## Problèmes courants

### La vidéo ne se charge pas
- Vérifiez que `video2.mp4` est bien dans `/public/videos/`
- Vérifiez la taille du fichier (max 50MB recommandé)
- Utilisez un service de streaming vidéo si trop gros

### Les images ne s'affichent pas
- Vérifiez que les images sont dans `/public/images/`
- Vérifiez les chemins dans le code

### Erreur de base de données
- Vérifiez que `DATABASE_URL` est correcte
- Vérifiez que `npx prisma db push` a été exécuté
- Vérifiez que la base de données accepte les connexions externes

### Email ne fonctionne pas
- Vérifiez `RESEND_API_KEY`
- Vérifiez que le domaine email est vérifié dans Resend
- Consultez les logs Resend

## Support

- Documentation Vercel : https://vercel.com/docs
- Documentation Next.js : https://nextjs.org/docs
- Support Vercel : https://vercel.com/support
