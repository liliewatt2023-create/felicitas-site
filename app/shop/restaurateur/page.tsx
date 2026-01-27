import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { UserRole } from "@/lib/constants";
import ProductCard from "@/components/ProductCard";

export default async function RestaurateurShopPage() {
  const session = await getServerSession(authOptions);

  // Vérifier l'authentification
  if (!session?.user) {
    redirect("/auth/signin");
  }

  // Vérifier que l'utilisateur est bien un restaurateur
  if (session.user.role !== UserRole.RESTAURATEUR) {
    redirect(`/shop/${session.user.role.toLowerCase()}`);
  }

  // Récupérer tous les produits
  const products = await prisma.product.findMany({
    orderBy: { name: "asc" },
  });

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-primary mb-4">
          Boutique Professionnelle - Restaurateurs
        </h1>
        <p className="text-gray-600 text-lg">
          Tarifs professionnels pour sublimer vos cartes
        </p>
        <div className="mt-4 bg-accent-light text-primary px-6 py-3 rounded-lg inline-block">
          <span className="font-semibold">Tarif unique : 79€/kg</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            userRole={UserRole.RESTAURATEUR}
          />
        ))}
      </div>

      {products.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-600 text-lg">
            Aucun produit disponible pour le moment
          </p>
        </div>
      )}
    </div>
  );
}
