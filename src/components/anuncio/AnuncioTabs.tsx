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
            <TabsTrigger value="abertos">Abertos</TabsTrigger>
            {/* <TabsTrigger value="negociacao">Em Negociação</TabsTrigger>
            <TabsTrigger value="finalizados">Finalizados</TabsTrigger> */}
            <CriarAnuncio/>
          </div>
        ) : (
          <>
            <TabsTrigger value="disponiveis">Disponíveis</TabsTrigger>
            {/* <TabsTrigger value="negociacao">Em Negociação</TabsTrigger> */}
            <TabsTrigger value="salvos">Salvos</TabsTrigger>
          </>
        )}
       
      </TabsList>
      
      {children}
    </Tabs>
    </>
  );
};
