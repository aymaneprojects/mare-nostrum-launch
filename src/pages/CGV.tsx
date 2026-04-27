import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";

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
                Les conditions générales de vente décrites ci-après détaillent les droits et obligations de la SAS MARE NOSTRUM
                et de ses clients dans le cadre de prestations de services. Toute prestation accomplie par la SAS MARE NOSTRUM
                implique donc l'adhésion sans réserve du client aux présentes conditions générales de vente.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mt-8 mb-3">Clause n° 2 : Prix</h2>
              <p>
                Les prix des prestations vendues sont ceux en vigueur au jour de la prise de commande. Ils sont libellés en euros
                et calculés hors taxes.
              </p>
              <p>
                Les offres de prix sont actualisables par trimestre civil suivant l'indice des prix à la consommation (IPC)
                élaboré par les autorités gouvernementales françaises.
              </p>
              <p>
                Des frais divers (hébergement, restauration, déplacement…) nécessaires à la bonne réalisation de la prestation
                seront pris en charge intégralement par le client et facturés sur justificatifs.
              </p>
              <p>
                Le devis indique explicitement si le contrat est à tacite reconduction. Dans ce cas, les prix sont également
                actualisables.
              </p>
              <p>Le taux de TVA applicable est le taux en vigueur à la date d'émission de la facture.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mt-8 mb-3">Clause n° 3 : Rabais et ristournes</h2>
              <p>
                Les tarifs proposés comprennent les rabais et ristournes que la SAS MARE NOSTRUM serait amenée à octroyer
                compte tenu de ses résultats ou de la prise en charge par le client de certaines prestations.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mt-8 mb-3">Clause n° 4 : Escompte</h2>
              <p>Aucun escompte ne sera consenti en cas de paiement anticipé.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mt-8 mb-3">Clause n° 5 : Modalités de paiement</h2>
              <p>
                Le devis précise les conditions particulières du versement du ou des acompte(s), le solde devant être payé
                à réception finale de la prestation. Le règlement du solde s'effectue comptant (30 jours fin de mois) par
                virement au compte bancaire professionnel ouvert pour le compte de la SAS MARE NOSTRUM.
              </p>
              <ul className="list-none space-y-1 text-sm bg-muted/40 border border-border rounded-sm px-5 py-4 mt-3">
                <li><strong>Banque :</strong> CIC TOULOUSE ARTS</li>
                <li><strong>RIB :</strong> 10057 19047 00020808801 84</li>
                <li><strong>IBAN :</strong> FR76 1005 7190 4700 0208 0880 184</li>
                <li><strong>BIC :</strong> CMCIFRPP</li>
              </ul>
              <p className="mt-3">
                Seuls les virements SEPA sont acceptés par la banque. Les virements SWIFT ne sont pas acceptés.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mt-8 mb-3">Clause n° 6 : Retard de paiement</h2>
              <p>
                En cas de défaut de paiement total ou partiel des prestations, le client doit verser à la SAS MARE NOSTRUM
                une pénalité de retard égale à trois fois le taux de l'intérêt légal, ainsi qu'une indemnité forfaitaire
                de 40 € due au titre des frais de recouvrement, en application de l'article 441-6.
              </p>
              <p>
                Le taux de l'intérêt légal retenu (Banque Centrale Européenne) est celui en vigueur au jour de l'envoi
                du devis. Cette pénalité est calculée sur le montant TTC de la somme restant due, et court à compter de
                la date d'échéance du prix sans qu'aucune mise en demeure préalable ne soit nécessaire.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mt-8 mb-3">Clause n° 7 : Clause résolutoire</h2>
              <p>
                Si dans les quinze jours qui suivent la mise en œuvre de la clause « Retard de paiement », le client ne
                s'est pas acquitté des sommes restant dues, la vente sera résolue de plein droit et pourra ouvrir droit
                à l'allocation de dommages et intérêts au profit de la SAS MARE NOSTRUM.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mt-8 mb-3">Clause n° 8 : Clause de réserve de propriété</h2>
              <p>
                La propriété de tous les livrables, documents techniques, produits, dessins et photographies, remis aux
                clients est conservée par la SAS MARE NOSTRUM, seule titulaire des droits de propriété intellectuelle
                sur ces documents. Ils ne peuvent être ni divulgués, ni vendus, ni cédés à aucun tiers sans son accord
                préalable écrit.
              </p>
              <p>
                Les clients s'engagent par ailleurs à ne faire aucun usage de ces documents, susceptible de porter atteinte
                aux droits de la SAS MARE NOSTRUM. À ce titre, si le client fait l'objet d'un redressement ou d'une
                liquidation judiciaire, l'entreprise SAS MARE NOSTRUM se réserve le droit de revendiquer, dans le cadre
                de la procédure collective, les prestations réalisées et restées impayées.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mt-8 mb-3">Clause n° 9 : Fin de la prestation</h2>
              <p>
                La fin de la prestation est effectuée : soit par la remise électronique (ou en main propre) des livrables
                au client ; soit à la fin de la dernière prestation listée dans le devis.
              </p>
              <p>
                Le délai de livraison indiqué lors de l'enregistrement de la commande n'est donné qu'à titre indicatif
                et n'est aucunement garanti. La SAS MARE NOSTRUM s'engage à mobiliser tous moyens, raisonnablement,
                afin de réaliser la prestation.
              </p>
              <p>
                Par voie de conséquence, tout retard dans la livraison de la prestation ne pourra donner lieu au profit
                du client à ni l'allocation de dommages et intérêts, ni à l'annulation de la commande.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mt-8 mb-3">Clause n° 10 : Annulation de la commande</h2>
              <p>
                En cas d'annulation de la prestation par le client, après acceptation de la SAS MARE NOSTRUM, pour quelque
                raison que ce soit hormis la force majeure, une somme de 30 % du devis accepté par le client sera acquise
                au vendeur, à titre de dommages et intérêts, en réparation du préjudice ainsi subi.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mt-8 mb-3">Clause n° 11 : Force majeure</h2>
              <p>
                La responsabilité de la SAS MARE NOSTRUM ne pourra pas être mise en œuvre si la non-exécution ou le retard
                dans l'exécution de l'une de ses obligations décrites dans les présentes conditions générales de vente
                découle d'un cas de force majeure. À ce titre, la force majeure s'entend de tout événement extérieur,
                imprévisible et irrésistible au sens de l'article 1148 du Code civil.
              </p>
              <p>
                La responsabilité de la SAS MARE NOSTRUM n'est pas non plus engagée en cas de non-respect par le client
                de ses engagements.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mt-8 mb-3">Clause n° 12 : Tribunal compétent</h2>
              <p>
                Tout litige relatif à l'interprétation et à l'exécution des présentes conditions générales de vente est
                soumis au droit français. À défaut de résolution amiable, le litige sera porté devant le Tribunal de
                commerce de Toulouse (Haute-Garonne), France.
              </p>
            </section>

          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default CGV;
