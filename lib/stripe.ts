import Stripe from "stripe";

let stripeInstance: Stripe | null = null;

/**
 * Retourne une instance Stripe (lazy initialization)
 * Évite les erreurs de build quand STRIPE_SECRET_KEY n'est pas disponible
 */
export function getStripe(): Stripe {
  if (!stripeInstance) {
    if (!process.env.STRIPE_SECRET_KEY) {
      throw new Error("STRIPE_SECRET_KEY n'est pas défini dans les variables d'environnement");
    }

    stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: "2025-12-15.clover",
    });
  }

  return stripeInstance;
}
