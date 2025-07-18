"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ReactNode, useState, useEffect } from "react";
import { CriarAnuncio } from "./CriarAnuncioModal";
import { Usuario } from "@/core/interfaces/Usuario";



interface AnuncioTabsProps {
  children: ReactNode;
  user: Usuario | null;
  onTabChange: (tab: string) => void;
  value?: string;
}

export const AnuncioTabs = ({
  children,
  user,
  onTabChange,
  value,
}: AnuncioTabsProps) => {
  const isFornecedor = user?.tipoUsuario == "fornecedor";
  const isBeneficiario = user?.tipoUsuario == "beneficiario";
  const isGithubOnly = !!user?.github && !isFornecedor && !isBeneficiario;

  const [internalValue, setInternalValue] = useState(
    isFornecedor ? "abertos" : "disponiveis"
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

  // Função para renderizar os TabsTrigger conforme o usuário
  const renderTabsTriggers = () => {
    if (isFornecedor) {
      return (
        <div className="flex justify-between w-full">
          <div className="flex gap-2">
            <TabsTrigger
              value="abertos"
              className="hover:bg-accent hover:text-foreground
                data-[state=active]:after:bg-secondary
                data-[state=active]:text-accent
                data-[state=active]:hover:bg-accent
                relative after:absolute after:inset-x-0 after:bottom-0
                after:-mb-1 after:h-0.5
                data-[state=active]:bg-transparent
                data-[state=active]:shadow-none"
            >
              Abertos
            </TabsTrigger>
            <TabsTrigger
              value="negociacao"
              className="data-[state=active]:after:bg-secondary
                data-[state=active]:text-accent
                data-[state=active]:hover:bg-accent
                relative after:absolute after:inset-x-0 after:bottom-0
                after:-mb-1 after:h-0.5
                data-[state=active]:bg-transparent
                data-[state=active]:shadow-none"
            >
              Em Negociação
            </TabsTrigger>
          </div>
          <CriarAnuncio />
        </div>
      );
    }

    if (isBeneficiario) {
      return (
        <div className="flex w-full gap-2">
          <TabsTrigger
            value="disponiveis"
            className="data-[state=active]:after:bg-secondary
              data-[state=active]:text-accent
              data-[state=active]:hover:bg-accent
              relative after:absolute after:inset-x-0 after:bottom-0
              after:-mb-1 after:h-0.5
              data-[state=active]:bg-transparent
              data-[state=active]:shadow-none"
          >
            Disponíveis
          </TabsTrigger>
          <TabsTrigger
            value="negociacao"
            className="data-[state=active]:after:bg-secondary
              data-[state=active]:text-accent
              data-[state=active]:hover:bg-accent
              relative after:absolute after:inset-x-0 after:bottom-0
              after:-mb-1 after:h-0.5
              data-[state=active]:bg-transparent
              data-[state=active]:shadow-none"
          >
            Em Negociação
          </TabsTrigger>
          <TabsTrigger
            value="salvos"
            className="data-[state=active]:after:bg-secondary
              data-[state=active]:text-accent
              data-[state=active]:hover:bg-accent
              relative after:absolute after:inset-x-0 after:bottom-0
              after:-mb-1 after:h-0.5
              data-[state=active]:bg-transparent
              data-[state=active]:shadow-none"
          >
            Salvos
          </TabsTrigger>
        </div>
      );
    }

    if (isGithubOnly) {
      return (
        <div className="flex w-full">
          <TabsTrigger
            value="disponiveis"
            className="data-[state=active]:after:bg-secondary
              data-[state=active]:text-accent
              data-[state=active]:hover:bg-accent
              relative after:absolute after:inset-x-0 after:bottom-0
              after:-mb-1 after:h-0.5
              data-[state=active]:bg-transparent
              data-[state=active]:shadow-none"
          >
            Disponíveis
          </TabsTrigger>
        </div>
      );
    }

    // Default: só 'Disponíveis'
    return (
      <div className="flex w-full">
        <TabsTrigger
          value="disponiveis"
          className="data-[state=active]:after:bg-secondary
            data-[state=active]:text-accent
            data-[state=active]:hover:bg-accent
            relative after:absolute after:inset-x-0 after:bottom-0
            after:-mb-1 after:h-0.5
            data-[state=active]:bg-transparent
            data-[state=active]:shadow-none"
        >
          Disponíveis
        </TabsTrigger>
      </div>
    );
  };

  return (
    <>
      <Tabs
        value={selectedValue}
        onValueChange={handleChange}
        className="flex w-full justify-center"
      >
        <TabsList className="bg-background w-full h-auto -space-x-px p-0 shadow-xs max-md:text-sm rtl:space-x-reverse">
          {renderTabsTriggers()}
        </TabsList>
        {children}
      </Tabs>
    </>
  );
};
