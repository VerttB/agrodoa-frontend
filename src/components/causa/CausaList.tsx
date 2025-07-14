import { Causas } from "@/core/interfaces/Causas";
import { CausaCard } from "./CausaCard";

interface CausaProps {
  causas: Causas[];
}

export const CausaLista = ({ causas }: CausaProps) => {
  if (causas.length === 0) return <p>Sem anúncios no momento.</p>;

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-3">
      {causas.map((c) => (
        <CausaCard key={c.idCausa} causa={c} />
      ))}
    </div>
  );
};
