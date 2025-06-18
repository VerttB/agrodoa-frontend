import { ICausas } from "@/core/interfaces/ICausas";
import { CausaCard } from "./CausaCard";

interface CausaProps {
    causas: ICausas[],
}

export const CausaLista = ({causas} : CausaProps) => {
    if (causas.length === 0) return <p>Sem anúncios no momento.</p>;

    return(
        <div className="flex  flex-col items-center gap-8">
            {causas.map(c => <CausaCard key={c.id} causa={c}/>)}
        /</div>
    )
}