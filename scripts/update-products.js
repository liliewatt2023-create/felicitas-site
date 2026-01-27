const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const products = [
  {
    name: "Tomme de Chèvre Corse",
    slug: "tomme-chevre",
    category: "FROMAGE",
    description: "Tomme de chèvre corse au lait entier, affinage de 10 mois. Texture onctueuse et saveur corsée authentique.",
    details: "TOME CORSE CHÈVRE LAIT ENTIER - AFFINAGE 10 MOIS - CONSERVATION 3 MOIS. Produit artisanal élaboré selon la tradition fromagère corse.",
    image: "/images/products/tomme-chevre.jpg",
  },
  {
    name: "Tome de Brebis Corse",
    slug: "tome-brebis",
    category: "FROMAGE",
    description: "Tome de brebis corse au lait entier, affinée 8 mois. Goût intense et authentique du terroir corse.",
    details: "TOME CORSE BREBIS - AFFINAGE 8 MOIS - LAIT ENTIER - CONSERVATION 3 MOIS. Fromage de caractère élaboré dans le respect des traditions.",
    image: "/images/products/tome-brebis.jpg",
  },
  {
    name: "Saucisson Sanglier & Cochon Noir",
    slug: "saucisson-sanglier",
    category: "CHARCUTERIE",
    description: "Saucisson corse 20% sanglier et 80% cochon noir, affinage 12 mois. Fumé au bois de châtaignier pendant 15 jours.",
    details: "SAUCISSON CORSE SANGLIER 20% / COCHON NOIR 80% - AFFINAGE 12 MOIS - FUMAGE BOIS DE CHÂTAIGNIER 15 JOURS - CONSERVATION 6 MOIS. Produit d'exception au goût unique.",
    image: "/images/products/saucisson-sanglier.jpg",
  },
  {
    name: "Copa Corse",
    slug: "copa-corse",
    category: "CHARCUTERIE",
    description: "Copa corse élaborée à partir d'échines, gorge et joues. Affinage 12 mois et fumage au bois de châtaignier.",
    details: "COPA CORSE - ÉCHINES, GORGE ET JOUES - AFFINAGE 12 MOIS - FUMAGE BOIS DE CHÂTAIGNIER 15 JOURS - CONSERVATION 6 MOIS. Charcuterie fine au goût délicat et raffiné.",
    image: "/images/products/copa-corse.jpg",
  },
  {
    name: "Lonzu Corse",
    slug: "lonzu-corse",
    category: "CHARCUTERIE",
    description: "Lonzu corse issu du contrefilet, la partie la plus noble avec seulement 7% de gras. Affinage 12 mois et fumage au bois de châtaignier.",
    details: "LONZU CORSE - CONTREFILET PARTIE LA PLUS NOBLE - 7% DE GRAS - AFFINAGE 12 MOIS - FUMAGE AU BOIS DE CHÂTAIGNIER CORSE 15 JOURS - CONSERVATION 6 MOIS. Produit d'excellence à la texture fondante.",
    image: "/images/products/lonzu-corse.jpg",
  },
  {
    name: "Cusciuttellu",
    slug: "cusciuttellu",
    category: "CHARCUTERIE",
    description: "Noix de jambon affinée 2 ans, ouverte à cœur et garnie de poudre de noix et châtaigne. Roulée dans le poivre puis fumée au bois de châtaignier.",
    details: "CUSCIUTTELLU - NOIX DE JAMBON - AFFINAGE 2 ANS TOTAL - Garni de poudre de noix et châtaigne après 1 an, puis roulé dans le poivre et affiné 1 an supplémentaire - FUMAGE BOIS DE CHÂTAIGNIER CORSE 15 JOURS - CONSERVATION 9 MOIS. Produit artisanal unique et raffiné.",
    image: "/images/products/cusciuttellu.jpg",
  },
  {
    name: "Figatelli Corse",
    slug: "figatelli",
    category: "CHARCUTERIE",
    description: "Saucisse de foie, sang, figues et épices corses en boyaux naturels. Précuite à 190°C dans un four à bois pendant 60 minutes.",
    details: "FIGATELLI CORSE - Saucisse de foie, sang, figues et épices corses - Boyaux naturels - Précuite à 190°C au four à bois 60 minutes - Peut se manger cuite à cœur ou crue - AFFINAGE 6 MOIS - CONSERVATION 3 MOIS. Spécialité corse traditionnelle aux saveurs uniques.",
    image: "/images/products/figatelli.jpg",
  },
];

async function updateProducts() {
  console.log("🔄 Mise à jour des produits avec les vraies images...\n");

  try {
    // Supprimer tous les anciens produits
    await prisma.product.deleteMany({});
    console.log("✅ Anciens produits supprimés\n");

    // Créer les nouveaux produits
    for (const product of products) {
      await prisma.product.create({
        data: product,
      });
      console.log(`✅ Créé: ${product.name}`);
    }

    console.log("\n🎉 Base de données mise à jour avec succès !");
    console.log(`\n📊 ${products.length} produits créés :`);
    console.log(`   - ${products.filter(p => p.category === "CHARCUTERIE").length} charcuteries`);
    console.log(`   - ${products.filter(p => p.category === "FROMAGE").length} fromages\n`);
  } catch (error) {
    console.error("❌ Erreur lors de la mise à jour :", error);
  } finally {
    await prisma.$disconnect();
  }
}

updateProducts();
