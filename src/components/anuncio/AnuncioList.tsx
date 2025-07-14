import { Anuncio } from "@/core/interfaces/Anuncio";
import { AnuncioCard } from "./AnuncioCard";
import { twMerge } from "tailwind-merge";

interface AnuncioListProps {
  anuncios: Anuncio[];
  className?: string,
}

export const AnuncioList = ({ anuncios, className }: AnuncioListProps) => {
  if (anuncios.length === 0) return <p>Sem anúncios no momento.</p>;

  return (
    <div className={twMerge(`grid w-4/4 gap-2 md:grid-cols-2 lg:grid-cols-4`, className)}>
      {anuncios.map((a) => (
        <AnuncioCard key={a.idAnuncio} anuncio={a} />
      ))}
    </div>
  );
};
