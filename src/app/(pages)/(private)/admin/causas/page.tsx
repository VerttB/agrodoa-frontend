'use client'
import { CausaModalAdm } from "@/components/causa/CausaModalAdm";
import { Button } from "@/components/ui/button";
import { Causas } from "@/core/interfaces/Causas";
import { useState } from "react";
import { SolicitarCausa } from "@/components/causa/SolicitarCausaModal";
import { CausasTable } from "@/components/causa/CausaTables";

export const causasTeste: Causas[] = [
  {
    idCausa: "1a2b3c4d",
    nome: "Cesta Solidária para Famílias Carentes",
    prazo: new Date("2025-08-15"),
    descricao: "Doações de alimentos para famílias em situação de vulnerabilidade no interior da Bahia.",
    nomeArquivoFoto: "cesta-solidaria.jpg",
  },
  {
    idCausa: "2b3c4d5e",
    nome: "Ajuda às Comunidades Quilombolas",
    prazo: new Date("2025-09-10"),
    descricao: "Campanha de arrecadação de mantimentos e itens de higiene para comunidades quilombolas da região oeste.",
    nomeArquivoFoto: "quilombolas-ajuda.png",
  },
  {
    idCausa: "3c4d5e6f",
    nome: "Reforço Escolar com Merenda",
    prazo: new Date("2025-08-01"),
    descricao: "Arrecadação de lanches e materiais escolares para crianças em reforço escolar.",
    nomeArquivoFoto: "reforco-escolar.jpeg",
  },
  {
    idCausa: "4d5e6f7g",
    nome: "Doação para Abrigo de Animais",
    prazo: new Date("2025-07-30"),
    descricao: "Campanha emergencial de alimentos e medicamentos para animais abandonados.",
    nomeArquivoFoto: "abrigo-animais.jpg",
  },
  {
    idCausa: "5e6f7g8h",
    nome: "Mutirão de Alimentos para a Zona Rural",
    prazo: new Date("2025-08-22"),
    descricao: "Mobilização para doar alimentos não perecíveis a famílias de zona rural sem acesso regular a feiras.",
    nomeArquivoFoto: "mutirao-zona-rural.png",
  }
  ,
  {
    idCausa: "2b3c4d5e",
    nome: "Ajuda às Comunidades Quilombolas",
    prazo: new Date("2025-09-10"),
    descricao: "Campanha de arrecadação de mantimentos e itens de higiene para comunidades quilombolas da região oeste.",
    nomeArquivoFoto: "quilombolas-ajuda.png",
  },
  {
    idCausa: "2b3c4d5e",
    nome: "Ajuda às Comunidades Quilombolas",
    prazo: new Date("2025-09-10"),
    descricao: "Campanha de arrecadação de mantimentos e itens de higiene para comunidades quilombolas da região oeste.",
    nomeArquivoFoto: "quilombolas-ajuda.png",
  },
  {
    idCausa: "2b3c4d5e",
    nome: "Ajuda às Comunidades Quilombolas",
    prazo: new Date("2025-09-10"),
    descricao: "Campanha de arrecadação de mantimentos e itens de higiene para comunidades quilombolas da região oeste.",
    nomeArquivoFoto: "quilombolas-ajuda.png",
  },
  {
    idCausa: "2b3c4d5e",
    nome: "Ajuda às Comunidades Quilombolas",
    prazo: new Date("2025-09-10"),
    descricao: "Campanha de arrecadação de mantimentos e itens de higiene para comunidades quilombolas da região oeste.",
    nomeArquivoFoto: "quilombolas-ajuda.png",
  },
  {
    idCausa: "2b3c4d5e",
    nome: "Ajuda às Comunidades Quilombolas",
    prazo: new Date("2025-09-10"),
    descricao: "Campanha de arrecadação de mantimentos e itens de higiene para comunidades quilombolas da região oeste.",
    nomeArquivoFoto: "quilombolas-ajuda.png",
  }
];

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