"use client";
import Input from "@/components/input";
import Button from "@/components/button";
import { Search, Heart, Plus } from "lucide-react";
import { Card } from "@/components/Card";
import { useUserContext } from "@/providers/UserProvider";
export default function Page() {
  const provisorio = [1, 2, 3, 4, 5, 6];
  const { user} = useUserContext();
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

      {/* Anuncios */}
      <div className="grid w-3/4 md:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-5 gap-2">
        {provisorio.map((p) => (
          <Card.Root key={p}>
            <Card.Image
              imageUrl="/mato.jpg"
              alt="imagem do anuncio"
            ></Card.Image>
            <Card.Content>
              <h1 className="text-xl">Nome do Produto</h1>
              <p className="text-sm">Nome do fornecedor</p>
              <p className="text-sm">Negociantes: 0/5</p>
              <p className="text-sm">Preço:10,00</p>
              <p className="text-sm">Quantidade:52</p>
            </Card.Content>
            <Card.Actions className="flex text-sm 2xl:text-lg justify-around p-2">
              <Button className=" w-full px-2 py-1">Ver Detalhes</Button>
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
