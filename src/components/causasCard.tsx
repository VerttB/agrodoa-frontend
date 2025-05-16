"use client";
import { ICausas } from "@/interfaces/ICausas";
import Button from "./button";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function CausaCard() {
  const router = useRouter();
  const props: ICausas = {
    id: "123",
    meta: 50000,
    arrecadado: 1250,
    responsavelId: "12341",
    nome: "Alimentar",
    prazo: new Date(),
    descricao:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias quod qui impedit nihil atque quibusdam vel magnam consectetur optio quaerat, ratione velit at, laboriosam quis suscipit dolores porro ipsam. Consequuntur?",
  };

  return (
    <div className="bg-neutral flex w-full flex-col justify-center shadow-md md:w-3/4 md:flex-row">
      <div className="relative h-40 md:h-auto md:w-2/4">
        <Image
          src="/homeImg.png"
          alt="causa imagem"
          fill
          className="object-contain"
        />
      </div>

      <div className="flex flex-col gap-2 p-4">
        <h1 className="self-center text-lg md:text-xl">{props.nome}</h1>
        <p className="hidden md:block">{props.descricao}</p>

        <div className="flex flex-col gap-2">
          <div className="h-2 w-full rounded bg-gray-200">
            <div
              className="bg-accent h-full rounded"
              style={{ width: `${(props.arrecadado / props.meta) * 100}%` }}
            />
          </div>
          <div className="flex w-full justify-between text-sm">
            <p>Arrecadado: R${props.arrecadado.toLocaleString("pt-br")}</p>
            <p>Meta: R${props.meta.toLocaleString("pt-br")}</p>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <Button variant="primary">Doar</Button>
          <Button
            variant="outlined"
            onClick={() => router.push(`causas/${props.id}`)}
          >
            Ver Detalhes
          </Button>
        </div>
      </div>
    </div>
  );
}
