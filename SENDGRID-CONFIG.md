# Configuration SendGrid avec Domaine Personnalisé

## Vue d'Ensemble

Ce guide explique comment configurer SendGrid pour envoyer des emails depuis **info@boutique-felicita.fr** au lieu de Gmail.

### Adresses Email Professionnelles

- **info@boutique-felicita.fr** : Emails automatiques (vérification, inscriptions, notifications)
- **contact@boutique-felicita.fr** : Support client (affiché sur le site)

## Étape 1: Vérification du Domaine dans SendGrid

### A. Accéder à SendGrid

1. Connectez-vous à https://app.sendgrid.com
2. Allez dans **Settings** → **Sender Authentication**
3. Cliquez sur **"Authenticate Your Domain"**

### B. Configurer le Domaine

1. **DNS Host** : Sélectionnez "Other Host" (pour Ionos)
2. **Domain** : Entrez `boutique-felicita.fr`
3. **Advanced Settings** :
   - ✅ Use automated security
   - ✅ Brand domain with "em"
   - Subdomain : `em` (sera em.boutique-felicita.fr)

4. Cliquez sur **"Next"**

### C. Enregistrements DNS à Ajouter

SendGrid va générer 3-4 enregistrements CNAME. Exemple :

```dns
Type: CNAME
Host: em1234.boutique-felicita.fr
Valeur: u1234567.wl123.sendgrid.net
TTL: Automatic

Type: CNAME
Host: s1._domainkey.boutique-felicita.fr
Valeur: s1.domainkey.u1234567.wl123.sendgrid.net
TTL: Automatic

Type: CNAME
Host: s2._domainkey.boutique-felicita.fr
Valeur: s2.domainkey.u1234567.wl123.sendgrid.net
TTL: Automatic

Type: CNAME
Host: url1234.boutique-felicita.fr
Valeur: sendgrid.net
TTL: Automatic
```

**Important** : Les valeurs exactes seront fournies par SendGrid dans votre interface.

## Étape 2: Configuration DNS chez Ionos

### A. Accéder au DNS Manager

1. Connectez-vous à https://www.ionos.fr
2. Allez dans **Domaines & SSL**
3. Sélectionnez **boutique-felicita.fr**
4. Cliquez sur **Gérer les DNS**

### B. Ajouter les Enregistrements

Pour chaque enregistrement CNAME fourni par SendGrid :

1. Cliquez sur **"Ajouter un enregistrement"**
2. **Type** : CNAME
3. **Nom d'hôte** : Copiez exactement depuis SendGrid (ex: `em1234`)
4. **Pointe vers** : Copiez la valeur SendGrid
5. **TTL** : 3600 (1 heure)
6. Cliquez sur **"Enregistrer"**

Répétez pour les 3-4 enregistrements.

### C. Vérification dans SendGrid

1. Retournez sur SendGrid
2. Cliquez sur **"Verify"**
3. Attendez 5-10 minutes pour la propagation DNS
4. Si nécessaire, cliquez sur **"Retry Verification"**

✅ Statut "Verified" = Domaine prêt !

## Étape 3: Variables d'Environnement Railway

Une fois le domaine vérifié, configurez les variables sur Railway :

### Variables à Ajouter/Modifier

```bash
# URL du site (déjà fait)
NEXTAUTH_URL=https://www.boutique-felicita.fr

# SendGrid
SENDGRID_API_KEY=SG.votre_cle_sendgrid_ici

# Email Configuration
EMAIL_FROM=info@boutique-felicita.fr
EMAIL_FROM_NAME=Charcuterie Felicita
ADMIN_EMAIL=contact@boutique-felicita.fr

# Anciennes variables (peuvent rester pour compatibilité)
SMTP_FROM=info@boutique-felicita.fr
ADMIN_REVIEWS_EMAIL=contact@boutique-felicita.fr
```

### Comment Ajouter sur Railway

