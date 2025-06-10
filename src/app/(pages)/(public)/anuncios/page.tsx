"use client";
import Input from "@/components/input";
import Button from "@/components/button";
import { LoadingSpin } from "@/components/loadingComponent";
import { Card } from "@/components/Card";

import { Search, Heart, Plus } from "lucide-react";
import { useUserContext } from "@/providers/UserProvider";
import { IAnuncio } from "@/core/interfaces/IAnuncio";
import { useAnuncio } from "@/hooks/useAnuncio";
import { useRouter } from "next/navigation";


export default function Page() {
  const { user} = useUserContext();
  const {data : anuncios, loading} = useAnuncio<IAnuncio[]>();
  const router = useRouter();
  if(loading) return(
  <LoadingSpin/>
)
  return (
    <div className="bg-primary min-h-screen flex flex-col items-center gap-8 p-2">
      <div className="flex w-3/4 self-center">
        <Input className="py-1" />
        <div className="max-md:w-full flex text-sm">
          <Button className="px-2 md:px-4">
            <Search className="w-4" />
          </Button>
          {user?.tipo === "fornecedor" &&
          <Button className="px-1" variant="outlined">
            <Plus></Plus>
          </Button>}
        </div>
      </div>

      <div className="grid w-3/4 md:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-5 gap-2">
        {anuncios?.map((a) => (
          <Card.Root key={a.titulo} className="flex flex-col justify-around">
            <Card.Image
              imageUrl="/mato.jpg"
              alt="imagem do anuncio"
            ></Card.Image>
            <Card.Content>
              <div className="h-full">
                <h1 className="text-xl font-medium mb-4">{a.titulo}</h1>
             
              <p className="text-sm">{a.anuncianteNome}</p>
              <p className="text-sm">Negociantes:{a.anuncianteNome}</p>
              <p className="text-sm">Preço:{a.produto.preco_unidade}</p>
              <p className="text-sm">Quantidade:{a.produto.quantidade}</p>
               </div>
            </Card.Content>
            <Card.Actions className="flex text-sm 2xl:text-lg justify-around p-2 h-1/7">
              <Button className=" w-full px-2 py-1"
                      onClick={() => router.push(`/anuncios/${a.id}`)}>Ver Detalhes</Button>
              <Button className=" w-full flex justify-center gap-1 px-2 py-1" variant="outlined">
                Salvar<Heart ></Heart>
              </Button>
            </Card.Actions>
          </Card.Root>
        ))}
      </div>
    </div>
  );
}
