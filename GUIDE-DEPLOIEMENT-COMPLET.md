# Guide de Déploiement Complet - Boutique Felicita

## 🎯 Objectif

Déployer le site e-commerce avec :
- Domaine personnalisé : **www.boutique-felicita.fr**
- Emails professionnels : **info@boutique-felicita.fr**
- Landing page améliorée (produits, avis, storytelling)

## ✅ Ce Qui Est Déjà Fait

1. ✅ Domaine acheté : boutique-felicita.fr (Ionos, 1€/an)
2. ✅ DNS configuré : CNAME www → Railway
3. ✅ Railway configuré : Domaine personnalisé ajouté
4. ✅ SendGrid compte créé avec API Key
5. ✅ Code mis à jour : Landing page + emails

## 📋 Checklist de Déploiement

### Étape 1: Configuration SendGrid (30 min)

#### 1.1 Vérifier le Domaine dans SendGrid

1. Connectez-vous à https://app.sendgrid.com
2. **Settings** → **Sender Authentication** → **Authenticate Your Domain**
3. Sélectionnez "Other Host" (Ionos)
4. Entrez : `boutique-felicita.fr`
5. **Next** → SendGrid génère les enregistrements DNS

#### 1.2 Ajouter les DNS chez Ionos

SendGrid vous donnera environ 3-4 enregistrements CNAME comme ceci :

```
em1234.boutique-felicita.fr → u12345.wl123.sendgrid.net
s1._domainkey.boutique-felicita.fr → s1.domainkey.u12345.wl123.sendgrid.net
s2._domainkey.boutique-felicita.fr → s2.domainkey.u12345.wl123.sendgrid.net
```

Pour chaque enregistrement :

1. Allez sur https://www.ionos.fr → **Domaines & SSL**
2. Cliquez sur **boutique-felicita.fr** → **Gérer les DNS**
3. **Ajouter un enregistrement** :
   - Type : **CNAME**
   - Nom d'hôte : Copiez depuis SendGrid (ex: `em1234`)
   - Pointe vers : Copiez depuis SendGrid
   - TTL : **3600**
4. **Enregistrer**

Répétez pour tous les enregistrements.

#### 1.3 Vérifier dans SendGrid

1. Retournez sur SendGrid
2. Cliquez sur **"Verify"**
3. Attendez 5-10 minutes
4. Si nécessaire : **"Retry Verification"**
5. Statut doit afficher : **"Verified"** ✅

### Étape 2: Configuration Railway (10 min)

#### 2.1 Variables d'Environnement

Allez sur https://railway.app → Votre projet → **Variables**

Ajoutez/Modifiez ces variables :

```bash
# Site URL
NEXTAUTH_URL=https://www.boutique-felicita.fr

# SendGrid (déjà existant)
SENDGRID_API_KEY=SG.votre_cle_sendgrid_ici

# Emails - NOUVELLES VARIABLES
EMAIL_FROM=info@boutique-felicita.fr
EMAIL_FROM_NAME=Boutique Felicita
ADMIN_EMAIL=contact@boutique-felicita.fr

# Database (déjà configuré)
DATABASE_URL=${{Postgres.DATABASE_URL}}

# NextAuth (déjà configuré)
NEXTAUTH_SECRET=felicita-secret-key-change-in-production-2024

# Stripe (déjà configuré)
STRIPE_SECRET_KEY=sk_test_votre_cle_stripe_ici
NEXT_PUBLIC_STRIPE_PUBLIC_KEY=pk_test_votre_cle_publique_stripe_ici

# Code Comité (déjà configuré)
COMITE_CODE=FELICITA2024

# Legacy (pour compatibilité)
SMTP_FROM=info@boutique-felicita.fr
ADMIN_REVIEWS_EMAIL=contact@boutique-felicita.fr
```

#### 2.2 Comment Ajouter une Variable

1. Cliquez sur **"New Variable"**
2. **Variable Name** : `EMAIL_FROM`
3. **Value** : `info@boutique-felicita.fr`
4. Cliquez **"Add"**
5. Répétez pour chaque variable

### Étape 3: Redirections Email Ionos (10 min)

Pour RECEVOIR les emails envoyés à info@ et contact@ :

#### 3.1 Créer les Redirections

1. Ionos → **Email & Office**
2. Sélectionnez **boutique-felicita.fr**
3. **Créer une redirection** ou **Ajouter une adresse email**

