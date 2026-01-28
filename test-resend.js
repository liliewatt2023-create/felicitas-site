// Test simple pour vérifier que Resend fonctionne
const { Resend } = require("resend");

const resend = new Resend("re_gbnjGyxw_PpoD6Nxzu64hkeAs8YsYGXq1");

async function testEmail() {
  try {
    console.log("🧪 Test d'envoi d'email via Resend...");
    console.log("🔑 Clé API:", process.env.RESEND_API_KEY ? "Configurée" : "MANQUANTE");

    const data = await resend.emails.send({
      from: "Charcuterie Felicita <onboarding@resend.dev>",
      to: "johan.mallet1987@gmail.com", // Email du propriétaire du compte Resend
      subject: "Test Resend - Charcuterie Felicita",
      html: "<h1>Test réussi!</h1><p>Si vous recevez cet email, Resend fonctionne correctement.</p>",
    });

    console.log("\n✅ Email envoyé avec succès!");
    console.log("📊 Réponse complète:", JSON.stringify(data, null, 2));
    console.log("\n📧 Vérifiez votre boîte mail à liliewatt2023@gmail.com");
    console.log("📊 Vérifiez aussi: https://resend.com/emails");
  } catch (error) {
    console.error("\n❌ Erreur lors de l'envoi:", error);
    console.error("Message d'erreur:", error.message);
    console.error("Code d'erreur:", error.statusCode || error.code);
    console.error("Détails complets:", JSON.stringify(error, null, 2));
  }
}

testEmail();
