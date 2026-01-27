const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

// Villes d'Aquitaine
const cities = [
  "Libourne",
  "Saint-Mexant-l'École",
  "Bordeaux",
  "Périgueux",
  "Bergerac",
  "Arcachon",
  "Bayonne",
  "Biarritz",
  "Pau",
  "Mont-de-Marsan",
  "Dax",
  "Agen",
  "Marmande",
  "Villeneuve-sur-Lot",
  "Saint-Émilion",
  "Pauillac",
  "La Rochelle",
];

// Prénoms corses et français
const firstNames = [
  "Jean-Pierre",
  "Marie",
  "Antoine",
  "Isabelle",
  "François",
  "Sophie",
  "Pierre",
  "Cécile",
  "Laurent",
  "Nathalie",
  "Pascal",
  "Valérie",
  "Michel",
  "Catherine",
  "Dominique",
  "Martine",
  "Ghjuvan",
  "Maria",
  "Petru",
  "Anghjula",
];

const lastNames = [
  "Dupont",
  "Martin",
  "Bernard",
  "Dubois",
  "Laurent",
  "Simon",
  "Michel",
  "Lefebvre",
  "Rossi",
  "Santoni",
  "Colombani",
  "Casanova",
  "Ferrari",
  "Luciani",
  "Moretti",
];

// Entreprises d'Aquitaine
const companies = [
  "Mairie de Libourne",
  "CE Airbus Bordeaux",
  "Comité Social Dassault Aviation",
  "CE Thales Aquitaine",
  "Mairie de Périgueux",
  "CSE Casino Bordeaux",
  "CE Total Pau",
  "CSE Safran Bordes",
  "Conseil Départemental Gironde",
  "CE CHU Bordeaux",
  "CSE Cdiscount Bordeaux",
  "CE Orange Aquitaine",
  "CSE SNCF Bordeaux",
  "Mairie de Bayonne",
  "CE Ford Aquitaine",
];

// Commentaires positifs pour charcuterie
const charcuterieComments = [
  "Produit exceptionnel ! La qualité corse se ressent à chaque bouchée. Livraison rapide, je recommande vivement !",
  "Un délice absolu ! Mes invités ont adoré. Le goût authentique de la Corse dans mon assiette.",
  "Qualité irréprochable, saveur incomparable. C'est devenu mon fournisseur attitré pour les produits corses.",
  "Excellent produit ! On sent vraiment la qualité du terroir corse. Rapport qualité-prix imbattable.",
  "Superbe découverte ! Texture parfaite, goût authentique. Mes enfants en redemandent !",
  "Produit de très grande qualité, comme si j'étais en Corse. Emballage soigné, livraison impeccable.",
  "Une tuerie ! Le meilleur que j'ai goûté depuis des années. Je vais passer commande tous les mois !",
  "Vraiment délicieux ! Parfait pour un apéritif entre amis. Tout le monde a été conquis.",
  "Qualité professionnelle ! Nous avons organisé un repas d'équipe et c'était un succès total.",
  "Produit authentique et savoureux. On voyage directement en Corse avec ces saveurs.",
  "Exceptionnel ! La qualité est au rendez-vous. Mon traiteur habituel est jaloux !",
  "Super bon ! Texture fondante, goût prononcé sans être trop fort. Parfait !",
  "Excellent choix pour notre séminaire d'entreprise. Les collaborateurs ont adoré !",
  "Produit artisanal de qualité supérieure. On sent le savoir-faire corse.",
  "Un régal ! Parfait avec du bon pain et un verre de rouge. Je recommande à 200% !",
];

