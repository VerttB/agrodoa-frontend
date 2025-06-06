"use client";
import Input from "@/components/input";
import Button from "@/components/button";
import { Search, Heart } from "lucide-react";
import { Card } from "@/components/Card";
export default function Page() {
  const provisorio = [1, 2, 3, 4, 5, 6];

  return (
    <div className="bg-primary flex flex-col items-center gap-8 p-2">
      <div className="flex w-2/4">
        <Input className="py-1" />
        <div className="flex w-2/4 text-sm">
          <Button className="px-4">
            <Search />
          </Button>
          <Button className="px-1" variant="outlined">
            Novo Anúncio
          </Button>
        </div>
      </div>

      {/* Anuncios */}
      <div className="grid w-3/4 grid-cols-4 gap-2">
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
            <Card.Actions className="flex justify-around p-2">
              <Button className="px-2 py-1">Ver Detalhes</Button>
              <Button className="flex gap-1 px-2 py-1" variant="outlined">
                Salvar<Heart></Heart>
              </Button>
            </Card.Actions>
          </Card.Root>
        ))}
      </div>
    </div>
  );
}
