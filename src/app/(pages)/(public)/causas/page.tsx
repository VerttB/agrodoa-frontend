import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { CausaLista } from "@/components/causa/CausaList";
import { SolicitarCausa } from "@/components/causa/SolicitarCausaModal";
import { CausaQueryParams } from "@/core/interfaces/QueryParams/CausaQueryParams";
import { getCausas } from "@/core/services/CausaService";

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
        <div className="flex w-full lg:w-3/4">
          <Input className="py-2 w-full" placeholder="Pesquisar....." />
          <Button
            className="w-36 rounded-tl-none rounded-bl-none px-2 py-2"
            variant="primary"
          >
            Buscar
          </Button>
        </div>

        <CausaLista causas={causas} />
      <SolicitarCausa/>
      </div>
    </div>
  );
}
