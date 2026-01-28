"use client";

import Link from "next/link";

export default function VerifiedPage() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 bg-gradient-to-b from-ivory to-wood">
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-2xl p-8 border-2 border-accent/20">
        <div className="text-center mb-6">
          <div className="inline-block bg-green-100 rounded-full p-6 mb-4">
            <div className="text-7xl">✅</div>
          </div>
          <h1 className="text-4xl font-bold text-primary mb-4">
            Email vérifié avec succès !
          </h1>
          <p className="text-xl text-gray-600">
            Félicitations, votre compte est maintenant activé
          </p>
        </div>

        <div className="bg-gradient-to-r from-green-50 to-green-100 border-2 border-green-400 px-6 py-5 rounded-xl mb-6">
          <div className="flex items-start space-x-3">
            <div className="text-3xl">🎉</div>
            <div>
              <p className="font-bold text-green-800 mb-1 text-lg">
                Votre adresse email a été confirmée
              </p>
              <p className="text-green-700">
                Vous pouvez maintenant accéder à notre boutique et profiter de tous nos produits d'exception.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-ivory to-wood/30 p-6 rounded-xl mb-6 border-2 border-primary/10">
          <h3 className="font-bold text-primary mb-4 text-xl text-center">
            🛒 Ce qui vous attend dans la boutique
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-start space-x-3">
              <div className="text-2xl flex-shrink-0">🥓</div>
              <div>
                <p className="font-semibold text-primary">Charcuterie corse</p>
                <p className="text-sm text-gray-600">Coppa, lonzo, figatellu...</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="text-2xl flex-shrink-0">🧀</div>
              <div>
                <p className="font-semibold text-primary">Fromages de caractère</p>
                <p className="text-sm text-gray-600">Brocciu, tomme corse...</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="text-2xl flex-shrink-0">💰</div>
              <div>
                <p className="font-semibold text-primary">Prix préférentiels</p>
                <p className="text-sm text-gray-600">Selon votre profil client</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="text-2xl flex-shrink-0">🚚</div>
              <div>
                <p className="font-semibold text-primary">Livraison rapide</p>
                <p className="text-sm text-gray-600">Partout en France</p>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <Link
            href="/auth/signin"
            className="block w-full bg-gradient-to-r from-accent to-charcuterie text-ivory py-4 rounded-xl hover:from-charcuterie hover:to-accent transition-all duration-300 font-bold text-center text-lg shadow-lg transform hover:scale-105"
          >
            🛒 Accéder à ma boutique
          </Link>

          <Link
            href="/auth/signin"
            className="block w-full bg-primary text-ivory py-3 rounded-lg hover:bg-primary-light transition-colors duration-200 font-semibold text-center"
          >
            🔑 Me connecter plus tard
          </Link>
        </div>

        <div className="mt-6 text-center pt-6 border-t border-gray-200">
          <p className="text-gray-600 mb-2">
            Des questions ? Contactez-nous :
          </p>
          <p className="text-primary font-semibold">
            📞 06 04 11 05 50 | ✉️ contact@boutique-felicita.fr
          </p>
        </div>

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
