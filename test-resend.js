// Test simple pour vérifier que Resend fonctionne
const { Resend } = require("resend");

const resend = new Resend("re_gbnjGyxw_PpoD6Nxzu64hkeAs8YsYGXq1");

async function testEmail() {
  try {
    console.log("🧪 Test d'envoi d'email via Resend...");

    const data = await resend.emails.send({
      from: "Charcuterie Felicita <onboarding@resend.dev>",
      to: "liliewatt2023@gmail.com", // Votre email
      subject: "Test Resend - Charcuterie Felicita",
      html: "<h1>Test réussi!</h1><p>Si vous recevez cet email, Resend fonctionne correctement.</p>",
    });

    console.log("✅ Email envoyé avec succès!");
    console.log("ID de l'email:", data.id);
    console.log("\n📧 Vérifiez votre boîte mail à liliewatt2023@gmail.com");
  } catch (error) {
    console.error("❌ Erreur lors de l'envoi:", error);
    console.error("Message d'erreur:", error.message);
    console.error("Détails:", error.response?.data || error);
  }
}

testEmail();
