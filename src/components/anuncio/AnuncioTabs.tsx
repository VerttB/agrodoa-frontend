"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ReactNode, useState, useEffect } from "react";
import { CriarAnuncio } from "./CriarAnuncioModal";

interface AnuncioTabsProps {
  children: ReactNode;
  tipoUsuario: string | null;
  onTabChange: (tab: string) => void;
  value?: string; 
}

export const AnuncioTabs = ({
  children,
  tipoUsuario,
  onTabChange,
  value,
}: AnuncioTabsProps) => {
  const isFornecedor = tipoUsuario === "fornecedor";
  const [internalValue, setInternalValue] = useState(
    isFornecedor ? "abertos" : "disponiveis",
  );

  const selectedValue = value !== undefined ? value : internalValue;

  useEffect(() => {
    onTabChange(selectedValue);
  }, [selectedValue, onTabChange]);

  const handleChange = (newValue: string) => {
    if (value === undefined) {
      setInternalValue(newValue);
    }
  };

  return (
    <>
    <Tabs
      value={selectedValue}
      onValueChange={handleChange}
      className="flex w-full justify-center"
    >
      <TabsList className="bg-background w-full h-auto -space-x-px p-0 shadow-xs max-md:text-sm rtl:space-x-reverse">
        {isFornecedor ? (
          <div className="flex justify-between w-full">
            <div className="flex gap-2">
            <TabsTrigger className="hover:bg-accent hover:text-foreground data-[state=active]:after:bg-secondary data-[state=active]:text-accent data-[state=active]:hover:bg-accent relative after:absolute after:inset-x-0 after:bottom-0 after:-mb-1 after:h-0.5 data-[state=active]:bg-transparent data-[state=active]:shadow-none" value="abertos">Abertos</TabsTrigger>
            <TabsTrigger className="data-[state=active]:after:bg-secondary data-[state=active]:text-accent data-[state=active]:hover:bg-accent relative after:absolute after:inset-x-0 after:bottom-0 after:-mb-1 after:h-0.5 data-[state=active]:bg-transparent data-[state=active]:shadow-none" value="negociacao">Em Negociação</TabsTrigger>
            {/* <TabsTrigger value="finalizados">Finalizados</TabsTrigger> */} 
            </div>
            <CriarAnuncio/>
          </div>
        ) : (
          <div className="flex w-full">
            <TabsTrigger className="data-[state=active]:after:bg-secondary data-[state=active]:text-accent data-[state=active]:hover:bg-accent relative after:absolute after:inset-x-0 after:bottom-0 after:-mb-1 after:h-0.5 data-[state=active]:bg-transparent data-[state=active]:shadow-none" value="disponiveis">Disponíveis</TabsTrigger>
            {/* <TabsTrigger value="negociacao">Em Negociação</TabsTrigger> */}
            <TabsTrigger className="data-[state=active]:after:bg-secondary data-[state=active]:text-accent data-[state=active]:hover:bg-accent relative after:absolute after:inset-x-0 after:bottom-0 after:-mb-1 after:h-0.5 data-[state=active]:bg-transparent data-[state=active]:shadow-none" value="salvos">Salvos</TabsTrigger>
          </div>
        )}
       
      </TabsList>
      
      {children}
    </Tabs>
    </>
  );
};
