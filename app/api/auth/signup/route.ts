import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import { sendWelcomeEmail } from "@/lib/email";

export async function POST(request: NextRequest) {
  try {
    const { email, password, firstName, lastName, phone, role, committeeCode } = await request.json();

    // Validation
    if (!email || !password || !role || !firstName || !lastName) {
      return NextResponse.json(
        { error: "Email, mot de passe, prénom et nom sont requis" },
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

    // Pour les comités, vérifier le code unique en base de données
    let validCommitteeCode = null;
    if (role === "COMITE") {
      if (!committeeCode) {
        return NextResponse.json(
          { error: "Le code comité est requis" },
          { status: 400 }
        );
      }

      // Rechercher le code en base de données
      validCommitteeCode = await prisma.committeeCode.findUnique({
        where: { code: committeeCode },
      });

      if (!validCommitteeCode) {
        return NextResponse.json(
          { error: "Code comité invalide" },
          { status: 400 }
        );
      }

      if (validCommitteeCode.isUsed) {
        return NextResponse.json(
          { error: "Ce code comité a déjà été utilisé" },
          { status: 400 }
        );
      }

      // Vérifier l'expiration si définie
      if (validCommitteeCode.expiresAt && new Date() > validCommitteeCode.expiresAt) {
        return NextResponse.json(
          { error: "Ce code comité a expiré" },
          { status: 400 }
        );
      }
    }

    // Hasher le mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    // Générer un token de vérification unique
    const verificationToken = crypto.randomBytes(32).toString("hex");

    // Créer l'utilisateur avec vérification email à false
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        firstName,
        lastName,
        phone,
        role,
        committeeCodeUsed: role === "COMITE" ? committeeCode : null,
        emailVerified: false, // L'utilisateur doit vérifier son email
        verificationToken,
      },
    });

    // Si c'est un comité, marquer le code comme utilisé
    if (role === "COMITE" && validCommitteeCode) {
      await prisma.committeeCode.update({
        where: { code: committeeCode },
        data: {
          isUsed: true,
          usedBy: user.id,
        },
      });
    }

    // Envoyer l'email de bienvenue avec les identifiants et le lien de vérification
    try {
      await sendWelcomeEmail({
        to: email,
        name: `${firstName} ${lastName}`,
        email,
        password, // Le mot de passe en clair (avant hashage)
        role,
        verificationToken,
      });
      console.log(`📧 Email de bienvenue envoyé à ${email}`);
    } catch (emailError) {
      console.error("⚠️ Erreur lors de l'envoi de l'email:", emailError);
      // En cas d'erreur email, on supprime l'utilisateur créé
      await prisma.user.delete({ where: { id: user.id } });
      return NextResponse.json(
        { error: "Erreur lors de l'envoi de l'email de vérification. Veuillez réessayer." },
        { status: 500 }
      );
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