#### 3.2 Redirection 1 : info@

```
Adresse : info@boutique-felicita.fr
Redirige vers : johan.mallet1@gmail.com
```

#### 3.3 Redirection 2 : contact@

```
Adresse : contact@boutique-felicita.fr
Redirige vers : johan.mallet1@gmail.com
```

**Important** :
- Ces redirections permettent de **RECEVOIR** les réponses
- Pour **ENVOYER**, on utilise SendGrid API (pas bloqué par Railway)

### Étape 4: Déploiement du Code (5 min)

Le code a déjà été mis à jour. Il suffit de déployer :

```bash
cd ~/Desktop/FELICITAS-SITE
git status
git add .
git commit -m "Deploy: Landing page improvements + SendGrid custom domain + Railway config"
git push
```

Railway redéploiera automatiquement en **2-3 minutes**.

### Étape 5: Tests Post-Déploiement (15 min)

#### Test 1 : Site Web

- [ ] https://www.boutique-felicita.fr → Landing page s'affiche
- [ ] https://boutique-felicita.fr → Redirige vers www
- [ ] Section "Nos Produits d'Exception" → 6 produits visibles
- [ ] Section "Avis Clients" → Reviews affichés
- [ ] Section "L'Âme de la Corse" → Storytelling présent
- [ ] Footer → Liens Instagram/Facebook visibles
- [ ] Contact : 06 04 11 05 50 affiché

#### Test 2 : Inscription Utilisateur

1. Allez sur https://www.boutique-felicita.fr/auth/signup
2. Créez un compte test (ex: test@votremail.com)
3. Soumettez le formulaire
4. Vérifiez votre boîte email :

**Email attendu** :
- **De** : Charcuterie Felicita <info@boutique-felicita.fr>
- **Sujet** : 🎉 Bienvenue chez Charcuterie Felicita - Vos identifiants
- **Contenu** :
  - Identifiants de connexion
  - Lien de vérification email
- **Lien** : Doit pointer vers www.boutique-felicita.fr

5. Cliquez sur le lien de vérification
6. Vous devriez être redirigé vers www.boutique-felicita.fr/auth/verified

#### Test 3 : Connexion

- [ ] https://www.boutique-felicita.fr/auth/signin
- [ ] Connectez-vous avec le compte test
- [ ] Redirection vers /shop/particulier ou /shop/comite

#### Test 4 : Avis Client

1. Connectez-vous
2. Allez sur un produit
3. Laissez un avis (note + commentaire)
4. Soumettez

Vérifiez dans Gmail (johan.mallet1@gmail.com) :

**Email attendu** :
- **De** : Charcuterie Felicita <info@boutique-felicita.fr>
- **À** : contact@boutique-felicita.fr (→ redirigé vers Gmail)
- **Sujet** : Nouvel avis à modérer - [Nom du produit]
- **Contenu** : Détails de l'avis avec liens Accepter/Refuser

#### Test 5 : Réponse Email

1. Répondez à l'email de bienvenue
2. La réponse doit arriver à johan.mallet1@gmail.com
3. ✅ Confirme que la redirection Ionos fonctionne

## 📊 Monitoring

### SendGrid Dashboard

Consultez les statistiques d'envoi :

1. https://app.sendgrid.com/statistics
2. Vérifiez :
   - **Delivered** : Nombre d'emails livrés
   - **Bounces** : Emails rejetés (doit être 0)
   - **Opens** : Ouvertures (si tracking activé)

### Activity Feed

Pour voir les emails en temps réel :

1. https://app.sendgrid.com/email_activity
2. Recherchez par destinataire ou date
3. Vérifiez le statut : **"Delivered"** ✅

### Railway Logs

Pour voir les logs de déploiement et emails :

1. Railway Dashboard → Projet
2. **Deployments** → Dernier déploiement
3. **View Logs**
4. Recherchez :
   - `✅ Email de bienvenue envoyé`
   - `✅ Email de modération envoyé`

## 🚨 Problèmes Courants

### Email Non Reçu

**Symptômes** :
- Inscription réussie mais pas d'email

