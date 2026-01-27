export default function CGVPage() {
  return (
    <div className="min-h-screen py-16 bg-ivory">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8">
          <h1 className="text-4xl font-bold text-primary mb-8">Conditions Générales de Vente</h1>

          <div className="space-y-8 text-charcoal">
            {/* Préambule */}
            <section>
              <p className="mb-4">
                Les présentes Conditions Générales de Vente (CGV) régissent les relations contractuelles entre FELICITA (NOUGABAYT),
                SAS au capital de 1 000,00 €, immatriculée au RCS de Bordeaux sous le numéro 988 009 155,
                dont le siège social est situé 41 rue Professeur Calmette, 33150 CENON (ci-après "le Vendeur"),
                et toute personne physique ou morale souhaitant effectuer un achat via le site www.charcuteriefelicita.fr (ci-après "le Client").
              </p>
              <p>
                Date de dernière mise à jour : {new Date().toLocaleDateString('fr-FR')}
              </p>
            </section>

            {/* Article 1 */}
            <section>
              <h2 className="text-2xl font-bold text-primary mb-4">Article 1 - Objet</h2>
              <p>
                Les présentes CGV ont pour objet de définir les droits et obligations des parties dans le cadre de la vente en ligne
                de produits de charcuterie et fromages proposés par le Vendeur au Client.
              </p>
            </section>

            {/* Article 2 */}
            <section>
              <h2 className="text-2xl font-bold text-primary mb-4">Article 2 - Produits</h2>
              <p className="mb-4">
                Les produits proposés à la vente sont des produits de charcuterie corse et italienne, ainsi que des fromages,
                vendus au kilogramme. Les produits sont présentés sur le site avec leurs caractéristiques essentielles
                (origine, poids, prix au kilogramme).
              </p>
              <p className="mb-4">
                Le Vendeur s'engage à fournir des produits conformes à la réglementation en vigueur en France et en Europe.
              </p>
              <p>
                <strong>Tarifs applicables :</strong>
              </p>
              <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
                <li>Clients Particuliers : Charcuterie 99€/kg - Fromage 79€/kg</li>
                <li>Comités d'Entreprise (avec code) : Charcuterie 69€/kg - Fromage 49€/kg</li>
              </ul>
            </section>

            {/* Article 3 */}
            <section>
              <h2 className="text-2xl font-bold text-primary mb-4">Article 3 - Prix</h2>
              <p className="mb-4">
                Les prix des produits sont indiqués en euros toutes taxes comprises (TTC), hors frais de livraison.
                Les prix incluent la TVA applicable au jour de la commande.
              </p>
              <p className="mb-4">
                Le Vendeur se réserve le droit de modifier ses prix à tout moment. Les produits seront facturés sur la base
                des tarifs en vigueur au moment de l'enregistrement de la commande.
              </p>
              <p>
                Les frais de livraison sont calculés en fonction du poids de la commande et de l'adresse de livraison.
                Ils sont indiqués avant la validation définitive de la commande.
              </p>
            </section>

            {/* Article 4 */}
            <section>
              <h2 className="text-2xl font-bold text-primary mb-4">Article 4 - Commande</h2>
              <p className="mb-4">
                Pour passer commande, le Client doit :
              </p>
              <ul className="list-decimal list-inside ml-4 space-y-2">
                <li>Créer un compte sur le site en fournissant des informations exactes et à jour</li>
                <li>Vérifier son adresse email via le lien de confirmation reçu</li>
                <li>Sélectionner les produits souhaités et les quantités</li>
                <li>Valider son panier</li>
                <li>Renseigner l'adresse de livraison</li>
                <li>Choisir le mode de paiement</li>
                <li>Accepter les présentes CGV</li>
                <li>Confirmer sa commande et procéder au paiement</li>
              </ul>
              <p className="mt-4">
                La commande est considérée comme définitive après paiement intégral et envoi d'un email de confirmation au Client.
              </p>
            </section>

            {/* Article 5 */}
            <section>
              <h2 className="text-2xl font-bold text-primary mb-4">Article 5 - Paiement</h2>
              <p className="mb-4">
                Le paiement s'effectue en ligne par carte bancaire via la plateforme sécurisée Stripe.
                Les cartes acceptées sont : Visa, Mastercard, American Express.
              </p>
              <p className="mb-4">
                Le débit de la carte bancaire intervient au moment de la validation de la commande.
              </p>
              <p>
                Les données de paiement sont cryptées et sécurisées. Le Vendeur ne conserve aucune donnée bancaire.
              </p>
            </section>

            {/* Article 6 */}
            <section>
              <h2 className="text-2xl font-bold text-primary mb-4">Article 6 - Livraison</h2>
              <p className="mb-4">
                Les produits sont livrés à l'adresse indiquée par le Client lors de la commande.
                Le Vendeur s'engage à expédier les produits dans des conditions adaptées garantissant leur fraîcheur et leur qualité.
              </p>
              <p className="mb-4">
                <strong>Délais de livraison :</strong> Les produits sont expédiés sous 2 à 5 jours ouvrés après validation de la commande.
                La livraison intervient généralement sous 24 à 48h après expédition.
              </p>
              <p className="mb-4">
                En cas de retard de livraison supérieur à 7 jours après la date prévue, le Client peut demander l'annulation
                de la commande et le remboursement des sommes versées.
              </p>
              <p>
                Le Vendeur ne saurait être tenu responsable des retards de livraison dus au transporteur ou à un cas de force majeure.
              </p>
            </section>

            {/* Article 7 */}
            <section>
              <h2 className="text-2xl font-bold text-primary mb-4">Article 7 - Droit de rétractation</h2>
              <p className="mb-4">
                <strong>Conformément à l'article L221-28 du Code de la consommation, le droit de rétractation ne peut être exercé
                pour les denrées alimentaires périssables.</strong>
              </p>
              <p>
                En conséquence, les produits de charcuterie et fromages vendus par le Vendeur ne peuvent faire l'objet d'un droit de rétractation,
                sauf en cas de produits défectueux ou non conformes à la commande.
              </p>
            </section>

            {/* Article 8 */}
            <section>
              <h2 className="text-2xl font-bold text-primary mb-4">Article 8 - Garanties et réclamations</h2>
              <p className="mb-4">
                Les produits bénéficient de la garantie légale de conformité (articles L217-4 et suivants du Code de la consommation)
                et de la garantie contre les vices cachés (articles 1641 et suivants du Code civil).
              </p>
              <p className="mb-4">
                En cas de produit défectueux ou non conforme, le Client dispose d'un délai de 48 heures après réception pour signaler
                le problème au Vendeur par email (liliewatt2023@gmail.com) ou téléphone (06 04 11 05 50), en fournissant des photos du produit.
              </p>
              <p>
                Le Vendeur s'engage à procéder au remplacement du produit ou au remboursement dans les meilleurs délais.
              </p>
            </section>

            {/* Article 9 */}
            <section>
              <h2 className="text-2xl font-bold text-primary mb-4">Article 9 - Responsabilité</h2>
              <p className="mb-4">
                Le Vendeur est responsable de la bonne exécution de ses obligations contractuelles.
                Sa responsabilité ne saurait être engagée en cas de :
              </p>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li>Mauvaise utilisation ou conservation des produits par le Client</li>
                <li>Retard ou inexécution imputable au Client</li>
                <li>Force majeure ou fait d'un tiers</li>
                <li>Problème de livraison dû au transporteur</li>
              </ul>
            </section>

            {/* Article 10 */}
            <section>
              <h2 className="text-2xl font-bold text-primary mb-4">Article 10 - Données personnelles</h2>
              <p>
                Les données personnelles collectées font l'objet d'un traitement informatique destiné à la gestion des commandes
                et de la relation client. Conformément au RGPD, le Client dispose d'un droit d'accès, de rectification et de suppression
                de ses données. Pour plus d'informations, consulter notre <a href="/legal/politique-confidentialite" className="text-accent underline">Politique de confidentialité</a>.
              </p>
            </section>

            {/* Article 11 */}
            <section>
              <h2 className="text-2xl font-bold text-primary mb-4">Article 11 - Médiation et litiges</h2>
              <p className="mb-4">
                En cas de litige, le Client s'adressera en priorité au Vendeur pour obtenir une solution amiable.
                À défaut d'accord amiable, le Client peut recourir gratuitement au médiateur de la consommation CNPM-MÉDIATION
                (www.cnpm-mediation-consommation.eu).
              </p>
              <p>
                En dernier recours, les litiges relèvent de la compétence exclusive des tribunaux français.
              </p>
            </section>

            {/* Article 12 */}
            <section>
              <h2 className="text-2xl font-bold text-primary mb-4">Article 12 - Loi applicable</h2>
              <p>
                Les présentes CGV sont soumises à la loi française. Tout litige relatif à leur interprétation et/ou à leur exécution
                relève des tribunaux français compétents.
              </p>
            </section>

            {/* Contact */}
            <section className="bg-ivory p-6 rounded-lg mt-8">
              <h2 className="text-2xl font-bold text-primary mb-4">Contact</h2>
              <p className="mb-2">Pour toute question relative aux présentes CGV :</p>
              <ul className="list-none space-y-1">
                <li><strong>Email :</strong> liliewatt2023@gmail.com</li>
                <li><strong>Téléphone :</strong> 06 04 11 05 50</li>
                <li><strong>Adresse :</strong> FELICITA, 41 rue Professeur Calmette, 33150 CENON</li>
              </ul>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
