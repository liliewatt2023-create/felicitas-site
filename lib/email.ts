import nodemailer from "nodemailer";

// Configuration du transporteur Gmail SMTP
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || "587"),
  secure: false, // true pour 465, false pour les autres ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

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
      : role === "COMITE"
      ? "Comité d'Entreprise"
      : "Restaurateur";

  const verificationUrl = `${process.env.NEXTAUTH_URL}/api/auth/verify-email?token=${verificationToken}`;

  try {
    await transporter.sendMail({
      from: process.env.SMTP_FROM || "Charcuterie Felicita <liliewatt2023@gmail.com>",
      to,
      subject: "🎉 Bienvenue chez Charcuterie Felicita - Vos identifiants",
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
              padding: 15px 40px;
              text-decoration: none;
              border-radius: 5px;
              margin: 20px 0;
              font-weight: bold;
              font-size: 16px;
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
              <h2>Bonjour ${name || "cher client"},</h2>

              <p>Merci de vous être inscrit sur notre boutique en ligne ! Nous sommes ravis de vous compter parmi nos clients.</p>

              <p>Votre compte <strong>${roleText}</strong> a été créé avec succès.</p>

              <div class="credentials">
                <h3>📧 Vos identifiants de connexion :</h3>
                <p><strong>Email :</strong> ${email}</p>
                <p><strong>Mot de passe :</strong> ${password}</p>
              </div>

              <p><strong>⚠️ Important :</strong> Avant de pouvoir vous connecter, vous devez vérifier votre adresse email en cliquant sur le bouton ci-dessous.</p>

              <div style="text-align: center; margin: 30px 0;">
                <a href="${verificationUrl}" class="button">
                  ✉️ Vérifier mon email
                </a>
              </div>

              <p style="text-align: center; color: #666; font-size: 12px;">
                Si le bouton ne fonctionne pas, copiez ce lien dans votre navigateur :<br>
                <a href="${verificationUrl}" style="color: #8B2F2F; word-break: break-all;">${verificationUrl}</a>
              </p>

              <h3>🛒 Découvrez nos produits :</h3>
              <ul>
                <li>Charcuterie corse authentique</li>
                <li>Fromages de caractère</li>
                <li>Prix préférentiels selon votre profil</li>
                <li>Livraison rapide en France</li>
              </ul>

              <p>Si vous avez des questions, n'hésitez pas à nous contacter au <strong>06 04 11 05 50</strong>.</p>

              <p>À bientôt sur notre boutique !</p>

              <p><em>L'équipe Charcuterie Felicita</em></p>
            </div>

            <div class="footer">
              <p>Charcuterie Felicita - Produits corses authentiques</p>
              <p>Cet email a été envoyé automatiquement, merci de ne pas y répondre.</p>
            </div>
          </div>
        </body>
        </html>
      `,
    });

    console.log(\`✅ Email de bienvenue envoyé à \${to} via Gmail SMTP\`);
    return { success: true };
  } catch (error) {
    console.error("❌ Erreur lors de l'envoi de l'email via Gmail SMTP:", error);
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
  const baseUrl = process.env.NEXTAUTH_URL || "http://localhost:3000";
  const acceptUrl = \`\${baseUrl}/api/reviews/moderate?token=\${token}&action=approve\`;
  const rejectUrl = \`\${baseUrl}/api/reviews/moderate?token=\${token}&action=reject\`;

  try {
    await transporter.sendMail({
      from: process.env.SMTP_FROM || "Charcuterie Felicita <liliewatt2023@gmail.com>",
      to: process.env.ADMIN_REVIEWS_EMAIL || "admin@felicita.com",
      subject: \`Nouvel avis à modérer - \${productName}\`,
      html: \`
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>Nouvel avis soumis</h2>
          <p><strong>Produit :</strong> \${productName}</p>
          <p><strong>Note :</strong> \${"⭐".repeat(rating)}</p>
          <p><strong>Commentaire :</strong></p>
          <p style="background: #f5f5f5; padding: 15px; border-radius: 5px;">\${comment}</p>

          <div style="margin-top: 30px;">
            <a href="\${acceptUrl}" style="display: inline-block; background: #2d5a2d; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; margin-right: 10px;">
              ✓ Accepter
            </a>
            <a href="\${rejectUrl}" style="display: inline-block; background: #dc3545; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px;">
              ✗ Refuser
            </a>
          </div>

          <p style="margin-top: 30px; color: #666; font-size: 12px;">
            Cliquez sur "Accepter" pour publier cet avis ou "Refuser" pour le supprimer.
          </p>
        </div>
      \`,
    });

    console.log(\`✅ Email de modération envoyé via Gmail SMTP\`);
    return { success: true };
  } catch (error) {
    console.error("❌ Erreur lors de l'envoi de l'email de modération:", error);
    return { success: false, error };
  }
}
