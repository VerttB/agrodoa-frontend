"use client";
import { Causas } from "@/core/interfaces/Causas";
import { Card } from "../ui/Card";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { imgValidate } from "@/core/utils/imageValidate";
export const CausaCard = ({ causa }: { causa: Causas }) => {
  const router = useRouter();

  return (
    <Card.Root className="flex w-3/4 flex-col overflow-hidden rounded bg-white place-self-center md:w-full md:flex-col md:justify-center xl:w-full">
      <Card.Image
        alt="Imagem da causa"
        imageUrl={
           imgValidate(causa.nomeArquivoFoto)
        }
        className="w-full h-[240px]"
      />
      <Card.Content className="flex flex-col w-full md:justify-between md:gap-2 ">
        <div className="h-[100px]">
          <h1 className="text-left text-3xl font-bold text-gray-800 text-wrap max-md:mb-2 md:text-2xl">
            {causa.nome}
          </h1>
          <p className="line-clamp-2 hover:line-clamp-none text-wrap">{causa.descricao}</p>
        </div>
        {/* <div className="flex flex-col gap-2">
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
        </div> */}
        <Card.Actions className="flex w-full mt-4 py-2  justify-center gap-2 ">
          <Button
            className="w-1/2"
            onClick={() => router.push(`/causas/${causa.idCausa}`)}
          >
            Ver Detalhes
          </Button>
        </Card.Actions>
      </Card.Content>
    </Card.Root>
  );
};
