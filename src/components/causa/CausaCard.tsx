'use client'
import { ICausas } from "@/core/interfaces/ICausas"
import { Card } from "../ui/Card"
import { Button } from "../ui/button"
import { useRouter } from "next/navigation"
export const CausaCard = ({causa}:{causa: ICausas}) => {
    const router = useRouter();
    return(
        <Card.Root
            key={causa.nome}
            className="flex w-full flex-col overflow-hidden rounded bg-white lg:w-3/4 md:flex-row md:justify-center 2xl:justify-start"
          >
            <Card.Image
              alt="Imagem da causa"
              imageUrl="/mato.jpg"
              className="border-none h-[240px] md:h-[260px] md:w-2/5 2xl:w-3/6"
            />
            <Card.Content className="flex flex-col md:gap-2 md:w-3/5 md:justify-between md:p-4 2xl:w-full">
              <div className="max-h-[100px] overflow-y-scroll">
                <h1 className="text-center max-md:mb-2 text-2xl md:text-xl">{causa.nome}</h1>
                <p className="mt-2 hidden md:block">{causa.descricao}</p>
              </div>
              <div className="flex flex-col gap-2">
                <div className="h-2 w-full rounded bg-gray-200">
                  <div
                    className="bg-accent h-full rounded"
                    style={{ width: `${(causa.arrecadado / causa.meta) * 100}%` }}
                  />
                </div>
                <div className="flex w-full justify-between text-sm xl:text-lg">
                  <p>Arrecadado: {causa.arrecadado.toLocaleString("pt-br")}</p>
                  <p>Meta: R${causa.meta.toLocaleString("pt-br")}</p>
                </div>
              </div>
              <Card.Actions className="flex-col gap-2 border-none p-0">
                <Button onClick={() => router.push(`/causas/${causa.id}`)}>
                  Doar
                </Button>
                <Button variant="outlined">Salvar</Button>
              </Card.Actions>
            </Card.Content>
          </Card.Root>
    )
}