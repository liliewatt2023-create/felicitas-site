// Test d'envoi d'email avec la configuration SMTP
require('dotenv').config();
const nodemailer = require('nodemailer');

async function testEmail() {
  console.log('🧪 Test de configuration SMTP...\n');

  console.log('Configuration:');
  console.log('- SMTP_HOST:', process.env.SMTP_HOST);
  console.log('- SMTP_PORT:', process.env.SMTP_PORT);
  console.log('- SMTP_USER:', process.env.SMTP_USER);
  console.log('- SMTP_FROM:', process.env.SMTP_FROM);
  console.log('');

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  try {
    console.log('📧 Envoi d\'un email de test...');

    const info = await transporter.sendMail({
      from: process.env.SMTP_FROM || '"Charcuterie Felicita" <noreply@felicita.com>',
      to: process.env.SMTP_USER, // Envoyer à soi-même pour tester
      subject: '✅ Test Email - Charcuterie Felicita',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #4A2E1F; color: #F4EFEA; padding: 30px; text-align: center; }
            .content { padding: 30px; background: #fff; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🥓 Test Email</h1>
            </div>
            <div class="content">
              <h2>Configuration SMTP réussie !</h2>
              <p>Votre configuration Gmail SMTP fonctionne parfaitement.</p>
              <p>Les nouveaux utilisateurs recevront maintenant leurs identifiants par email lors de l'inscription.</p>
              <p><strong>Date du test :</strong> ${new Date().toLocaleString('fr-FR')}</p>
            </div>
          </div>
        </body>
        </html>
      `,
    });

    console.log('✅ Email envoyé avec succès !');
    console.log('Message ID:', info.messageId);
    console.log('\n🎉 Configuration SMTP validée !');
    console.log('Vérifiez votre boîte mail:', process.env.SMTP_USER);

  } catch (error) {
    console.error('❌ Erreur lors de l\'envoi de l\'email:');
    console.error(error.message);
    console.error('\nVérifiez que:');
    console.error('1. Le mot de passe d\'application est correct');
    console.error('2. La validation en 2 étapes est activée sur votre compte Gmail');
    console.error('3. Votre adresse email est correcte');
  }
}

testEmail();
