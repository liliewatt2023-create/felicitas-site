# Configuration Railway - Domaine Personnalisé

## Domaine Configuré

- **Domaine principal** : https://www.boutique-felicita.fr
- **Domaine racine** : https://boutique-felicita.fr (redirige vers www)
- **URL Railway** : https://felicitas-site-production.up.railway.app

## Variables d'Environnement Railway

Dans votre projet Railway, configurez les variables suivantes :

### ✅ Variables à Mettre à Jour

```bash
# URL du site (IMPORTANT)
NEXTAUTH_URL=https://www.boutique-felicita.fr

# Database (déjà configuré via Railway Postgres)
DATABASE_URL=${{Postgres.DATABASE_URL}}

# NextAuth Secret (déjà configuré)
NEXTAUTH_SECRET=felicita-secret-key-change-in-production-2024

# Stripe (clés de test)
STRIPE_SECRET_KEY=sk_test_votre_cle_stripe_ici
STRIPE_PUBLIC_KEY=pk_test_votre_cle_publique_stripe_ici
NEXT_PUBLIC_STRIPE_PUBLIC_KEY=pk_test_votre_cle_publique_stripe_ici

# SendGrid (Email via HTTP)
SENDGRID_API_KEY=SG.votre_cle_sendgrid_ici
SMTP_FROM=johan.mallet1@gmail.com
ADMIN_REVIEWS_EMAIL=johan.mallet1@gmail.com

# Code Comité
COMITE_CODE=FELICITA2024
```

## Configuration DNS Ionos (Déjà Fait ✓)

- **Type** : CNAME
- **Host** : www
- **Valeur** : 9rthynw3.up.railway.app
- **Redirection** : boutique-felicita.fr → https://www.boutique-felicita.fr

## Configuration Railway (Déjà Fait ✓)

1. Railway Dashboard → Projet Felicitas
2. Settings → Domains
3. Ajouté : boutique-felicita.fr (Port 8080)

## URLs Mises à Jour Automatiquement

Les emails et liens de vérification utilisent automatiquement `process.env.NEXTAUTH_URL` :

### Emails de Bienvenue
- Lien de vérification : `${NEXTAUTH_URL}/api/auth/verify-email?token=...`
- Fichier : `lib/email.ts`

### Emails de Modération d'Avis
- Liens d'acceptation/refus : `${NEXTAUTH_URL}/api/reviews/moderate?token=...`
- Fichier : `lib/email.ts`

### API Routes
Toutes les routes API utilisent automatiquement le domaine Railway/personnalisé.

## Vérifications Post-Déploiement

Après avoir mis à jour `NEXTAUTH_URL` sur Railway :

1. ✅ Testez la connexion : https://www.boutique-felicita.fr/auth/signin
2. ✅ Testez l'inscription : https://www.boutique-felicita.fr/auth/signup
3. ✅ Vérifiez que les emails contiennent les bons liens (www.boutique-felicita.fr)
4. ✅ Testez un paiement Stripe pour vérifier les webhooks
5. ✅ Vérifiez que la redirection boutique-felicita.fr → www fonctionne

## Commandes de Déploiement

```bash
cd ~/Desktop/FELICITAS-SITE
git add .
git commit -m "Update for custom domain boutique-felicita.fr"
git push
```

Railway redéploiera automatiquement avec la nouvelle configuration.

## Notes Importantes

- **NEXTAUTH_URL** : Doit être l'URL complète avec https:// et www
- **Certificat SSL** : Railway génère automatiquement le certificat Let's Encrypt
- **Redirection** : La redirection non-www → www est gérée par Ionos
- **Port 8080** : Railway écoute sur ce port en interne (transparent pour les visiteurs)

## Problèmes Courants

### Emails avec mauvaise URL
**Solution** : Vérifier que `NEXTAUTH_URL=https://www.boutique-felicita.fr` sur Railway

### Session NextAuth ne fonctionne pas
**Solution** : Vider les cookies du navigateur et réessayer

### Erreur de redirection infinie
**Solution** : S'assurer que NEXTAUTH_URL correspond exactement au domaine dans la barre d'adresse

## Contact

Pour toute question sur la configuration :
- Railway Dashboard : https://railway.app/project/[votre-projet-id]
- Ionos DNS : https://www.ionos.fr/
