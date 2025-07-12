'use client';

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ReactNode, useState, useEffect } from "react";

interface AnuncioTabsProps {
  children: ReactNode;
  tipoUsuario: string | null;
  onTabChange: (tab: string) => void;
  value?: string; // opcional para controle externo
}

export const AnuncioTabs = ({ children, tipoUsuario, onTabChange, value }: AnuncioTabsProps) => {
  const isFornecedor = tipoUsuario === "fornecedor";
  const [internalValue, setInternalValue] = useState(isFornecedor ? "abertos" : "disponiveis");

  const selectedValue = value !== undefined ? value : internalValue;

  useEffect(() => {
    onTabChange(selectedValue);
  }, [selectedValue, onTabChange]);

  const handleChange = (newValue: string) => {
    if (value === undefined) {
      // controle interno só se não for controlado externamente
      setInternalValue(newValue);
    }
  };

  return (
    <Tabs value={selectedValue} onValueChange={handleChange} className="flex w-full justify-center">
      <TabsList className="bg-background h-auto -space-x-px p-0 shadow-xs rtl:space-x-reverse max-md:text-sm">
        {isFornecedor ? (
          <>
            <TabsTrigger value="abertos">Abertos</TabsTrigger>
            {/* <TabsTrigger value="negociacao">Em Negociação</TabsTrigger>
            <TabsTrigger value="finalizados">Finalizados</TabsTrigger> */}
          </>
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
  );
};