1. Allez sur https://railway.app
2. Sélectionnez votre projet **felicitas-site-production**
3. Cliquez sur **Variables**
4. Ajoutez chaque variable :
   - **Variable Name** : `EMAIL_FROM`
   - **Value** : `info@boutique-felicita.fr`
5. Cliquez sur **"Add"** pour chaque variable

## Étape 4: Configuration des Redirections Email (Ionos)

Pour que **info@boutique-felicita.fr** et **contact@boutique-felicita.fr** redirigent vers votre Gmail :

### A. Créer les Redirections

1. Dans Ionos → **Email & Office**
2. Sélectionnez **boutique-felicita.fr**
3. Cliquez sur **"Créer une adresse email"** ou **"Redirection"**

#### Redirection 1 : info@
```
Adresse source : info@boutique-felicita.fr
Redirection vers : johan.mallet1@gmail.com
```

#### Redirection 2 : contact@
```
Adresse source : contact@boutique-felicita.fr
Redirection vers : johan.mallet1@gmail.com
```

**Note** : Ces redirections permettent de RECEVOIR les emails. Pour ENVOYER, on passe par SendGrid API.

## Étape 5: Code Mis à Jour

Le code a été modifié pour utiliser les nouvelles variables :

### lib/email.ts

```typescript
// Email de bienvenue
await sgMail.send({
  from: {
    email: process.env.EMAIL_FROM || "info@boutique-felicita.fr",
    name: process.env.EMAIL_FROM_NAME || "Charcuterie Felicita"
  },
  to: userEmail,
  subject: "🎉 Bienvenue chez Charcuterie Felicita",
  // ...
});

// Email de modération d'avis
await sgMail.send({
  from: {
    email: process.env.EMAIL_FROM || "info@boutique-felicita.fr",
    name: process.env.EMAIL_FROM_NAME || "Charcuterie Felicita"
  },
  to: process.env.ADMIN_EMAIL || "contact@boutique-felicita.fr",
  subject: "Nouvel avis à modérer",
  // ...
});
```

### Avantages

1. **From Name professionnel** : "Charcuterie Felicita <info@boutique-felicita.fr>"
2. **Pas de spam** : Emails envoyés depuis votre domaine vérifié
3. **Reply-To** : Les réponses vont vers votre Gmail via redirection

## Étape 6: Déploiement

Une fois tout configuré :

```bash
cd ~/Desktop/FELICITAS-SITE
git add .
git commit -m "Configure SendGrid with custom domain info@boutique-felicita.fr"
git push
```

Railway redéploiera automatiquement avec les nouvelles configurations.

## Tests Post-Déploiement

### Test 1 : Inscription d'un Utilisateur

1. Allez sur https://www.boutique-felicita.fr/auth/signup
2. Créez un compte test
3. Vérifiez votre email :
   - **De** : Charcuterie Felicita <info@boutique-felicita.fr>
   - **Sujet** : 🎉 Bienvenue chez Charcuterie Felicita - Vos identifiants
   - **Lien** : Doit pointer vers www.boutique-felicita.fr

### Test 2 : Email de Modération

1. Connectez-vous avec un compte
2. Allez sur un produit
3. Laissez un avis
4. Vérifiez que l'email de modération arrive à contact@boutique-felicita.fr (redirigé vers Gmail)

### Test 3 : Réponse aux Emails

1. Répondez à l'email de bienvenue
2. La réponse doit arriver à johan.mallet1@gmail.com (via redirection Ionos)

## Types d'Emails Configurés

### 1. Email de Bienvenue (Inscription)

**Déclencheur** : Création de compte
**De** : info@boutique-felicita.fr
**À** : Email de l'utilisateur
**Contenu** :
- Identifiants de connexion
- Lien de vérification email
- Informations sur le rôle (Particulier/Comité)

**Fichier** : `lib/email.ts` → `sendWelcomeEmail()`

### 2. Email de Modération d'Avis