// Commentaires positifs pour fromage
const fromageComments = [
  "Fromage d'exception ! Le goût est puissant et authentique, exactement ce que je cherchais.",
  "Magnifique produit ! Texture crémeuse, saveur incomparable. Un vrai fromage corse !",
  "Délicieux ! Parfait sur un plateau de fromages, il fait sensation à chaque fois.",
  "Excellente qualité ! Le goût est prononcé comme j'aime. Mes invités ont été impressionnés.",
  "Produit authentique et savoureux. On retrouve les vraies saveurs de la Corse.",
  "Un délice ! Texture parfaite, ni trop sec ni trop humide. Affinage optimal.",
  "Fromage exceptionnel ! Parfait avec de la confiture de figues. Un pur régal.",
  "Qualité remarquable ! Le meilleur fromage corse que j'ai goûté en dehors de l'île.",
  "Superbe fromage ! Idéal pour accompagner un bon vin. Saveurs authentiques.",
  "Produit de grande qualité ! Nos clients au restaurant adorent ce fromage.",
  "Excellent ! Le goût est puissant mais pas trop fort. Parfait équilibre.",
  "Vraiment top ! Texture fondante en bouche, arômes complexes. Un vrai plaisir.",
  "Magnifique découverte ! Nous avons commandé pour notre comité d'entreprise, succès garanti.",
  "Fromage authentique et goûteux. La qualité corse est bien présente.",
  "Exceptionnel ! Parfait pour un plateau de fromages raffiné. Mes convives ont adoré.",
];

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomElement(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function generateEmail(firstName, lastName, city, isCompany) {
  const cleanFirst = firstName.toLowerCase().replace(/[^a-z]/g, "");
  const cleanLast = lastName.toLowerCase().replace(/[^a-z]/g, "");
  const cleanCity = city.toLowerCase().replace(/[^a-z]/g, "");

  if (isCompany) {
    return `ce.${cleanFirst}.${cleanLast}@${cleanCity}.fr`;
  } else {
    return `${cleanFirst}.${cleanLast}@${cleanCity}.fr`;
  }
}

function generateToken() {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

async function addReviews() {
  try {
    console.log("🚀 Génération des avis clients pour la région Aquitaine...\n");

    // Récupérer tous les produits
    const products = await prisma.product.findMany();
    console.log(`📦 ${products.length} produits trouvés\n`);

    let totalReviews = 0;

    for (const product of products) {
      const numReviews = getRandomInt(4, 7);
      console.log(`\n📝 Ajout de ${numReviews} avis pour "${product.name}"...`);

      const comments = product.category === "CHARCUTERIE" ? charcuterieComments : fromageComments;

      for (let i = 0; i < numReviews; i++) {
        const isCompany = Math.random() > 0.6; // 40% de comités d'entreprise
        const firstName = getRandomElement(firstNames);
        const lastName = getRandomElement(lastNames);
        const city = getRandomElement(cities);

        let displayName;
        if (isCompany) {
          displayName = getRandomElement(companies);
        } else {
          displayName = `${firstName} ${lastName}`;
        }

        const email = generateEmail(firstName, lastName, city, isCompany);
        const password = await bcrypt.hash("ReviewUser2024", 10);
        const role = isCompany ? "COMITE" : "PARTICULIER";

        // Créer ou récupérer l'utilisateur
        let user = await prisma.user.findUnique({
          where: { email },
        });

        if (!user) {
          user = await prisma.user.create({
            data: {
              email,
              password,
              role,
              committeeApproved: isCompany ? true : false,
            },
          });
        }

        // Note entre 4 et 5 étoiles (produits de qualité)
        const rating = Math.random() > 0.3 ? 5 : 4;

        // Sélectionner un commentaire aléatoire
        const comment = getRandomElement(comments);

        // Créer l'avis
        await prisma.review.create({
          data: {
            userId: user.id,
            productId: product.id,
            rating,
            comment: `${comment} - ${displayName}, ${city}`,
            status: "APPROVED",
            token: generateToken(),
          },
        });

        totalReviews++;
        console.log(`   ✅ ${rating}⭐ - ${displayName} (${city})`);
      }
    }

    console.log(`\n\n🎉 ${totalReviews} avis clients créés avec succès !`);
    console.log(`�� Répartition :`);

    const allReviews = await prisma.review.findMany({
      include: {
        user: true,
      },
    });

    const particuliers = allReviews.filter(r => r.user.role === "PARTICULIER").length;
    const comites = allReviews.filter(r => r.user.role === "COMITE").length;
    const stars5 = allReviews.filter(r => r.rating === 5).length;
    const stars4 = allReviews.filter(r => r.rating === 4).length;

    console.log(`   - Particuliers : ${particuliers}`);
    console.log(`   - Comités d'Entreprise : ${comites}`);
    console.log(`   - 5 étoiles : ${stars5}`);
    console.log(`   - 4 étoiles : ${stars4}`);

  } catch (error) {
    console.error("❌ Erreur:", error);
  } finally {
    await prisma.$disconnect();
  }
}

addReviews();