**Solutions** :
1. Vérifier dossier **Spam** dans Gmail
2. Vérifier SendGrid Activity Feed → Statut "Delivered"
3. Vérifier que domaine est **"Verified"** dans SendGrid
4. Attendre propagation DNS (jusqu'à 24h)

**Test DNS** :
```bash
nslookup em1234.boutique-felicita.fr
# Doit répondre avec sendgrid.net
```

### Email avec "via sendgrid.net"

**Cause** : Domaine pas complètement vérifié

**Solution** :
1. Vérifier les 3-4 CNAME dans Ionos DNS Manager
2. Attendre propagation (jusqu'à 24h)
3. Dans SendGrid : **"Retry Verification"**

### Variables d'Environnement

**Symptômes** :
- Email envoyé de johan.mallet1@gmail.com au lieu de info@boutique-felicita.fr

**Solution** :
1. Railway → Variables → Vérifier `EMAIL_FROM`
2. Si manquante, l'ajouter : `EMAIL_FROM=info@boutique-felicita.fr`
3. Redéployer : Railway → **Redeploy**

### Session Déconnecte

**Symptômes** :
- Déconnexion automatique après connexion

**Solution** :
1. Vérifier `NEXTAUTH_URL=https://www.boutique-felicita.fr` sur Railway
2. Vider cookies du navigateur
3. Se reconnecter

### Site Inaccessible

**Symptômes** :
- www.boutique-felicita.fr ne répond pas

**Solution** :
1. Vérifier DNS Ionos : CNAME www → 9rthynw3.up.railway.app
2. Vérifier Railway → Domains → boutique-felicita.fr (actif)
3. Attendre propagation DNS (5-15 min)

**Test DNS** :
```bash
nslookup www.boutique-felicita.fr
# Doit répondre avec railway.app
```

## 📁 Fichiers Modifiés

### Code Source

- ✅ [lib/email.ts](lib/email.ts) - Configuration SendGrid avec domaine personnalisé
- ✅ [app/page.tsx](app/page.tsx) - Landing page améliorée
- ✅ [app/api/public/products/route.ts](app/api/public/products/route.ts) - API publique produits
- ✅ [app/api/public/reviews/route.ts](app/api/public/reviews/route.ts) - API publique avis

### Documentation

- ✅ [SENDGRID-CONFIG.md](SENDGRID-CONFIG.md) - Configuration SendGrid détaillée
- ✅ [DOMAINE-PERSONNALISE.md](DOMAINE-PERSONNALISE.md) - Configuration domaine
- ✅ [RAILWAY_SETUP.md](RAILWAY_SETUP.md) - Configuration Railway
- ✅ [GUIDE-DEPLOIEMENT-COMPLET.md](GUIDE-DEPLOIEMENT-COMPLET.md) - Ce guide

## 🎉 Résultat Final

Après avoir suivi toutes les étapes :

### Site Web
- **URL** : https://www.boutique-felicita.fr
- **Landing page** :
  - Hero avec vidéo et logo
  - 6 produits visibles sans connexion
  - Avis clients réels affichés
  - Storytelling Corse authentique
  - Liens réseaux sociaux
  - Contact : 06 04 11 05 50

### Emails
- **Expéditeur** : Charcuterie Felicita <info@boutique-felicita.fr>
- **Admin** : contact@boutique-felicita.fr → redirigé vers Gmail
- **Emails envoyés** :
  - Bienvenue + vérification
  - Modération d'avis
- **Domaine vérifié** : Pas de "via sendgrid.net"

### Fonctionnalités
- Inscription Particulier/Comité ✅
- Connexion sécurisée ✅
- Catalogue produits avec images ✅
- Panier et checkout Stripe ✅
- Système d'avis avec modération ✅
- Emails transactionnels ✅

## 📞 Support

### En Cas de Problème

1. **Vérifier les logs Railway** : Railway → Deployments → View Logs
2. **Vérifier SendGrid Activity** : https://app.sendgrid.com/email_activity
3. **Tester DNS** : https://dnschecker.org
4. **Contacter support** :
   - Ionos : https://www.ionos.fr/assistance
   - SendGrid : https://support.sendgrid.com
   - Railway : https://railway.app/help

### Contact Développeur

Si vous avez des questions sur le déploiement :
- Email : johan.mallet1@gmail.com
- Téléphone : 06 04 11 05 50

---

**Dernière mise à jour** : 28 janvier 2026
**Version** : 1.0 - Production Ready
**Statut** : ✅ Prêt à déployer
