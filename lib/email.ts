import sgMail from "@sendgrid/mail";

// Configuration de SendGrid avec la clé API
const apiKey = process.env.SENDGRID_API_KEY || "";
console.log("🔑 SendGrid API Key:", apiKey?.substring(0, 10) + "...");
console.log("📧 Email FROM:", process.env.EMAIL_FROM);
console.log("👤 Email FROM NAME:", process.env.EMAIL_FROM_NAME);
console.log("👨‍💼 Admin EMAIL:", process.env.ADMIN_EMAIL);
sgMail.setApiKey(apiKey);

interface WelcomeEmailParams {
  to: string;
  name: string;
  email: string;
  password: string;
  role: string;
  verificationToken: string;
}

export async function sendWelcomeEmail({
  to,
  name,
  email,
  password,
  role,
  verificationToken,
}: WelcomeEmailParams) {
  const roleText =
    role === "PARTICULIER"
      ? "Particulier"
      : "Comité d'Entreprise";

  // Personnalisation selon le rôle
  let welcomeMessage = "";
  let benefitsList = "";

  if (role === "PARTICULIER") {
    welcomeMessage = "Merci de vous être inscrit sur Charcuterie Felicita ! Nous sommes ravis de vous compter parmi nos clients.";
    benefitsList = `
      <li>🥓 <strong>Charcuterie corse authentique</strong> - Coppa, lonzo, prisuttu...</li>
      <li>🧀 <strong>Fromages de caractère</strong> - Brocciu, tomme corse...</li>
      <li>💰 <strong>Prix particulier : 99€/kg</strong> pour la charcuterie, 79€/kg pour les fromages</li>
      <li>🚚 <strong>Livraison rapide</strong> partout en France</li>
      <li>✨ <strong>Qualité artisanale garantie</strong></li>
    `;
  } else {
    // COMITE
    welcomeMessage = "Bienvenue dans l'espace Comité d'Entreprise ! Nous sommes ravis de vous proposer nos produits d'exception avec des <strong>tarifs préférentiels exclusifs</strong> pour vos employés.";
    benefitsList = `
      <li>💎 <strong>TARIFS EXCLUSIFS COMITÉS :</strong></li>
      <li>🥓 <strong>Charcuterie : 69€/kg</strong> (au lieu de 99€/kg)</li>
      <li>🧀 <strong>Fromages : 49€/kg</strong> (au lieu de 79€/kg)</li>
      <li>📦 <strong>Commandes groupées</strong> facilitées pour vos événements</li>
      <li>👥 <strong>Service dédié</strong> pour les comités d'entreprise</li>
      <li>🎁 <strong>Idéal pour vos cadeaux</strong> et événements d'entreprise</li>
    `;
  }

  // Utiliser NEXTAUTH_URL ou fallback sur l'URL de production
  const baseUrl = process.env.NEXTAUTH_URL || "https://www.boutique-felicita.fr";

  const verificationUrl = `${baseUrl}/api/auth/verify-email?token=${verificationToken}`;

  console.log(`🔗 Lien de vérification généré: ${verificationUrl}`);

  const fromEmail = process.env.EMAIL_FROM || "info@boutique-felicita.fr";
  const fromName = process.env.EMAIL_FROM_NAME || "Charcuterie Felicita";

  console.log(`📤 Tentative d'envoi email à ${to} depuis ${fromName} <${fromEmail}>`);

  try {
    await sgMail.send({
      from: {
        email: fromEmail,
        name: fromName
      },
      to,
      subject: "🎉 Bienvenue chez Charcuterie Felicita - Vérifiez votre email",
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body {
              font-family: Arial, sans-serif;
              line-height: 1.6;
              color: #333;
            }
            .container {
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
            }
            .header {
              background: linear-gradient(135deg, #4A2E1F 0%, #5C3D2E 100%);
              color: #F4EFEA;
              padding: 30px;
              text-align: center;
              border-radius: 10px 10px 0 0;
            }
            .content {
              background: #fff;
              padding: 30px;
              border: 2px solid #D6C4A3;
              border-radius: 0 0 10px 10px;
            }
            .credentials {
              background: #F4EFEA;
              padding: 20px;
              border-radius: 8px;
              margin: 20px 0;
              border-left: 4px solid #8B2F2F;
            }
            .credentials p {
              margin: 10px 0;
            }
            .credentials strong {
              color: #4A2E1F;
            }
            .button {
              display: inline-block;
              background: #8B2F2F;
              color: #F4EFEA !important;
              padding: 18px 50px;
              text-decoration: none;
              border-radius: 8px;
              margin: 20px 0;
              font-weight: bold;
              font-size: 18px;
              box-shadow: 0 4px 6px rgba(139, 47, 47, 0.3);
            }
            .button:hover {
              background: #6B1F1F;
            }
            .highlight-box {
              background: #FFF8E7;
              border: 2px dashed #D4A574;
              padding: 20px;
              border-radius: 8px;
              margin: 20px 0;
              text-align: center;
            }
            .footer {
              text-align: center;
              padding: 20px;
              color: #666;
              font-size: 12px;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🥓 Bienvenue chez Charcuterie Felicita</h1>
            </div>

            <div class="content">
              <h2>Bonjour ${name},</h2>

              <p>${welcomeMessage}</p>

              <p>Votre compte <strong>${roleText}</strong> a été créé avec succès.</p>

              <div class="credentials">
                <h3>📧 Vos identifiants de connexion :</h3>
                <p><strong>Email :</strong> ${email}</p>
                <p><strong>Mot de passe :</strong> ${password}</p>
              </div>

              <div class="highlight-box">
                <p style="font-size: 18px; font-weight: bold; color: #8B2F2F; margin: 0 0 15px 0;">
                  ⚠️ Dernière étape : Vérifiez votre email
                </p>
                <p style="margin: 0 0 20px 0;">
                  Pour activer votre compte et accéder à la boutique, cliquez sur le bouton ci-dessous :
                </p>
                <a href="${verificationUrl}" class="button">
                  ✉️ Vérifier mon email et accéder à la boutique
                </a>
              </div>

              <p style="text-align: center; color: #666; font-size: 12px;">
                Si le bouton ne fonctionne pas, copiez ce lien dans votre navigateur :<br>
                <a href="${verificationUrl}" style="color: #8B2F2F; word-break: break-all;">${verificationUrl}</a>
              </p>

              <h3>🛒 Vos avantages ${roleText} :</h3>
              <ul style="line-height: 1.8;">
                ${benefitsList}
              </ul>

              <p>Des questions ? Contactez-nous au <strong>06 04 11 05 50</strong> ou par email à <strong>contact@boutique-felicita.fr</strong>.</p>

              <p>À très bientôt sur notre boutique !</p>

              <p><em>L'équipe Charcuterie Felicita</em></p>
            </div>

            <div class="footer">
              <p>Charcuterie Felicita - Produits corses authentiques</p>
              <p>📞 06 04 11 05 50 | ✉️ contact@boutique-felicita.fr</p>
              <p style="margin-top: 10px;">Cet email a été envoyé car vous avez créé un compte sur boutique-felicita.fr</p>
            </div>
          </div>
        </body>
        </html>
      `,
    });

    console.log(`✅ Email de bienvenue envoyé à ${to} via SendGrid`);
    return { success: true };
  } catch (error: any) {
    console.error("❌ ERREUR SENDGRID COMPLÈTE:");
    console.error("Code:", error.code);
    console.error("Message:", error.message);
    console.error("Response Body:", JSON.stringify(error.response?.body, null, 2));
    console.error("Response Headers:", JSON.stringify(error.response?.headers, null, 2));
    return { success: false, error };
  }
}

export async function sendReviewModerationEmail(
  reviewId: string,
  productName: string,
  rating: number,
  comment: string,
  token: string
) {
  const baseUrl = process.env.NEXTAUTH_URL || "https://www.boutique-felicita.fr";
  const acceptUrl = `${baseUrl}/api/reviews/moderate?token=${token}&action=approve`;
  const rejectUrl = `${baseUrl}/api/reviews/moderate?token=${token}&action=reject`;

  const fromEmail = process.env.EMAIL_FROM || "info@boutique-felicita.fr";
  const fromName = process.env.EMAIL_FROM_NAME || "Charcuterie Felicita";
  const adminEmail = process.env.ADMIN_EMAIL || "contact@boutique-felicita.fr";

  console.log(`📤 Tentative d'envoi email modération à ${adminEmail} depuis ${fromName} <${fromEmail}>`);

  try {
    await sgMail.send({
      from: {
        email: fromEmail,
        name: fromName
      },
      to: adminEmail,
      subject: `Nouvel avis à modérer - ${productName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>Nouvel avis soumis</h2>
          <p><strong>Produit :</strong> ${productName}</p>
          <p><strong>Note :</strong> ${"⭐".repeat(rating)}</p>
          <p><strong>Commentaire :</strong></p>
          <p style="background: #f5f5f5; padding: 15px; border-radius: 5px;">${comment}</p>

          <div style="margin-top: 30px;">
            <a href="${acceptUrl}" style="display: inline-block; background: #2d5a2d; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; margin-right: 10px;">
              ✓ Accepter
            </a>
            <a href="${rejectUrl}" style="display: inline-block; background: #dc3545; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px;">
              ✗ Refuser
            </a>
          </div>

          <p style="margin-top: 30px; color: #666; font-size: 12px;">
            Cliquez sur "Accepter" pour publier cet avis ou "Refuser" pour le supprimer.
          </p>
        </div>
      `,
    });

    console.log(`✅ Email de modération envoyé via SendGrid`);
    return { success: true };
  } catch (error: any) {
    console.error("❌ ERREUR SENDGRID MODÉRATION COMPLÈTE:");
    console.error("Code:", error.code);
    console.error("Message:", error.message);
    console.error("Response Body:", JSON.stringify(error.response?.body, null, 2));
    console.error("Response Headers:", JSON.stringify(error.response?.headers, null, 2));
    return { success: false, error };
  }
}
