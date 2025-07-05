'use client'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { Input } from "../ui/input"


export const AnuncioFiltros = () => {
  const searchParams = useSearchParams();
  const [tipoAnuncio, setTipoAnuncio] = useState("");
  const [precoRange, setPrecoRange] = useState([0, 0]);
  const [cidade, setCidade] = useState("");
  const [dataExpiracao, setDataExpiracao] = useState("");
  const {replace} = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    setTipoAnuncio(searchParams.get("tipo") || "");
    setPrecoRange([
      Number(searchParams.get("precoMin") || 0),
      Number(searchParams.get("precoMax") || 0),
    ]);
    setCidade(searchParams.get("cidade") || "");
    setDataExpiracao(searchParams.get("expiraAntes") || "");
  }, [searchParams]);
  
  const handleParams = () => {
        const params = new URLSearchParams(searchParams);
      
        if (tipoAnuncio) params.set("tipo", tipoAnuncio);
        else params.delete("tipo");
      
        if (precoRange[0] > 0) params.set("precoMin", precoRange[0].toString());
        else params.delete("precoMin");
      
        if (precoRange[1] > 0) params.set("precoMax", precoRange[1].toString());
        else params.delete("precoMax");
      
        if (cidade) params.set("cidade", cidade);
        else params.delete("cidade");
      
        if (dataExpiracao) params.set("expiraAntes", dataExpiracao);
        else params.delete("expiraAntes");
      
        replace(`${pathname}?${params.toString()}`);      
  };

  const FiltroForm = (
    <div className="flex flex-col gap-4">
      <label htmlFor="tipoAnuncio" className="flex flex-col text-sm font-medium">
        Tipo do Anúncio
        <select
          id="tipoAnuncio"
          value={tipoAnuncio}
          onChange={(e) => setTipoAnuncio(e.target.value)}
          className="border p-2 rounded mt-1"
        >
          <option value="">Selecione...</option>
          <option value="doacao">Doação</option>
          <option value="venda">Venda</option>
        </select>
      </label>

      <div>
        <label className="text-sm font-medium">
          Preço: de {precoRange[0]} até {precoRange[1]}
        </label>
        <Slider
          value={precoRange}
          onValueChange={setPrecoRange}
          min={0}
          max={1000}
          className="mt-2"
        />
      </div>

      <label htmlFor="cidade" className="flex flex-col text-sm font-medium">
        Cidade
        <input
          id="cidade"
          type="text"
          value={cidade}
          onChange={(e) => setCidade(e.target.value)}
          className="border p-2 rounded mt-1"
        />
      </label>

      <label htmlFor="dataExpiracao" className="flex flex-col text-sm font-medium">
        Data de Expiração
        <input
          id="dataExpiracao"
          type="date"
          value={dataExpiracao}
          onChange={(e) => setDataExpiracao(e.target.value)}
          className="border p-2 rounded mt-1"
        />
      </label>
    </div>
  )

  return (
    <Drawer direction="top">
      <DrawerTrigger asChild>
        <Button>Open</Button>
      </DrawerTrigger>
      <DrawerContent className="bg-white">
        <DrawerHeader>
          <DrawerTitle>Filtrar Produtos</DrawerTitle>
          <DrawerDescription>Selecione os campos que deseja filtrar</DrawerDescription>
          {FiltroForm}
        </DrawerHeader>

        <DrawerFooter>
          <Button onClick={handleParams}>Aplicar Filtros</Button>
          <DrawerClose asChild>
            <Button variant="danger">Cancelar</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
