import { TabsContent } from "@/components/ui/tabs";
import { AnuncioList } from "@/components/anuncio/AnuncioList";
import { Anuncio } from "@/core/interfaces/Anuncio/Anuncio";

interface Props {
  anunciosPorAba: Partial<Record<string, Anuncio[]>>;
  tipoUsuario: string | null;
}

export function AnuncioTabsContent({ anunciosPorAba, tipoUsuario }: Props) {
  const isFornecedor = tipoUsuario === "fornecedor";

  return (
    <>
      {isFornecedor ? (
        <>
          <TabsContent value="abertos">
            <AnuncioList anuncios={anunciosPorAba.abertos || []} />
          </TabsContent>
          {/* <TabsContent value="negociacao">
            <AnuncioList anuncios={anunciosPorAba.negociacao || []} />
          </TabsContent>
          <TabsContent value="finalizados">
            <AnuncioList anuncios={anunciosPorAba.finalizados || []} />
          </TabsContent> */}
        </>
      ) : (
        <>
          <TabsContent value="disponiveis">
            <AnuncioList anuncios={anunciosPorAba.disponiveis || []} />
          </TabsContent>
          <TabsContent value="negociacao">
            <AnuncioList anuncios={anunciosPorAba.negociacao || []} />
          </TabsContent>
          <TabsContent value="salvos">
            <AnuncioList anuncios={anunciosPorAba.salvos || []} />
          </TabsContent>
        </>
      )}
    </>
  );
}
