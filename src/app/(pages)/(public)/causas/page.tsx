"use client";
import Button from "@/components/button";
import { Card } from "@/components/Card";
import { causas } from "@/constants/Causas";
import { useRouter } from "next/navigation";
import Input from "@/components/input";

export default function Causas() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center p-8">
      <div className="flex  flex-col items-center gap-8">
        <div className="flex w-full lg:w-3/4">
          <Input className="py-2" placeholder="Pesquisar....." />
          <Button
            className="w-36 rounded-tl-none rounded-bl-none px-2 py-2"
            variant="primary"
          >
            Buscar
          </Button>
        </div>

        {causas.map((c) => (
          <Card.Root
            key={c.nome}
            className="flex w-full flex-col overflow-hidden rounded bg-white lg:w-3/4 md:flex-row md:justify-center 2xl:justify-start"
          >
            <Card.Image
              alt="Imagem da causa"
              imageUrl="/mato.jpg"
              className="border-none h-[240px] md:h-[260px] md:w-2/5 2xl:w-3/6"
            />
            <Card.Content className="flex flex-col md:gap-2 md:w-3/5 md:justify-between md:p-4 2xl:w-full">
              <div className="max-h-[100px] overflow-y-scroll">
                <h1 className="text-center max-md:mb-2 text-2xl md:text-xl">{c.nome}</h1>
                <p className="mt-2 hidden md:block">{c.descricao}</p>
              </div>
              <div className="flex flex-col gap-2">
                <div className="h-2 w-full rounded bg-gray-200">
                  <div
                    className="bg-accent h-full rounded"
                    style={{ width: `${(c.arrecadado / c.meta) * 100}%` }}
                  />
                </div>
                <div className="flex w-full justify-between text-sm xl:text-lg">
                  <p>Arrecadado: {c.arrecadado.toLocaleString("pt-br")}</p>
                  <p>Meta: R${c.meta.toLocaleString("pt-br")}</p>
                </div>
              </div>
              <Card.Actions className="flex-col gap-2 border-none p-0">
                <Button onClick={() => router.push(`/causas/${c.id}`)}>
                  Doar
                </Button>
                <Button variant="outlined">Salvar</Button>
              </Card.Actions>
            </Card.Content>
          </Card.Root>
        ))}
      </div>
    </div>
  );
}
