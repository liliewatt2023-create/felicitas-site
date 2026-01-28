// Test Gmail SMTP
const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || "587"),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

async function testGmail() {
  try {
    console.log("🧪 Test d'envoi via Gmail SMTP...");
    console.log("📧 De:", process.env.SMTP_USER);
    console.log("📤 Vers: liliewatt2023@gmail.com");

    const info = await transporter.sendMail({
      from: process.env.SMTP_FROM,
      to: "liliewatt2023@gmail.com",
      subject: "Test Gmail SMTP - Charcuterie Felicita",
      html: "<h1>✅ Test réussi!</h1><p>Gmail SMTP fonctionne parfaitement.</p>",
    });

    console.log("\n✅ Email envoyé avec succès!");
    console.log("📊 Message ID:", info.messageId);
    console.log("\n📧 Vérifiez votre boîte mail à liliewatt2023@gmail.com");
  } catch (error) {
    console.error("\n❌ Erreur lors de l'envoi:", error);
    console.error("Message:", error.message);
  }
}

testGmail();
