import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import Stripe from "stripe";
import { calculateItemTotal } from "@/lib/pricing";
import { getStripe } from "@/lib/stripe";

export async function POST(request: NextRequest) {
  try {
    const stripe = getStripe(); // Initialisation lazy
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json({ error: "Non authentifié" }, { status: 401 });
    }

    const { items } = await request.json();

    if (!items || items.length === 0) {
      return NextResponse.json({ error: "Panier vide" }, { status: 400 });
    }

    // Calculer le total et créer les line items pour Stripe
    let total = 0;
    const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = [];

    for (const item of items) {
      const product = await prisma.product.findUnique({
        where: { id: item.productId },
      });

      if (!product) {
        return NextResponse.json(
          { error: `Produit ${item.productId} non trouvé` },
          { status: 404 }
        );
      }

      const itemTotal = calculateItemTotal(
        product.category as any,
        session.user.role as any,
        item.weight,
        item.quantity
      );

      total += itemTotal;

      lineItems.push({
        price_data: {
          currency: "eur",
          product_data: {
            name: `${product.name} (${item.weight} kg)`,
            description: product.description,
          },
          unit_amount: Math.round((itemTotal / item.quantity) * 100), // En centimes
        },
        quantity: item.quantity,
      });
    }

    // Créer une commande en attente
    const order = await prisma.order.create({
      data: {
        userId: session.user.id,
        total,
        status: "pending",
        items: {
          create: items.map((item: any) => ({
            productId: item.productId,
            weight: item.weight,
            quantity: item.quantity,
            pricePerKg: item.pricePerKg,
          })),
        },
      },
    });

    // Créer une session Stripe Checkout
    const checkoutSession = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `${process.env.NEXTAUTH_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXTAUTH_URL}/cancel`,
      customer_email: session.user.email,
      // Collecte de l'adresse de livraison
      shipping_address_collection: {
        allowed_countries: ["FR", "MC", "BE", "CH", "LU"], // France, Monaco, Belgique, Suisse, Luxembourg
      },
      // Demander le nom et prénom pour la livraison
      phone_number_collection: {
        enabled: true,
      },
      metadata: {
        orderId: order.id,
      },
    });

    // Mettre à jour la commande avec la session Stripe
    await prisma.order.update({
      where: { id: order.id },
      data: { stripeSession: checkoutSession.id },
    });

    return NextResponse.json({ url: checkoutSession.url }, { status: 200 });
  } catch (error) {
    console.error("Erreur lors de la création de la session Stripe:", error);
    return NextResponse.json(
      { error: "Erreur serveur lors de la création de la session de paiement" },
      { status: 500 }
    );
  }
}
