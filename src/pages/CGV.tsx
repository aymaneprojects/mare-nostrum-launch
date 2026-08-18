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
        description="Conditions générales de vente des prestations de services de la SAS Mare Nostrum. Version en vigueur à compter du 01/07/2026."
        noindex={true}
      />
      <div className="min-h-screen bg-background">
        <Header />

        <main className="container mx-auto px-4 py-24 max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-2">
            Conditions Générales de Vente
          </h1>
          <p className="text-sm text-muted-foreground mb-1">SAS Mare Nostrum</p>
          <p className="text-sm text-muted-foreground mb-10">Version en vigueur à compter du 01/07/2026</p>

          <div className="prose prose-lg max-w-none text-foreground/80 space-y-10">

            {/* Identification */}
            <section>
              <h2 className="text-xl font-semibold text-foreground mt-8 mb-3">Identification du Prestataire</h2>
              <p>
                MARE NOSTRUM — Société par actions simplifiée à mission au capital de 10 000 €<br />
                Siège social : 22 rue Maurice Fonvieille, 31000 Toulouse (France)<br />
                SIRET : 948 134 002 00013 — RCS Toulouse B 948 134 002 — NAF : 70.22Z<br />
                TVA intracommunautaire : FR14948134002<br />
                Organisme de formation enregistré sous le n° 76311216831 auprès du préfet de région Occitanie — cet enregistrement ne vaut pas agrément de l'État<br />
                Référent handicap : <a href="mailto:handicap@marenostrum.tech">handicap@marenostrum.tech</a><br />
                Référent RGPD : <a href="mailto:rgpd@marenostrum.tech">rgpd@marenostrum.tech</a><br />
                Les présentes conditions générales de vente sont accessibles en ligne à l'adresse <a href="https://www.marenostrum.tech/cgv">www.marenostrum.tech/cgv</a>.
              </p>
            </section>

            {/* Définitions */}
            <section>
              <h2 className="text-xl font-semibold text-foreground mt-8 mb-3">Définitions</h2>
              <p>Dans les présentes conditions générales de vente, les termes ci-dessous ont la signification suivante :</p>
              <ul className="list-disc pl-6 space-y-1 mt-2">
                <li><strong>Prestataire</strong> : la SAS MARE NOSTRUM, désignée également « Mare Nostrum ».</li>
                <li><strong>Client</strong> : toute personne morale, ou personne physique agissant à des fins professionnelles, qui commande une Prestation.</li>
                <li><strong>Prestation</strong> : tout service fourni par le Prestataire tel que défini au Devis : abonnement logiciel, action de formation professionnelle continue ou prestation ponctuelle.</li>
                <li><strong>Devis</strong> : la proposition commerciale, convention, contrat de formation, bon de commande ou contrat d'abonnement accepté par le Client, incluant les conditions particulières.</li>
                <li><strong>Abonnement</strong> : Prestation à exécution successive assortie d'une durée d'engagement.</li>
                <li><strong>Participant</strong> : personne physique inscrite à une action de formation, notamment collective.</li>
                <li><strong>Charte</strong> : la Charte de la formation professionnelle au sein de Mare Nostrum, qui fait partie intégrante du contrat pour les actions collectives.</li>
                <li><strong>Plateforme</strong> : la solution logicielle en ligne éditée par le Prestataire et mise à disposition par Abonnement.</li>
                <li><strong>Livrables</strong> : documents, supports, contenus et productions remis au Client dans le cadre d'une Prestation.</li>
              </ul>
            </section>

            {/* TITRE I */}
            <section>
              <h2 className="text-2xl font-bold text-foreground mt-10 mb-4">TITRE I — DISPOSITIONS COMMUNES</h2>

              <h3 className="text-lg font-semibold text-foreground mt-6 mb-2">Clause n° 1 : Objet</h3>
              <p>
                Les présentes conditions générales de vente (CGV) définissent les droits et obligations de la SAS MARE NOSTRUM et de ses clients dans le cadre de ses prestations de services. Toute commande implique l'adhésion sans réserve du client aux présentes conditions générales.
              </p>
              <p className="mt-2">
                Elles se composent d'un Titre I — Dispositions communes, applicable à toutes les Prestations, et d'un Titre II — Dispositions spécifiques, propres à chaque catégorie de Prestation.
              </p>

              <h3 className="text-lg font-semibold text-foreground mt-6 mb-2">Clause n° 2 : Qualité du Client</h3>
              <p>
                Le Client reconnaît que la Prestation est conclue pour les besoins de son activité professionnelle, exercée ou en cours de création, et qu'elle entre dans le champ de cette activité. Lorsque le Client estime que le contrat pourrait relever des règles protectrices applicables à certains professionnels, il le déclare par écrit avant la signature du Devis. La SAS MARE NOSTRUM applique alors les informations et formalités légalement requises.
              </p>

              <h3 className="text-lg font-semibold text-foreground mt-6 mb-2">Clause n° 3 : Nature des prestations</h3>
              <p>La SAS MARE NOSTRUM propose trois catégories distinctes de prestations :</p>
              <p className="mt-2"><strong>3.1 : Abonnements logiciels</strong><br />
                Le Prestataire met à disposition du Client, à titre onéreux et pour une durée tacitement reconductible, un accès à une ou plusieurs solutions logicielles qu'il édite. Ces prestations relèvent d'une obligation de moyens portant sur la mise à disposition dans les conditions et limites précisées à la clause spécifique.</p>
              <p className="mt-2"><strong>3.2 : Actions de formation professionnelle continue</strong><br />
                Le Prestataire dispense des actions de formation professionnelle continue au sens des articles L. 6313-1 et suivants du Code du travail, conformément à un programme préalablement communiqué au Client. Elles peuvent, sous réserve de la certification du Prestataire, faire l'objet d'une prise en charge par un OPCO, France Travail ou tout autre organisme financeur.</p>
              <p className="mt-2"><strong>3.3 : Prestations de services à échéance unique</strong><br />
                Le Prestataire réalise des prestations de conseil, d'accompagnement, d'ingénierie ou d'expertise ne relevant ni d'un abonnement, ni d'une action de formation professionnelle continue. Ces Prestations ponctuelles font l'objet d'un devis précisant leur objet, périmètre, livrables, calendrier et prix.</p>
              <p className="mt-2"><strong>3.4 : Régime applicable</strong><br />
                Les clauses du Titre I s'appliquent à toutes les catégories. Les clauses propres à chaque catégorie figurent au Titre II. En cas de contradiction, les dispositions spécifiques priment. Les conditions particulières du Devis prévalent sur les présentes CGV.</p>

              <h3 className="text-lg font-semibold text-foreground mt-6 mb-2">Clause n° 4 : Réserve de propriété</h3>
              <p>
                La propriété de tous les livrables, documents techniques, produits, supports pédagogiques, dessins et photographies remis au client demeure intégralement celle de la SAS MARE NOSTRUM, seule titulaire des droits de propriété intellectuelle afférents. Le client reçoit un droit d'usage personnel, non exclusif et non cessible, limité à ses besoins propres. Ces éléments ne peuvent être ni divulgués, ni vendus, ni cédés à aucun tiers sans accord préalable écrit.
              </p>
              <p className="mt-2">
                Si le client fait l'objet d'un redressement ou d'une liquidation judiciaire, la SAS MARE NOSTRUM se réserve le droit de revendiquer, dans le cadre de la procédure collective, les prestations réalisées et restées impayées. La confidentialité des contenus et des échanges est régie par la clause n° 5.
              </p>

              <h3 className="text-lg font-semibold text-foreground mt-6 mb-2">Clause n° 5 : Confidentialité</h3>
              <p>
                Chaque partie s'engage à préserver la confidentialité des informations non publiques échangées dans le cadre de la Prestation : documents internes, données, éléments financiers, procédures, accès, Livrables, méthodes et échanges de travail. Cet engagement demeure en vigueur pendant toute la durée du contrat et pendant trois (3) ans après son terme. Des dispositions renforcées spécifiques s'appliquent aux actions de formation professionnelle.
              </p>

              <h3 className="text-lg font-semibold text-foreground mt-6 mb-2">Clause n° 6 : Protection des données personnelles</h3>
              <p>
                Les données personnelles collectées sont traitées conformément au règlement (UE) 2016/679 (RGPD) et à la politique de confidentialité de la SAS MARE NOSTRUM, aux seules fins de gestion de la relation client, d'exécution de la Prestation et de respect des obligations légales. Le Client dispose d'un droit d'accès, de rectification, d'effacement, de limitation, de portabilité et d'opposition, qu'il exerce auprès du responsable de traitement à l'adresse <a href="mailto:rgpd@marenostrum.tech">rgpd@marenostrum.tech</a>. L'hébergement est assuré au sein de l'Union européenne.
              </p>
              <p className="mt-2">
                Lorsque Mare Nostrum traite des données personnelles pour le compte du Client, elle agit en qualité de sous-traitant au sens de l'article 28 du RGPD, dans les conditions d'une annexe dédiée précisant l'objet, la durée, les finalités, les mesures de sécurité et les sous-traitants ultérieurs.
              </p>

              <h3 className="text-lg font-semibold text-foreground mt-6 mb-2">Clause n° 7 : Prix</h3>
              <p><strong>7.1 : Prix en vigueur</strong><br />Les prix sont ceux en vigueur le jour de la commande. Ils sont libellés en euros et calculés hors taxes. Les tarifs proposés comprennent les rabais et ristournes que la SAS MARE NOSTRUM serait amenée à octroyer.</p>
              <p className="mt-2"><strong>7.2 : Actualisation des prix</strong><br />Les offres de prix sont actualisables par trimestre civil suivant l'indice des prix à la consommation (IPC) élaboré par les autorités gouvernementales françaises.</p>
              <p className="mt-2"><strong>7.3 : Frais logistiques</strong><br />Des frais divers (hébergement, restauration, déplacement…) nécessaires à la bonne réalisation de la prestation sont intégralement pris en charge par le client et facturés sur justificatifs, à l'issue de la prestation ou, le cas échéant, annuellement.</p>
              <p className="mt-2"><strong>7.4 : Tacite reconduction</strong><br />Le devis indique explicitement si le contrat est à tacite reconduction. Dans ce cas, les prix sont également actualisables.</p>
              <p className="mt-2"><strong>7.5 : Escompte</strong><br />Aucun escompte n'est accordé en cas de paiement anticipé.</p>

              <h3 className="text-lg font-semibold text-foreground mt-6 mb-2">Clause n° 8 : Régime de TVA</h3>
              <p>
                Le taux de TVA applicable est celui en vigueur à la date d'émission de la facture, sauf pour les actions de formation professionnelle continue (voir dispositions spécifiques). Pour les Prestations rendues à un Client assujetti établi dans un autre État membre de l'UE, la TVA française n'est pas applicable et est autoliquidée par le preneur (article 259-1 du CGI). Pour les Prestations rendues à un Client assujetti établi hors UE, la TVA française n'est pas applicable (article 259-1 du CGI) ; la facture porte alors la mention « TVA non applicable — article 259-1 du CGI ». Le Client reste, le cas échéant, redevable de la taxe applicable dans son propre pays.
              </p>

              <h3 className="text-lg font-semibold text-foreground mt-6 mb-2">Clause n° 9 : Impôts</h3>
              <p>
                Les prix stipulés aux devis et factures s'entendent nets de toute retenue à la source, taxe ou prélèvement qui pourrait être exigé dans le pays d'établissement du Client lorsque celui-ci est établi hors de France. Lorsqu'une retenue à la source est prélevée, le Client s'engage à majorer le montant réglé de sorte que le Prestataire perçoive, après déduction, l'intégralité du montant net convenu au devis. Le Client s'engage à remettre un justificatif de retenue à la source dans un délai raisonnable. Toute exception doit faire l'objet d'un accord écrit préalable entre les Parties.
              </p>

              <h3 className="text-lg font-semibold text-foreground mt-6 mb-2">Clause n° 10 : Frais et avantages initiaux</h3>
              <p><strong>10.1 : Frais de dossier</strong><br />Les frais de dossier, fixés forfaitairement par pays, correspondent aux coûts d'ouverture, d'instruction, d'enregistrement et d'administration du dossier. Le Prestataire peut accorder des remises sur ces frais.</p>
              <p className="mt-2"><strong>10.2 : Avantages tarifaires</strong><br />Les avantages tarifaires spécifiques accordés au Client (notamment tarif fidélité ou early bird) sont perdus en cas d'interruption anticipée de l'engagement, sauf accord écrit contraire.</p>

              <h3 className="text-lg font-semibold text-foreground mt-6 mb-2">Clause n° 11 : Modalités de paiement</h3>
              <p>
                Les paiements sont réalisables via une solution de paiement en ligne fournie par la SAS MARE NOSTRUM, ou par virement au compte bancaire professionnel :
              </p>
              <p className="mt-2 font-mono text-sm bg-secondary/40 p-4 rounded-sm">
                Banque : CIC TOULOUSE ARTS<br />
                RIB : 10057 19047 00020808801 84<br />
                IBAN : FR76 1005 7190 4700 0208 0880 184<br />
                BIC : CMCIFRPP
              </p>
              <p className="mt-2">Seuls les virements SEPA sont acceptés. Les virements SWIFT ne sont pas acceptés. Les frais bancaires liés aux virements transfrontaliers restent à la charge du Client.</p>

              <h3 className="text-lg font-semibold text-foreground mt-6 mb-2">Clause n° 12 : Retard de paiement</h3>
              <p>
                Tout retard de paiement, total ou partiel, entraîne de plein droit l'application de pénalités calculées sur la base de trois fois le taux de l'intérêt légal, ainsi qu'une indemnité forfaitaire de 40 € au titre des frais de recouvrement, conformément à l'article L. 441-10 du Code de commerce. Le taux de l'intérêt légal retenu est celui en vigueur au jour de l'envoi de la facture. Ces pénalités sont calculées sur le montant TTC des sommes restant dues, à compter du lendemain de la date d'échéance indiquée sur la facture, sans mise en demeure préalable. Lorsque les frais de recouvrement exposés sont supérieurs au montant forfaitaire, une indemnisation complémentaire peut être réclamée sur justificatifs.
              </p>

              <h3 className="text-lg font-semibold text-foreground mt-6 mb-2">Clause n° 13 : Clause résolutoire</h3>
              <p>
                Si, dans les cinq (5) jours qui suivent la notification des pénalités calculées, le client ne s'est pas acquitté des sommes restant dues, la vente sera résolue de plein droit et pourra ouvrir droit à l'allocation de dommages et intérêts au profit de la SAS MARE NOSTRUM. Elle emporte exigibilité immédiate des sommes dues au titre de la clause n° 14 (résiliation anticipée).
              </p>

              <h3 className="text-lg font-semibold text-foreground mt-6 mb-2">Clause n° 14 : Résiliation anticipée du contrat</h3>
              <p><strong>14.1 : Résiliation anticipée du fait du Client</strong><br />En cas de résiliation anticipée du fait du Client, par choix ou par faute constatée, hors cas de force majeure, les sommes restant dues au titre de la période d'engagement en cours deviennent immédiatement exigibles, sauf accord écrit contraire du Prestataire.</p>
              <p className="mt-2"><strong>14.2 : Résiliation du fait du Prestataire</strong><br />En cas de manquement grave de la SAS MARE NOSTRUM à ses obligations, le Client peut résilier après mise en demeure écrite restée sans effet pendant trente (30) jours ; il est alors remboursé au prorata des prestations non exécutées.</p>

              <h3 className="text-lg font-semibold text-foreground mt-6 mb-2">Clause n° 15 : Assurance</h3>
              <p>
                Le Prestataire déclare être titulaire d'une police d'assurance responsabilité civile professionnelle couvrant les conséquences pécuniaires de sa responsabilité au titre de ses activités, souscrite auprès de AXA Catala &amp; Associés. Une attestation est communiquée sur simple demande.
              </p>

              <h3 className="text-lg font-semibold text-foreground mt-6 mb-2">Clause n° 16 : Obligations du client et collaboration</h3>
              <p>
                La bonne exécution de la prestation suppose la collaboration active du Client : transmission des informations et pièces nécessaires, respect des délais de réponse, présence aux rendez-vous convenus, validation des livrables lorsqu'elle est requise. Un manquement à ces obligations peut décaler la Prestation ou en empêcher la poursuite, sans que la responsabilité de la SAS MARE NOSTRUM puisse être engagée.
              </p>
              <p className="mt-2">
                Lorsque l'avancement nécessite une action, une validation ou une réponse du Client, Mare Nostrum peut suspendre l'exécution tant que cet élément n'est pas transmis, selon le processus suivant : première relance à 15 jours ; seconde relance à 30 jours ; mise en attente à 45 jours ; mise en demeure à 60 jours. En l'absence de régularisation dans un délai total de 90 jours, le dossier est placé en attente non prioritaire pour inactivité imputable au Client.
              </p>

              <h3 className="text-lg font-semibold text-foreground mt-6 mb-2">Clause n° 17 : Responsabilité</h3>
              <p>
                La responsabilité de la SAS MARE NOSTRUM est limitée aux dommages directs prouvés résultant d'une faute qui lui est imputable, et ne saurait excéder le montant hors taxes effectivement encaissé au titre de la prestation concernée. Elle ne couvre pas les pertes indirectes, pertes d'exploitation, pertes de chiffre d'affaires, pertes de chance, ni les décisions relevant de tiers.
              </p>
              <p className="mt-2">
                Ce plafond ne s'applique pas en cas de faute lourde ou dolosive, ni dans les cas où une disposition légale impérative l'interdit. Le manquement à la clause de confidentialité engage la responsabilité de son auteur dans les conditions du droit commun.
              </p>

              <h3 className="text-lg font-semibold text-foreground mt-6 mb-2">Clause n° 18 : Force majeure</h3>
              <p>
                La responsabilité de la SAS MARE NOSTRUM ne peut être engagée si l'inexécution ou le retard découle d'un cas de force majeure au sens de l'article 1218 du Code civil (événement extérieur, imprévisible et irrésistible). Sa responsabilité n'est pas davantage engagée en cas de manquement du Client à ses propres obligations.
              </p>

              <h3 className="text-lg font-semibold text-foreground mt-6 mb-2">Clause n° 19 : Nullité partielle et renonciation</h3>
              <p>
                Si l'une des clauses des présentes CGV était déclarée nulle ou inapplicable, les autres clauses conserveraient leur pleine validité. Le fait pour la SAS MARE NOSTRUM de ne pas se prévaloir d'un droit issu des présentes ne vaut pas renonciation à ce droit.
              </p>

              <h3 className="text-lg font-semibold text-foreground mt-6 mb-2">Clause n° 20 : Modification des présentes CGV</h3>
              <p>
                Le Prestataire peut modifier les présentes CGV à tout moment. La version applicable à une commande est celle en vigueur au jour de son acceptation. Les modifications substantielles sont portées à la connaissance des Clients titulaires d'un contrat en cours par courriel ou notification, au moins trente (30) jours avant leur entrée en vigueur. Le Client qui n'accepte pas ces modifications peut résilier son Abonnement à leur date d'effet, sans pénalité.
              </p>

              <h3 className="text-lg font-semibold text-foreground mt-6 mb-2">Clause n° 21 : Réclamations et médiation</h3>
              <p>
                Toute réclamation est adressée par écrit au siège social de la SAS MARE NOSTRUM, qui s'engage à rechercher une solution amiable. Lorsque le Client a la qualité de consommateur au sens du Code de la consommation, il peut recourir gratuitement, après réclamation écrite préalable, au médiateur de la consommation désigné, conformément aux articles L.612-1 et suivants du Code de la consommation :
              </p>
              <p className="mt-2">
                CM2C — Centre de la Médiation de la Consommation de Conciliateurs de Justice<br />
                49 rue de Ponthieu, 75008 Paris — <a href="https://www.cm2c.net" target="_blank" rel="noopener noreferrer">cm2c.net</a><br />
                Saisine en ligne : <a href="mailto:declarer-un-litige@cm2c.net">declarer-un-litige@cm2c.net</a>
              </p>

              <h3 className="text-lg font-semibold text-foreground mt-6 mb-2">Clause n° 22 : Droit applicable et juridiction compétente</h3>
              <p>
                Tout litige relatif à l'interprétation et à l'exécution des présentes conditions générales de vente est soumis au droit français. À défaut de résolution amiable, le litige sera porté devant le Tribunal de commerce de Toulouse (Haute-Garonne), France. Lorsque le Client est un non-professionnel ou un consommateur, les règles de compétence protectrices d'ordre public lui demeurent applicables.
              </p>
            </section>

            {/* TITRE II */}
            <section>
              <h2 className="text-2xl font-bold text-foreground mt-10 mb-4">TITRE II — DISPOSITIONS SPÉCIFIQUES</h2>

              <h3 className="text-xl font-semibold text-foreground mt-8 mb-3">Chapitre A — Abonnements logiciels</h3>

              <p><strong>A.1 : Droit d'usage</strong><br />La SAS MARE NOSTRUM concède au Client, pour la durée de l'Abonnement, un droit d'usage personnel, non exclusif, non cessible et non sous-licenciable de la Plateforme, limité à ses besoins professionnels propres et au nombre d'utilisateurs prévu au Devis. Toute exploitation commerciale, revente, mise à disposition de tiers ou extraction automatisée des contenus est interdite.</p>
              <p className="mt-3"><strong>A.2 : Disponibilité et maintenance</strong><br />Le Prestataire met en œuvre les moyens raisonnables pour assurer l'accès et le bon fonctionnement de la Plateforme. Aucune disponibilité continue n'est garantie en l'absence d'un niveau de service (SLA) expressément prévu au Devis. Les opérations de maintenance planifiée sont annoncées dans un délai raisonnable.</p>
              <p className="mt-3"><strong>A.3 : Données du Client et sécurité</strong><br />Le Client demeure propriétaire des données qu'il héberge sur la Plateforme. Le Prestataire met en œuvre les mesures techniques et organisationnelles appropriées pour en assurer la sécurité et la confidentialité, et n'y accède que pour les besoins de l'exécution du service, de la maintenance et du support.</p>
              <p className="mt-3"><strong>A.4 : API et jetons d'accès</strong><br />Lorsque le Prestataire met à disposition des interfaces de programmation (API) accessibles au moyen d'un jeton sécurisé, le Client est seul responsable de la conservation de ce jeton, du choix des applications tierces auxquelles il le transmet et du partage de données qui en résulte.</p>
              <p className="mt-3"><strong>A.5 : Durée et tacite reconduction</strong><br />Les abonnements sont conclus avec reconduction tacite pour une durée identique à la durée initiale, aux mêmes conditions. Le principe de tacite reconduction est explicitement indiqué sur le devis signé par le Client. Lorsque le Client est une personne physique et que la période d'engagement est égale ou supérieure à trois (3) mois, le Prestataire l'informe par écrit, au plus tôt trois (3) mois et au plus tard un (1) mois avant le terme, de sa faculté de ne pas reconduire le contrat, conformément à l'article L.215-1 du Code de la consommation.</p>
              <p className="mt-3"><strong>A.6 : Évolution du service</strong><br />La Plateforme évolue de façon continue. Les évolutions substantiellement défavorables au Client sont notifiées dans les conditions de l'article 20.</p>
              <p className="mt-3"><strong>A.7 : Modalités de paiement</strong><br />Les paiements sont effectués selon la périodicité convenue, en début de période. Le Client s'engage à maintenir des moyens de paiement valides pendant toute la durée de l'engagement.</p>
              <p className="mt-3"><strong>A.8 : Résiliation</strong><br />L'Abonnement peut être résilié par le Client à l'issue de la période d'engagement initiale, sous réserve d'un préavis proportionné à la période d'engagement : un (1) mois pour un engagement ≤ 3 mois ; deux (2) mois pour 6 mois ; trois (3) mois pour 12 mois ou plus. En cas de résiliation anticipée, les dispositions de la clause 14.1 s'appliquent.</p>
              <p className="mt-3"><strong>A.9 : Réversibilité</strong><br />À l'expiration ou à la résiliation de l'Abonnement, le Client dispose d'un délai de cinq (5) jours pour exporter ses données dans un format structuré. À l'issue de ce délai, le Prestataire procède à leur suppression, sous réserve des obligations légales de conservation.</p>

              <h3 className="text-xl font-semibold text-foreground mt-8 mb-3">Chapitre B — Actions de formation professionnelle continue</h3>

              <p><strong>B.1 : Information préalable</strong><br />Préalablement à toute inscription, le Prestataire communique les objectifs et prérequis, le public visé, la durée et les modalités d'organisation, les tarifs, les méthodes mobilisées, les modalités d'évaluation, les modalités et délais d'accès (minimum 14 jours entre inscription et entrée en formation), les indicateurs de résultats disponibles, ainsi que les conditions d'accessibilité aux personnes en situation de handicap.</p>
              <p className="mt-3"><strong>B.2 : Accessibilité</strong><br />Les formations sont accessibles aux personnes en situation de handicap. Lors de l'inscription, le Prestataire étudie avec le candidat les aménagements mobilisables. Référent handicap : <a href="mailto:handicap@marenostrum.tech">handicap@marenostrum.tech</a>.</p>
              <p className="mt-3"><strong>B.3 : Régime de TVA</strong><br />Les actions de formation professionnelle continue réalisées en France sont exonérées de TVA, conformément à l'article 261-4-4°a du Code général des impôts et à l'attestation délivrée par la DREETS Occitanie.</p>
              <p className="mt-3"><strong>B.4 : Modalités de paiement</strong><br />La facture est payable à la commande de la Prestation ; son paiement entraîne le démarrage de la Prestation. Les paiements s'effectuent en euros, au plus tard dans un délai de trente (30) jours fin de mois après réception de la facture. Lorsqu'un échelonnement est accordé, il constitue une facilité de paiement portant sur le prix total et n'emporte aucune faculté de résiliation libre.</p>
              <p className="mt-3"><strong>B.5 : Nature de l'obligation</strong><br />Le Prestataire est tenu d'une obligation de moyens. Les résultats professionnels, commerciaux ou financiers du Participant dépendent de facteurs qui lui sont propres et ne peuvent faire l'objet d'aucune garantie.</p>
              <p className="mt-3"><strong>B.6 : Charte et prestations collectives</strong><br />L'inscription à une action collective emporte acceptation de la Charte, qui fait partie intégrante du contrat. La Charte définit le cadre de fonctionnement du groupe, les engagements réciproques, la confidentialité entre Participants et le mécanisme de régulation.</p>
              <p className="mt-3"><strong>B.7 : Confidentialité réciproque entre Participants</strong><br />Pour les Prestations collectives, chaque Participant s'engage à une confidentialité absolue et réciproque sur l'ensemble de ce qui est partagé au sein du groupe, tant pendant la durée du programme qu'après sa sortie du groupe, quelle qu'en soit la cause. Le manquement à cette obligation engage la responsabilité de son auteur dans les conditions du droit commun.</p>
              <p className="mt-3"><strong>B.8 : Durée, absence et abandon</strong><br />L'absence d'un Participant à une ou plusieurs séances ne donne lieu à aucun remboursement ni report, les séances manquées étant réputées mises à disposition. En cas d'abandon en cours de parcours du fait du Participant, les dispositions de la clause 14.1 s'appliquent.</p>
              <p className="mt-3"><strong>B.9 : Annulation, report et exclusion</strong><br />Toute demande d'annulation ou de report doit être formulée par écrit. Le Prestataire se réserve la faculté d'annuler ou de reporter une session dont l'effectif serait insuffisant, au plus tard sept (7) jours avant son démarrage ; dans ce cas, le Client se voit proposer une session ultérieure ou est remboursé intégralement. La place au sein d'un groupe étant nominative, l'exclusion d'un Participant prononcée pour manquement caractérisé à la Charte produit les effets d'une résiliation anticipée du fait du Client.</p>

              <h3 className="text-xl font-semibold text-foreground mt-8 mb-3">Chapitre C — Prestations ponctuelles</h3>

              <p><strong>C.1 : Périmètre et Livrables</strong><br />Le périmètre, les Livrables, le calendrier et le prix sont définis au Devis. Toute prestation non prévue au Devis fait l'objet d'un devis complémentaire. Le Prestataire est tenu d'une obligation de moyens.</p>
              <p className="mt-3"><strong>C.2 : Modalités de paiement</strong><br />Le Devis précise les conditions particulières du versement du ou des acompte(s), le solde étant payable à la réception finale de la Prestation. Le paiement de l'acompte, ou de la première échéance, entraîne le démarrage de la Prestation. Les paiements s'effectuent en euros, au plus tard dans un délai de trente (30) jours fin de mois après réception de la facture.</p>
              <p className="mt-3"><strong>C.3 : Validation par étapes</strong><br />Toute étape validée par écrit par le Client ne peut être ultérieurement contestée ; les révisions demandées après validation peuvent être facturées en complément.</p>
              <p className="mt-3"><strong>C.4 : Fin de la Prestation</strong><br />La Prestation prend fin soit à la remise des Livrables au Client, soit à l'issue de la dernière prestation listée au Devis.</p>
              <p className="mt-3"><strong>C.5 : Délais de livraison</strong><br />Les délais de livraison sont donnés à titre indicatif et ne sont pas garantis. Tout retard dans la livraison ne pourra donner lieu ni à l'allocation de dommages et intérêts, ni à l'annulation de la commande.</p>
              <p className="mt-3"><strong>C.6 : Annulation ou report</strong><br />En cas d'annulation par le Client plus de trente (30) jours avant le début de la Prestation, pour toute raison autre que la force majeure, une somme égale à 30 % du montant du Devis accepté reste acquise au Prestataire à titre d'indemnité forfaitaire. En cas d'annulation ou de report moins de trente (30) jours avant le début de la Prestation, la totalité du prix reste due.</p>
              <p className="mt-3"><strong>C.7 : Cession des droits</strong><br />Sauf stipulation contraire au Devis, la cession au Client des droits d'exploitation sur les Livrables créés spécifiquement pour lui intervient au paiement intégral du prix. Les méthodes, outils, trames et savoir-faire préexistants du Prestataire demeurent sa propriété exclusive.</p>
              <p className="mt-3"><strong>C.8 : Référence commerciale</strong><br />Sauf opposition écrite du Client, le Prestataire peut citer son nom et la nature de la mission à titre de référence commerciale, à l'exclusion de toute information confidentielle.</p>
              <p className="mt-3"><strong>C.9 : Cas particulier des événements</strong><br />
                <em>Inscription.</em> L'inscription est ferme à réception du règlement ou du bon de commande. En cas d'annulation par le Client moins de quinze (15) jours avant l'événement, le prix reste dû ; le remplacement du participant par une autre personne est admis sans frais.<br />
                <em>Modification ou annulation par le Prestataire.</em> Le Prestataire peut modifier le programme, les intervenants ou le lieu pour un motif légitime. En cas d'annulation de son fait, le Client est remboursé intégralement des sommes versées, à l'exclusion de tout autre dédommagement.<br />
                <em>Droit à l'image.</em> Des photographies ou captations peuvent être réalisées lors des événements et des formations. Elles ne sont utilisées, à des fins de communication institutionnelle et pédagogique, qu'avec l'accord exprès des personnes concernées, recueilli par écrit, pour une durée de trois (3) ans et sur le territoire de l'Union européenne. Ce consentement est révocable à tout moment sur simple demande adressée à <a href="mailto:image@marenostrum.tech">image@marenostrum.tech</a>.
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
