import { Navigate, useParams } from "react-router-dom";
import NotFound from "@/pages/NotFound";
import { getMemberByAlias } from "@/data/team";

/**
 * Adresses courtes des cartes de visite : /alexis, /aymane, …
 * Redirige vers la fiche canonique /equipe/<slug>. Toute adresse courte
 * inconnue renvoie la page 404 habituelle.
 */
const CarteAlias = () => {
  const { alias = "" } = useParams();
  const member = getMemberByAlias(alias);
  if (!member) return <NotFound />;
  return <Navigate to={`/equipe/${member.slug}`} replace />;
};

export default CarteAlias;
