"use client";
import { Causas } from "@/core/interfaces/Causas";
import { Card } from "../ui/Card";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { imgValidate } from "@/core/utils/imageValidate";
export const CausaCard = ({ causa }: { causa: Causas }) => {
  const router = useRouter();

  return (
    <Card.Root className="flex w-3/4 flex-col overflow-hidden rounded bg-white max-md:place-self-center md:w-full md:flex-row md:justify-center">
      <Card.Image
        alt="Imagem da causa"
        imageUrl={
           imgValidate(causa.nomeArquivoFoto)
        }
        className="h-full w-[240px] max-md:h-[240px] max-md:w-full"
      />
      <Card.Content className="flex flex-col md:w-3/5 md:justify-between md:gap-2 md:p-4 2xl:w-full">
        <div className="max-h-[100px]">
          <h1 className="text-center text-3xl font-bold text-wrap max-md:mb-2 md:text-xl">
            {causa.nome}
          </h1>
          <p className="line-clamp-2 text-wrap">{causa.descricao}</p>
        </div>
        <div className="flex flex-col gap-2">
          <div className="h-2 w-full rounded bg-gray-200">
            <div
              className="bg-accent h-full max-w-full rounded"
              style={{
                width: `${(causa.valorArrecadado / causa.meta) * 100}%`,
              }}
            />
          </div>
          <div className="flex w-full justify-between text-sm xl:text-lg">
            <p>Arrecadado: {causa.valorArrecadado.toLocaleString("pt-br")}</p>
            <p>Meta: R${causa.meta.toLocaleString("pt-br")}</p>
          </div>
        </div>
        <Card.Actions className="flex w-4/5 justify-center gap-2 self-center border-none p-0">
          <Button
            className=""
            onClick={() => router.push(`/causas/${causa.idCausa}`)}
          >
            Ver Detalhes
          </Button>
        </Card.Actions>
      </Card.Content>
    </Card.Root>
  );
};