**Déclencheur** : Soumission d'un avis client
**De** : info@boutique-felicita.fr
**À** : contact@boutique-felicita.fr
**Contenu** :
- Détails de l'avis (produit, note, commentaire)
- Liens Accepter/Refuser

**Fichier** : `lib/email.ts` → `sendReviewModerationEmail()`

### 3. Emails Futurs à Prévoir

- **Reset Password** : Réinitialisation mot de passe
- **Order Confirmation** : Confirmation de commande
- **Shipping Update** : Mise à jour livraison
- **Newsletter** : (si implémenté)

## Monitoring SendGrid

### Dashboard SendGrid

Consultez les statistiques d'envoi :

1. https://app.sendgrid.com/statistics
2. Vérifiez :
   - **Delivered** : Emails livrés
   - **Bounces** : Emails rejetés
   - **Spam Reports** : Signalements spam
   - **Opens** : Ouvertures (si tracking activé)

### Activity Feed

Pour voir les emails envoyés en temps réel :

1. https://app.sendgrid.com/email_activity
2. Recherchez par :
   - Email destinataire
   - Date
   - Statut (delivered, bounced, etc.)

## Problèmes Courants

### Email Non Reçu

**Causes possibles** :
1. Domaine SendGrid pas vérifié → Vérifier dans Settings → Sender Authentication
2. Email dans spam → Vérifier dossier spam Gmail
3. DNS pas propagé → Attendre 24h ou tester avec https://dnschecker.org

**Solution** :
```bash
# Tester les DNS
nslookup em1234.boutique-felicita.fr
# Doit répondre avec sendgrid.net
```

### Email avec "via sendgrid.net"

**Cause** : Normal si domaine pas complètement vérifié

**Solution** :
1. Vérifier les 3-4 enregistrements CNAME dans Ionos
2. Attendre propagation DNS (jusqu'à 24h)
3. Retry Verification dans SendGrid

### Rate Limiting

SendGrid Free Tier : 100 emails/jour

**Solution** :
- Upgrade SendGrid plan si besoin
- Ou limiter les emails de test

### Emails Marqués Spam

**Causes** :
1. Contenu suspect (trop de liens, MAJUSCULES)
2. Nouveau domaine (réputation à construire)
3. SPF/DKIM mal configurés

**Solution** :
1. Vérifier SPF/DKIM dans SendGrid
2. Améliorer contenu email
3. Demander aux utilisateurs de marquer "Pas spam"

## Sécurité

### API Key SendGrid

- ⚠️ **Ne jamais commiter** la clé API dans Git
- ✅ Stocker uniquement dans Railway Variables
- ✅ .env dans .gitignore

### Rotation des Clés

Recommandé tous les 6 mois :

1. SendGrid → Settings → API Keys
2. Create API Key → Full Access
3. Copier nouvelle clé
4. Mettre à jour Railway
5. Supprimer ancienne clé après test

## Support

### SendGrid
- Documentation : https://docs.sendgrid.com
- Support : https://support.sendgrid.com

### Ionos
- DNS Manager : https://www.ionos.fr/assistance
- Support : Via espace client

### Railway
- Logs : Railway Project → Deployments → View Logs
- Variables : Railway Project → Variables

## Checklist Finale

Avant de marquer comme terminé :

- [ ] Domaine vérifié dans SendGrid (Statut: Verified)
- [ ] 3-4 enregistrements CNAME ajoutés dans Ionos
- [ ] Variables d'environnement configurées sur Railway
- [ ] Redirections email créées (info@ et contact@)
- [ ] Code mis à jour et déployé
- [ ] Test inscription → Email reçu de info@boutique-felicita.fr
- [ ] Test avis → Email modération reçu à contact@
- [ ] Réponse email test → Reçue dans Gmail

---

**Date de configuration** : 28 janvier 2026
**Domaine** : boutique-felicita.fr
**Email expéditeur** : info@boutique-felicita.fr
**Email admin** : contact@boutique-felicita.fr
