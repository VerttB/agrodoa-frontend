import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { CausaLista } from "@/components/causa/CausaList";
import { SolicitarCausa } from "@/components/causa/SolicitarCausaModal";
import { CausaQueryParams } from "@/core/interfaces/QueryParams/CausaQueryParams";
import { getCausas } from "@/core/services/CausaService";
import CausaSearch from "@/components/causa/CausaSearch";

interface CausaProps{
  searchParams: Promise<CausaQueryParams>
  
}

export default async function CausasPage({searchParams}: CausaProps) {
  const params = await searchParams;
  
  // const { data: causas, loading, error } = useCausa<Causas[]>();
  const causas = await getCausas(params);
 

  return (
    <div className="flex flex-col items-center p-8 min-h-screen">
      <div className="flex flex-col items-center gap-8 w-full">
        <div className="flex w-full justify-center ">
        <CausaSearch/>
        
        </div>

        <CausaLista causas={causas} />
      <SolicitarCausa/>
      </div>
    </div>
  );
}
