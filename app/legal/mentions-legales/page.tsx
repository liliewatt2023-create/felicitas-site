export default function MentionsLegalesPage() {
  return (
    <div className="min-h-screen py-16 bg-ivory">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8">
          <h1 className="text-4xl font-bold text-primary mb-8">Mentions Légales</h1>

          <div className="space-y-8 text-charcoal">
            {/* Éditeur du site */}
            <section>
              <h2 className="text-2xl font-bold text-primary mb-4">1. Éditeur du site</h2>
              <p className="mb-2">Le site www.charcuteriefelicita.fr est édité par :</p>
              <ul className="list-none space-y-2 ml-4">
                <li><strong>Raison sociale :</strong> FELICITA (NOUGABAYT)</li>
                <li><strong>Forme juridique :</strong> SAS (Société par Actions Simplifiée)</li>
                <li><strong>Capital social :</strong> 1 000,00 €</li>
                <li><strong>SIREN :</strong> 988 009 155</li>
                <li><strong>SIRET :</strong> 988 009 155 00017</li>
                <li><strong>N° TVA intracommunautaire :</strong> FR29988009155</li>
                <li><strong>RCS :</strong> Bordeaux</li>
                <li><strong>Siège social :</strong> 41 rue Professeur Calmette, 33150 CENON</li>
                <li><strong>Téléphone :</strong> 06 04 11 05 50</li>
                <li><strong>Email :</strong> liliewatt2023@gmail.com</li>
                <li><strong>Dirigeant :</strong> Ben Rajeh Hassen Elyes</li>
              </ul>
            </section>

            {/* Hébergement */}
            <section>
              <h2 className="text-2xl font-bold text-primary mb-4">2. Hébergement</h2>
              <p className="mb-2">Le site est hébergé par :</p>
              <ul className="list-none space-y-2 ml-4">
                <li><strong>Vercel Inc.</strong></li>
                <li>440 N Barranca Ave #4133</li>
                <li>Covina, CA 91723</li>
                <li>États-Unis</li>
              </ul>
            </section>

            {/* Propriété intellectuelle */}
            <section>
              <h2 className="text-2xl font-bold text-primary mb-4">3. Propriété intellectuelle</h2>
              <p className="mb-4">
                L'ensemble de ce site relève de la législation française et internationale sur le droit d'auteur et la propriété intellectuelle.
                Tous les droits de reproduction sont réservés, y compris pour les documents téléchargeables et les représentations iconographiques et photographiques.
              </p>
              <p>
                La reproduction de tout ou partie de ce site sur un support électronique quel qu'il soit est formellement interdite sauf autorisation expresse du directeur de la publication.
              </p>
            </section>

            {/* Protection des données personnelles */}
            <section>
              <h2 className="text-2xl font-bold text-primary mb-4">4. Protection des données personnelles</h2>
              <p className="mb-4">
                Conformément à la loi n° 78-17 du 6 janvier 1978 modifiée relative à l'informatique, aux fichiers et aux libertés et au Règlement Général sur la Protection des Données (RGPD),
                vous disposez d'un droit d'accès, de rectification, de suppression et d'opposition aux données personnelles vous concernant.
              </p>
              <p className="mb-4">
                Pour exercer ce droit, vous pouvez nous contacter :
              </p>
              <ul className="list-disc list-inside ml-4 space-y-2">
                <li>Par email : liliewatt2023@gmail.com</li>
                <li>Par téléphone : 06 04 11 05 50</li>
                <li>Par courrier : FELICITA, 41 rue Professeur Calmette, 33150 CENON</li>
              </ul>
              <p className="mt-4">
                Pour plus d'informations, consultez notre <a href="/legal/politique-confidentialite" className="text-accent underline">Politique de confidentialité</a>.
              </p>
            </section>

            {/* Cookies */}
            <section>
              <h2 className="text-2xl font-bold text-primary mb-4">5. Cookies</h2>
              <p>
                Le site utilise des cookies techniques nécessaires à son bon fonctionnement. Ces cookies ne collectent aucune donnée personnelle et sont essentiels pour la navigation et l'utilisation des fonctionnalités du site (authentification, panier, etc.).
              </p>
            </section>

            {/* Responsabilité */}
            <section>
              <h2 className="text-2xl font-bold text-primary mb-4">6. Responsabilité</h2>
              <p className="mb-4">
                Les informations contenues sur ce site sont aussi précises que possible et le site est périodiquement remis à jour, mais peut toutefois contenir des inexactitudes, des omissions ou des lacunes.
              </p>
              <p>
                Si vous constatez une lacune, erreur ou ce qui paraît être un dysfonctionnement, merci de bien vouloir le signaler par email à liliewatt2023@gmail.com.
              </p>
            </section>

            {/* Médiation de la consommation */}
            <section>
              <h2 className="text-2xl font-bold text-primary mb-4">7. Médiation de la consommation</h2>
              <p className="mb-4">
                Conformément à l'article L.612-1 du Code de la consommation, il est prévu que pour tout litige n'ayant pu être résolu dans le cadre d'une réclamation préalable directement introduite auprès de nos services, le consommateur a la faculté de recourir gratuitement à un médiateur de la consommation en vue de la résolution amiable du litige.
              </p>
              <p className="mb-2">
                Le médiateur compétent est :
              </p>
              <ul className="list-none space-y-2 ml-4">
                <li><strong>Médiateur de la consommation CNPM - MÉDIATION DE LA CONSOMMATION</strong></li>
                <li>27 avenue de la Libération</li>
                <li>42400 SAINT-CHAMOND</li>
                <li>Téléphone : 09 88 30 27 72</li>
                <li>Site : <a href="https://www.cnpm-mediation-consommation.eu" target="_blank" rel="noopener noreferrer" className="text-accent underline">www.cnpm-mediation-consommation.eu</a></li>
              </ul>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
