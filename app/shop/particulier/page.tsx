import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import ProductCard from "@/components/ProductCard";

export default async function ParticulierShopPage() {
  const session = await getServerSession(authOptions);

  // Vérifier l'authentification
  if (!session?.user) {
    redirect("/auth/signin");
  }

  // Vérifier que l'utilisateur est bien un particulier
  if (session.user.role !== "PARTICULIER") {
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
          Boutique Particuliers
        </h1>
        <p className="text-gray-600 text-lg">
          Découvrez notre sélection de charcuterie et fromage artisanaux
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            userRole="PARTICULIER"
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
