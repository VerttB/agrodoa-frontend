"use client";
import { useRouter } from "next/navigation";
import { Card } from "../ui/Card";
import { Button } from "../ui/button";
import { Anuncio } from "@/core/interfaces/Anuncio";
import { Usuario } from "@/core/interfaces/Usuario";

interface UserAnuncioProps {
  anuncio: Anuncio;
  nomeAnunciante: string,
}

export const UserAnuncio = ({ anuncio, nomeAnunciante }: UserAnuncioProps) => {
  const router = useRouter();

  return (
    <Card.Root
      key={anuncio.idAnuncio}
      className="relative flex flex-col min-w-[240px] max-w-[240px] max-h-[320] justify-around hover:scale-105 transition-transform duration-200 shadow-[0px_6px_21px_-6px_rgba(249,_115,_22,_0.5)]"
    >
      <Card.Image imageUrl="/mato.jpg" alt="imagem do anúncio" />
      
      <Card.Content>
        <div className="h-full">
          <h1 className="mb-4 text-xl font-bold">{anuncio.titulo}</h1>
          <p className="text-sm">
            Preço:{" "}
            {anuncio.produto?.precoUnidade
              ? anuncio.produto.precoUnidade.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })
              : "Grátis"}
          </p>
          <p className="text-sm">Quantidade: {anuncio.produto?.quantidade ?? 0}</p>
        </div>
      </Card.Content>

      <Card.Actions className="flex h-1/7 justify-around p-2 text-sm 2xl:text-lg">
        <Button
          className="w-full px-2 py-1"
          onClick={() => router.push(`/anuncios/${anuncio.idAnuncio}`)}
        >
          Ver Detalhes
        </Button>
       
      </Card.Actions>
    </Card.Root>
  );
};
