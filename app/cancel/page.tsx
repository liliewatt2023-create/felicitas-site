"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";

export default function CancelPage() {
  const { data: session } = useSession();

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-12 text-center">
        <div className="text-8xl mb-6">❌</div>

        <h1 className="text-4xl font-bold text-primary mb-4">
          Commande annulée
        </h1>

        <p className="text-xl text-gray-600 mb-8">
          Votre commande a été annulée. Aucun paiement n'a été effectué.
        </p>

        <div className="bg-ivory p-6 rounded-lg mb-8">
          <p className="text-gray-700">
            Si vous avez rencontré un problème lors du paiement ou si vous avez
            des questions, n'hésitez pas à nous contacter.
          </p>
        </div>

        <div className="space-y-4">
          <Link
            href="/cart"
            className="inline-block bg-primary text-ivory px-8 py-3 rounded-lg hover:bg-primary-light transition-colors font-semibold text-lg"
          >
            Retour au panier
          </Link>

          <div>
            <Link
              href={session ? `/shop/${session.user.role.toLowerCase()}` : "/"}
              className="text-primary hover:text-accent transition-colors font-semibold"
            >
              ← Continuer mes achats
            </Link>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t">
          <p className="text-gray-600">
            Besoin d'aide ? Contactez-nous au{" "}
            <a
              href="tel:0604110550"
              className="text-accent font-bold hover:underline"
            >
              06 04 11 05 50
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
