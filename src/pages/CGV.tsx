import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { Button } from "@/components/ui/button";

const CGV = () => {
  return (
    <>
      <SEOHead
        title="Conditions Générales de Vente - Mare Nostrum"
        description="Conditions générales de vente des prestations de services de la SAS Mare Nostrum."
        noindex={true}
      />
      <div className="min-h-screen bg-background">
        <Header />

        <main className="container mx-auto px-4 py-24 max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-2">
            Conditions Générales de Vente
          </h1>
          <p className="text-sm text-muted-foreground mb-10">SAS Mare Nostrum</p>

          <div className="prose prose-lg max-w-none text-foreground/80 space-y-8">

            <section>
              <h2 className="text-xl font-semibold text-foreground mt-8 mb-3">Clause n° 1 : Objet</h2>
              <p>
                Les conditions générales de vente définissent les droits et obligations de la SAS MARE NOSTRUM et de ses clients
                dans le cadre de prestations de services, notamment pour des actions de formation professionnelle continue au sens
                des articles L.6313-1 et suivants du Code du travail. Toute prestation accomplie par la SAS MARE NOSTRUM implique
                l'adhésion sans réserve du client aux présentes conditions générales. Les conditions particulières indiquées au
                devis, à la convention de formation ou au contrat d'abonnement complètent les présentes CGV et, en cas de
                contradiction, prévalent sur celles-ci.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mt-8 mb-3">Clause n° 2 : Prix</h2>
              <p>
                Les prix des prestations sont ceux en vigueur au jour de la commande. Ils sont libellés en euros et calculés
                hors taxes. Les offres de prix sont actualisables par trimestre civil suivant l'indice des prix à la consommation
                (IPC) en France. Le taux de TVA applicable est celui en vigueur à la date d'émission de la facture. Les actions
                de formation professionnelle continue sont exonérées de TVA, conformément à l'article 261-4-4 a du CGI et à
                l'autorisation de la DREETS Occitanie.
              </p>
              <p>
                Les frais logistiques (hébergement, restauration, déplacement…) nécessaires à la bonne réalisation de la
                prestation sont intégralement pris en charge par le client et facturés à l'issue de la prestation ou, le cas
                échéant, annuellement.
              </p>
              <p>
                Les tarifs proposés comprennent les rabais et ristournes que la SAS MARE NOSTRUM serait amenée à octroyer
                compte tenu de ses résultats ou de la prise en charge par le client de certaines prestations.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mt-8 mb-3">Clause n° 3 : Escompte</h2>
              <p>Aucun escompte n'est accordé en cas de paiement anticipé.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mt-8 mb-3">Clause n° 4 : Modalités de paiement</h2>
              <p>
                Le devis particulier précise les éventuelles conditions particulières du versement du ou des acompte(s), le
                solde devant être payé à réception finale de la prestation. Le paiement de l'acompte, ou de la première
                mensualité, entraîne le démarrage de la prestation. Les paiements s'effectuent au plus tard dans un délai de
                trente (30) jours fin de mois après la réception de la facture, par virement bancaire SEPA sur le compte du
                Prestataire, ou sur toute solution de paiement en ligne fournie par le Prestataire.
              </p>
              <p>
                En cas d'abonnement, les paiements sont effectués selon la périodicité convenue (mensuelle ou annuelle), en
                début de période. Le Client s'engage à maintenir des moyens de paiement valides pendant toute la durée de
                l'engagement.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mt-8 mb-3">Clause n° 5 : Retard de paiement</h2>
              <p>
                Tout retard de paiement entraîne de plein droit, sans mise en demeure préalable, l'application de pénalités
                de retard calculées sur la base de trois (3) fois le taux de l'intérêt légal, ainsi que d'une indemnité
                forfaitaire de 40 € pour frais de recouvrement, conformément à l'article 441-10 du Code du commerce. Les
                pénalités sont calculées sur le montant TTC des sommes restant dues, et courent à compter du lendemain de
                la date d'échéance mentionnée sur la facture.
              </p>
              <p>
                <strong>Clause résolutoire :</strong> Si dans les quinze jours suivant l'application de la clause « Retard
                de paiement », le client ne s'est pas acquitté des sommes restant dues, la vente sera résolue de plein droit
                et pourra ouvrir droit à l'allocation de dommages et intérêts au profit de la SAS MARE NOSTRUM.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mt-8 mb-3">Clause n° 6 : Clause de réserve de propriété</h2>
              <p>
                La propriété de tous les contenus, livrables, supports pédagogiques, documents techniques, produits, dessins,
                photographies remis aux clients dans le cadre des prestations de service est conservée intégralement par la
                SAS MARE NOSTRUM, seule titulaire des droits de propriété intellectuelle y afférents. Ils ne peuvent être ni
                divulgués, ni vendus, ni cédés à des tiers sans son accord préalable écrit. Les clients s'engagent par ailleurs
                à ne faire aucun usage de ces documents, susceptible de porter atteinte aux droits de la SAS MARE NOSTRUM.
              </p>
              <p>
                À ce titre, si le client fait l'objet d'un redressement ou d'une liquidation judiciaire, l'entreprise SAS MARE
                NOSTRUM se réserve le droit de revendiquer, dans le cadre de la procédure collective, les prestations réalisées
                et restées impayées.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mt-8 mb-3">Clause n° 7 : Fin de la prestation</h2>
              <p>
                La prestation prend fin soit à la remise électronique (ou en main propre) des livrables au client, soit à
                l'issue de la dernière prestation prévue au devis.
              </p>
              <p>
                Le délai de livraison indiqué lors de l'enregistrement de la commande n'est donné qu'à titre indicatif et
                n'est aucunement garanti. La SAS MARE NOSTRUM s'engage à mobiliser tous moyens, raisonnablement, afin de
                réaliser la prestation. Par voie de conséquence, tout retard dans la livraison de la prestation ne pourra
                donner lieu au profit du client à ni l'allocation de dommages et intérêts, ni à l'annulation de la commande.
              </p>
              <p>
                Les services assortis d'une durée d'engagement initiale (par exemple 12 mois) sont conclus avec une clause
                de reconduction tacite. Ils sont reconduits pour une durée identique à la durée initiale, aux mêmes conditions
                de service, sauf évolution tarifaire dûment notifiée, à l'issue de la période d'engagement.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mt-8 mb-3">Clause n° 8 : Annulation, report de la commande</h2>
              <p>
                Toute demande d'annulation ou de report d'une prestation de service par le Client doit être formulée par
                écrit. En cas d'annulation par le client, jusqu'à 30 jours avant le début de la prestation, pour toute raison
                autre que la force majeure, une somme de 30 % du montant du devis accepté par le client reste acquise au
                Client, à titre d'indemnité forfaitaire. En cas d'annulation ou de report moins de 30 jours ouvrés avant le
                début de la prestation de service, la totalité du prix reste due.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mt-8 mb-3">Clause n° 9 : Réalisation d'un abonnement</h2>
              <p>
                L'abonnement peut être résilié par le Client à l'issue de la période d'engagement initiale, sous réserve du
                respect du préavis de 90 jours avant la date d'échéance, par lettre recommandée.
              </p>
              <p>
                En cas de résiliation anticipée du fait du Client hors cas de force majeure, les sommes restant dues au titre
                de la période d'engagement initiale deviennent immédiatement exigibles, sauf accord écrit contraire du
                Prestataire. Les avantages tarifaires spécifiques sont perdus en cas d'interruption de l'abonnement.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mt-8 mb-3">Clause n° 10 : Force majeure</h2>
              <p>
                La responsabilité de la SAS MARE NOSTRUM ne peut être mise en œuvre si la non-exécution ou le retard dans
                l'exécution de l'une de ses obligations décrites dans les présentes conditions générales de vente découle
                d'un cas de force majeure. À ce titre, la force majeure s'entend de tout événement extérieur, imprévisible
                et irrésistible au sens de l'article 1218 du Code civil. La responsabilité de la SAS MARE NOSTRUM n'est pas
                non plus engagée en cas de manquement du client à ses propres engagements.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mt-8 mb-3">Clause n° 11 : Tribunal compétent</h2>
              <p>
                Tout litige relatif à l'interprétation et à l'exécution des présentes conditions générales de vente est
                soumis au droit français. À défaut de résolution amiable, le litige sera porté devant le Tribunal de
                commerce de Toulouse (Haute-Garonne), France.
              </p>
            </section>

          </div>
        </main>

        <section className="relative overflow-hidden py-16 md:py-20" style={{ background: 'linear-gradient(135deg, hsl(222 44% 25%) 0%, hsl(228 56% 13%) 100%)' }}>
          <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: 'repeating-linear-gradient(135deg, transparent 0 22px, hsl(181 67% 54% / 0.055) 22px 23px)' }}></div>
          <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 70% 30%, hsl(181 67% 54% / 0.18) 0%, transparent 52%), radial-gradient(ellipse at 15% 80%, hsl(228 56% 8% / 0.65) 0%, transparent 55%)' }}></div>
          <div className="container mx-auto px-4 text-center relative z-10">
            <div className="mn-eyebrow-light mb-5">Travaillons ensemble</div>
            <h2 className="font-editorial italic text-3xl md:text-4xl font-semibold mb-6 text-primary-foreground" style={{ letterSpacing: '-0.015em' }}>
              Prêt à construire l'avenir ensemble ?
            </h2>
            <p className="text-lg text-primary-foreground/75 mb-8 max-w-2xl mx-auto" style={{ lineHeight: '1.65' }}>
              Rejoignez les écoles et entrepreneurs qui transforment leurs ambitions en réalité
            </p>
            <Button asChild size="lg" variant="secondary">
              <Link to="/contact">
                Contactez-nous maintenant
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default CGV;
