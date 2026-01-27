"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface CartItem {
  productId: string;
  productName: string;
  weight: number;
  quantity: number;
  pricePerKg: number;
}

export default function CartPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [cart, setCart] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/signin");
      return;
    }

    // Charger le panier depuis localStorage
    const cartJson = localStorage.getItem("cart");
    if (cartJson) {
      setCart(JSON.parse(cartJson));
    }
  }, [status, router]);

  const removeItem = (index: number) => {
    const newCart = cart.filter((_, i) => i !== index);
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  };

  const updateQuantity = (index: number, newQuantity: number) => {
    if (newQuantity < 1) return;

    const newCart = [...cart];
    newCart[index].quantity = newQuantity;
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  };

  const calculateTotal = () => {
    return cart.reduce(
      (total, item) => total + item.pricePerKg * item.weight * item.quantity,
      0
    );
  };

  const handleCheckout = async () => {
    setLoading(true);

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items: cart }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "Erreur lors de la création de la session");
        setLoading(false);
        return;
      }

      // Rediriger vers Stripe Checkout
      if (data.url) {
        window.location.href = data.url;
      }
    } catch (error) {
      alert("Erreur serveur");
      setLoading(false);
    }
  };

  if (status === "loading") {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        Chargement...
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-primary mb-8">Votre panier</h1>

      {cart.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-xl shadow-lg">
          <div className="text-6xl mb-4">🛒</div>
          <p className="text-xl text-gray-600 mb-6">Votre panier est vide</p>
          <Link
            href={session ? `/shop/${session.user.role.toLowerCase()}` : "/"}
            className="inline-block bg-primary text-ivory px-6 py-3 rounded-lg hover:bg-primary-light transition-colors font-semibold"
          >
            Continuer mes achats
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart items */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-lg p-6 flex items-center justify-between"
              >
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-primary mb-2">
                    {item.productName}
                  </h3>
                  <p className="text-gray-600 mb-2">
                    {item.weight} kg × {item.pricePerKg}€/kg
                  </p>

                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() =>
                          updateQuantity(index, item.quantity - 1)
                        }
                        className="bg-gray-200 px-3 py-1 rounded hover:bg-gray-300"
                      >
                        -
                      </button>
                      <span className="font-semibold">{item.quantity}</span>
                      <button
                        onClick={() =>
                          updateQuantity(index, item.quantity + 1)
                        }
                        className="bg-gray-200 px-3 py-1 rounded hover:bg-gray-300"
                      >
                        +
                      </button>
                    </div>

                    <button
                      onClick={() => removeItem(index)}
                      className="text-red-600 hover:text-red-800 font-semibold"
                    >
                      Supprimer
                    </button>
                  </div>
                </div>

                <div className="text-right ml-4">
                  <p className="text-2xl font-bold text-accent">
                    {(item.pricePerKg * item.weight * item.quantity).toFixed(
                      2
                    )}
                    €
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-4">
              <h2 className="text-2xl font-bold text-primary mb-6">Résumé</h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Sous-total</span>
                  <span className="font-semibold">
                    {calculateTotal().toFixed(2)}€
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-600">Livraison</span>
                  <span className="font-semibold">Calculée à la caisse</span>
                </div>

                <div className="border-t pt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-xl font-bold">Total</span>
                    <span className="text-3xl font-bold text-accent">
                      {calculateTotal().toFixed(2)}€
                    </span>
                  </div>
                </div>
              </div>

              <button
                onClick={handleCheckout}
                disabled={loading}
                className="w-full bg-primary text-ivory py-4 rounded-lg hover:bg-primary-light transition-colors duration-200 font-semibold text-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Traitement..." : "Passer la commande"}
              </button>

              <Link
                href={
                  session ? `/shop/${session.user.role.toLowerCase()}` : "/"
                }
                className="block text-center mt-4 text-primary hover:text-accent transition-colors"
              >
                ← Continuer mes achats
              </Link>

              <div className="mt-6 text-center">
                <p className="text-xs text-gray-500">
                  🔒 Paiement sécurisé par Stripe
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
