import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    console.log("🌱 Seeding database...");

    // Création des produits de charcuterie
    const products = [
      {
        name: "Cuchutelu",
        slug: "cuchutelu",
        description: "Noix de jambon d'exception",
        details: "Affinage 100 jours. Une pièce artisanale d'une finesse remarquable.",
        category: "CHARCUTERIE",
      },
      {
        name: "Unzo",
        slug: "unzo",
        description: "Jambon corse authentique",
        details:
          "Affinage 12 mois, fumage bois de châtaigne 15 jours, conservation 6 mois. Un produit d'exception aux arômes incomparables.",
        category: "CHARCUTERIE",
      },
      {
        name: "Copa",
        slug: "copa",
        description: "Coppa corse traditionnelle",
        details:
          "Affinage 12 mois, fumage bois de châtaignier 15 jours, conservation 6 mois. Délicatement persillée et parfumée.",
        category: "CHARCUTERIE",
      },
      {
        name: "Figatelli IGP",
        slug: "figatelli-igp",
        description: "Saucisse de foie corse IGP",
        details:
          "Label IGP, fabriqué selon la tradition corse. Idéal grillé ou poêlé.",
        category: "CHARCUTERIE",
      },
      {
        name: "Saucisson Sanglier & Cochon",
        slug: "saucisson-sanglier-cochon",
        description: "Mélange unique de sanglier et cochon corse",
        details:
          "Un goût puissant et sauvage, mélange parfait entre tradition et caractère.",
        category: "CHARCUTERIE",
      },
      {
        name: "Saucisson Nature",
        slug: "saucisson-nature",
        description: "Saucisson sec artisanal",
        details:
          "Saucisson nature traditionnel, affiné lentement pour révéler tous ses arômes.",
        category: "CHARCUTERIE",
      },
      {
        name: "Fromage Artisanal Corse",
        slug: "fromage-artisanal",
        description: "Fromage au lait de brebis",
        details:
          "Fromage fermier au lait cru de brebis corse. Fabriqué selon les méthodes ancestrales.",
        category: "FROMAGE",
      },
      {
        name: "Brocciu Fermier",
        slug: "brocciu-fermier",
        description: "Fromage frais corse AOP",
        details:
          "Le célèbre Brocciu corse AOP, fromage frais onctueux et délicat. Parfait en cuisine ou nature.",
        category: "FROMAGE",
      },
    ];

    const created = [];
    for (const product of products) {
      const result = await prisma.product.upsert({
        where: { slug: product.slug },
        update: {},
        create: product,
      });
      created.push(result.name);
    }

    console.log("✅ Products seeded successfully!");

    return NextResponse.json({
      success: true,
      message: "Base de données peuplée avec succès",
      products: created,
    });
  } catch (error) {
    console.error("❌ Error seeding database:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Erreur lors du peuplement de la base de données",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
