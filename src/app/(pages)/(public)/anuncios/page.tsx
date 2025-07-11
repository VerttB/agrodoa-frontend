
import { AnuncioTabs } from "@/components/anuncio/AnuncioTabs";
import AnuncioSearch from "@/components/anuncio/AnuncioSearch";
import { getAnuncios } from "@/core/services/AnuncioService";
import { getMockUserFromCookies } from "@/lib/auth";
import { CriarAnuncio } from "@/components/anuncio/CriarAnuncioModal";
import { AnuncioTabsContent } from "@/components/anuncio/AnuncioTabsContent";
import { AnuncioQueryParams } from "@/core/interfaces/QueryParams/AnuncioQueryParams";
import { AnuncioFiltros } from "@/components/anuncio/AnuncioFiltros";
import { AnuncioContent } from "@/components/anuncio/AnuncioContent";

interface AnuncioProps{
  searchParams: Promise<AnuncioQueryParams>
  
}

export default async function Page({searchParams}: AnuncioProps) {
  await new Promise(resolve => setTimeout(resolve, 1000))
  const resolvedParams = await searchParams;
  const anuncios = await getAnuncios(resolvedParams);
  

  if (!anuncios) return <div>Anuncios não encontrados</div>;
  return (
    <div className=" flex min-h-screen w-full justify-center p-2 bg-radial">
      <div className="w-4/5">
       <AnuncioContent anuncios={anuncios}/>
      </div>
    </div>
  );
}
