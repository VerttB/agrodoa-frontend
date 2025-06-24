
import { Input } from "@/components/ui/input";
import { Suspense } from "react";

interface PagamentoProps {
  searchParams:Promise<{
    id?: string;
    value?: string;
    name?: string;
  }>;
}

export default async function Pagamento({ searchParams }: PagamentoProps) {

  const { id,value,name} = await searchParams
  console.log(id, value, name)
  return (
    <Suspense>
      <div className="flex min-h-screen w-full flex-col gap-8 p-8 md:flex-row">
        <div className="flex w-full flex-col gap-8">
          <h2 className="text-2xl">Dados da Compra</h2>
          <div className="flex w-full flex-col">
            <Input
              label="Produto"
              className="bg-neutral border-accent rounded-xl w-full"
              value={name}
              disabled
            />
            <Input
              label="Quantidade"
              className="bg-neutral border-accent rounded-xl w-full"
              value={value}
              disabled
            />
            <Input
              label="Preço "
              className="bg-neutral border-accent rounded-xl w-full"
              value={`R$: ${value}`}
              disabled
            />
          </div>
        </div>

        <div className="flex w-full flex-col gap-8">
          <h2 className="text-2xl">Selecione a forma de pagamento</h2>
          <div className="flex w-full flex-col">
            <Input
              className="bg-neutral border-accent rounded-xl w-full"
              label="Forma de Pagamento"
              value={"PIX"}
              disabled
            />
            <h3 className="py-1">
              Realize o pagamento utilizando o código pix abaixo,ou, leia o QR
              code
            </h3>
            <Input
              className="bg-neutral border-accent rounded-xl w-full"
              label="Chave Pix"
              disabled
            />
          </div>
        </div>
      </div>
    </Suspense>
  );
}
