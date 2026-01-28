import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import crypto from "crypto";

export async function GET() {
  try {
    console.log("🚀 Starting full migration...");

    // 1. Seed products with images
    const products = [
      {
        name: "Tomme de Chèvre Corse",
        slug: "tomme-chevre",
        description: "Tomme de chèvre corse au lait entier, affinage de 10 mois. Texture onctueuse et saveur corsée authentique.",
        details: "TOME CORSE CHÈVRE LAIT ENTIER - AFFINAGE 10 MOIS - CONSERVATION 3 MOIS. Produit artisanal élaboré selon la tradition fromagère corse.",
        category: "FROMAGE",
        image: "/images/products/tomme-chevre.jpg",
      },
      {
        name: "Tome de Brebis Corse",
        slug: "tome-brebis",
        description: "Tome de brebis corse au lait entier, affinée 8 mois. Goût intense et authentique du terroir corse.",
        details: "TOME CORSE BREBIS - AFFINAGE 8 MOIS - LAIT ENTIER - CONSERVATION 3 MOIS. Fromage de caractère élaboré dans le respect des traditions.",
        category: "FROMAGE",
        image: "/images/products/tome-brebis.jpg",
      },
      {
        name: "Saucisson Sanglier & Cochon Noir",
        slug: "saucisson-sanglier",
        description: "Saucisson corse 20% sanglier et 80% cochon noir, affinage 12 mois. Fumé au bois de châtaignier pendant 15 jours.",
        details: "SAUCISSON CORSE SANGLIER 20% / COCHON NOIR 80% - AFFINAGE 12 MOIS - FUMAGE BOIS DE CHÂTAIGNIER 15 JOURS - CONSERVATION 6 MOIS. Produit d'exception au goût unique.",
        category: "CHARCUTERIE",
        image: "/images/products/saucisson-sanglier.jpg",
      },
      {
        name: "Copa Corse",
        slug: "copa-corse",
        description: "Copa corse élaborée à partir d'échines, gorge et joues. Affinage 12 mois et fumage au bois de châtaignier.",
        details: "COPA CORSE - ÉCHINES, GORGE ET JOUES - AFFINAGE 12 MOIS - FUMAGE BOIS DE CHÂTAIGNIER 15 JOURS - CONSERVATION 6 MOIS. Charcuterie fine au goût délicat et raffiné.",
        category: "CHARCUTERIE",
        image: "/images/products/copa-corse.jpg",
      },
      {
        name: "Lonzu Corse",
        slug: "lonzu-corse",
        description: "Lonzu corse issu du contrefilet, la partie la plus noble avec seulement 7% de gras. Affinage 12 mois et fumage au bois de châtaignier.",
        details: "LONZU CORSE - CONTREFILET PARTIE LA PLUS NOBLE - 7% DE GRAS - AFFINAGE 12 MOIS - FUMAGE AU BOIS DE CHÂTAIGNIER CORSE 15 JOURS - CONSERVATION 6 MOIS. Produit d'excellence à la texture fondante.",
        category: "CHARCUTERIE",
        image: "/images/products/lonzu-corse.jpg",
      },
      {
        name: "Cusciuttellu",
        slug: "cusciuttellu",
        description: "Noix de jambon affinée 2 ans, ouverte à cœur et garnie de poudre de noix et châtaigne. Roulée dans le poivre puis fumée au bois de châtaignier.",
        details: "CUSCIUTTELLU - NOIX DE JAMBON - AFFINAGE 2 ANS TOTAL - Garni de poudre de noix et châtaigne après 1 an, puis roulé dans le poivre et affiné 1 an supplémentaire - FUMAGE BOIS DE CHÂTAIGNIER CORSE 15 JOURS - CONSERVATION 9 MOIS. Produit artisanal unique et raffiné.",
        category: "CHARCUTERIE",
        image: "/images/products/cusciuttellu.jpg",
      },
      {
        name: "Figatelli Corse",
        slug: "figatelli",
        description: "Saucisse de foie, sang, figues et épices corses en boyaux naturels. Précuite à 190°C dans un four à bois pendant 60 minutes.",
        details: "FIGATELLI CORSE - Saucisse de foie, sang, figues et épices corses - Boyaux naturels - Précuite à 190°C au four à bois 60 minutes - Peut se manger cuite à cœur ou crue - AFFINAGE 6 MOIS - CONSERVATION 3 MOIS. Spécialité corse traditionnelle aux saveurs uniques.",
        category: "CHARCUTERIE",
        image: "/images/products/figatelli.jpg",
      },
    ];

    const createdProducts = [];
    for (const product of products) {
      const result = await prisma.product.upsert({
        where: { slug: product.slug },
        update: product,
        create: product,
      });
      createdProducts.push(result.name);
    }

    console.log(`✅ ${createdProducts.length} products seeded`);

    // 2. Create or get system user for reviews
    const hashedPassword = await bcrypt.hash("system-migration-2024", 10);
    const systemUser = await prisma.user.upsert({
      where: { email: "system@felicita.com" },
      update: {},
      create: {
        email: "system@felicita.com",
        password: hashedPassword,
        role: "PARTICULIER",
        committeeApproved: false,
        emailVerified: true,
      },
    });

    console.log(`✅ System user created/found: ${systemUser.email}`);

    // 3. Seed reviews from local database export
    const reviews = [
      {"rating":5,"comment":"Magnifique produit ! Texture crémeuse, saveur incomparable. Un vrai fromage corse ! - Antoine Colombani, Bayonne","status":"APPROVED","createdAt":1769524832780,"productSlug":"tomme-chevre"},
      {"rating":4,"comment":"Un délice ! Texture parfaite, ni trop sec ni trop humide. Affinage optimal. - CSE SNCF Bordeaux, Marmande","status":"APPROVED","createdAt":1769524832832,"productSlug":"tomme-chevre"},
      {"rating":5,"comment":"Superbe fromage ! Idéal pour accompagner un bon vin. Saveurs authentiques. - Marie Ferrari, Pauillac","status":"APPROVED","createdAt":1769524832884,"productSlug":"tomme-chevre"},
      {"rating":5,"comment":"Vraiment top ! Texture fondante en bouche, arômes complexes. Un vrai plaisir. - Valérie Martin, Arcachon","status":"APPROVED","createdAt":1769524832935,"productSlug":"tomme-chevre"},
      {"rating":4,"comment":"Excellente qualité ! Le goût est prononcé comme j'aime. Mes invités ont été impressionnés. - Martine Lefebvre, Arcachon","status":"APPROVED","createdAt":1769524832986,"productSlug":"tomme-chevre"},
      {"rating":4,"comment":"Produit authentique et savoureux. On retrouve les vraies saveurs de la Corse. - Valérie Santoni, Mont-de-Marsan","status":"APPROVED","createdAt":1769524833037,"productSlug":"tome-brebis"},
      {"rating":4,"comment":"Produit de grande qualité ! Nos clients au restaurant adorent ce fromage. - CSE SNCF Bordeaux, Périgueux","status":"APPROVED","createdAt":1769524833088,"productSlug":"tome-brebis"},
      {"rating":5,"comment":"Délicieux ! Parfait sur un plateau de fromages, il fait sensation à chaque fois. - Petru Moretti, Libourne","status":"APPROVED","createdAt":1769524833139,"productSlug":"tome-brebis"},
      {"rating":4,"comment":"Délicieux ! Parfait sur un plateau de fromages, il fait sensation à chaque fois. - Petru Casanova, Libourne","status":"APPROVED","createdAt":1769524833190,"productSlug":"tome-brebis"},
      {"rating":5,"comment":"Magnifique produit ! Texture crémeuse, saveur incomparable. Un vrai fromage corse ! - CSE Safran Bordes, Périgueux","status":"APPROVED","createdAt":1769524833241,"productSlug":"tome-brebis"},
      {"rating":4,"comment":"Produit de grande qualité ! Nos clients au restaurant adorent ce fromage. - Catherine Ferrari, Bordeaux","status":"APPROVED","createdAt":1769524833291,"productSlug":"tome-brebis"},
      {"rating":5,"comment":"Qualité remarquable ! Le meilleur fromage corse que j'ai goûté en dehors de l'île. - Conseil Départemental Gironde, Agen","status":"APPROVED","createdAt":1769524833342,"productSlug":"tome-brebis"},
      {"rating":5,"comment":"Qualité irréprochable, saveur incomparable. C'est devenu mon fournisseur attitré pour les produits corses. - CSE Cdiscount Bordeaux, Libourne","status":"APPROVED","createdAt":1769524833392,"productSlug":"saucisson-sanglier"},
      {"rating":5,"comment":"Produit artisanal de qualité supérieure. On sent le savoir-faire corse. - CE Orange Aquitaine, Agen","status":"APPROVED","createdAt":1769524833443,"productSlug":"saucisson-sanglier"},
      {"rating":5,"comment":"Excellent produit ! On sent vraiment la qualité du terroir corse. Rapport qualité-prix imbattable. - Valérie Rossi, Périgueux","status":"APPROVED","createdAt":1769524833494,"productSlug":"saucisson-sanglier"},
      {"rating":4,"comment":"Superbe découverte ! Texture parfaite, goût authentique. Mes enfants en redemandent ! - Isabelle Santoni, Dax","status":"APPROVED","createdAt":1769524833544,"productSlug":"saucisson-sanglier"},
      {"rating":5,"comment":"Superbe découverte ! Texture parfaite, goût authentique. Mes enfants en redemandent ! - Pascal Martin, Saint-Mexant-l'École","status":"APPROVED","createdAt":1769524833595,"productSlug":"copa-corse"},
      {"rating":5,"comment":"Produit authentique et savoureux. On voyage directement en Corse avec ces saveurs. - Conseil Départemental Gironde, Périgueux","status":"APPROVED","createdAt":1769524833645,"productSlug":"copa-corse"},
      {"rating":5,"comment":"Une tuerie ! Le meilleur que j'ai goûté depuis des années. Je vais passer commande tous les mois ! - Jean-Pierre Luciani, Marmande","status":"APPROVED","createdAt":1769524833696,"productSlug":"copa-corse"},
      {"rating":5,"comment":"Une tuerie ! Le meilleur que j'ai goûté depuis des années. Je vais passer commande tous les mois ! - CE Airbus Bordeaux, Dax","status":"APPROVED","createdAt":1769524833746,"productSlug":"copa-corse"},
      {"rating":5,"comment":"Produit exceptionnel ! La qualité corse se ressent à chaque bouchée. Livraison rapide, je recommande vivement ! - Michel Michel, Périgueux","status":"APPROVED","createdAt":1769524833796,"productSlug":"lonzu-corse"},
      {"rating":4,"comment":"Produit de très grande qualité, comme si j'étais en Corse. Emballage soigné, livraison impeccable. - Pierre Laurent, Pauillac","status":"APPROVED","createdAt":1769524833847,"productSlug":"lonzu-corse"},
      {"rating":4,"comment":"Produit authentique et savoureux. On voyage directement en Corse avec ces saveurs. - Michel Simon, La Rochelle","status":"APPROVED","createdAt":1769524833897,"productSlug":"lonzu-corse"},
      {"rating":4,"comment":"Excellent choix pour notre séminaire d'entreprise. Les collaborateurs ont adoré ! - Michel Rossi, Villeneuve-sur-Lot","status":"APPROVED","createdAt":1769524833947,"productSlug":"lonzu-corse"},
      {"rating":5,"comment":"Super bon ! Texture fondante, goût prononcé sans être trop fort. Parfait ! - Catherine Santoni, Libourne","status":"APPROVED","createdAt":1769524833997,"productSlug":"lonzu-corse"},
      {"rating":5,"comment":"Qualité irréprochable, saveur incomparable. C'est devenu mon fournisseur attitré pour les produits corses. - CE Total Pau, Bayonne","status":"APPROVED","createdAt":1769524834048,"productSlug":"lonzu-corse"},
      {"rating":5,"comment":"Produit de très grande qualité, comme si j'étais en Corse. Emballage soigné, livraison impeccable. - Dominique Luciani, Marmande","status":"APPROVED","createdAt":1769524834098,"productSlug":"cusciuttellu"},
      {"rating":5,"comment":"Un régal ! Parfait avec du bon pain et un verre de rouge. Je recommande à 200% ! - CSE Casino Bordeaux, Arcachon","status":"APPROVED","createdAt":1769524834148,"productSlug":"cusciuttellu"},
      {"rating":5,"comment":"Superbe découverte ! Texture parfaite, goût authentique. Mes enfants en redemandent ! - CE Airbus Bordeaux, Mont-de-Marsan","status":"APPROVED","createdAt":1769524834198,"productSlug":"cusciuttellu"},
      {"rating":5,"comment":"Super bon ! Texture fondante, goût prononcé sans être trop fort. Parfait ! - CSE Safran Bordes, Arcachon","status":"APPROVED","createdAt":1769524834248,"productSlug":"cusciuttellu"},
      {"rating":5,"comment":"Un délice absolu ! Mes invités ont adoré. Le goût authentique de la Corse dans mon assiette. - Laurent Casanova, Agen","status":"APPROVED","createdAt":1769524834299,"productSlug":"cusciuttellu"},
      {"rating":4,"comment":"Excellent choix pour notre séminaire d'entreprise. Les collaborateurs ont adoré ! - CSE SNCF Bordeaux, Arcachon","status":"APPROVED","createdAt":1769524834349,"productSlug":"figatelli"},
      {"rating":5,"comment":"Super bon ! Texture fondante, goût prononcé sans être trop fort. Parfait ! - Pierre Lefebvre, Agen","status":"APPROVED","createdAt":1769524834399,"productSlug":"figatelli"},
      {"rating":5,"comment":"Produit de très grande qualité, comme si j'étais en Corse. Emballage soigné, livraison impeccable. - Pascal Lefebvre, Saint-Mexant-l'École","status":"APPROVED","createdAt":1769524834449,"productSlug":"figatelli"},
      {"rating":5,"comment":"Qualité professionnelle ! Nous avons organisé un repas d'équipe et c'était un succès total. - CSE SNCF Bordeaux, Périgueux","status":"APPROVED","createdAt":1769524834500,"productSlug":"figatelli"},
      {"rating":5,"comment":"Superbe découverte ! Texture parfaite, goût authentique. Mes enfants en redemandent ! - Mairie de Bayonne, Arcachon","status":"APPROVED","createdAt":1769524834551,"productSlug":"figatelli"}
    ];

    const createdReviews = [];
    for (const review of reviews) {
      // Find product by slug
      const product = await prisma.product.findUnique({
        where: { slug: review.productSlug },
      });

      if (!product) {
        console.warn(`⚠️  Product not found for slug: ${review.productSlug}`);
        continue;
      }

      // Create review with unique token
      const token = crypto.randomBytes(16).toString("hex");

      await prisma.review.create({
        data: {
          userId: systemUser.id,
          productId: product.id,
          rating: review.rating,
          comment: review.comment,
          status: "APPROVED",
          token: token,
        },
      });

      createdReviews.push(product.name);
    }

    console.log(`✅ ${createdReviews.length} reviews migrated`);

    return NextResponse.json({
      success: true,
      message: "Migration complète réussie !",
      summary: {
        products: createdProducts.length,
        reviews: createdReviews.length,
        systemUser: systemUser.email,
      },
      products: createdProducts,
    });
  } catch (error) {
    console.error("❌ Error during migration:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Erreur lors de la migration",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
