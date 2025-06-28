"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useUserContext } from "@/providers/UserProvider";
import { ReactNode } from "react";

interface AnuncioTabsProps {
  children: ReactNode;
}

export const AnuncioTabs = ({ children }: AnuncioTabsProps) => {
  const { user } = useUserContext();
  const isFornecedor = user?.tipo === "fornecedor";

  return (
    <Tabs
      defaultValue={isFornecedor ? "abertos" : "disponiveis"}
      className="flex w-full justify-center"
    >
      <TabsList className="bg-background h-auto -space-x-px p-0 shadow-xs rtl:space-x-reverse max-md:text-sm">
        {isFornecedor ? (
          <>
            <TabsTrigger
              value="abertos"
            >
              Abertos
            </TabsTrigger>
            <TabsTrigger
              value="negociacao"
            >
              Em Negociação
            </TabsTrigger>
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
