import { ICausas } from "@/interfaces/ICausas";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import Button from "./button";
import Image from "next/image";

export default function CausaCard() {
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
    <div className="bg-neutral flex flex-col md:flex-row shadow-md w-full md:w-2/4">
    <div className="relative h-40 md:h-auto md:w-full">
  <Image
    src="/homeImg.png"
    alt="causa imagem"
    fill
    className="object-cover"
  />
</div>

      <div className="flex flex-col gap-2 p-4">
        <h1 className="self-center text-lg md:text-xl ">{props.nome}</h1>
        <p className=" text-sm">{props.descricao}</p>

        <div className="flex flex-col gap-2">
          <div className="h-2 w-full rounded bg-gray-200">
            <div
              className="bg-accent h-full rounded"
              style={{ width: `${(props.arrecadado / props.meta) * 100}%` }}
            />
          </div>
          <div className="flex w-full justify-between">
            <p>Arrecadado: {props.arrecadado}</p>
            <p>Meta: {props.meta}</p>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <Button variant="primary">Doar</Button>
          <Button variant="outlined">Ver Detalhes</Button>
        </div>
      </div>
    </div>
  );
}
