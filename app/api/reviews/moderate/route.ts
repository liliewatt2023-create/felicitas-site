import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { ReviewStatus } from "@/lib/constants";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const token = searchParams.get("token");
    const action = searchParams.get("action");

    if (!token || !action) {
      return NextResponse.json(
        { error: "Paramètres manquants" },
        { status: 400 }
      );
    }

    if (action !== "approve" && action !== "reject") {
      return NextResponse.json({ error: "Action invalide" }, { status: 400 });
    }

    // Trouver l'avis par token
    const review = await prisma.review.findUnique({
      where: { token },
      include: { product: true },
    });

    if (!review) {
      return NextResponse.json({ error: "Avis non trouvé" }, { status: 404 });
    }

    // Mettre à jour le statut
    const newStatus =
      action === "approve" ? ReviewStatus.APPROVED : ReviewStatus.REJECTED;

    await prisma.review.update({
      where: { id: review.id },
      data: { status: newStatus },
    });

    const message =
      action === "approve"
        ? `L'avis pour "${review.product.name}" a été approuvé et publié.`
        : `L'avis pour "${review.product.name}" a été refusé.`;

    // Retourner une page HTML simple avec le résultat
    return new NextResponse(
      `
      <!DOCTYPE html>
      <html lang="fr">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Modération d'avis</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
            background: #f5f5f5;
          }
          .card {
            background: white;
            padding: 40px;
            border-radius: 10px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            text-align: center;
            max-width: 500px;
          }
          .success { color: #2d5a2d; }
          .icon { font-size: 48px; margin-bottom: 20px; }
        </style>
      </head>
      <body>
        <div class="card">
          <div class="icon">${action === "approve" ? "✅" : "❌"}</div>
          <h1 class="success">${message}</h1>
          <p>Cette fenêtre peut être fermée.</p>
        </div>
      </body>
      </html>
      `,
      {
        status: 200,
        headers: {
          "Content-Type": "text/html",
        },
      }
    );
  } catch (error) {
    console.error("Erreur lors de la modération:", error);
    return NextResponse.json(
      { error: "Erreur serveur lors de la modération" },
      { status: 500 }
    );
  }
}
