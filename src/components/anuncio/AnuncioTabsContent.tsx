'use client';

import { TabsContent } from "@/components/ui/tabs";
import { useUserContext } from "@/providers/UserProvider";
import { AnuncioList } from "@/components/anuncio/AnuncioList";
import { IAnuncio } from "@/core/interfaces/IAnuncio";

interface Props {
  anuncios: IAnuncio[],
  tipoUsuario: string | null
}

export function AnuncioTabsContent({ anuncios,tipoUsuario }: Props) {
  const { user } = useUserContext();
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
