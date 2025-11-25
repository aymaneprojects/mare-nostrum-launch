import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";

const Confidentialite = () => {
  return (
    <>
      <SEOHead 
        title="Politique de Confidentialité - Mare Nostrum"
        description="Politique de confidentialité et protection des données personnelles Mare Nostrum"
        noindex={true}
      />
      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="container mx-auto px-4 py-24 max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-8">
            Politique de Confidentialité
          </h1>
          
          <div className="prose prose-lg max-w-none text-foreground/80 space-y-8">
            <section>
              <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">1. Responsable du traitement</h2>
              <p>
                Le responsable du traitement des données personnelles collectées sur le site marenostrum.fr est :
              </p>
              <ul className="list-none space-y-2">
                <li><strong>Mare Nostrum</strong></li>
                <li>17 Rue Rémusat, 31000 Toulouse, France</li>
                <li>Email : contact@marenostrum.fr</li>
                <li>Téléphone : +33 5 34 61 41 62</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">2. Données collectées et finalités</h2>
              <p>
                Nous collectons et traitons les données personnelles suivantes dans le cadre de nos services :
              </p>
              
              <h3 className="text-xl font-semibold text-foreground mt-6 mb-3">2.1 Formulaires de contact</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Nom et prénom</li>
                <li>Adresse email</li>
                <li>Numéro de téléphone</li>
                <li>Pays</li>
                <li>Message</li>
              </ul>
              <p className="mt-2">
                <strong>Finalité :</strong> Répondre à vos demandes d'information et vous contacter dans le cadre 
                de nos services.
              </p>

              <h3 className="text-xl font-semibold text-foreground mt-6 mb-3">2.2 Téléchargement du livre blanc</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Nom et prénom</li>
                <li>Adresse email</li>
                <li>Téléphone</li>
                <li>Pays</li>
                <li>Organisation</li>
                <li>Poste</li>
                <li>Type d'établissement</li>
              </ul>
              <p className="mt-2">
                <strong>Finalité :</strong> Vous envoyer le livre blanc demandé et vous informer de nos actualités 
                et services pertinents.
              </p>

              <h3 className="text-xl font-semibold text-foreground mt-6 mb-3">2.3 Données de navigation</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Adresse IP</li>
                <li>Type de navigateur</li>
                <li>Pages visitées</li>
                <li>Durée de visite</li>
              </ul>
              <p className="mt-2">
                <strong>Finalité :</strong> Améliorer la performance et l'expérience utilisateur du site.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">3. Base légale du traitement</h2>
              <p>
                Le traitement de vos données personnelles repose sur les bases légales suivantes :
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Consentement :</strong> Lorsque vous remplissez un formulaire ou acceptez nos cookies</li>
                <li><strong>Intérêt légitime :</strong> Pour l'amélioration de nos services et la sécurité du site</li>
                <li><strong>Exécution d'un contrat :</strong> Lorsque vous bénéficiez de nos services</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">4. Destinataires des données</h2>
              <p>
                Vos données personnelles sont destinées à :
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>L'équipe interne de Mare Nostrum</li>
                <li>Nos prestataires techniques (hébergement, services de messagerie)</li>
                <li>Les autorités compétentes sur demande légale</li>
              </ul>
              <p className="mt-2">
                Nous veillons à ce que nos prestataires offrent des garanties suffisantes pour la protection 
                de vos données personnelles.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">5. Durée de conservation</h2>
              <p>
                Vos données personnelles sont conservées pour la durée nécessaire aux finalités pour lesquelles 
                elles ont été collectées :
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Données de contact : 3 ans à compter du dernier contact</li>
                <li>Données de navigation : 13 mois maximum</li>
                <li>Données comptables : durée légale de conservation</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">6. Vos droits</h2>
              <p>
                Conformément au RGPD, vous disposez des droits suivants concernant vos données personnelles :
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Droit d'accès :</strong> Obtenir la confirmation que vos données sont traitées et y accéder</li>
                <li><strong>Droit de rectification :</strong> Corriger vos données inexactes ou incomplètes</li>
                <li><strong>Droit à l'effacement :</strong> Demander la suppression de vos données</li>
                <li><strong>Droit à la limitation :</strong> Limiter le traitement de vos données</li>
                <li><strong>Droit à la portabilité :</strong> Recevoir vos données dans un format structuré</li>
                <li><strong>Droit d'opposition :</strong> S'opposer au traitement de vos données</li>
                <li><strong>Droit de retirer votre consentement :</strong> À tout moment</li>
              </ul>
              <p className="mt-4">
                Pour exercer vos droits, contactez-nous à : <strong>contact@marenostrum.fr</strong>
              </p>
              <p className="mt-2">
                Vous disposez également du droit d'introduire une réclamation auprès de la CNIL 
                (Commission Nationale de l'Informatique et des Libertés).
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">7. Cookies et technologies similaires</h2>
              <p>
                Notre site utilise des cookies pour améliorer votre expérience de navigation. Les cookies sont 
                de petits fichiers texte stockés sur votre appareil. Nous utilisons :
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Cookies essentiels :</strong> Nécessaires au fonctionnement du site</li>
                <li><strong>Cookies analytiques :</strong> Pour analyser l'utilisation du site</li>
                <li><strong>Cookies de personnalisation :</strong> Pour mémoriser vos préférences</li>
              </ul>
              <p className="mt-2">
                Vous pouvez gérer vos préférences de cookies via les paramètres de votre navigateur.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">8. Sécurité des données</h2>
              <p>
                Nous mettons en œuvre des mesures techniques et organisationnelles appropriées pour protéger 
                vos données personnelles contre la destruction accidentelle ou illicite, la perte accidentelle, 
                l'altération, la diffusion ou l'accès non autorisé. Ces mesures incluent notamment :
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Chiffrement des données sensibles</li>
                <li>Accès restreint aux données personnelles</li>
                <li>Surveillance et tests de sécurité réguliers</li>
                <li>Formation du personnel à la protection des données</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">9. Transferts internationaux</h2>
              <p>
                Vos données personnelles peuvent être transférées et traitées dans des pays situés en dehors de 
                l'Espace Économique Européen. Dans ce cas, nous nous assurons que ces transferts sont effectués 
                conformément au RGPD et que des garanties appropriées sont mises en place.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">10. Modifications de la politique</h2>
              <p>
                Nous nous réservons le droit de modifier la présente politique de confidentialité à tout moment. 
                Toute modification sera publiée sur cette page avec une date de mise à jour. Nous vous encourageons 
                à consulter régulièrement cette page.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">11. Contact - Délégué à la Protection des Données</h2>
              <p>
                Pour toute question relative à la protection de vos données personnelles ou pour exercer vos droits, 
                vous pouvez contacter notre Délégué à la Protection des Données :
              </p>
              <ul className="list-none space-y-2">
                <li>Email : dpo@marenostrum.fr</li>
                <li>Courrier : Mare Nostrum - DPO, 17 Rue Rémusat, 31000 Toulouse, France</li>
              </ul>
            </section>

            <p className="text-sm text-foreground/60 mt-12">
              Dernière mise à jour : 25 novembre 2025
            </p>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Confidentialite;