"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface AddToCartFormProps {
  productId: string;
  productName: string;
  pricePerKg: number;
}

export default function AddToCartForm({
  productId,
  productName,
  pricePerKg,
}: AddToCartFormProps) {
  const router = useRouter();
  const [weight, setWeight] = useState(0.5);
  const [quantity, setQuantity] = useState(1);

  const total = pricePerKg * weight * quantity;

  const handleAddToCart = () => {
    // Récupérer le panier existant
    const cartJson = localStorage.getItem("cart");
    const cart = cartJson ? JSON.parse(cartJson) : [];

    // Vérifier si le produit existe déjà avec le même poids
    const existingItemIndex = cart.findIndex(
      (item: any) => item.productId === productId && item.weight === weight
    );

    if (existingItemIndex > -1) {
      // Augmenter la quantité
      cart[existingItemIndex].quantity += quantity;
    } else {
      // Ajouter un nouvel item
      cart.push({
        productId,
        productName,
        weight,
        quantity,
        pricePerKg,
      });
    }

    // Sauvegarder dans localStorage
    localStorage.setItem("cart", JSON.stringify(cart));

    // Rediriger vers le panier
    router.push("/cart");
  };

  return (
    <div className="bg-white border-2 border-primary rounded-xl p-6">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Poids (kg)
          </label>
          <select
            value={weight}
            onChange={(e) => setWeight(parseFloat(e.target.value))}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            <option value={0.25}>250g (0,25 kg)</option>
            <option value={0.5}>500g (0,5 kg)</option>
            <option value={0.75}>750g (0,75 kg)</option>
            <option value={1}>1 kg</option>
            <option value={1.5}>1,5 kg</option>
            <option value={2}>2 kg</option>
            <option value={2.5}>2,5 kg</option>
            <option value={3}>3 kg</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Quantité
          </label>
          <input
            type="number"
            min="1"
            max="10"
            value={quantity}
            onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>

        <div className="border-t pt-4">
          <div className="flex justify-between items-center mb-4">
            <span className="text-lg font-semibold text-gray-700">Total:</span>
            <span className="text-3xl font-bold text-accent">
              {total.toFixed(2)}€
            </span>
          </div>

          <button
            onClick={handleAddToCart}
            className="w-full bg-primary text-ivory py-3 rounded-lg hover:bg-primary-light transition-colors duration-200 font-semibold text-lg"
          >
            🛒 Ajouter au panier
          </button>
        </div>
      </div>
    </div>
  );
}
