const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

async function fixComiteAccount() {
  try {
    console.log("🔍 Vérification du compte comité...");

    // Chercher le compte comité
    let comiteUser = await prisma.user.findUnique({
      where: { email: "test.comite@felicita.com" },
    });

    if (!comiteUser) {
      console.log("❌ Compte comité introuvable. Création...");

      const hashedPassword = await bcrypt.hash("TestComite2024", 10);

      comiteUser = await prisma.user.create({
        data: {
          email: "test.comite@felicita.com",
          password: hashedPassword,
          role: "COMITE",
          committeeApproved: true,
        },
      });

      console.log("✅ Compte comité créé avec committeeApproved = true");
    } else {
      console.log(`📧 Compte trouvé : ${comiteUser.email}`);
      console.log(`   Role : ${comiteUser.role}`);
      console.log(`   CommitteeApproved : ${comiteUser.committeeApproved}`);

      if (!comiteUser.committeeApproved) {
        console.log("🔧 Mise à jour de committeeApproved...");

        await prisma.user.update({
          where: { email: "test.comite@felicita.com" },
          data: { committeeApproved: true },
        });

        console.log("✅ committeeApproved mis à jour à true");
      } else {
        console.log("✅ Le compte est déjà approuvé");
      }
    }

    console.log("\n🎉 Compte comité prêt !");
    console.log("   Email : test.comite@felicita.com");
    console.log("   Password : TestComite2024");
    console.log("   Role : COMITE");
    console.log("   CommitteeApproved : true");
  } catch (error) {
    console.error("❌ Erreur:", error);
  } finally {
    await prisma.$disconnect();
  }
}

fixComiteAccount();
