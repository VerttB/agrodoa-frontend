"use client";
import { Causas } from "@/core/interfaces/Causas";
import { Card } from "../ui/Card";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
export const CausaCard = ({ causa }: { causa: Causas }) => {
  const router = useRouter();
  return (
    <Card.Root
    
      className="flex w-full flex-col overflow-hidden rounded bg-white md:flex-row md:justify-center lg:w-3/5 2xl:justify-start"
    >
      <Card.Image
        alt="Imagem da causa"
        imageUrl="/mato.jpg"
        className="h-[240px] border-none md:h-[260px] md:w-2/5 2xl:w-3/6"
      />
      <Card.Content className="flex flex-col md:w-3/5 md:justify-between md:gap-2 md:p-4 2xl:w-full">
        <div className="max-h-[100px] overflow-y-scroll">
          <h1 className="text-center text-3xl max-md:mb-2 md:text-xl font-bold">
            {causa.nome}
          </h1>
          <p className="mt-2 hidden md:block">{causa.descricao}</p>
        </div>
        <div className="flex flex-col gap-2">
          <div className="h-2 w-full rounded bg-gray-200">
            <div
              className="bg-accent h-full rounded"
              style={{ width: `${(causa.valor_arrecadado / causa.meta) * 100}%` }}
            />
          </div>
          <div className="flex w-full justify-between text-sm xl:text-lg">
            <p>Arrecadado: {causa.valor_arrecadado.toLocaleString("pt-br")}</p>
            <p>Meta: R${causa.meta.toLocaleString("pt-br")}</p>
          </div>
        </div>
        <Card.Actions className="flex w-4/5 justify-center self-center gap-2 border-none p-0">
          <Button className="flex-1" onClick={() => router.push(`/causas/${causa.idCausa}`)}>
            Doar
          </Button>
          <Button  className="flex-1" variant="outlined">Salvar</Button>
        </Card.Actions>
      </Card.Content>
    </Card.Root>
  );
};
