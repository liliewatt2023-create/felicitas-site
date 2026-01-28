import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import ProductCard from "@/components/ProductCard";

export default async function ComiteShopPage() {
  const session = await getServerSession(authOptions);

  // Vérifier l'authentification
  if (!session?.user) {
    redirect("/auth/signin");
  }

  // Vérifier que l'utilisateur est bien un comité
  if (session.user.role !== "COMITE") {
    redirect(`/shop/${session.user.role.toLowerCase()}`);
  }

  // Vérifier que le code comité a été validé
  if (!session.user.committeeCodeUsed) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto bg-ivory rounded-xl shadow-lg p-8 text-center border-2 border-charcuterie">
          <div className="text-6xl mb-6">🔒</div>
          <h1 className="text-3xl font-bold text-primary mb-4">
            Accès Comité d'Entreprise
          </h1>
          <p className="text-charcoal mb-6">
            Votre code comité n'a pas été validé. Veuillez contacter
            l'administrateur ou créer un nouveau compte avec un code valide.
          </p>
          <a
            href="tel:0604110550"
            className="inline-block bg-accent text-ivory px-6 py-3 rounded-lg font-semibold hover:bg-accent-light transition-colors"
          >
            📞 Nous contacter : 06 04 11 05 50
          </a>
        </div>
      </div>
    );
  }

  // Récupérer tous les produits
  const products = await prisma.product.findMany({
    orderBy: { name: "asc" },
  });

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-primary mb-4">
          Boutique Comités d'Entreprise
        </h1>
        <p className="text-charcoal text-lg">
          Tarifs préférentiels pour vos collaborateurs
        </p>
        <div className="mt-4 bg-accent text-ivory px-6 py-3 rounded-lg inline-block shadow-md">
          <span className="font-semibold">
            Charcuterie : 69€/kg • Fromage : 49€/kg
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            userRole="COMITE"
          />
        ))}
      </div>

      {products.length === 0 && (
        <div className="text-center py-12">
          <p className="text-charcoal text-lg">
            Aucun produit disponible pour le moment
          </p>
        </div>
      )}
    </div>
  );
}
