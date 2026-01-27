"use client";

import Link from "next/link";
import Image from "next/image";
import { Product } from "@prisma/client";
import { getPricePerKg } from "@/lib/pricing";

interface ProductCardProps {
  product: Product;
  userRole: string;
}

export default function ProductCard({ product, userRole }: ProductCardProps) {
  const pricePerKg = getPricePerKg(product.category as any, userRole as any);

  return (
    <Link
      href={`/product/${product.slug}`}
      className="group bg-ivory rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border-2 border-transparent hover:border-accent product-card"
    >
      <div className="relative h-48 bg-gradient-to-br from-primary to-primary-light overflow-hidden">
        {product.image ? (
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="flex items-center justify-center h-full">
            <span className="text-6xl">
              {product.category === "CHARCUTERIE" ? "🥓" : "🧀"}
            </span>
          </div>
        )}
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold text-primary mb-2 group-hover:text-accent transition-colors">
          {product.name}
        </h3>

        <p className="text-charcoal text-sm mb-4 line-clamp-2">
          {product.description}
        </p>

        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-charcuterie">
            {pricePerKg}€<span className="text-sm text-charcoal">/kg</span>
          </span>

          <span className="text-primary group-hover:text-accent transition-colors font-semibold">
            Voir le produit →
          </span>
        </div>

        <div className="mt-4">
          <span
            className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
              product.category === "CHARCUTERIE"
                ? "bg-charcuterie text-ivory"
                : "bg-accent text-ivory"
            }`}
          >
            {product.category === "CHARCUTERIE"
              ? "Charcuterie"
              : "Fromage"}
          </span>
        </div>
      </div>
    </Link>
  );
}
