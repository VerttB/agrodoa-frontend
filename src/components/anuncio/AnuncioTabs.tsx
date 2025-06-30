'use client';

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ReactNode, useState } from "react";

interface AnuncioTabsProps {
  children: ReactNode;
  tipoUsuario: string | null;
}

export const AnuncioTabs = ({ children, tipoUsuario }: AnuncioTabsProps) => {
  const isFornecedor = tipoUsuario === "fornecedor";
  const [value, setValue] = useState(isFornecedor ? "abertos" : "disponiveis");

  return (
    <Tabs value={value} onValueChange={setValue} className="flex w-full justify-center">
      <TabsList className="bg-background h-auto -space-x-px p-0 shadow-xs rtl:space-x-reverse max-md:text-sm">
        {isFornecedor ? (
          <>
            <TabsTrigger value="abertos">Abertos</TabsTrigger>
            <TabsTrigger value="negociacao">Em Negociação</TabsTrigger>
            <TabsTrigger value="finalizados">Finalizados</TabsTrigger>
          </>
        ) : (
          <>
            <TabsTrigger value="disponiveis">Disponíveis</TabsTrigger>
            <TabsTrigger value="negociacao">Em Negociação</TabsTrigger>
            <TabsTrigger value="salvos">Salvos</TabsTrigger>
          </>
        )}
      </TabsList>
      {children}
    </Tabs>
  );
};
