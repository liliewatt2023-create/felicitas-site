import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect, notFound } from "next/navigation";
import Image from "next/image";
import { prisma } from "@/lib/prisma";
import { getPricePerKg } from "@/lib/pricing";
import AddToCartForm from "@/components/AddToCartForm";
import ReviewForm from "@/components/ReviewForm";
import ReviewList from "@/components/ReviewList";

interface ProductPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect("/auth/signin");
  }

  const { slug } = await params;

  const product = await prisma.product.findUnique({
    where: { slug },
    include: {
      reviews: {
        where: { status: "APPROVED" },
        include: {
          user: {
            select: { email: true },
          },
        },
        orderBy: { createdAt: "desc" },
      },
    },
  });

  if (!product) {
    notFound();
  }

  const pricePerKg = getPricePerKg(product.category as any, session.user.role as any);

  // Calculer la moyenne des notes
  const averageRating =
    product.reviews.length > 0
      ? product.reviews.reduce((acc, review) => acc + review.rating, 0) /
        product.reviews.length
      : 0;

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image section */}
          <div className="relative bg-gradient-to-br from-primary to-primary-light rounded-xl overflow-hidden aspect-square">
            {product.image ? (
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            ) : (
              <div className="flex items-center justify-center h-full">
                <span className="text-9xl">
                  {product.category === "CHARCUTERIE" ? "🥓" : "🧀"}
                </span>
              </div>
            )}
          </div>

          {/* Product info */}
          <div>
            <div className="mb-4">
              <span
                className={`inline-block px-4 py-2 rounded-full text-sm font-semibold ${
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

            <h1 className="text-4xl font-bold text-primary mb-4">
              {product.name}
            </h1>

            <div className="flex items-center mb-6">
              {averageRating > 0 ? (
                <>
                  <div className="flex text-2xl mr-2">
                    {"⭐".repeat(Math.round(averageRating))}
                  </div>
                  <span className="text-gray-600">
                    ({product.reviews.length} avis)
                  </span>
                </>
              ) : (
                <span className="text-gray-600">Aucun avis pour le moment</span>
              )}
            </div>

            <p className="text-xl text-gray-700 mb-6">{product.description}</p>

            {product.details && (
              <div className="bg-ivory p-6 rounded-lg mb-6 border-2 border-wood">
                <h3 className="font-bold text-primary mb-2">Détails</h3>
                <p className="text-charcoal">{product.details}</p>
              </div>
            )}

            <div className="mb-8">
              <span className="text-4xl font-bold text-charcuterie">
                {pricePerKg}€
              </span>
              <span className="text-xl text-charcoal ml-2">/kg</span>
            </div>

            <AddToCartForm
              productId={product.id}
              productName={product.name}
              pricePerKg={pricePerKg}
            />
          </div>
        </div>

        {/* Reviews section */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-primary mb-8">
            Avis clients
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold text-primary mb-4">
                Laisser un avis
              </h3>
              <ReviewForm productId={product.id} />
            </div>

            <div>
              <h3 className="text-xl font-bold text-primary mb-4">
                Avis publiés ({product.reviews.length})
              </h3>
              <ReviewList reviews={product.reviews} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
