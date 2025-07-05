import { Causas } from "@/core/interfaces/Causas";
import { CausaCard } from "./CausaCard";

interface CausaProps {
  causas: Causas[];
}

export const CausaLista = ({ causas }: CausaProps) => {
  if (causas.length === 0) return <p>Sem anúncios no momento.</p>;

  return (
    <div className="flex flex-col items-center gap-8 w-full">
      {causas.map((c) => (
        <CausaCard key={c.id} causa={c} />
      ))}
      
    </div>
  );
};
