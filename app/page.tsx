"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useRef } from "react";

function VideoSection() {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handlePlayClick = () => {
    if (videoRef.current) {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  return (
    <section className="py-16 bg-gradient-to-b from-wood to-ivory">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border-4 border-primary/20">
            <div className="p-4 bg-gradient-to-r from-wood via-ivory to-wood/80">
              <h2 className="text-3xl font-bold text-center text-primary">
                Découvrez notre savoir-faire
              </h2>
            </div>
            <div className="relative aspect-video bg-charcoal rounded-2xl overflow-hidden group cursor-pointer">
              <video
                ref={videoRef}
                controls
                playsInline
                className="w-full h-full object-cover rounded-2xl"
                preload="auto"
                poster="/images/affinage.jpg"
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                onEnded={() => setIsPlaying(false)}
              >
                <source src="/videos/video2.mp4" type="video/mp4" />
                Votre navigateur ne supporte pas la lecture de vidéos.
              </video>
              {/* Play Button Overlay - only show when not playing */}
              {!isPlaying && (
                <div
                  className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/40 transition-all cursor-pointer"
                  onClick={handlePlayClick}
                >
                  <div className="w-20 h-20 rounded-full bg-white/90 flex items-center justify-center shadow-2xl transform group-hover:scale-110 transition-transform">
                    <div className="w-0 h-0 border-t-[15px] border-t-transparent border-l-[25px] border-l-primary border-b-[15px] border-b-transparent ml-1"></div>
                  </div>
                </div>
              )}
            </div>
            <div className="p-6 bg-gradient-to-b from-ivory to-wood/20">
              <p className="text-center text-lg text-charcoal font-medium">
                Des produits d'exception, une tradition préservée
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "D'où proviennent vos cochons ?",
      answer: "Fidèles aux traditions corses, nos cochons sont nourris à la châtaigne, un élément emblématique de l'alimentation insulaire. Cette attention portée à l'alimentation, combinée à un savoir-faire artisanal, donne à notre charcuterie un goût unique, riche et profondément authentique.",
      emoji: "🐷"
    },
    {
      question: "D'où proviennent vos produits ?",
      answer: "Nos produits sont issus de filières corses et italiennes sélectionnées pour leur savoir-faire traditionnel et leur engagement qualité.",
      emoji: "📍"
    },
    {
      question: "Comment sont expédiées les commandes ?",
      answer: "Les commandes sont préparées avec soin et expédiées dans des conditions adaptées aux produits pour garantir leur fraîcheur et leur qualité.",
      emoji: "📦"
    },
    {
      question: "Le paiement est-il sécurisé ?",
      answer: "Oui, tous les paiements sont sécurisés via Stripe, leader mondial du paiement en ligne. Vos données bancaires sont cryptées et protégées.",
      emoji: "🔒"
    }
  ];

  return (
    <section className="py-16 bg-ivory">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-primary">
            Questions fréquentes
          </h2>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full p-6 text-left flex items-start justify-between hover:bg-ivory/50 transition-colors"
                >
                  <div className="flex items-start flex-1">
                    <span className="text-accent text-2xl mr-4 flex-shrink-0">
                      {faq.emoji}
                    </span>
                    <h3 className="text-xl font-bold text-primary pr-4">
                      {faq.question}
                    </h3>
                  </div>
                  <span className="text-primary text-2xl flex-shrink-0">
                    {openIndex === index ? "−" : "+"}
                  </span>
                </button>

                {openIndex === index && (
                  <div className="px-6 pb-6 pt-0">
                    <p className="text-charcoal ml-12 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <p className="text-charcoal">
              Une autre question ? Contactez-nous au{" "}
              <a href="tel:0604110550" className="text-accent font-bold hover:underline">
                06 04 11 05 50
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section avec Vidéo */}
      <section className="relative bg-gradient-to-b from-primary to-primary-light text-ivory py-20 overflow-hidden">
        {/* Vidéo en arrière-plan */}
        <div className="absolute inset-0 z-0 opacity-30">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          >
            <source src="/videos/video.mp4" type="video/mp4" />
          </video>
        </div>

        {/* Overlay pour améliorer la lisibilité */}
        <div className="absolute inset-0 bg-primary/50 z-0"></div>

        {/* Contenu */}
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="flex justify-center mb-8">
            <Image
              src="/images/logo.png"
              alt="Charcuterie Felicita"
              width={200}
              height={200}
              className="rounded-2xl shadow-2xl"
              priority
            />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Charcuterie Felicita
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            Découvrez notre sélection de charcuterie artisanale corse et
            italienne. Produits d'exception, affinés et fumés selon la
            tradition.
          </p>
          <p className="text-wood text-2xl font-bold mb-4">
            📞 06 04 11 05 50
          </p>
        </div>
      </section>

      {/* Section Vidéo Présentation */}
      <VideoSection />

      {/* Vous êtes Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 text-primary">
            Vous êtes...
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Particuliers */}
            <Link
              href="/auth/signup?role=particulier"
              className="group bg-ivory rounded-xl shadow-lg p-8 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-2 border-transparent hover:border-accent"
            >
              <div className="text-center">
                <div className="text-6xl mb-6">👤</div>
                <h3 className="text-2xl font-bold mb-4 text-primary group-hover:text-accent transition-colors">
                  Clients Particuliers
                </h3>
                <p className="text-charcoal mb-6">
                  Découvrez nos produits d'exception pour vos tables festives et
                  moments de partage
                </p>
                <div className="bg-charcuterie text-ivory px-4 py-2 rounded-lg inline-block font-semibold">
                  Charcuterie : 99€/kg
                  <br />
                  Fromage : 79€/kg
                </div>
              </div>
            </Link>

            {/* Comités d'entreprise */}
            <Link
              href="/auth/signup?role=comite"
              className="group bg-ivory rounded-xl shadow-lg p-8 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-2 border-transparent hover:border-accent"
            >
              <div className="text-center">
                <div className="text-6xl mb-6">🏢</div>
                <h3 className="text-2xl font-bold mb-4 text-primary group-hover:text-accent transition-colors">
                  Comités d'Entreprise
                </h3>
                <p className="text-charcoal mb-6">
                  Offrez à vos collaborateurs des produits d'exception à tarifs
                  préférentiels
                </p>
                <div className="bg-accent text-ivory px-4 py-2 rounded-lg inline-block font-bold">
                  Tarif spécial avec code
                  <br />
                  Charcuterie : 69€/kg
                  <br />
                  Fromage : 49€/kg
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-wood py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-primary">
            Pourquoi choisir Felicita ?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-6xl mx-auto">
            <div className="text-center">
              <div className="text-5xl mb-4">🏔️</div>
              <h3 className="text-xl font-bold mb-2 text-primary">
                Origine garantie
              </h3>
              <p className="text-charcoal">
                Produits corses et italiens authentiques
              </p>
            </div>

            <div className="text-center">
              <div className="text-5xl mb-4">👨‍🍳</div>
              <h3 className="text-xl font-bold mb-2 text-primary">
                Savoir-faire artisanal
              </h3>
              <p className="text-charcoal">
                Fabrication traditionnelle et affinée
              </p>
            </div>

            <div className="text-center">
              <div className="text-5xl mb-4">🔒</div>
              <h3 className="text-xl font-bold mb-2 text-primary">
                Paiement sécurisé
              </h3>
              <p className="text-charcoal">
                Transactions protégées par Stripe
              </p>
            </div>

            <div className="text-center">
              <div className="text-5xl mb-4">🚚</div>
              <h3 className="text-xl font-bold mb-2 text-primary">
                Livraison rapide
              </h3>
              <p className="text-charcoal">
                Expédition soignée et sécurisée
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Notre engagement qualité */}
      <section className="py-16 bg-ivory">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8 text-primary">
              Notre engagement qualité
            </h2>
            <p className="text-lg text-center text-charcoal mb-8 leading-relaxed">
              Chez Charcuterie Felicita, chaque produit est sélectionné avec exigence.
              <br />
              Nous privilégions des méthodes artisanales, des matières premières de qualité
              <br />
              et des temps d'affinage respectés, pour garantir un goût authentique et constant.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-start space-x-3 bg-white p-4 rounded-lg shadow">
                <div className="text-2xl flex-shrink-0">✓</div>
                <div>
                  <h3 className="font-bold text-primary">Sélection rigoureuse des pièces</h3>
                  <p className="text-sm text-charcoal">Chaque produit est contrôlé et sélectionné</p>
                </div>
              </div>

              <div className="flex items-start space-x-3 bg-white p-4 rounded-lg shadow">
                <div className="text-2xl flex-shrink-0">✓</div>
                <div>
                  <h3 className="font-bold text-primary">Affinage lent et contrôlé</h3>
                  <p className="text-sm text-charcoal">Temps d'affinage traditionnels respectés</p>
                </div>
              </div>

              <div className="flex items-start space-x-3 bg-white p-4 rounded-lg shadow">
                <div className="text-2xl flex-shrink-0">✓</div>
                <div>
                  <h3 className="font-bold text-primary">Fumage traditionnel au bois</h3>
                  <p className="text-sm text-charcoal">Méthodes ancestrales préservées</p>
                </div>
              </div>

              <div className="flex items-start space-x-3 bg-white p-4 rounded-lg shadow">
                <div className="text-2xl flex-shrink-0">✓</div>
                <div>
                  <h3 className="font-bold text-primary">Conservation maîtrisée et traçabilité</h3>
                  <p className="text-sm text-charcoal">De la fabrication à la livraison</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Fabrication & Affinage */}
      <section className="py-16 bg-ivory relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center max-w-6xl mx-auto">
            {/* Image */}
            <div className="order-2 md:order-1">
              <Image
                src="/images/affinage.jpg"
                alt="Affinage traditionnel"
                width={600}
                height={400}
                className="rounded-2xl shadow-2xl"
              />
            </div>

            {/* Contenu */}
            <div className="order-1 md:order-2">
              <div className="flex space-x-4 mb-6">
                <div className="text-5xl">⏳</div>
                <div className="text-5xl">🌲</div>
              </div>
              <h2 className="text-3xl font-bold mb-6 text-primary">
                Fabrication & Affinage
              </h2>
              <p className="text-lg leading-relaxed mb-4 text-charcoal">
                Nos charcuteries sont préparées selon des recettes traditionnelles,
                avec un affinage pouvant aller jusqu'à plusieurs mois.
              </p>
              <p className="text-lg leading-relaxed mb-4 text-charcoal">
                Chaque étape est pensée pour révéler les arômes naturels de la viande,
                sans artifice ni compromis.
              </p>
              <p className="mt-6 text-sm text-gray-600 italic bg-white p-4 rounded-lg border-l-4 border-primary">
                Origine, méthodes de fabrication et conditions de conservation disponibles sur demande.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Avis clients vérifiés */}
      <section className="py-16 bg-wood">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-6 text-primary">
              Avis clients vérifiés
            </h2>
            <div className="bg-ivory p-8 rounded-xl shadow-lg text-center">
              <div className="text-5xl mb-4">⭐⭐⭐⭐⭐</div>
              <p className="text-charcoal mb-4">
                Les avis publiés sur Charcuterie Felicita sont soumis à vérification
                avant mise en ligne afin de garantir leur authenticité.
              </p>
              <p className="text-sm text-gray-600 italic">
                Vos retours sont précieux et nous aident à maintenir notre niveau d'exigence.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <FAQSection />

      {/* CTA Section */}
      <section className="bg-primary text-ivory py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Prêt à découvrir nos produits ?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Créez votre compte maintenant et accédez à notre boutique en ligne
          </p>
          <p className="text-wood text-2xl font-bold">
            Contact : 06 04 11 05 50
          </p>
        </div>
      </section>
    </div>
  );
}
