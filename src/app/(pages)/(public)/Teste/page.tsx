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
import { X } from "lucide-react"
import { useEffect, useState } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"

export default function FiltroAnuncioShell() {
  const searchParams = useSearchParams()
  const [tipoAnuncio, setTipoAnuncio] = useState("")
  const [precoRange, setPrecoRange] = useState([0, 1000])
  const [cidade, setCidade] = useState("")
  const [dataExpiracao, setDataExpiracao] = useState("")
  const { replace } = useRouter()
  const pathname = usePathname()
  

  const [openSidebar, setOpenSidebar] = useState(false);

  const sidebarProps = {
    aberto: "",
    fechado:"-translate-x-full "
  }

  useEffect(() => {
    setTipoAnuncio(searchParams.get("tipo") || "")
    setPrecoRange([
      Number(searchParams.get("precoMin") || 0),
      Number(searchParams.get("precoMax") || 1000),
    ])
    setCidade(searchParams.get("cidade") || "")
    setDataExpiracao(searchParams.get("expiraAntes") || "")
  }, [searchParams])

  const aplicarFiltros = () => {
    const params = new URLSearchParams(searchParams)
    tipoAnuncio ? params.set("tipo", tipoAnuncio) : params.delete("tipo")
    precoRange[0] > 0 ? params.set("precoMin", precoRange[0].toString()) : params.delete("precoMin")
    precoRange[1] < 1000 ? params.set("precoMax", precoRange[1].toString()) : params.delete("precoMax")
    cidade ? params.set("cidade", cidade) : params.delete("cidade")
    dataExpiracao ? params.set("expiraAntes", dataExpiracao) : params.delete("expiraAntes")
    replace(`${pathname}?${params.toString()}`)
  }

  const FiltroForm = (
    <div className="flex flex-col gap-4">
      <label htmlFor="tipoAnuncio" className="flex flex-col text-sm font-medium">
        Tipo do Anúncio
        <select
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
          type="text"
          value={cidade}
          onChange={(e) => setCidade(e.target.value)}
          placeholder="Insira a cidade que deseja procurar"
          className="border p-2 rounded mt-1"
        />
      </label>

      <label htmlFor="dataExpiracao" className="flex flex-col text-sm font-medium">
        Data de Expiração
        <input
          type="date"
          value={dataExpiracao}
          onChange={(e) => setDataExpiracao(e.target.value)}
          className="border p-2 rounded mt-1"
        />
      </label>
    </div>
  )

  return (
      <div className="flex flex-row gap-12 min-h-screen">
          

          <div className={`min-h-full w-72 flex flex-col gap-6 bg-neutral rounded-b-2xl rounded-t-2xl relative p-6`}>
            <div className="flex flex-col gap-8">
            <h1 className="text-2xl font-bold">Filtrar Anúncios</h1>
            <h3>Modifique os filtros abaixo para filtrar os anúncios desejados</h3>
            </div>
            {FiltroForm}
            </div>
  

            <Button
          onClick={() => {  
              setOpenSidebar(!openSidebar)
          }}
          >Abrir</Button>
          <div className="md:hidden p-4">


         


            <Drawer direction="top">
              <DrawerTrigger asChild>
                <Button className="bg-[#FF6F00] w-full">Filtros</Button>
              </DrawerTrigger>
              <DrawerContent>
                <DrawerHeader>
                  <DrawerTitle>Filtros</DrawerTitle>
                  <DrawerDescription>Refine sua busca</DrawerDescription>
                </DrawerHeader>
                {FiltroForm}
                <DrawerFooter>
                  <Button onClick={aplicarFiltros} className="flex-1 bg-[#FF6F00]">Aplicar</Button>
                  <DrawerClose asChild>
                    <Button variant="danger"><X className="w-4 h-4" /></Button>
                  </DrawerClose>
                </DrawerFooter>
              </DrawerContent>
            </Drawer>

          </div>
        </div>
  )
}
