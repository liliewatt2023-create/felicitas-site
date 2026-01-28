# Configuration Domaine Personnalisé - Boutique Felicita

## ✅ Configuration Complétée

### Domaine Acheté
- **Registrar** : Ionos
- **Domaine** : boutique-felicita.fr
- **Coût** : 1€/an

### URLs Finales
- **Principal** : https://www.boutique-felicita.fr
- **Redirection** : https://boutique-felicita.fr → https://www.boutique-felicita.fr

## Configuration DNS (Ionos) ✓

```
Type: CNAME
Host: www
Valeur: 9rthynw3.up.railway.app
TTL: Auto
```

```
Type: Redirection
Source: boutique-felicita.fr
Destination: https://www.boutique-felicita.fr
```

## Configuration Railway ✓

1. **Domaine ajouté** : boutique-felicita.fr
2. **Port** : 8080
3. **SSL** : Automatique (Let's Encrypt)

## 🚀 Étapes de Déploiement

### 1. Mettre à Jour les Variables d'Environnement sur Railway

Allez dans votre projet Railway → Variables → Modifiez :

```bash
NEXTAUTH_URL=https://www.boutique-felicita.fr
```

**Important** : Toutes les autres variables restent identiques !

### 2. Déployer les Améliorations de Landing Page

```bash
cd ~/Desktop/FELICITAS-SITE
git add .
git commit -m "Landing page improvements + custom domain configuration"
git push
```

Railway redéploiera automatiquement en 2-3 minutes.

### 3. Vérifications Post-Déploiement

Testez dans cet ordre :

#### A. Site Web
- [ ] https://www.boutique-felicita.fr/ → Landing page s'affiche
- [ ] https://boutique-felicita.fr/ → Redirige vers www
- [ ] Les 6 produits sont visibles sans connexion
- [ ] Les avis clients s'affichent
- [ ] La section storytelling Corse est présente
- [ ] Les liens sociaux (Instagram, Facebook) sont visibles

#### B. Authentification
- [ ] https://www.boutique-felicita.fr/auth/signup → Création de compte
- [ ] Email de bienvenue reçu avec liens vers **www.boutique-felicita.fr**
- [ ] Lien de vérification fonctionne
- [ ] Connexion : https://www.boutique-felicita.fr/auth/signin

#### C. Boutique
- [ ] https://www.boutique-felicita.fr/shop/particulier → Produits visibles
- [ ] https://www.boutique-felicita.fr/shop/comite → Tarifs CE corrects

#### D. Paiement Stripe
- [ ] Ajout au panier fonctionne
- [ ] Checkout Stripe s'ouvre
- [ ] Redirection après paiement vers www.boutique-felicita.fr/success
- [ ] Redirection annulation vers www.boutique-felicita.fr/cancel

#### E. Avis Clients
- [ ] Soumission d'un avis
- [ ] Email de modération reçu avec liens vers **www.boutique-felicita.fr**

## Code Déjà Configuré ✅

Le code utilise automatiquement `process.env.NEXTAUTH_URL` pour :

### Emails (lib/email.ts)
```typescript
// Email de vérification
const verificationUrl = `${process.env.NEXTAUTH_URL}/api/auth/verify-email?token=${verificationToken}`;

// Email de modération
const baseUrl = process.env.NEXTAUTH_URL || "http://localhost:3000";
const acceptUrl = `${baseUrl}/api/reviews/moderate?token=${token}&action=approve`;
```

### Stripe Checkout (app/api/checkout/route.ts)
```typescript
const checkoutSession = await stripe.checkout.sessions.create({
  success_url: `${process.env.NEXTAUTH_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
  cancel_url: `${process.env.NEXTAUTH_URL}/cancel`,
  // ...
});
```

## Améliorations Incluses dans ce Déploiement

### 1. Produits Visibles Sans Connexion
- Section "Nos Produits d'Exception" sur la page d'accueil
- 6 produits phares avec photos
- CTA pour voir tous les produits

### 2. Avis Clients Réels
- Affichage de 6 derniers avis vérifiés
- Compteur total d'avis (36+)
- Dates et notes par étoiles

### 3. Storytelling Corse
- Section "L'Âme de la Corse"
- 3 cartes : Terroir, Producteurs, Tradition de la Châtaigne
- Texte authentique et engageant

### 4. Réseaux Sociaux
- Icônes Instagram et Facebook dans le footer
- Liens :
  - https://instagram.com/charcuteriefelicita
  - https://facebook.com/charcuteriefelicita

### 5. CTA Améliorés
- Boutons "Créer Mon Compte" et "Se Connecter"
- Contact téléphone : 06 04 11 05 50
- Tagline : "Produits artisanaux de Corse et d'Italie"

## Problèmes Potentiels et Solutions

### Emails ne fonctionnent pas
**Symptôme** : Emails reçus avec lien vers railway.app au lieu de boutique-felicita.fr

**Solution** :
1. Vérifiez que `NEXTAUTH_URL=https://www.boutique-felicita.fr` sur Railway
2. Redémarrez le service Railway (Settings → Redeploy)
3. Testez un nouvel email

### Session déconnecte automatiquement
**Symptôme** : Utilisateur déconnecté après navigation

**Solution** :
1. Vider les cookies du navigateur
2. Vérifier que NEXTAUTH_URL correspond au domaine dans la barre d'adresse
3. Se reconnecter

### Redirection infinie
**Symptôme** : La page tourne en boucle

**Solution** :
1. Vérifier la configuration DNS Ionos
2. S'assurer que la redirection non-www → www est configurée
3. Attendre la propagation DNS (jusqu'à 24h)

## Timeline de Propagation DNS

- **CNAME** : 5-15 minutes (rapide)
- **Propagation complète** : 1-24 heures
- **Certificat SSL** : 5-10 minutes après DNS

## Outils de Vérification

### DNS
```bash
nslookup www.boutique-felicita.fr
# Doit répondre : 9rthynw3.up.railway.app

dig www.boutique-felicita.fr
# Doit montrer un CNAME vers Railway
```

### SSL
- https://www.ssllabs.com/ssltest/
- Vérifier que le certificat est valide pour www.boutique-felicita.fr

### Performance
- https://pagespeed.web.dev/
- Tester : https://www.boutique-felicita.fr

## Support

### Railway
- Dashboard : https://railway.app
- Logs : Railway Project → Deployments → View Logs

### Ionos
- DNS Manager : https://www.ionos.fr/
- Support : via espace client

### Stripe
- Dashboard : https://dashboard.stripe.com
- Webhooks : Vérifier l'URL si configuré

## Notes Importantes

1. **Ne jamais commiter les variables sensibles** (.env dans .gitignore)
2. **NEXTAUTH_URL** doit TOUJOURS inclure https:// et www
3. **Certificat SSL** : Généré automatiquement par Railway
4. **Port 8080** : Utilisé en interne par Railway (transparent)
5. **Redirection www** : Gérée par Ionos, pas par le code

## Contact Projet

- Email : johan.mallet1@gmail.com
- Téléphone : 06 04 11 05 50
- GitHub : (si applicable)

---

**Date de configuration** : 28 janvier 2026
**Version** : 1.0 - Landing page améliorée + domaine personnalisé
