import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import { sendWelcomeEmail } from "@/lib/resend";

export async function POST(request: NextRequest) {
  try {
    const { email, password, role, committeeCode } = await request.json();

    // Validation
    if (!email || !password || !role) {
      return NextResponse.json(
        { error: "Tous les champs sont requis" },
        { status: 400 }
      );
    }

    // Vérifier si l'email existe déjà
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "Cet email est déjà utilisé" },
        { status: 400 }
      );
    }

    // Pour les comités, vérifier le code
    let committeeApproved = false;
    if (role === "COMITE") {
      if (committeeCode !== process.env.COMITE_CODE) {
        return NextResponse.json(
          { error: "Code comité invalide" },
          { status: 400 }
        );
      }
      committeeApproved = true;
    }

    // Hasher le mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    // Générer un token de vérification unique
    const verificationToken = crypto.randomBytes(32).toString("hex");

    // Créer l'utilisateur - TEMPORAIRE: emailVerified à true car emails ne fonctionnent pas encore
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        role,
        committeeApproved,
        emailVerified: true, // TEMPORAIRE: true car Resend pas encore configuré
        verificationToken,
      },
    });

    // Envoyer l'email de bienvenue avec les identifiants et le lien de vérification
    try {
      await sendWelcomeEmail({
        to: email,
        name: email.split("@")[0], // Utiliser la partie avant @ comme nom
        email,
        password, // Le mot de passe en clair (avant hashage)
        role,
        verificationToken,
      });
      console.log(`📧 Email de bienvenue envoyé à ${email}`);
    } catch (emailError) {
      console.error("⚠️ Erreur lors de l'envoi de l'email:", emailError);
      // On continue même si l'email échoue - compte déjà créé avec emailVerified=true
    }

    return NextResponse.json(
      {
        success: true,
        message: "Compte créé avec succès ! Vérifiez votre boîte email pour activer votre compte.",
        userId: user.id,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Erreur lors de la création du compte:", error);
    return NextResponse.json(
      { error: "Erreur serveur lors de la création du compte" },
      { status: 500 }
    );
  }
}
