"use client";

import { useEffect, useState } from "react";
import { useUserContext } from "@/providers/UserProvider";
import { CausaTabs } from "./CausaTabs";
import { CausaTabsContent } from "./CausaTabsContent";
import { getCausas, getCausasVoluntarias, getMinhasCausas } from "@/core/services/CausaService";
import CausaSearch from "./CausaSearch";
import { SolicitarCausa } from "./SolicitarCausaModal";
import { Causas } from "@/core/interfaces/Causas";

export const CausaContent = ({ causas}:{causas:Causas[]}) => {
  const { user } = useUserContext();

  const [tab, setTab] = useState("disponiveis");

  const [causasPorAba, setCausasPorAba] = useState<Partial<Record<string, any[]>>>({
    disponiveis: [],
    apoiadas: [],
    criadas: [],
  });

  const isFornecedor = user?.tipoUsuario === "fornecedor";
  const isBeneficiario = user?.tipoUsuario === "beneficiario";

  async function carregarAba(aba: string) {
    switch (aba) {
      case "disponiveis": {
        if (!causasPorAba.disponiveis || causasPorAba.disponiveis.length === 0) {
          const disponiveis = causas;
          setCausasPorAba((prev) => ({ ...prev, disponiveis }));
        }
        break;
      }
      case "apoiadas": {
        if (user && (!causasPorAba.apoiadas || causasPorAba.apoiadas.length === 0)) {
          const apoiadas = await getCausasVoluntarias();
          setCausasPorAba((prev) => ({ ...prev, apoiadas }));
        }
        break;
      }
      case "criadas": {
        if (user && (!causasPorAba.criadas || causasPorAba.criadas.length === 0)) {
          const criadas = await getMinhasCausas();
          setCausasPorAba((prev) => ({ ...prev, criadas }));
        }
        break;
      }
    }
  }

  useEffect(() => {
    carregarAba(tab);
  }, [tab, user]);

  return (
    <div className="flex flex-col gap-4">
      
      <CausaTabs user={user} onTabChange={setTab} value={tab}>
          {tab === "disponiveis" && (
                  <div className="flex gap-2">
                    <CausaSearch />
                  </div>
                )}
            <CausaTabsContent causasPorAba={causasPorAba} tab={tab} user={user} />
    </CausaTabs>

    </div>
  );
};
