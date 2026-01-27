import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const token = searchParams.get("token");

    if (!token) {
      return NextResponse.json(
        { error: "Token manquant" },
        { status: 400 }
      );
    }

    // Trouver l'utilisateur avec ce token
    const user = await prisma.user.findUnique({
      where: { verificationToken: token },
    });

    if (!user) {
      return NextResponse.json(
        { error: "Token invalide ou expiré" },
        { status: 404 }
      );
    }

    // Si déjà vérifié, rediriger
    if (user.emailVerified) {
      return NextResponse.redirect(
        new URL("/auth/signin?already_verified=true", request.url)
      );
    }

    // Marquer l'email comme vérifié
    await prisma.user.update({
      where: { id: user.id },
      data: {
        emailVerified: true,
        verificationToken: null, // Supprimer le token après utilisation
      },
    });

    // Rediriger vers la page de succès
    return NextResponse.redirect(
      new URL("/auth/verified", request.url)
    );
  } catch (error) {
    console.error("Erreur lors de la vérification de l'email:", error);
    return NextResponse.json(
      { error: "Erreur serveur lors de la vérification" },
      { status: 500 }
    );
  }
}
