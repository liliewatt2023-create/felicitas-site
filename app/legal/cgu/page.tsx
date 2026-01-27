export default function CGUPage() {
  return (
    <div className="min-h-screen py-16 bg-ivory">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8">
          <h1 className="text-4xl font-bold text-primary mb-8">Conditions Générales d'Utilisation</h1>

          <div className="space-y-8 text-charcoal">
            {/* Préambule */}
            <section>
              <p className="mb-4">
                Les présentes Conditions Générales d'Utilisation (CGU) ont pour objet de définir les modalités et conditions
                d'utilisation du site www.charcuteriefelicita.fr (ci-après "le Site") exploité par FELICITA (NOUGABAYT),
                SAS au capital de 1 000,00 €, immatriculée au RCS de Bordeaux sous le numéro 988 009 155.
              </p>
              <p>
                Date de dernière mise à jour : {new Date().toLocaleDateString('fr-FR')}
              </p>
            </section>

            {/* Article 1 */}
            <section>
              <h2 className="text-2xl font-bold text-primary mb-4">Article 1 - Objet</h2>
              <p>
                Les présentes CGU ont pour objet de définir les conditions d'accès et d'utilisation du Site par tout utilisateur.
                L'utilisation du Site implique l'acceptation pleine et entière des présentes CGU.
              </p>
            </section>

            {/* Article 2 */}
            <section>
              <h2 className="text-2xl font-bold text-primary mb-4">Article 2 - Accès au site</h2>
              <p className="mb-4">
                Le Site est accessible gratuitement à tout utilisateur disposant d'un accès à Internet.
                Tous les coûts afférents à l'accès au Site, que ce soient les frais matériels, logiciels ou d'accès à Internet,
                sont exclusivement à la charge de l'utilisateur.
              </p>
              <p className="mb-4">
                L'éditeur met en œuvre tous les moyens raisonnables à sa disposition pour assurer un accès de qualité au Site,
                mais n'est tenu à aucune obligation d'y parvenir.
              </p>
              <p>
                L'éditeur se réserve le droit de suspendre, interrompre ou limiter l'accès à tout ou partie du Site,
                notamment en raison de contraintes techniques, de maintenance ou pour toute autre raison, sans préavis ni indemnité.
              </p>
            </section>

            {/* Article 3 */}
            <section>
              <h2 className="text-2xl font-bold text-primary mb-4">Article 3 - Compte utilisateur</h2>

              <h3 className="text-xl font-bold text-primary mb-2">3.1. Création de compte</h3>
              <p className="mb-4">
                Pour accéder aux services de vente en ligne, l'utilisateur doit créer un compte en fournissant des informations
                exactes, à jour et complètes. L'utilisateur s'engage à mettre à jour ces informations en cas de modification.
              </p>

              <h3 className="text-xl font-bold text-primary mb-2">3.2. Vérification d'email</h3>
              <p className="mb-4">
                Après création du compte, l'utilisateur doit vérifier son adresse email en cliquant sur le lien envoyé par email.
                L'accès aux services de vente n'est possible qu'après cette vérification.
              </p>

              <h3 className="text-xl font-bold text-primary mb-2">3.3. Identifiants</h3>
              <p className="mb-4">
                L'utilisateur est seul responsable de la confidentialité de ses identifiants (email et mot de passe).
                Toute utilisation du compte avec ses identifiants est présumée émaner de l'utilisateur.
              </p>
              <p>
                En cas de perte, vol ou utilisation frauduleuse de ses identifiants, l'utilisateur doit immédiatement
                en informer l'éditeur à l'adresse : liliewatt2023@gmail.com
              </p>
            </section>

            {/* Article 4 */}
            <section>
              <h2 className="text-2xl font-bold text-primary mb-4">Article 4 - Services proposés</h2>
              <p className="mb-4">Le Site propose les services suivants :</p>
              <ul className="list-disc list-inside ml-4 space-y-2">
                <li>Présentation et vente en ligne de produits de charcuterie et fromages</li>
                <li>Création et gestion d'un compte client</li>
                <li>Passation de commandes en ligne</li>
                <li>Suivi des commandes</li>
                <li>Publication d'avis clients (après vérification)</li>
                <li>Accès à l'historique des commandes</li>
              </ul>
              <p className="mt-4">
                L'éditeur se réserve le droit de modifier, suspendre ou interrompre tout ou partie de ces services à tout moment,
                sans préavis ni indemnité.
              </p>
            </section>

            {/* Article 5 */}
            <section>
              <h2 className="text-2xl font-bold text-primary mb-4">Article 5 - Obligations de l'utilisateur</h2>
              <p className="mb-4">L'utilisateur s'engage à :</p>
              <ul className="list-disc list-inside ml-4 space-y-2">
                <li>Fournir des informations exactes, complètes et à jour lors de la création de son compte</li>
                <li>Respecter les lois et règlements en vigueur</li>
                <li>Ne pas porter atteinte aux droits de tiers</li>
                <li>Ne pas utiliser le Site à des fins illicites ou frauduleuses</li>
                <li>Ne pas tenter d'accéder de manière non autorisée au Site ou à ses systèmes</li>
                <li>Ne pas diffuser de contenus illicites, offensants ou contraires aux bonnes mœurs</li>
                <li>Ne pas utiliser de robots, scripts ou autres moyens automatisés pour accéder au Site</li>
                <li>Respecter la propriété intellectuelle de l'éditeur</li>
              </ul>
            </section>

            {/* Article 6 */}
            <section>
              <h2 className="text-2xl font-bold text-primary mb-4">Article 6 - Avis clients</h2>
              <p className="mb-4">
                Les utilisateurs peuvent publier des avis sur les produits achetés. Ces avis sont soumis à une modération
                préalable par l'éditeur avant publication.
              </p>
              <p className="mb-4">L'utilisateur s'engage à :</p>
              <ul className="list-disc list-inside ml-4 space-y-2">
                <li>Publier des avis sincères et fondés sur sa propre expérience</li>
                <li>Ne pas publier de contenus diffamatoires, injurieux ou discriminatoires</li>
                <li>Ne pas publier de contenus à caractère publicitaire ou commercial</li>
                <li>Respecter la vie privée des tiers</li>
              </ul>
              <p className="mt-4">
                L'éditeur se réserve le droit de refuser, modifier ou supprimer tout avis qui ne respecterait pas ces conditions.
              </p>
            </section>

            {/* Article 7 */}
            <section>
              <h2 className="text-2xl font-bold text-primary mb-4">Article 7 - Propriété intellectuelle</h2>
              <p className="mb-4">
                L'ensemble des éléments du Site (structure, design, textes, images, logos, vidéos, etc.) est protégé
                par le droit d'auteur, le droit des marques et/ou tout autre droit de propriété intellectuelle.
              </p>
              <p className="mb-4">
                Toute reproduction, représentation, modification, publication, adaptation de tout ou partie des éléments du Site,
                quel que soit le moyen ou le procédé utilisé, est interdite, sauf autorisation écrite préalable de l'éditeur.
              </p>
              <p>
                Toute exploitation non autorisée du Site ou de ses éléments sera considérée comme constitutive d'une contrefaçon
                et poursuivie conformément aux dispositions des articles L.335-2 et suivants du Code de la Propriété Intellectuelle.
              </p>
            </section>

            {/* Article 8 */}
            <section>
              <h2 className="text-2xl font-bold text-primary mb-4">Article 8 - Données personnelles</h2>
              <p>
                L'éditeur collecte et traite des données personnelles conformément au RGPD et à la loi Informatique et Libertés.
                Pour plus d'informations sur la collecte et le traitement de vos données personnelles,
                veuillez consulter notre <a href="/legal/politique-confidentialite" className="text-accent underline">Politique de Confidentialité</a>.
              </p>
            </section>

            {/* Article 9 */}
            <section>
              <h2 className="text-2xl font-bold text-primary mb-4">Article 9 - Liens hypertextes</h2>
              <p className="mb-4">
                Le Site peut contenir des liens hypertextes vers d'autres sites. L'éditeur n'exerce aucun contrôle
                sur ces sites et décline toute responsabilité quant à leur contenu.
              </p>
              <p>
                La création de liens hypertextes vers le Site est soumise à l'accord préalable de l'éditeur.
              </p>
            </section>

            {/* Article 10 */}
            <section>
              <h2 className="text-2xl font-bold text-primary mb-4">Article 10 - Responsabilité</h2>

              <h3 className="text-xl font-bold text-primary mb-2">10.1. Responsabilité de l'éditeur</h3>
              <p className="mb-4">
                L'éditeur met tout en œuvre pour assurer la fiabilité et l'exactitude des informations diffusées sur le Site.
                Toutefois, il ne saurait garantir l'exactitude, la complétude ou l'actualité de ces informations.
              </p>
              <p className="mb-4">
                L'éditeur ne saurait être tenu responsable :
              </p>
              <ul className="list-disc list-inside ml-4 space-y-1 mb-4">
                <li>De tout dommage direct ou indirect résultant de l'utilisation du Site</li>
                <li>Des interruptions, dysfonctionnements ou indisponibilités du Site</li>
                <li>De la perte de données</li>
                <li>De l'utilisation frauduleuse du compte d'un utilisateur</li>
                <li>Des cas de force majeure ou faits imprévisibles et insurmontables</li>
              </ul>

              <h3 className="text-xl font-bold text-primary mb-2">10.2. Responsabilité de l'utilisateur</h3>
              <p>
                L'utilisateur est seul responsable de l'utilisation qu'il fait du Site et des contenus qu'il publie.
                Il s'engage à garantir l'éditeur contre tout recours, action ou réclamation de tiers résultant de son utilisation du Site.
              </p>
            </section>

            {/* Article 11 */}
            <section>
              <h2 className="text-2xl font-bold text-primary mb-4">Article 11 - Suspension et résiliation</h2>
              <p className="mb-4">
                L'éditeur se réserve le droit de suspendre ou de résilier l'accès au compte d'un utilisateur,
                sans préavis ni indemnité, en cas de :
              </p>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li>Violation des présentes CGU</li>
                <li>Utilisation frauduleuse ou abusive du Site</li>
                <li>Fourniture d'informations fausses ou trompeuses</li>
                <li>Comportement nuisible aux intérêts de l'éditeur ou des autres utilisateurs</li>
              </ul>
            </section>

            {/* Article 12 */}
            <section>
              <h2 className="text-2xl font-bold text-primary mb-4">Article 12 - Force majeure</h2>
              <p>
                L'éditeur ne saurait être tenu responsable de tout retard ou inexécution de ses obligations résultant
                d'un cas de force majeure tel que défini par la jurisprudence française.
              </p>
            </section>

            {/* Article 13 */}
            <section>
              <h2 className="text-2xl font-bold text-primary mb-4">Article 13 - Modification des CGU</h2>
              <p className="mb-4">
                L'éditeur se réserve le droit de modifier les présentes CGU à tout moment.
                Les nouvelles CGU seront portées à la connaissance des utilisateurs par publication sur le Site.
              </p>
              <p>
                L'utilisation du Site après modification des CGU vaut acceptation des nouvelles conditions.
              </p>
            </section>

            {/* Article 14 */}
            <section>
              <h2 className="text-2xl font-bold text-primary mb-4">Article 14 - Nullité partielle</h2>
              <p>
                Si une ou plusieurs stipulations des présentes CGU sont tenues pour non valides ou déclarées telles
                en application d'une loi, d'un règlement ou à la suite d'une décision définitive d'une juridiction compétente,
                les autres stipulations garderont toute leur force et leur portée.
              </p>
            </section>

            {/* Article 15 */}
            <section>
              <h2 className="text-2xl font-bold text-primary mb-4">Article 15 - Loi applicable et juridiction</h2>
              <p className="mb-4">
                Les présentes CGU sont régies par le droit français.
              </p>
              <p>
                En cas de litige, une solution amiable sera recherchée avant toute action judiciaire.
                À défaut d'accord amiable, le litige sera porté devant les tribunaux français compétents.
              </p>
            </section>

            {/* Contact */}
            <section className="bg-ivory p-6 rounded-lg mt-8">
              <h2 className="text-2xl font-bold text-primary mb-4">Contact</h2>
              <p className="mb-2">Pour toute question relative aux présentes CGU :</p>
              <ul className="list-none space-y-1">
                <li><strong>FELICITA (NOUGABAYT)</strong></li>
                <li>41 rue Professeur Calmette, 33150 CENON</li>
                <li><strong>Email :</strong> liliewatt2023@gmail.com</li>
                <li><strong>Téléphone :</strong> 06 04 11 05 50</li>
              </ul>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
