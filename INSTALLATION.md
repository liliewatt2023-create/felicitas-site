# 🚀 Installation Rapide - Charcuterie Felicita

## 1. Installer les dépendances
```bash
cd FELICITAS
npm install
```

## 2. Configurer l'environnement
```bash
# Le fichier .env est déjà créé avec des valeurs par défaut
# Éditez-le pour ajouter vos vraies clés Stripe et SMTP
```

## 3. Initialiser la base de données
```bash
npx prisma generate
npx prisma migrate dev --name init
npm run prisma:seed
```

## 4. Lancer le serveur
```bash
npm run dev
```

Le site sera accessible sur [http://localhost:3000](http://localhost:3000)

## 📝 Configuration minimale requise

### Variables d'environnement à configurer :

1. **Stripe** (obligatoire pour les paiements)
   - Créer un compte sur stripe.com
   - Récupérer les clés de test
   - Mettre à jour dans `.env` :
     - `STRIPE_SECRET_KEY`
     - `STRIPE_PUBLIC_KEY`
     - `NEXT_PUBLIC_STRIPE_PUBLIC_KEY`

2. **Email SMTP** (pour modération des avis)
   - Configurer Gmail ou autre service SMTP
   - Mettre à jour dans `.env` :
     - `SMTP_USER`
     - `SMTP_PASS`
     - `ADMIN_REVIEWS_EMAIL`

3. **NextAuth** (déjà configuré par défaut)
   - Le secret est déjà généré
   - Changer en production !

## 🧪 Tester le site

1. Aller sur http://localhost:3000
2. Cliquer sur "Clients Particuliers"
3. Créer un compte (email + mot de passe)
4. Explorer la boutique
5. Ajouter un produit au panier
6. Tester le checkout Stripe (carte test: 4242 4242 4242 4242)

## ✅ Projet prêt !

Toutes les fonctionnalités sont opérationnelles :
- ✅ Authentification NextAuth
- ✅ Tarification dynamique (3 catégories)
- ✅ Validation code comité
- ✅ Panier avec localStorage
- ✅ Intégration Stripe
- ✅ Système d'avis modérés
- ✅ Base de données avec 8 produits

## 📞 Contact

Téléphone affiché : **06 04 11 05 50**

---

**Bon développement ! 🎉**
