"use client";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { sidebar } from "@/components/ui/sidebar";
import { useIsMobile } from "@/hooks/use-mobile";
import { SelectInput } from "../ui/selectInput";
import { Input } from "../ui/input";
export const AnuncioFiltros = () => {
  const searchParams = useSearchParams();
  const [tipoAnuncio, setTipoAnuncio] = useState("");
  const [precoRange, setPrecoRange] = useState([0, 1000]);
  const [cidade, setCidade] = useState("");
  const [dataExpiracao, setDataExpiracao] = useState("");
  const { replace } = useRouter();
  const pathname = usePathname();
  const isMobile = useIsMobile();
  const [open, setOpen] = useState(false);

  const selectInputData = [
    { value: "doacao", text: "Doação" },
    { value: "venda", text: "Venda" },
  ];

  const handleOpen = () => {
    setOpen((o) => !o);
  };

  useEffect(() => {
    setTipoAnuncio(searchParams.get("tipo") || "");
    setPrecoRange([
      Number(searchParams.get("precoMin") || 0),
      Number(searchParams.get("precoMax") || 1000),
    ]);
    setCidade(searchParams.get("cidade") || "");
    setDataExpiracao(searchParams.get("expiraAntes") || "");
  }, [searchParams]);

  const resetarFiltros = () => {
    const params = new URLSearchParams();
    params.delete("tipo");
    params.delete("precoMin");
    params.delete("precoMax");
    params.delete("cidade");
    params.delete("expiraAntes");
    replace(`${pathname}?${params.toString()}`);
  };
  const aplicarFiltros = () => {
    const params = new URLSearchParams(searchParams);
    /* eslint-disable @typescript-eslint/no-unused-expressions */
    tipoAnuncio ? params.set("tipo", tipoAnuncio) : params.delete("tipo");
    precoRange[0] > 0
      ? params.set("precoMin", precoRange[0].toString())
      : params.delete("precoMin");
    precoRange[1] < 1000
      ? params.set("precoMax", precoRange[1].toString())
      : params.delete("precoMax");
    cidade ? params.set("cidade", cidade) : params.delete("cidade");
    dataExpiracao
      ? params.set("expiraAntes", dataExpiracao)
      : params.delete("expiraAntes");
    replace(`${pathname}?${params.toString()}`);
  };

  const FiltroForm = (
    <div className="flex flex-col gap-4">
      <SelectInput
        label="Tipo do Anuncio"
        value={tipoAnuncio}
        onChange={(e) => setTipoAnuncio(e.target.value)}
        data={selectInputData}
      />
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
      <Input
        label="Cidade"
        type="text"
        value={cidade}
        onChange={(e) => setCidade(e.target.value)}
        placeholder="Insira a cidade que deseja procurar"
        className="mt-1 rounded border p-2"
      />
      <Input
        label="Data de Expiração"
        type="date"
        value={dataExpiracao}
        onChange={(e) => setDataExpiracao(e.target.value)}
        className="mt-1 rounded border p-2"
      />
    </div>
  );

  return (
    <>
      <Button onClick={handleOpen}>Abrir</Button>
      {!isMobile ? (
        <>
          <sidebar.root open={open} onOpenChange={setOpen}>
            <sidebar.header>
              <h1>Filtros</h1>
            </sidebar.header>
            <sidebar.content>{FiltroForm}</sidebar.content>
            <sidebar.footer>
              <sidebar.actions>
                <Button
                  onClick={() => {
                    aplicarFiltros();
                    setTimeout(handleOpen, 200);
                  }}
                  className="flex-1"
                >
                  Filtrar
                </Button>
                <Button
                  className="flex-1"
                  variant="outlined"
                  onClick={resetarFiltros}
                >
                  Resetar
                </Button>
              </sidebar.actions>
            </sidebar.footer>
          </sidebar.root>
        </>
      ) : (
        <Drawer open={open} onOpenChange={setOpen} direction="top">
          <DrawerContent className="bg-neutral">
            <DrawerHeader>
              <DrawerTitle>Filtros</DrawerTitle>
              <DrawerDescription>Refine sua busca</DrawerDescription>
            </DrawerHeader>
            {FiltroForm}
            <DrawerFooter>
              <Button
                onClick={() => {
                  aplicarFiltros();
                  setTimeout(handleOpen, 200);
                }}
              >
                Filtrar
              </Button>

              <Button variant="outlined" onClick={resetarFiltros}>
                Resetar Filtros
              </Button>
              <DrawerClose asChild>
                <Button variant="danger">
                  Cancelar
                  <X className="h-4 w-4" />
                </Button>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      )}
    </>
  );
};
