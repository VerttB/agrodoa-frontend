"use client";

import { Input } from "@/components/ui/input";
import { Suspense } from "react";

interface PagamentoProps {
  searchParams: {
    id?: string;
    valor?: string;
    name?: string;
  };
}

export default function Pagamento({ searchParams }: PagamentoProps) {
  const itemValues = {
    itemId: searchParams.id ?? "",
    value: Number(searchParams.valor) || 0,
    name: searchParams.name ?? "",
  };

  return (
    <Suspense>
      <div className="flex min-h-screen w-full flex-col gap-8 p-8 md:flex-row">
        <div className="flex w-full flex-col gap-8">
          <h2 className="text-2xl">Dados da Compra</h2>
          <div className="flex w-full flex-col">
            <Input
              label="Produto"
              className="bg-neutral border-accent rounded-xl"
              value={itemValues.name}
              disabled
            />
            <Input
              label="Quantidade"
              className="bg-neutral border-accent rounded-xl"
              value={itemValues.value}
              disabled
            />
            <Input
              label="Preço "
              className="bg-neutral border-accent rounded-xl"
              value={`R$: ${itemValues.value}`}
              disabled
            />
          </div>
        </div>

        <div className="flex w-full flex-col gap-8">
          <h2 className="text-2xl">Selecione a forma de pagamento</h2>
          <div className="flex w-full flex-col">
            <Input
              className="bg-neutral border-accent rounded-xl"
              label="Forma de Pagamento"
              value={"PIX"}
              disabled
            />
            <h3 className="py-1">
              Realize o pagamento utilizando o código pix abaixo,ou, leia o QR
              code
            </h3>
            <Input
              className="bg-neutral border-accent rounded-xl"
              label="Chave Pix"
              disabled
            />
          </div>
        </div>
      </div>
    </Suspense>
  );
}
