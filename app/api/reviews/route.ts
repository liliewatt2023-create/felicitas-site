import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { sendReviewModerationEmail } from "@/lib/resend";
import { randomBytes } from "crypto";

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json({ error: "Non authentifié" }, { status: 401 });
    }

    const { productId, rating, comment } = await request.json();

    // Validation
    if (!productId || !rating || !comment) {
      return NextResponse.json(
        { error: "Tous les champs sont requis" },
        { status: 400 }
      );
    }

    if (rating < 1 || rating > 5) {
      return NextResponse.json(
        { error: "La note doit être entre 1 et 5" },
        { status: 400 }
      );
    }

    // Vérifier que le produit existe
    const product = await prisma.product.findUnique({
      where: { id: productId },
    });

    if (!product) {
      return NextResponse.json(
        { error: "Produit non trouvé" },
        { status: 404 }
      );
    }

    // Générer un token unique pour la modération
    const token = randomBytes(32).toString("hex");

    // Créer l'avis avec le statut PENDING
    const review = await prisma.review.create({
      data: {
        userId: session.user.id,
        productId,
        rating,
        comment,
        token,
      },
    });

    // Envoyer l'email de modération
    try {
      await sendReviewModerationEmail(
        review.id,
        product.name,
        rating,
        comment,
        token
      );
    } catch (emailError) {
      console.error("Erreur lors de l'envoi de l'email:", emailError);
      // On continue même si l'email échoue
    }

    return NextResponse.json(
      {
        message:
          "Votre avis a été soumis et sera publié après modération. Merci !",
        review: {
          id: review.id,
          rating: review.rating,
          comment: review.comment,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Erreur lors de la création de l'avis:", error);
    return NextResponse.json(
      { error: "Erreur serveur lors de la soumission de l'avis" },
      { status: 500 }
    );
  }
}
