import { getAnuncios } from "@/core/services/AnuncioService";
import { AnuncioQueryParams } from "@/core/interfaces/QueryParams/AnuncioQueryParams";
import { AnuncioContent } from "@/components/anuncio/AnuncioContent";
import { Anuncio } from "@/core/interfaces/Anuncio/Anuncio";

interface AnuncioProps {
  searchParams: Promise<AnuncioQueryParams>;
}

export default async function Page({ searchParams }: AnuncioProps) {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const resolvedParams = await searchParams;
  const anuncios:Anuncio[] = await getAnuncios(resolvedParams);
 
  
  if (!anuncios) return <div>Anuncios não encontrados</div>;
  return (
    <div className="flex min-h-screen w-full justify-center bg-radial p-2">
      <div className="w-4/5">
        <AnuncioContent anuncios={anuncios} />
      </div>
    </div>
  );
}
