"use client";

import Link from "next/link";
import Image from "next/image";
import { useSession, signOut } from "next-auth/react";
import { usePathname } from "next/navigation";

export default function Header() {
  const { data: session } = useSession();
  const pathname = usePathname();

  return (
    <header className="bg-primary text-ivory shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-3">
            <Image
              src="/images/logo.png"
              alt="Charcuterie Felicita"
              width={80}
              height={80}
              className="rounded-lg shadow-lg"
              priority
            />
            <h1 className="text-2xl font-bold">Charcuterie Felicita</h1>
          </Link>

          <nav className="hidden md:flex items-center space-x-6">
            <Link
              href="/"
              className="hover:text-accent transition-colors duration-200"
            >
              Accueil
            </Link>

            {session?.user && (
              <>
                <Link
                  href={`/shop/${session.user.role.toLowerCase()}`}
                  className="hover:text-accent transition-colors duration-200"
                >
                  Boutique
                </Link>
                <Link
                  href="/cart"
                  className="hover:text-accent transition-colors duration-200"
                >
                  Panier
                </Link>
                <Link
                  href="/account"
                  className="hover:text-accent transition-colors duration-200"
                >
                  Mon compte
                </Link>
              </>
            )}

            <a
              href="tel:0604110550"
              className="hover:text-wood transition-colors duration-200 font-semibold"
            >
              📞 06 04 11 05 50
            </a>

            {session?.user ? (
              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="bg-accent text-ivory px-4 py-2 rounded-lg hover:bg-accent-light transition-colors duration-200 font-semibold"
              >
                Déconnexion
              </button>
            ) : (
              <Link
                href="/auth/signin"
                className="bg-accent text-ivory px-4 py-2 rounded-lg hover:bg-accent-light transition-colors duration-200 font-semibold"
              >
                Connexion
              </Link>
            )}
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <a
              href="tel:0604110550"
              className="text-accent font-bold text-lg"
            >
              📞 06 04 11 05 50
            </a>
          </div>
        </div>

        {/* Mobile menu */}
        <nav className="md:hidden mt-4 flex flex-col space-y-2">
          <Link
            href="/"
            className="hover:text-accent transition-colors duration-200"
          >
            Accueil
          </Link>

          {session?.user && (
            <>
              <Link
                href={`/shop/${session.user.role.toLowerCase()}`}
                className="hover:text-accent transition-colors duration-200"
              >
                Boutique
              </Link>
              <Link
                href="/cart"
                className="hover:text-accent transition-colors duration-200"
              >
                Panier
              </Link>
              <Link
                href="/account"
                className="hover:text-accent transition-colors duration-200"
              >
                Mon compte
              </Link>
              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="text-left hover:text-accent transition-colors duration-200"
              >
                Déconnexion
              </button>
            </>
          )}

          {!session?.user && (
            <Link
              href="/auth/signin"
              className="hover:text-accent transition-colors duration-200"
            >
              Connexion
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
