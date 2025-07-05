'use client';

import { TabsContent } from "@/components/ui/tabs";
import { AnuncioList } from "@/components/anuncio/AnuncioList";
import { Anuncio } from "@/core/interfaces/Anuncio";

interface Props {
  anuncios: Anuncio[],
  tipoUsuario: string | null
}

export function AnuncioTabsContent({ anuncios,tipoUsuario }: Props) {
  const isFornecedor = tipoUsuario === "fornecedor";

  return (
    <>
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
    </>
  );
}
