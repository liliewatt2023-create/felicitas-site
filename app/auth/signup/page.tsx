"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

function SignUpForm() {
  const searchParams = useSearchParams();
  const roleParam = searchParams.get("role");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState(roleParam || "particulier");
  const [committeeCode, setCommitteeCode] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (roleParam) {
      setRole(roleParam);
    }
  }, [roleParam]);

  const getRoleName = (r: string) => {
    switch (r) {
      case "particulier":
        return "Client Particulier";
      case "restaurateur":
        return "Client Restaurateur";
      case "comite":
        return "Comité d'Entreprise";
      default:
        return r;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Validation
    if (!email || !password) {
      setError("Tous les champs sont requis");
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas");
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setError("Le mot de passe doit contenir au moins 6 caractères");
      setLoading(false);
      return;
    }

    if (role === "comite" && !committeeCode) {
      setError("Le code comité est requis");
      setLoading(false);
      return;
    }

    try {
      // Créer le compte
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          password,
          role: role.toUpperCase(),
          committeeCode,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Erreur lors de l'inscription");
        setLoading(false);
        return;
      }

      // Afficher le message de succès
      setSuccess(true);
      setLoading(false);

      // Réinitialiser le formulaire
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setCommitteeCode("");
    } catch (err) {
      setError("Erreur serveur");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
        {success ? (
          <>
            <div className="text-center mb-6">
              <div className="text-6xl mb-4">📧</div>
              <h1 className="text-3xl font-bold text-primary mb-4">
                Compte créé avec succès !
              </h1>
            </div>

            <div className="bg-green-100 border border-green-400 text-green-700 px-6 py-4 rounded-lg mb-6">
              <p className="font-semibold mb-2">
                Un email de vérification vous a été envoyé !
              </p>
              <p className="text-sm">
                Vérifiez votre boîte mail (et vos spams) et cliquez sur le lien de vérification pour activer votre compte.
              </p>
            </div>

            <div className="bg-ivory p-6 rounded-lg mb-6">
              <h3 className="font-bold text-primary mb-3">Prochaines étapes :</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>📬 Consultez votre boîte email</li>
                <li>✉️ Cliquez sur le lien de vérification</li>
                <li>✅ Votre compte sera activé automatiquement</li>
                <li>🔑 Connectez-vous avec vos identifiants</li>
                <li>🛒 Commencez vos achats !</li>
              </ul>
            </div>

            <div className="space-y-4">
              <Link
                href="/auth/signin"
                className="block w-full bg-primary text-ivory py-3 rounded-lg hover:bg-primary-light transition-colors duration-200 font-semibold text-center"
              >
                Se connecter maintenant
              </Link>

              <button
                onClick={() => setSuccess(false)}
                className="w-full text-primary hover:text-accent transition-colors font-semibold"
              >
                Créer un autre compte
              </button>
            </div>
          </>
        ) : (
          <>
            <h1 className="text-3xl font-bold text-center mb-6 text-primary">
              Créer un compte
            </h1>

            <div className="mb-6 text-center">
              <span className="text-gray-600">Type de compte : </span>
              <span className="font-bold text-primary">{getRoleName(role)}</span>
            </div>

            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                {error}
              </div>
            )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              required
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Mot de passe
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              required
              minLength={6}
            />
          </div>

          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Confirmer le mot de passe
            </label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              required
              minLength={6}
            />
          </div>

          {role === "comite" && (
            <div>
              <label
                htmlFor="committeeCode"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Code Comité d'Entreprise
              </label>
              <input
                type="text"
                id="committeeCode"
                value={committeeCode}
                onChange={(e) => setCommitteeCode(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="Entrez votre code comité"
                required
              />
              <p className="text-xs text-gray-500 mt-1">
                Contactez-nous pour obtenir un code comité
              </p>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-ivory py-3 rounded-lg hover:bg-primary-light transition-colors duration-200 font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Création en cours..." : "Créer mon compte"}
          </button>
        </form>

            <div className="mt-6 text-center">
              <Link
                href="/"
                className="text-sm text-gray-600 hover:text-primary transition-colors"
              >
                ← Retour à l'accueil
              </Link>
            </div>

            <div className="mt-4 text-center">
              <span className="text-sm text-gray-600">Déjà un compte ? </span>
              <Link
                href="/auth/signin"
                className="text-sm text-primary hover:text-accent font-semibold"
              >
                Se connecter
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default function SignUpPage() {
  return (
    <Suspense fallback={<div className="min-h-[80vh] flex items-center justify-center"><div className="text-xl text-primary">Chargement...</div></div>}>
      <SignUpForm />
    </Suspense>
  );
}
