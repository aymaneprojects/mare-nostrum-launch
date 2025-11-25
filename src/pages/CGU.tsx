import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";

const CGU = () => {
  return (
    <>
      <SEOHead 
        title="Conditions Générales d'Utilisation - Mare Nostrum"
        description="Conditions générales d'utilisation des services Mare Nostrum"
        noindex={true}
      />
      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="container mx-auto px-4 py-24 max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-8">
            Conditions Générales d'Utilisation
          </h1>
          
          <div className="prose prose-lg max-w-none text-foreground/80 space-y-8">
            <section>
              <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">1. Objet et acceptation des CGU</h2>
              <p>
                Les présentes Conditions Générales d'Utilisation (CGU) définissent les règles d'accès et d'utilisation 
                des services proposés par Mare Nostrum sur le site marenostrum.fr. En accédant et en utilisant ce site, 
                vous acceptez sans réserve les présentes CGU.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">2. Description des services</h2>
              <p>
                Mare Nostrum propose des services de conseil, formation et accompagnement dans les domaines de 
                l'entrepreneuriat, de l'éducation et de la croissance d'entreprise. Nos services incluent notamment :
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Des programmes de formation à l'entrepreneuriat</li>
                <li>Des services de conseil en stratégie et développement</li>
                <li>Des accompagnements personnalisés pour entrepreneurs</li>
                <li>Des ressources pédagogiques et du contenu éditorial</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">3. Accès aux services</h2>
              <p>
                L'accès à certains services peut nécessiter une inscription préalable. Vous vous engagez à fournir 
                des informations exactes, complètes et à jour lors de votre inscription. Vous êtes responsable de 
                la confidentialité de vos identifiants de connexion.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">4. Obligations des utilisateurs</h2>
              <p>En utilisant nos services, vous vous engagez à :</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Respecter les lois et règlements en vigueur</li>
                <li>Ne pas porter atteinte aux droits de tiers</li>
                <li>Ne pas diffuser de contenu illicite, offensant ou inapproprié</li>
                <li>Ne pas perturber le fonctionnement du site</li>
                <li>Utiliser les services de manière conforme à leur destination</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">5. Propriété intellectuelle</h2>
              <p>
                L'ensemble du contenu présent sur le site (textes, images, logos, vidéos, etc.) est protégé par le 
                droit d'auteur et appartient à Mare Nostrum ou à ses partenaires. Toute reproduction, représentation, 
                modification ou exploitation non autorisée est strictement interdite.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">6. Responsabilité</h2>
              <p>
                Mare Nostrum s'efforce d'assurer l'exactitude et la mise à jour des informations diffusées sur le site. 
                Toutefois, nous ne pouvons garantir l'exactitude, la précision ou l'exhaustivité des informations 
                mises à disposition. Mare Nostrum ne saurait être tenu responsable des dommages directs ou indirects 
                résultant de l'utilisation du site.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">7. Protection des données personnelles</h2>
              <p>
                Le traitement de vos données personnelles est régi par notre Politique de Confidentialité. 
                Nous nous engageons à protéger vos données conformément au Règlement Général sur la Protection 
                des Données (RGPD).
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">8. Modification des CGU</h2>
              <p>
                Mare Nostrum se réserve le droit de modifier les présentes CGU à tout moment. Les modifications 
                entrent en vigueur dès leur publication sur le site. Il est de votre responsabilité de consulter 
                régulièrement les CGU pour prendre connaissance des éventuelles modifications.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">9. Droit applicable et juridiction</h2>
              <p>
                Les présentes CGU sont régies par le droit français. En cas de litige, et à défaut de résolution 
                amiable, les tribunaux français seront seuls compétents.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">10. Contact</h2>
              <p>
                Pour toute question relative aux présentes CGU, vous pouvez nous contacter :
              </p>
              <ul className="list-none space-y-2">
                <li>Par email : contact@marenostrum.fr</li>
                <li>Par téléphone : +33 5 34 61 41 62</li>
                <li>Par courrier : 17 Rue Rémusat, 31000 Toulouse, France</li>
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

export default CGU;