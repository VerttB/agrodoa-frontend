"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCausa } from "@/hooks/useCausa";
import { LoadingSpin } from "@/components/ui/loadingComponent";
import { ICausas } from "@/core/interfaces/ICausas";
import { CausaLista } from "@/components/causa/CausaList";

export default function Causas() {
  const { data: causas, loading, error } = useCausa<ICausas[]>();

  if (!causas) return <p>{error && 1}</p>;

  if (loading) return <LoadingSpin />;

  return (
    <div className="flex flex-col items-center p-8">
      <div className="flex flex-col items-center gap-8">
        <div className="flex w-full lg:w-3/4">
          <Input className="py-2" placeholder="Pesquisar....." />
          <Button
            className="w-36 rounded-tl-none rounded-bl-none px-2 py-2"
            variant="primary"
          >
            Buscar
          </Button>
        </div>

        <CausaLista causas={causas} />
      </div>
    </div>
  );
}
