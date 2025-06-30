
import { AnuncioTabs } from "@/components/anuncio/AnuncioTabs";
import { AnuncioList } from "@/components/anuncio/AnuncioList";
import { TabsContent } from "@/components/ui/tabs";
import { useUserContext } from "@/providers/UserProvider";
import { CriarAnuncio } from "@/components/anuncio/CriarAnuncioModal";
import AnuncioSearch from "@/components/anuncio/AnuncioSearch";
import { getAnuncios } from "@/core/services/AnuncioService";

interface AnuncioProps{
  searchParams: Promise<{
    nome: string,
  }>
}

export default async function Page({searchParams}: AnuncioProps) {
  const nome = searchParams.nome || ''
  const anuncios = await getAnuncios(nome);
  if (!anuncios) return <div>Anuncios não encontrados</div>;
  // Lógica de separação por status e tipo de usuário
  const isFornecedor = false;
  // const abertos = anuncios?.filter((a) => a.status === "aberto") || [];
  // const negociacao = anuncios?.filter((a) => a.status === "negociacao") || [];
  // const finalizados = anuncios?.filter((a) => a.status === "finalizado") || [];
  // const disponiveis = anuncios?.filter((a) => a.status === "disponivel") || [];
  // const salvos = anuncios?.filter((a) => user?.salvos?.includes(a.id)) || [];

  return (
    <div className=" flex min-h-screen w-full justify-center p-2 bg-radial">
      <div className="w-4/5">
        <AnuncioTabs>
          <div className="flex flex-col">
            <AnuncioSearch/>
            {/* {user?.tipo === "fornecedor" && <CriarAnuncio />} */}
            {isFornecedor ? (
              <>
                <TabsContent value="abertos">
                  <AnuncioList anuncios={anuncios} />
                </TabsContent>
                <TabsContent value="negociacao">
                  <AnuncioList anuncios={anuncios} />
                </TabsContent>
                <TabsContent value="finalizados">
                  <AnuncioList anuncios={anuncios} />
                </TabsContent>
              </>
            ) : (
              <>
                <TabsContent value="disponiveis">
                  <AnuncioList anuncios={anuncios} />
                </TabsContent>
                <TabsContent value="negociacao">
                  <AnuncioList anuncios={anuncios} />
                </TabsContent>
                <TabsContent value="salvos">
                  <AnuncioList anuncios={anuncios} />
                </TabsContent>
              </>
            )}
          </div>
        </AnuncioTabs>
      </div>
    </div>
  );
}
