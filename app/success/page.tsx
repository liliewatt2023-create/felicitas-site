"use client";

import { useEffect, Suspense } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";

function SuccessPageContent() {
  const { data: session } = useSession();
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");

  useEffect(() => {
    // Vider le panier après succès
    localStorage.removeItem("cart");

    // Enregistrer l'adresse de livraison
    if (sessionId) {
      fetch("/api/update-shipping", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ sessionId }),
      }).catch((error) => {
        console.error("Erreur lors de l'enregistrement de l'adresse:", error);
      });
    }
  }, [sessionId]);

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-12 text-center">
        <div className="text-8xl mb-6">✅</div>

        <h1 className="text-4xl font-bold text-primary mb-4">
          Commande confirmée !
        </h1>

        <p className="text-xl text-gray-600 mb-8">
          Merci pour votre commande ! Vous allez recevoir un email de
          confirmation.
        </p>

        <div className="bg-ivory p-6 rounded-lg mb-8">
          <h2 className="text-xl font-bold text-primary mb-4">
            Et maintenant ?
          </h2>
          <ul className="text-left space-y-2 text-gray-700">
            <li>✓ Votre paiement a été traité avec succès</li>
            <li>✓ Vous recevrez un email de confirmation</li>
            <li>✓ Nous préparons votre commande avec soin</li>
            <li>✓ Vous serez informé de l'expédition</li>
          </ul>
        </div>

        <div className="space-y-4">
          <Link
            href={session ? `/shop/${session.user.role.toLowerCase()}` : "/"}
            className="inline-block bg-primary text-ivory px-8 py-3 rounded-lg hover:bg-primary-light transition-colors font-semibold text-lg"
          >
            Continuer mes achats
          </Link>

          <div>
            <Link
              href="/account"
              className="text-primary hover:text-accent transition-colors font-semibold"
            >
              Voir mes commandes →
            </Link>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t">
          <p className="text-gray-600">
            Une question ? Contactez-nous au{" "}
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

export default function SuccessPage() {
  return (
    <Suspense fallback={<div className="container mx-auto px-4 py-12"><div className="text-center text-xl text-primary">Chargement...</div></div>}>
      <SuccessPageContent />
    </Suspense>
  );
}
