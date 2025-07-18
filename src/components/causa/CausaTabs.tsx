"use client";

import { ReactNode } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface CausaTabsProps {
  user: any | null;
  value: string; 
  onTabChange: (tab: string) => void;
  children: ReactNode;
}

export const CausaTabs = ({ user, value, onTabChange, children }: CausaTabsProps) => {
  const isFornecedor = user?.tipoUsuario === "fornecedor";
  const isBeneficiario = user?.tipoUsuario === "beneficiario";

  return (
    <Tabs value={value} onValueChange={onTabChange} className="flex w-full justify-center">
      <TabsList className="bg-background w-full h-auto -space-x-px p-0 shadow-xs max-md:text-sm rtl:space-x-reverse">
        <div className="flex w-full justify-between items-center">
          <div className="flex gap-2">
            {/* Disponíveis sempre visível */}
            <TabsTrigger
              className="data-[state=active]:after:bg-secondary data-[state=active]:text-accent relative after:absolute after:inset-x-0 after:bottom-0 after:-mb-1 after:h-0.5"
              value="disponiveis"
            >
              Disponíveis
            </TabsTrigger>

            {isBeneficiario && (
              <TabsTrigger
                className="data-[state=active]:after:bg-secondary data-[state=active]:text-accent relative after:absolute after:inset-x-0 after:bottom-0 after:-mb-1 after:h-0.5"
                value="apoiadas"
              >
                Apoiadas
              </TabsTrigger>
            )}

            {isFornecedor && (
              <>
                <TabsTrigger
                  className="data-[state=active]:after:bg-secondary data-[state=active]:text-accent relative after:absolute after:inset-x-0 after:bottom-0 after:-mb-1 after:h-0.5"
                  value="apoiadas"
                >
                  Apoiadas
                </TabsTrigger>
                <TabsTrigger
                  className="data-[state=active]:after:bg-secondary data-[state=active]:text-accent relative after:absolute after:inset-x-0 after:bottom-0 after:-mb-1 after:h-0.5"
                  value="criadas"
                >
                  Criadas
                </TabsTrigger>
              </>
            )}
          </div>
          {/* Pode incluir botões extras aqui */}
        </div>
      </TabsList>

      {children}
    </Tabs>
  );
};
