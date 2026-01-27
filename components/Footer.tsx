import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-primary text-ivory mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Charcuterie Felicita</h3>
            <p className="text-sm mb-4">
              Charcuterie artisanale corse et italienne d'exception. Produits
              affinés et fumés selon la tradition.
            </p>
            <p className="text-accent font-bold">📞 06 04 11 05 50</p>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Informations</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/#a-propos" className="hover:text-accent transition-colors">
                  À propos
                </Link>
              </li>
              <li>
                <Link href="/#produits" className="hover:text-accent transition-colors">
                  Nos produits
                </Link>
              </li>
              <li>
                <Link href="/#livraison" className="hover:text-accent transition-colors">
                  Livraison
                </Link>
              </li>
              <li>
                <Link href="/#contact" className="hover:text-accent transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Légal</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/legal/mentions-legales" className="hover:text-accent transition-colors">
                  Mentions légales
                </Link>
              </li>
              <li>
                <Link href="/legal/cgv" className="hover:text-accent transition-colors">
                  CGV
                </Link>
              </li>
              <li>
                <Link href="/legal/politique-confidentialite" className="hover:text-accent transition-colors">
                  Politique de confidentialité
                </Link>
              </li>
              <li>
                <Link href="/legal/cgu" className="hover:text-accent transition-colors">
                  CGU
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-light mt-8 pt-8 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} Charcuterie Felicita. Tous droits réservés.</p>
          <p className="mt-3 text-sm text-wood font-semibold flex items-center justify-center gap-2 flex-wrap">
            <span className="flex items-center">
              🔒 Boutique en ligne sécurisée
            </span>
            <span className="hidden md:inline">•</span>
            <span className="flex items-center">
              💳 Paiement par Stripe
            </span>
            <span className="hidden md:inline">•</span>
            <span className="flex items-center">
              🛡️ Données protégées
            </span>
          </p>
          <p className="mt-3 text-xs text-gray-300">
            Transactions 100% sécurisées - SSL/TLS - Conformité RGPD
          </p>
        </div>
      </div>
    </footer>
  );
}
