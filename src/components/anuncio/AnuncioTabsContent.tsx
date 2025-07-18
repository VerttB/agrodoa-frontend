import { TabsContent } from "@/components/ui/tabs";
import { AnuncioList } from "@/components/anuncio/AnuncioList";
import { Anuncio } from "@/core/interfaces/Anuncio/Anuncio";
import { Usuario } from "@/core/interfaces/Usuario";

interface Props {
  anunciosPorAba: Partial<Record<string, Anuncio[]>>;
  user: Usuario | null;
}

export function AnuncioTabsContent({ anunciosPorAba, user }: Props) {
 

  return (
    <>
  {user?.tipoUsuario === "fornecedor" ? (
    <>
      <TabsContent value="abertos">
        <AnuncioList anuncios={anunciosPorAba.abertos || []} />
      </TabsContent>
    </>
  ) : user?.tipoUsuario === "beneficiario" ? (
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
  ) : user?.github ? (
    <>
      <TabsContent value="disponiveis">
        <AnuncioList anuncios={anunciosPorAba.disponiveis || []} />
      </TabsContent>
    </>
  ) : (
    <>
      <TabsContent value="disponiveis">
        <AnuncioList anuncios={anunciosPorAba.disponiveis || []} />
      </TabsContent>
    </>
  )}
</>
  );
}
