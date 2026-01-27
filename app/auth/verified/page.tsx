"use client";

import Link from "next/link";

export default function VerifiedPage() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
        <div className="text-center mb-6">
          <div className="text-6xl mb-4">✅</div>
          <h1 className="text-3xl font-bold text-primary mb-4">
            Email vérifié avec succès !
          </h1>
        </div>

        <div className="bg-green-100 border border-green-400 text-green-700 px-6 py-4 rounded-lg mb-6">
          <p className="font-semibold mb-2">
            Votre adresse email a été confirmée.
          </p>
          <p className="text-sm">
            Vous pouvez maintenant vous connecter et profiter de tous les avantages de notre boutique.
          </p>
        </div>

        <div className="bg-ivory p-6 rounded-lg mb-6">
          <h3 className="font-bold text-primary mb-3">Bienvenue chez Charcuterie Felicita !</h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li>🥓 Charcuterie corse authentique</li>
            <li>🧀 Fromages de caractère</li>
            <li>💰 Prix préférentiels selon votre profil</li>
            <li>🚚 Livraison rapide en France</li>
          </ul>
        </div>

        <Link
          href="/auth/signin"
          className="block w-full bg-primary text-ivory py-3 rounded-lg hover:bg-primary-light transition-colors duration-200 font-semibold text-center"
        >
          Se connecter maintenant
        </Link>

        <div className="mt-6 text-center">
          <Link
            href="/"
            className="text-sm text-gray-600 hover:text-primary transition-colors"
          >
            ← Retour à l'accueil
          </Link>
        </div>
      </div>
    </div>
  );
}
