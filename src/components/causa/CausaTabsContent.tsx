"use client";

import { Causas } from "@/core/interfaces/Causas";
import { CausaLista } from "./CausaList";

interface CausaTabsContentProps {
  causasPorAba: Partial<Record<string, Causas[]>>;
  tab: string;
  user: any | null;
}

export const CausaTabsContent = ({ causasPorAba, tab, user }: CausaTabsContentProps) => {
  const causas = causasPorAba[tab] || [];

  const labels: Record<string, string> = {
    disponiveis: "Disponíveis",
    apoiadas: "Apoiadas",
    criadas: "Criadas",
  };

  if (causas.length === 0) {
    return (
      <div className="text-center py-10 text-gray-500">
        Nenhuma causa {labels[tab] || tab.toLowerCase()} encontrada.
      </div>
    );
  }

  return (
    <div className="w-full">
      <CausaLista causas={causas} />
      </div>
  );
};
