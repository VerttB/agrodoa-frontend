"use client"
import { Card } from "../ui/Card";
import { Anuncio } from "@/core/interfaces/Anuncio";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { Heart } from "lucide-react";
import { AnuncioDropdownMenu } from "./AnuncioDropdown";
import { useUserContext } from "@/providers/UserProvider";
import { salvarAnuncio } from "@/core/services/AnuncioService";
import { useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

export const AnuncioCard = ({ anuncio }: { anuncio: Anuncio }) => {
  const router = useRouter();
  const { user } = useUserContext();
  const [sucess,setSucess] = useState(false);

  const handleSave = (id: string) => {
    console.log(id)
      try{
        const res = salvarAnuncio(id)
        router.refresh();
        setSucess(true);
      }catch(e){
        console.log(e);
      }
  }
  return (
    <>
    <Card.Root
      key={anuncio.titulo}
      className="relative flex flex-col justify-around hover:scale-105 transition-transform duration-200 shadow-[0px_6px_21px_-6px_rgba(249,_115,_22,_0.5)]"
    >
       {user?.tipoUsuario === "fornecedor" && (
        <div className="absolute top-2 right-2 z-10">
          <AnuncioDropdownMenu anuncio={anuncio} />
        </div>
      )}
      <Card.Image imageUrl="/mato.jpg" alt="imagem do anuncio"></Card.Image>
      <Card.Content>
        <div className="h-full">
          <h1 className="mb-4 text-xl font-bold">{anuncio.titulo}</h1>

          <p className="text-sm">{anuncio.anunciante.nome}</p>
          <p className="text-sm">Preço: {anuncio.produto.precoUnidade ? anuncio.produto.precoUnidade.toLocaleString("pt-BR", { style: "currency", currency:"BRL"}) : "Grátis"}</p>
          <p className="text-sm">Quantidade: {anuncio.produto.quantidade}</p>
        </div>
      </Card.Content>
      
      <Card.Actions className="flex h-1/7 justify-around p-2 text-sm 2xl:text-lg">
        <Button
          className="w-full px-2 py-1"
          onClick={() => router.push(`/anuncios/${anuncio.idAnuncio}`)}
        >
          Ver Detalhes
        </Button>
        {user?.tipo !== "fornecedor" &&
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
                className="flex w-full justify-center gap-1 px-2 py-1"
                variant="outlined"
                onClick={() => handleSave(anuncio.idAnuncio)}
              >
            <Heart></Heart>
            <TooltipContent>Salvar Anúncio</TooltipContent>
           </Button>
        </TooltipTrigger>
        </Tooltip>
}
      </Card.Actions>
    </Card.Root>
    </>
  );
};
