"use client";

import { AnuncioTabs } from "@/components/anuncio/AnuncioTabs";
import { AnuncioList } from "@/components/anuncio/AnuncioList";
import { useAnuncio } from "@/hooks/useAnuncio";
import { LoadingSpin } from "@/components/ui/loadingComponent";
import { TabsContent } from "@/components/ui/tabs";
import { useUserContext } from "@/providers/UserProvider";
import { IAnuncio } from "@/core/interfaces/IAnuncio";
import { CriarAnuncio } from "@/components/anuncio/CriarAnuncioModal";

export default function Page() {
  const { user } = useUserContext();
  const { data: anuncios, loading } = useAnuncio<IAnuncio[]>();

  if (loading) return <LoadingSpin />;
  if (!anuncios) return <div>Anuncios não encontrados</div>;
  // Lógica de separação por status e tipo de usuário
  const isFornecedor = user?.tipo === "fornecedor";
  // const abertos = anuncios?.filter((a) => a.status === "aberto") || [];
  // const negociacao = anuncios?.filter((a) => a.status === "negociacao") || [];
  // const finalizados = anuncios?.filter((a) => a.status === "finalizado") || [];
  // const disponiveis = anuncios?.filter((a) => a.status === "disponivel") || [];
  // const salvos = anuncios?.filter((a) => user?.salvos?.includes(a.id)) || [];

  return (
    <div className="bg-primary flex min-h-screen w-full justify-center p-2">
      <div className="w-4/5">
        <AnuncioTabs>
          <div className="flex flex-col">
            {user?.tipo === "fornecedor" && <CriarAnuncio />}
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
