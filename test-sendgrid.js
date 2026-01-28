// Test SendGrid API
const sgMail = require("@sendgrid/mail");
require("dotenv").config();

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

async function testSendGrid() {
  try {
    console.log("🧪 Test d'envoi via SendGrid API...");
    console.log("🔑 Clé API:", process.env.SENDGRID_API_KEY ? "Configurée" : "MANQUANTE");
    console.log("📤 Envoi vers: johan.mallet1987@gmail.com");

    const msg = {
      to: "johan.mallet1987@gmail.com",
      from: "johan.mallet1@gmail.com", // Adresse vérifiée dans SendGrid
      subject: "Test SendGrid - Charcuterie Felicita",
      html: "<h1>✅ Test réussi!</h1><p>SendGrid fonctionne parfaitement avec Railway!</p>",
    };

    await sgMail.send(msg);

    console.log("\n✅ Email envoyé avec succès via SendGrid!");
    console.log("📧 Vérifiez votre boîte mail johan.mallet1987@gmail.com");
    console.log("📊 Dashboard: https://app.sendgrid.com/email_activity");
  } catch (error) {
    console.error("\n❌ Erreur lors de l'envoi:", error);
    console.error("Message:", error.message);
    if (error.response) {
      console.error("Status:", error.response.statusCode);
      console.error("Body:", error.response.body);
    }
  }
}

testSendGrid();
