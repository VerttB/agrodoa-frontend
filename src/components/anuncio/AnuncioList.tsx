import { Anuncio } from "@/core/interfaces/Anuncio";
import { AnuncioCard } from "./AnuncioCard";

interface AnuncioListProps {
  anuncios: Anuncio[];
}

export const AnuncioList = ({ anuncios }: AnuncioListProps) => {
  if (anuncios.length === 0) return <p>Sem anúncios no momento.</p>;

  return (
    <div className="grid w-4/4 gap-2 md:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-5">
      {anuncios.map((a) => (
        <AnuncioCard key={a.anuncioId} anuncio={a} />
      ))}
    </div>
  );
};
