import { Card } from "../ui/Card";
import { IAnuncio } from "@/core/interfaces/IAnuncio";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { Heart } from "lucide-react";
import { AnuncioDropdownMenu } from "./AnuncioDropdown";

export const AnuncioCard = ({ anuncio }: { anuncio: IAnuncio }) => {
  const router = useRouter();
  return (
    <Card.Root
      key={anuncio.titulo}
      className="relative flex flex-col justify-around"
    >
      <div className="absolute top-2 right-2 z-10">
        <AnuncioDropdownMenu anuncio={anuncio} />
      </div>
      <Card.Image imageUrl="/mato.jpg" alt="imagem do anuncio"></Card.Image>
      <Card.Content>
        <div className="h-full">
          <h1 className="mb-4 text-xl font-medium">{anuncio.titulo}</h1>

          <p className="text-sm">{anuncio.anuncianteNome}</p>
          <p className="text-sm">Negociantes:{anuncio.anuncianteNome}</p>
          <p className="text-sm">Preço:{anuncio.produto.preco_unidade}</p>
          <p className="text-sm">Quantidade:{anuncio.produto.quantidade}</p>
        </div>
      </Card.Content>
      <Card.Actions className="flex h-1/7 justify-around p-2 text-sm 2xl:text-lg">
        <Button
          className="w-full px-2 py-1"
          onClick={() => router.push(`/anuncios/${anuncio.id}`)}
        >
          Ver Detalhes
        </Button>
        <Button
          className="flex w-full justify-center gap-1 px-2 py-1"
          variant="outlined"
        >
          Salvar<Heart></Heart>
        </Button>
      </Card.Actions>
    </Card.Root>
  );
};
