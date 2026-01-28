"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { Product } from "@prisma/client";

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
            <div className="relative aspect-video bg-charcoal rounded-3xl overflow-hidden group cursor-pointer m-4">
              <video
                ref={videoRef}
                controls
                playsInline
                className="w-full h-full object-cover rounded-3xl"
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
                  className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/40 transition-all cursor-pointer rounded-3xl"
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
            <p className="text-charcoal mb-2">
              Une autre question ? Contactez-nous :
            </p>
            <p className="mb-2">
              <a href="tel:0604110550" className="text-accent font-bold hover:underline text-lg">
                📞 06 04 11 05 50
              </a>
            </p>
            <p>
              <a href="mailto:contact@boutique-felicita.fr" className="text-accent font-bold hover:underline">
                ✉️ contact@boutique-felicita.fr
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const scrollToSignup = () => {
    const signupSection = document.getElementById('signup-section');
    if (signupSection) {
      signupSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const [productsRes, reviewsRes] = await Promise.all([
          fetch("/api/public/products"),
          fetch("/api/public/reviews"),
        ]);
        const productsData = await productsRes.json();
        const reviewsData = await reviewsRes.json();

        // Ensure we always set arrays, even if API returns error
        setProducts(Array.isArray(productsData) ? productsData : []);
        setReviews(Array.isArray(reviewsData) ? reviewsData : []);
      } catch (error) {
        console.error("Error fetching data:", error);
        setProducts([]);
        setReviews([]);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

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
              alt="Boutique Felicita"
              width={200}
              height={200}
              className="rounded-2xl shadow-2xl"
              priority
            />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Boutique Felicita
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

      {/* Nos Produits d'Exception */}
      <section className="py-16 bg-ivory">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-primary mb-4">
              Découvrez Nos Produits d'Exception
            </h2>
            <p className="text-xl text-charcoal max-w-3xl mx-auto">
              Une sélection authentique de charcuterie corse et italienne, affinée avec soin
            </p>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                {products.map((product) => (
                  <div
                    key={product.id}
                    className="group bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border-2 border-transparent hover:border-accent"
                  >
                    <div className="relative h-56 bg-gradient-to-br from-primary to-primary-light overflow-hidden">
                      {product.image ? (
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-300"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                      ) : (
                        <div className="flex items-center justify-center h-full">
                          <span className="text-7xl">
                            {product.category === "CHARCUTERIE" ? "🥓" : "🧀"}
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="p-6">
                      <h3 className="text-2xl font-bold text-primary mb-3 group-hover:text-accent transition-colors">
                        {product.name}
                      </h3>

                      <p className="text-charcoal mb-4 line-clamp-3">
                        {product.description}
                      </p>

                      <div className="flex items-center justify-between mt-4">
                        <span
                          className={`inline-block px-4 py-2 rounded-full text-sm font-semibold ${
                            product.category === "CHARCUTERIE"
                              ? "bg-charcuterie text-ivory"
                              : "bg-accent text-ivory"
                          }`}
                        >
                          {product.category === "CHARCUTERIE"
                            ? "Charcuterie"
                            : "Fromage"}
                        </span>

                        <button
                          onClick={scrollToSignup}
                          className="bg-primary text-ivory px-4 py-2 rounded-lg text-sm font-semibold hover:bg-accent transition-colors"
                        >
                          En savoir plus →
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {products.length > 0 && (
                <div className="text-center mt-12">
                  <p className="text-lg text-charcoal mb-4">
                    Connectez-vous pour découvrir tous nos produits et leurs tarifs
                  </p>
                  <Link
                    href="/auth/signin"
                    className="inline-block bg-accent text-ivory px-8 py-4 rounded-lg text-lg font-bold hover:bg-charcuterie transition-colors"
                  >
                    Voir Tous Les Produits →
                  </Link>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* Vous êtes Section */}
      <section id="signup-section" className="py-16 scroll-mt-20">
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
            Pourquoi choisir Boutique Felicita ?
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
      <section className="py-16 bg-gradient-to-br from-green-50 via-ivory to-green-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-block bg-green-600 text-white px-6 py-2 rounded-full font-bold mb-4">
                ✓ Qualité Garantie
              </div>
              <h2 className="text-4xl font-bold text-primary mb-6">
                Notre engagement qualité
              </h2>
              <p className="text-lg text-charcoal leading-relaxed max-w-3xl mx-auto">
                Chez Boutique Felicita, chaque produit est sélectionné avec exigence.
                Nous privilégions des méthodes artisanales, des matières premières de qualité
                et des temps d'affinage respectés, pour garantir un goût authentique et constant.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-start space-x-4 bg-white p-6 rounded-xl shadow-lg border-l-4 border-green-600 hover:shadow-xl transition-all">
                <div className="text-3xl flex-shrink-0 bg-green-100 w-12 h-12 rounded-full flex items-center justify-center">
                  ✓
                </div>
                <div>
                  <h3 className="font-bold text-lg text-green-800 mb-2">Sélection rigoureuse des pièces</h3>
                  <p className="text-charcoal">Chaque produit est contrôlé et sélectionné avec soin pour garantir une qualité optimale</p>
                </div>
              </div>

              <div className="flex items-start space-x-4 bg-white p-6 rounded-xl shadow-lg border-l-4 border-blue-600 hover:shadow-xl transition-all">
                <div className="text-3xl flex-shrink-0 bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center">
                  ⏳
                </div>
                <div>
                  <h3 className="font-bold text-lg text-blue-800 mb-2">Affinage lent et contrôlé</h3>
                  <p className="text-charcoal">Temps d'affinage traditionnels respectés pour sublimer les saveurs</p>
                </div>
              </div>

              <div className="flex items-start space-x-4 bg-white p-6 rounded-xl shadow-lg border-l-4 border-orange-600 hover:shadow-xl transition-all">
                <div className="text-3xl flex-shrink-0 bg-orange-100 w-12 h-12 rounded-full flex items-center justify-center">
                  🔥
                </div>
                <div>
                  <h3 className="font-bold text-lg text-orange-800 mb-2">Fumage traditionnel au bois</h3>
                  <p className="text-charcoal">Méthodes ancestrales préservées pour un goût authentique et fumé</p>
                </div>
              </div>

              <div className="flex items-start space-x-4 bg-white p-6 rounded-xl shadow-lg border-l-4 border-purple-600 hover:shadow-xl transition-all">
                <div className="text-3xl flex-shrink-0 bg-purple-100 w-12 h-12 rounded-full flex items-center justify-center">
                  📋
                </div>
                <div>
                  <h3 className="font-bold text-lg text-purple-800 mb-2">Conservation maîtrisée et traçabilité</h3>
                  <p className="text-charcoal">De la fabrication à la livraison, un suivi rigoureux à chaque étape</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Notre Histoire - Terroir Corse */}
      <section className="py-16 bg-gradient-to-b from-amber-50 via-orange-50 to-ivory">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-block bg-gradient-to-r from-orange-600 to-red-600 text-white px-6 py-2 rounded-full font-bold mb-4">
                🏔️ Terroir Authentique
              </div>
              <h2 className="text-4xl font-bold text-primary mb-4">
                L'Âme de la Corse dans Chaque Produit
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <div className="bg-gradient-to-br from-white to-orange-50 p-8 rounded-3xl shadow-xl border-2 border-orange-200 hover:shadow-2xl transition-all">
                <div className="text-6xl mb-6 text-center">🏔️</div>
                <h3 className="text-2xl font-bold text-orange-800 mb-4 text-center">
                  Un Terroir d'Exception
                </h3>
                <p className="text-charcoal leading-relaxed mb-4">
                  La Corse, île de beauté aux montagnes vertigineuses et aux vallées
                  préservées, offre un terroir unique pour l'élevage traditionnel.
                </p>
                <p className="text-charcoal leading-relaxed">
                  Nos cochons, nourris aux châtaignes corses, évoluent en semi-liberté
                  dans le maquis. Cette alimentation naturelle, associée au climat
                  méditerranéen, confère à notre charcuterie des arômes incomparables.
                </p>
              </div>

              <div className="bg-gradient-to-br from-white to-green-50 p-8 rounded-3xl shadow-xl border-2 border-green-200 hover:shadow-2xl transition-all">
                <div className="text-6xl mb-6 text-center">👨‍🌾</div>
                <h3 className="text-2xl font-bold text-green-800 mb-4 text-center">
                  Des Producteurs Passionnés
                </h3>
                <p className="text-charcoal leading-relaxed mb-4">
                  Depuis des générations, nos artisans perpétuent un savoir-faire
                  ancestral transmis de père en fils. Chaque geste, du salage au
                  fumage, respecte les méthodes traditionnelles.
                </p>
                <p className="text-charcoal leading-relaxed">
                  Dans les caves d'affinage de montagne, l'air frais et pur
                  des Alpes et de Corse sublime naturellement nos produits pendant
                  plusieurs mois, révélant toute leur complexité aromatique.
                </p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-white to-amber-50 p-10 rounded-3xl shadow-2xl border-2 border-amber-200">
              <div className="flex items-center justify-center mb-6 space-x-4">
                <div className="text-6xl animate-bounce">🌰</div>
                <div className="text-6xl">🐗</div>
                <div className="text-6xl animate-pulse">🔥</div>
              </div>
              <h3 className="text-3xl font-bold bg-gradient-to-r from-amber-800 to-orange-800 bg-clip-text text-transparent mb-6 text-center">
                La Tradition de la Châtaigne
              </h3>
              <p className="text-charcoal text-lg leading-relaxed text-center max-w-3xl mx-auto">
                La châtaigne, or brun de la Corse, est au cœur de notre tradition
                charcutière. Cette alimentation noble donne à notre charcuterie une
                texture fondante et des notes douces de noisette. Le fumage au bois
                de châtaignier ajoute une dernière touche de caractère à ces produits
                d'exception.
              </p>
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
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-4 text-primary">
              Ce Que Disent Nos Clients
            </h2>
            <p className="text-center text-charcoal mb-12 text-lg">
              Tous les avis sont vérifiés avant publication
            </p>

            {loading ? (
              <div className="text-center py-12">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
              </div>
            ) : reviews.length > 0 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                  {reviews.slice(0, 6).map((review) => (
                    <div
                      key={review.id}
                      className="bg-ivory rounded-xl shadow-lg p-6 hover:shadow-2xl transition-all duration-300"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div className="text-2xl">
                          {"⭐".repeat(review.rating)}
                        </div>
                        <span className="text-sm text-gray-600">
                          {new Date(review.createdAt).toLocaleDateString("fr-FR", {
                            year: "numeric",
                            month: "long",
                          })}
                        </span>
                      </div>

                      <p className="text-charcoal mb-4 leading-relaxed">
                        {review.comment}
                      </p>

                      {review.product && (
                        <p className="text-sm text-gray-600 italic">
                          Produit: {review.product.name}
                        </p>
                      )}
                    </div>
                  ))}
                </div>

                <div className="bg-ivory p-6 rounded-xl shadow-lg text-center">
                  <p className="text-charcoal mb-2">
                    <strong>{reviews.length}+ avis clients vérifiés</strong>
                  </p>
                  <p className="text-sm text-gray-600">
                    Chaque avis est contrôlé avant publication pour garantir son authenticité
                  </p>
                </div>
              </>
            ) : (
              <div className="bg-ivory p-8 rounded-xl shadow-lg text-center">
                <div className="text-5xl mb-4">⭐⭐⭐⭐⭐</div>
                <p className="text-charcoal mb-4">
                  Les avis publiés sur Boutique Felicita sont soumis à vérification
                  avant mise en ligne afin de garantir leur authenticité.
                </p>
                <p className="text-sm text-gray-600 italic">
                  Vos retours sont précieux et nous aident à maintenir notre niveau d'exigence.
                </p>
              </div>
            )}
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

          <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-8">
            <Link
              href="/auth/signup"
              className="bg-accent text-ivory px-8 py-4 rounded-lg text-lg font-bold hover:bg-charcuterie transition-colors"
            >
              Créer Mon Compte
            </Link>
            <Link
              href="/auth/signin"
              className="bg-ivory text-primary px-8 py-4 rounded-lg text-lg font-bold hover:bg-wood transition-colors"
            >
              Se Connecter
            </Link>
          </div>

          <div className="max-w-3xl mx-auto border-t border-ivory/30 pt-8 mt-8">
            <p className="text-wood text-2xl font-bold mb-2">
              📞 06 04 11 05 50
            </p>
            <p className="text-wood text-xl font-bold mb-6">
              ✉️ contact@boutique-felicita.fr
            </p>

            <div className="mb-6">
              <p className="text-lg mb-4">Suivez-nous sur les réseaux sociaux</p>
              <div className="flex items-center justify-center gap-6">
                <a
                  href="https://www.instagram.com/felicita.corse?igsh=aXh4c3lwcDVodWg2"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-ivory text-primary w-12 h-12 rounded-full flex items-center justify-center hover:bg-accent hover:text-ivory transition-all transform hover:scale-110"
                  aria-label="Instagram"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
                <a
                  href="https://www.facebook.com/share/1CRq49qqyE/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-ivory text-primary w-12 h-12 rounded-full flex items-center justify-center hover:bg-accent hover:text-ivory transition-all transform hover:scale-110"
                  aria-label="Facebook"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
              </div>
            </div>

            <p className="text-sm text-ivory/80">
              Produits artisanaux de Corse et d'Italie • Livraison en France
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
