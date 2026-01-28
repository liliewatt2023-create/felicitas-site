import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { signOut } from "next-auth/react";
import Link from "next/link";

export default async function AccountPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect("/auth/signin");
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    include: {
      orders: {
        orderBy: { createdAt: "desc" },
        take: 10,
        include: {
          items: {
            include: {
              product: true,
            },
          },
        },
      },
    },
  });

  if (!user) {
    redirect("/auth/signin");
  }

  const getRoleName = (role: string) => {
    switch (role) {
      case "PARTICULIER":
        return "Client Particulier";
      case "RESTAURATEUR":
        return "Client Restaurateur";
      case "COMITE":
        return "Comité d'Entreprise";
      default:
        return role;
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-primary mb-8">Mon compte</h1>

        {/* User Info */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-primary mb-6">
            Informations personnelles
          </h2>

          <div className="space-y-4">
            {user.firstName && user.lastName && (
              <div className="flex justify-between items-center py-3 border-b">
                <span className="text-gray-600">Nom complet</span>
                <span className="font-semibold">{user.firstName} {user.lastName}</span>
              </div>
            )}

            <div className="flex justify-between items-center py-3 border-b">
              <span className="text-gray-600">Email</span>
              <span className="font-semibold">{user.email}</span>
            </div>

            {user.phone && (
              <div className="flex justify-between items-center py-3 border-b">
                <span className="text-gray-600">Téléphone</span>
                <span className="font-semibold">{user.phone}</span>
              </div>
            )}

            <div className="flex justify-between items-center py-3 border-b">
              <span className="text-gray-600">Type de compte</span>
              <span className="font-semibold">{getRoleName(user.role)}</span>
            </div>

            {user.role === "COMITE" && user.committeeCodeUsed && (
              <div className="flex justify-between items-center py-3 border-b">
                <span className="text-gray-600">Code comité utilisé</span>
                <span className="font-semibold text-green-600">
                  {user.committeeCodeUsed}
                </span>
              </div>
            )}

            <div className="flex justify-between items-center py-3">
              <span className="text-gray-600">Membre depuis</span>
              <span className="font-semibold">
                {new Date(user.createdAt).toLocaleDateString("fr-FR")}
              </span>
            </div>
          </div>
        </div>

        {/* Orders */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-primary mb-6">
            Mes commandes
          </h2>

          {user.orders.length === 0 ? (
            <div className="text-center py-8 text-gray-600">
              <p className="mb-4">Aucune commande pour le moment</p>
              <Link
                href={`/shop/${user.role.toLowerCase()}`}
                className="inline-block bg-primary text-ivory px-6 py-3 rounded-lg hover:bg-primary-light transition-colors font-semibold"
              >
                Commencer mes achats
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {user.orders.map((order) => (
                <div
                  key={order.id}
                  className="border border-gray-200 rounded-lg p-4"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <p className="text-sm text-gray-600">
                        Commande du{" "}
                        {new Date(order.createdAt).toLocaleDateString("fr-FR")}
                      </p>
                      <p className="text-xs text-gray-500">ID: {order.id}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-accent">
                        {order.total.toFixed(2)}€
                      </p>
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                          order.status === "completed"
                            ? "bg-green-100 text-green-800"
                            : order.status === "pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {order.status === "completed"
                          ? "Complétée"
                          : order.status === "pending"
                          ? "En attente"
                          : "Annulée"}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    {order.items.map((item) => (
                      <div
                        key={item.id}
                        className="flex justify-between text-sm"
                      >
                        <span className="text-gray-700">
                          {item.product.name} - {item.weight} kg × {item.quantity}
                        </span>
                        <span className="font-semibold">
                          {(item.pricePerKg * item.weight * item.quantity).toFixed(2)}€
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="text-center">
          <Link
            href="/"
            className="inline-block bg-primary text-ivory px-6 py-3 rounded-lg hover:bg-primary-light transition-colors font-semibold mr-4"
          >
            ← Retour à l'accueil
          </Link>
        </div>
      </div>
    </div>
  );
}
