import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { CausaLista } from "@/components/causa/CausaList";
import { SolicitarCausa } from "@/components/causa/SolicitarCausaModal";
import { CausaQueryParams } from "@/core/interfaces/QueryParams/CausaQueryParams";
import { getCausas } from "@/core/services/CausaService";
import CausaSearch from "@/components/causa/CausaSearch";
import { CausaContent } from "@/components/causa/CausaContent";
import { Causas } from "@/core/interfaces/Causas";

interface CausaProps {
  searchParams: Promise<CausaQueryParams>;
}

export default async function CausasPage({ searchParams }: CausaProps) {
  const params = await searchParams;
  const causas:Causas[] = await getCausas(params);

  return (
    <div className="flex min-h-screen w-full justify-center bg-radial p-2">
          <div className="w-4/5">
            <CausaContent causas={causas} />
          </div>
        </div>
  );
}


