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
      <TabsList className="bg-background h-auto -space-x-px p-0 shadow-xs rtl:space-x-reverse">
        {isFornecedor ? (
          <>
            <TabsTrigger
              value="abertos"
              className="data-[state=active]:bg-muted data-[state=active]:after:bg-primary relative overflow-hidden rounded-none border py-2 after:pointer-events-none after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 first:rounded-s last:rounded-e"
            >
              Abertos
            </TabsTrigger>
            <TabsTrigger
              value="negociacao"
              className="data-[state=active]:bg-muted data-[state=active]:after:bg-primary relative overflow-hidden rounded-none border py-2 after:pointer-events-none after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 first:rounded-s last:rounded-e"
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
