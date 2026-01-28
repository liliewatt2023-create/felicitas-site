import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { randomUUID } from 'crypto';

const reviews = [
  {
    rating: 5,
    comment: "Une charcuterie d'exception ! Les saveurs sont incomparables, on sent vraiment la qualité et le savoir-faire artisanal. Je recommande à 100%.",
    date: new Date('2025-12-15'),
  },
  {
    rating: 5,
    comment: "Produits authentiques et délicieux. La coppa est une tuerie, fondante à souhait. Livraison rapide et soignée.",
    date: new Date('2025-11-28'),
  },
  {
    rating: 4,
    comment: "Très bon rapport qualité prix pour des produits corses authentiques. Le lonzo est excellent, juste un peu salé à mon goût.",
    date: new Date('2025-12-02'),
  },
  {
    rating: 5,
    comment: "C'est la troisième fois que je commande et je ne suis jamais déçu. Les fromages sont incroyables, notamment le brocciu.",
    date: new Date('2025-11-10'),
  },
  {
    rating: 5,
    comment: "On retrouve enfin le vrai goût de la Corse ! La charcuterie a ce petit fumé au bois de châtaignier qui fait toute la différence.",
    date: new Date('2025-10-22'),
  },
  {
    rating: 4,
    comment: "Excellente découverte pour notre comité d'entreprise. Les employés ont adoré les produits lors de notre pot de fin d'année.",
    date: new Date('2025-12-18'),
  },
  {
    rating: 5,
    comment: "La qualité est au rendez-vous ! J'ai goûté le figatellu et c'était comme si j'étais retourné en Corse. Merci pour ces moments.",
    date: new Date('2025-09-14'),
  },
  {
    rating: 5,
    comment: "Service impeccable, produits d'une fraîcheur remarquable. Le packaging est soigné, parfait pour offrir en cadeau.",
    date: new Date('2025-11-05'),
  },
  {
    rating: 4,
    comment: "Très bons produits mais j'aurais aimé un peu plus d'informations sur la provenance exacte des pièces. Sinon rien à redire !",
    date: new Date('2025-10-30'),
  },
  {
    rating: 5,
    comment: "Un régal absolu ! La texture, le goût, l'affinage... tout est parfait. On sent la passion des artisans derrière ces produits.",
    date: new Date('2025-12-08'),
  },
  {
    rating: 5,
    comment: "Meilleure charcuterie que j'ai mangée depuis des années. Le prisuttu est d'une finesse incroyable.",
    date: new Date('2025-09-27'),
  },
  {
    rating: 4,
    comment: "Produits de grande qualité, prix un peu élevés mais ça les vaut largement. Pour les grandes occasions, c'est parfait.",
    date: new Date('2025-11-20'),
  }
];

async function seedReviews() {
  console.log('🌱 Début du seeding des avis...');

  // Récupérer tous les produits
  const products = await prisma.product.findMany();

    if (products.length === 0) {
      return NextResponse.json(
        { error: 'Aucun produit trouvé. Veuillez d\'abord créer des produits.' },
        { status: 400 }
      );
    }

    // Récupérer ou créer un utilisateur test
    let user = await prisma.user.findFirst({
      where: { email: 'client.test@example.com' }
    });

    if (!user) {
      user = await prisma.user.create({
        data: {
          email: 'client.test@example.com',
          password: '$2a$10$dummyhashedpasswordfortest', // Hash bidon pour l'utilisateur test
          role: 'PARTICULIER',
          emailVerified: true,
        }
      });
      console.log('✅ Utilisateur test créé');
    }

    // Supprimer les anciens avis de test
    await prisma.review.deleteMany({
      where: { userId: user.id }
    });
    console.log('🗑️  Anciens avis supprimés');

    // Créer les nouveaux avis
    let created = 0;
    for (const reviewData of reviews) {
      // Choisir un produit aléatoire
      const randomProduct = products[Math.floor(Math.random() * products.length)];

      await prisma.review.create({
        data: {
          rating: reviewData.rating,
          comment: reviewData.comment,
          status: 'APPROVED', // Directement approuvé pour affichage
          token: randomUUID(), // Token unique requis
          productId: randomProduct.id,
          userId: user.id,
          createdAt: reviewData.date,
          updatedAt: reviewData.date,
        }
      });
      created++;
    }

    console.log(`✅ ${created} avis créés avec succès !`);

    // Afficher un résumé
    const totalReviews = await prisma.review.count({
      where: { status: 'APPROVED' }
    });

    return {
      success: true,
      message: `${created} avis créés avec succès`,
      totalApprovedReviews: totalReviews
    };
}

export async function POST() {
  try {
    const result = await seedReviews();
    return NextResponse.json(result);
  } catch (error) {
    console.error('❌ Erreur lors du seeding:', error);
    return NextResponse.json(
      { error: 'Erreur lors du seeding des avis', details: error },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const result = await seedReviews();
    return NextResponse.json(result);
  } catch (error) {
    console.error('❌ Erreur lors du seeding:', error);
    return NextResponse.json(
      { error: 'Erreur lors du seeding des avis', details: error },
      { status: 500 }
    );
  }
}
