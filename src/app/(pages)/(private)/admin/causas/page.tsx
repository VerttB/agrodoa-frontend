'use client'
import { CausaModalAdm } from "@/components/causa/CausaModalAdm";
import { Button } from "@/components/ui/button";
import { Causas } from "@/core/interfaces/Causas";
import { useState } from "react";
import { SolicitarCausa } from "@/components/causa/SolicitarCausaModal";
import { CausasTable } from "@/components/causa/CausaTables";


export default function CausasAdmin(){
  const [open, setOpen] = useState(false);
  const [causaSelecionada,setCausaSelecionada] = useState<Causas | null>(null)
  const handleCloseModal = () => {
    setCausaSelecionada(null)
    setOpen(false);
  }

  const handleOpenModal = (causa: Causas) => {
    setOpen(true);
    setCausaSelecionada(causa);
  }
  return(
   <div className="p-4">
    <div className="flex p-4 bg-[#FFF7ED] justify-between">
  <h1 className="text-2xl font-semibold text-center mb-6">Solicitações de Causas</h1>
    <SolicitarCausa/>
  </div>
  
  <div className="bg-[#FFF7ED] min-h-screen p-6 relative">

  <div className="space-y-4">
    <CausasTable onClick={handleOpenModal}/>
  </div>
  

  {causaSelecionada && (
    <CausaModalAdm 
                   causa={causaSelecionada}
                   open={open}
                   onClose={handleCloseModal}/>)}   

    </div>
    </div>
  )
}