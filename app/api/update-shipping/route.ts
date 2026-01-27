import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getStripe } from "@/lib/stripe";

export async function POST(request: NextRequest) {
  try {
    const stripe = getStripe(); // Initialisation lazy
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json({ error: "Non authentifié" }, { status: 401 });
    }

    const { sessionId } = await request.json();

    if (!sessionId) {
      return NextResponse.json(
        { error: "Session ID manquant" },
        { status: 400 }
      );
    }

    // Récupérer la session Stripe avec customer_details
    const stripeSession = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ['customer_details'],
    });

    if (!stripeSession) {
      return NextResponse.json(
        { error: "Session Stripe introuvable" },
        { status: 404 }
      );
    }

    const orderId = stripeSession.metadata?.orderId;

    if (!orderId) {
      return NextResponse.json(
        { error: "ID de commande introuvable" },
        { status: 404 }
      );
    }

    // Utiliser customer_details pour les informations de shipping
    const customerDetails = stripeSession.customer_details;

    await prisma.order.update({
      where: { id: orderId },
      data: {
        status: "completed",
        shippingName: customerDetails?.name || null,
        shippingPhone: customerDetails?.phone || null,
        shippingLine1: customerDetails?.address?.line1 || null,
        shippingLine2: customerDetails?.address?.line2 || null,
        shippingCity: customerDetails?.address?.city || null,
        shippingPostalCode: customerDetails?.address?.postal_code || null,
        shippingCountry: customerDetails?.address?.country || null,
      },
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Erreur lors de la mise à jour de l'adresse:", error);
    return NextResponse.json(
      { error: "Erreur serveur" },
      { status: 500 }
    );
  }
}
