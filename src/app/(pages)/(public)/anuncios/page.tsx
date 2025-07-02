
import { AnuncioTabs } from "@/components/anuncio/AnuncioTabs";
import AnuncioSearch from "@/components/anuncio/AnuncioSearch";
import { getAnuncios } from "@/core/services/AnuncioService";
import { getMockUserFromCookies } from "@/lib/auth";
import { CriarAnuncio } from "@/components/anuncio/CriarAnuncioModal";
import { AnuncioTabsContent } from "@/components/anuncio/AnuncioTabsContent";

interface AnuncioProps{
  searchParams: Promise<{
    nome: string
  }>
  
}

export default async function Page({searchParams}: AnuncioProps) {
  const nome = (await searchParams).nome || ''
  const anuncios = await getAnuncios({nome});
  const user = await getMockUserFromCookies();
  
  if (!anuncios) return <div>Anuncios não encontrados</div>;
  const isFornecedor = user?.tipo === "fornecedor"
  console.log(isFornecedor)
  console.log(user?.tipo)
  // const abertos = anuncios?.filter((a) => a.status === "aberto") || [];
  // const negociacao = anuncios?.filter((a) => a.status === "negociacao") || [];
  // const finalizados = anuncios?.filter((a) => a.status === "finalizado") || [];
  // const disponiveis = anuncios?.filter((a) => a.status === "disponivel") || [];
  // const salvos = anuncios?.filter((a) => user?.salvos?.includes(a.id)) || [];

  return (
    <div className=" flex min-h-screen w-full justify-center p-2 bg-radial">
      <div className="w-4/5">
        <AnuncioTabs tipoUsuario={user?.tipo || null}>
          <div className="flex flex-col">
            <AnuncioSearch/>
            {user?.tipo === "fornecedor" && <CriarAnuncio />}
           <AnuncioTabsContent anuncios={anuncios} tipoUsuario={user?.tipo || null}/>
          </div>
        </AnuncioTabs>
      </div>
    </div>
  );
}
