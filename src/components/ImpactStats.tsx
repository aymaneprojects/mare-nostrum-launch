import DarkSection from "@/components/DarkSection";

/** Chiffres clés du Club, partagés entre /club et l'accueil. Texte inchangé. */
const ImpactStats = () => (
  <DarkSection halo="left">
        <div className="container mx-auto px-4">
          <div className="mn-eyebrow-light text-center mb-3">Impact mesuré</div>
          <h2 className="font-editorial italic font-semibold text-center mb-12 text-primary-foreground">
            Résultats concrets de l'accompagnement entrepreneur Mare Nostrum
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            <div className="text-center rounded-[var(--radius)] border border-primary-foreground/15 bg-primary-foreground/[0.06] backdrop-blur-sm shadow-glass p-6">
              <div className="text-4xl md:text-5xl font-bold text-accent mb-3">50%</div>
              <p className="text-sm text-primary-foreground/75">
                des entrepreneurs accompagnés se rémunèrent correctement dans les 2 ans après la création
              </p>
            </div>
            <div className="text-center rounded-[var(--radius)] border border-primary-foreground/15 bg-primary-foreground/[0.06] backdrop-blur-sm shadow-glass p-6">
              <div className="text-4xl md:text-5xl font-bold text-accent mb-3">3</div>
              <p className="text-sm text-primary-foreground/75">
                contacts qualifiés en moyenne dès le premier mois d'adhésion
              </p>
            </div>
            <div className="text-center rounded-[var(--radius)] border border-primary-foreground/15 bg-primary-foreground/[0.06] backdrop-blur-sm shadow-glass p-6">
              <div className="text-4xl md:text-5xl font-bold text-accent mb-3">93%</div>
              <p className="text-sm text-primary-foreground/75">
                des membres se disent "très satisfaits ou satisfaits" de leur expérience
              </p>
            </div>
            <div className="text-center rounded-[var(--radius)] border border-primary-foreground/15 bg-primary-foreground/[0.06] backdrop-blur-sm shadow-glass p-6">
              <div className="text-4xl md:text-5xl font-bold text-accent mb-3">90%</div>
              <p className="text-sm text-primary-foreground/75">
                déclarent gagner du temps, de la clarté et de la sérénité après chaque session
              </p>
            </div>
          </div>
        </div>
      </DarkSection>
);

export default ImpactStats;
