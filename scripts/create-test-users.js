const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

async function createTestUsers() {
  console.log("🔄 Création des comptes de test...\n");

  try {
    // Compte Particulier
    const hashedPasswordParticulier = await bcrypt.hash("TestParticulier2024", 10);

    const particulier = await prisma.user.upsert({
      where: { email: "test.particulier@felicita.com" },
      update: {},
      create: {
        email: "test.particulier@felicita.com",
        password: hashedPasswordParticulier,
        role: "PARTICULIER",
        committeeApproved: false,
      },
    });

    console.log("✅ Compte PARTICULIER créé :");
    console.log("   Email    : test.particulier@felicita.com");
    console.log("   Password : TestParticulier2024");
    console.log("   Prix     : 99€/kg charcuterie, 79€/kg fromage\n");

    // Compte Comité d'entreprise
    const hashedPasswordComite = await bcrypt.hash("TestComite2024", 10);

    const comite = await prisma.user.upsert({
      where: { email: "test.comite@felicita.com" },
      update: {},
      create: {
        email: "test.comite@felicita.com",
        password: hashedPasswordComite,
        role: "COMITE",
        committeeApproved: true,
      },
    });

    console.log("✅ Compte COMITÉ D'ENTREPRISE créé :");
    console.log("   Email    : test.comite@felicita.com");
    console.log("   Password : TestComite2024");
    console.log("   Prix     : 69€/kg charcuterie, 49€/kg fromage\n");

    console.log("🎉 Comptes de test créés avec succès !");
    console.log("\n📝 Pour tester :");
    console.log("   1. Allez sur http://localhost:3000");
    console.log("   2. Cliquez sur 'Connexion'");
    console.log("   3. Utilisez un des comptes ci-dessus\n");
  } catch (error) {
    console.error("❌ Erreur lors de la création des comptes :", error);
  } finally {
    await prisma.$disconnect();
  }
}

createTestUsers();
