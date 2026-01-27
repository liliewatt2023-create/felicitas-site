export default function PolitiqueConfidentialitePage() {
  return (
    <div className="min-h-screen py-16 bg-ivory">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8">
          <h1 className="text-4xl font-bold text-primary mb-8">Politique de Confidentialité</h1>

          <div className="space-y-8 text-charcoal">
            {/* Préambule */}
            <section>
              <p className="mb-4">
                La présente Politique de Confidentialité décrit la manière dont FELICITA (NOUGABAYT), SAS au capital de 1 000,00 €,
                immatriculée au RCS de Bordeaux sous le numéro 988 009 155, collecte, utilise, conserve et protège
                les données personnelles des utilisateurs du site www.charcuteriefelicita.fr.
              </p>
              <p className="mb-4">
                Cette politique est conforme au Règlement Général sur la Protection des Données (RGPD - Règlement UE 2016/679)
                et à la loi Informatique et Libertés du 6 janvier 1978 modifiée.
              </p>
              <p>
                Date de dernière mise à jour : {new Date().toLocaleDateString('fr-FR')}
              </p>
            </section>

            {/* Article 1 */}
            <section>
              <h2 className="text-2xl font-bold text-primary mb-4">1. Responsable du traitement</h2>
              <p className="mb-2">Le responsable du traitement des données personnelles est :</p>
              <ul className="list-none space-y-1 ml-4">
                <li><strong>FELICITA (NOUGABAYT)</strong></li>
                <li>41 rue Professeur Calmette, 33150 CENON</li>
                <li>SIREN : 988 009 155</li>
                <li>Email : liliewatt2023@gmail.com</li>
                <li>Téléphone : 06 04 11 05 50</li>
              </ul>
            </section>

            {/* Article 2 */}
            <section>
              <h2 className="text-2xl font-bold text-primary mb-4">2. Données collectées</h2>
              <p className="mb-4">Nous collectons les données personnelles suivantes :</p>

              <h3 className="text-xl font-bold text-primary mb-2">2.1. Données d'identification</h3>
              <ul className="list-disc list-inside ml-4 mb-4 space-y-1">
                <li>Adresse email</li>
                <li>Mot de passe (crypté)</li>
                <li>Type de compte (Particulier ou Comité d'entreprise)</li>
              </ul>

              <h3 className="text-xl font-bold text-primary mb-2">2.2. Données de livraison</h3>
              <ul className="list-disc list-inside ml-4 mb-4 space-y-1">
                <li>Nom et prénom</li>
                <li>Adresse postale complète</li>
                <li>Numéro de téléphone</li>
              </ul>

              <h3 className="text-xl font-bold text-primary mb-2">2.3. Données de commande</h3>
              <ul className="list-disc list-inside ml-4 mb-4 space-y-1">
                <li>Historique des achats</li>
                <li>Montants des transactions</li>
                <li>Produits commandés</li>
              </ul>

              <h3 className="text-xl font-bold text-primary mb-2">2.4. Données de connexion</h3>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li>Adresse IP</li>
                <li>Date et heure de connexion</li>
                <li>Pages visitées</li>
              </ul>
            </section>

            {/* Article 3 */}
            <section>
              <h2 className="text-2xl font-bold text-primary mb-4">3. Finalités du traitement</h2>
              <p className="mb-4">Vos données personnelles sont collectées pour les finalités suivantes :</p>
              <ul className="list-disc list-inside ml-4 space-y-2">
                <li>Création et gestion de votre compte client</li>
                <li>Traitement et suivi de vos commandes</li>
                <li>Livraison des produits commandés</li>
                <li>Paiement et facturation</li>
                <li>Gestion du service client et des réclamations</li>
                <li>Vérification de l'identité et lutte contre la fraude</li>
                <li>Respect de nos obligations légales et réglementaires</li>
                <li>Amélioration de nos services</li>
                <li>Envoi d'informations sur vos commandes (confirmation, expédition, livraison)</li>
              </ul>
            </section>

            {/* Article 4 */}
            <section>
              <h2 className="text-2xl font-bold text-primary mb-4">4. Base légale du traitement</h2>
              <p className="mb-4">Le traitement de vos données personnelles repose sur les bases légales suivantes :</p>
              <ul className="list-disc list-inside ml-4 space-y-2">
                <li><strong>Exécution du contrat :</strong> traitement de vos commandes et livraison</li>
                <li><strong>Obligation légale :</strong> conservation des données de facturation, lutte contre la fraude</li>
                <li><strong>Intérêt légitime :</strong> amélioration de nos services, gestion des réclamations</li>
                <li><strong>Consentement :</strong> envoi de communications marketing (si vous avez accepté)</li>
              </ul>
            </section>

            {/* Article 5 */}
            <section>
              <h2 className="text-2xl font-bold text-primary mb-4">5. Destinataires des données</h2>
              <p className="mb-4">Vos données personnelles peuvent être transmises aux destinataires suivants :</p>
              <ul className="list-disc list-inside ml-4 space-y-2">
                <li><strong>Personnel de FELICITA :</strong> pour la gestion des commandes et du service client</li>
                <li><strong>Prestataires de paiement (Stripe) :</strong> pour le traitement sécurisé des paiements</li>
                <li><strong>Transporteurs :</strong> pour la livraison des produits</li>
                <li><strong>Hébergeur du site (Vercel) :</strong> pour l'hébergement des données</li>
                <li><strong>Autorités compétentes :</strong> sur demande légale ou judiciaire</li>
              </ul>
              <p className="mt-4">
                Nous ne vendons ni ne louons vos données personnelles à des tiers à des fins commerciales.
              </p>
            </section>

            {/* Article 6 */}
            <section>
              <h2 className="text-2xl font-bold text-primary mb-4">6. Durée de conservation</h2>
              <p className="mb-4">Vos données sont conservées pendant les durées suivantes :</p>
              <ul className="list-disc list-inside ml-4 space-y-2">
                <li><strong>Compte client :</strong> pendant toute la durée d'activité du compte + 3 ans après la dernière connexion</li>
                <li><strong>Données de commande :</strong> 10 ans (obligation légale comptable et fiscale)</li>
                <li><strong>Données de paiement :</strong> 13 mois après débit (obligation réglementaire)</li>
                <li><strong>Données de connexion :</strong> 12 mois maximum</li>
                <li><strong>Correspondances clients :</strong> durée nécessaire au traitement de la demande</li>
              </ul>
              <p className="mt-4">
                À l'issue de ces durées, vos données sont supprimées ou anonymisées.
              </p>
            </section>

            {/* Article 7 */}
            <section>
              <h2 className="text-2xl font-bold text-primary mb-4">7. Sécurité des données</h2>
              <p className="mb-4">
                Nous mettons en œuvre toutes les mesures techniques et organisationnelles appropriées pour protéger
                vos données personnelles contre la destruction, la perte, l'altération, la divulgation ou l'accès non autorisé :
              </p>
              <ul className="list-disc list-inside ml-4 space-y-2">
                <li>Cryptage SSL/TLS pour toutes les communications</li>
                <li>Mots de passe cryptés avec algorithme bcrypt</li>
                <li>Paiements sécurisés via Stripe (certifié PCI-DSS)</li>
                <li>Accès aux données limité aux personnes autorisées</li>
                <li>Sauvegardes régulières</li>
                <li>Mises à jour de sécurité régulières</li>
              </ul>
            </section>

            {/* Article 8 */}
            <section>
              <h2 className="text-2xl font-bold text-primary mb-4">8. Vos droits</h2>
              <p className="mb-4">Conformément au RGPD, vous disposez des droits suivants sur vos données personnelles :</p>

              <div className="space-y-3 ml-4">
                <div>
                  <strong className="text-primary">Droit d'accès :</strong>
                  <p>Vous pouvez demander à accéder à vos données personnelles</p>
                </div>

                <div>
                  <strong className="text-primary">Droit de rectification :</strong>
                  <p>Vous pouvez demander la correction de données inexactes ou incomplètes</p>
                </div>

                <div>
                  <strong className="text-primary">Droit à l'effacement :</strong>
                  <p>Vous pouvez demander la suppression de vos données (sous réserve des obligations légales)</p>
                </div>

                <div>
                  <strong className="text-primary">Droit à la limitation :</strong>
                  <p>Vous pouvez demander la limitation du traitement de vos données</p>
                </div>

                <div>
                  <strong className="text-primary">Droit à la portabilité :</strong>
                  <p>Vous pouvez recevoir vos données dans un format structuré et couramment utilisé</p>
                </div>

                <div>
                  <strong className="text-primary">Droit d'opposition :</strong>
                  <p>Vous pouvez vous opposer au traitement de vos données pour des raisons légitimes</p>
                </div>

                <div>
                  <strong className="text-primary">Droit de retirer votre consentement :</strong>
                  <p>Pour les traitements basés sur le consentement</p>
                </div>
              </div>

              <div className="bg-accent/10 p-4 rounded-lg mt-6">
                <p className="font-bold text-primary mb-2">Pour exercer vos droits, contactez-nous :</p>
                <ul className="list-none space-y-1">
                  <li>📧 Email : liliewatt2023@gmail.com</li>
                  <li>📞 Téléphone : 06 04 11 05 50</li>
                  <li>📮 Courrier : FELICITA, 41 rue Professeur Calmette, 33150 CENON</li>
                </ul>
                <p className="mt-3 text-sm">
                  Merci de joindre une copie d'un titre d'identité signé pour prouver votre identité.
                  Nous vous répondrons dans un délai d'un mois maximum.
                </p>
              </div>
            </section>

            {/* Article 9 */}
            <section>
              <h2 className="text-2xl font-bold text-primary mb-4">9. Droit de réclamation</h2>
              <p>
                Vous avez le droit d'introduire une réclamation auprès de la Commission Nationale de l'Informatique et des Libertés (CNIL)
                si vous estimez que le traitement de vos données personnelles constitue une violation du RGPD :
              </p>
              <div className="bg-ivory p-4 rounded-lg mt-4">
                <p><strong>CNIL</strong></p>
                <p>3 Place de Fontenoy</p>
                <p>TSA 80715</p>
                <p>75334 PARIS CEDEX 07</p>
                <p>Téléphone : 01 53 73 22 22</p>
                <p>Site : <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer" className="text-accent underline">www.cnil.fr</a></p>
              </div>
            </section>

            {/* Article 10 */}
            <section>
              <h2 className="text-2xl font-bold text-primary mb-4">10. Cookies</h2>
              <p className="mb-4">
                Notre site utilise uniquement des cookies techniques strictement nécessaires au fonctionnement du site :
              </p>
              <ul className="list-disc list-inside ml-4 space-y-2">
                <li><strong>Cookies de session :</strong> pour maintenir votre connexion</li>
                <li><strong>Cookies de panier :</strong> pour mémoriser vos produits</li>
                <li><strong>Cookies d'authentification :</strong> pour sécuriser votre compte</li>
              </ul>
              <p className="mt-4">
                Ces cookies ne nécessitent pas de consentement car ils sont indispensables au fonctionnement du site.
                Ils ne permettent pas de vous identifier personnellement et ne sont pas utilisés à des fins publicitaires.
              </p>
            </section>

            {/* Article 11 */}
            <section>
              <h2 className="text-2xl font-bold text-primary mb-4">11. Transferts de données hors UE</h2>
              <p>
                Certains de nos prestataires (notamment Vercel pour l'hébergement) peuvent être situés en dehors de l'Union Européenne.
                Dans ce cas, nous nous assurons que des garanties appropriées sont mises en place conformément au RGPD
                (clauses contractuelles types, Privacy Shield, etc.) pour protéger vos données.
              </p>
            </section>

            {/* Article 12 */}
            <section>
              <h2 className="text-2xl font-bold text-primary mb-4">12. Modifications</h2>
              <p>
                Nous nous réservons le droit de modifier cette Politique de Confidentialité à tout moment.
                En cas de modification substantielle, nous vous en informerons par email ou via un message sur le site.
                La version en vigueur est toujours disponible sur cette page avec sa date de mise à jour.
              </p>
            </section>

            {/* Article 13 */}
            <section>
              <h2 className="text-2xl font-bold text-primary mb-4">13. Contact</h2>
              <p className="mb-4">
                Pour toute question concernant cette Politique de Confidentialité ou le traitement de vos données personnelles,
                vous pouvez nous contacter :
              </p>
              <div className="bg-ivory p-4 rounded-lg">
                <ul className="list-none space-y-1">
                  <li><strong>Email :</strong> liliewatt2023@gmail.com</li>
                  <li><strong>Téléphone :</strong> 06 04 11 05 50</li>
                  <li><strong>Adresse :</strong> FELICITA, 41 rue Professeur Calmette, 33150 CENON</li>
                </ul>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
