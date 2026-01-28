const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // Création des produits - VOS VRAIS PRODUITS de la base locale avec images
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

  for (const product of products) {
    await prisma.product.upsert({
      where: { slug: product.slug },
      update: product, // Met à jour tous les champs (y compris l'image) si le produit existe
      create: product,
    });
  }

  console.log("✅ Products seeded successfully!");
}

main()
  .catch((e) => {
    console.error("❌ Error seeding database:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
