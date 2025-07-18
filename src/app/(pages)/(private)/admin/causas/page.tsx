"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { CausaModalAdm } from "@/components/causa/CausaModalAdm";
import { Causas } from "@/core/interfaces/Causas";
import { SolicitarCausa } from "@/components/causa/SolicitarCausaModal";
import { CausasTable } from "@/components/causa/CausaTables";
import { aprovarCausa, rejeitarCausa, getCausasAguardando } from "@/core/services/CausaService";
import { useAlert } from "@/hooks/useAlert";
import { Alert } from "@/components/ui/alert";

export default function CausasAdmin() {
  const [open, setOpen] = useState(false);
  const [causaSelecionada, setCausaSelecionada] = useState<Causas | null>(null);
  const [causas, setCausas] = useState<Causas[]>([]);
  const { show, message, type, showAlert, hideAlert } = useAlert();

  const loadCausas = async () => {
    try {
      const data = await getCausasAguardando(); // função do seu service
      setCausas(data);
    } catch (err: any) {
      showAlert(err.message || "Erro ao carregar causas.", "error");
    }
  };

  useEffect(() => {
    loadCausas();
  }, []);

  const handleCloseModal = () => {
    setCausaSelecionada(null);
    setOpen(false);
  };

  const handleOpenModal = (causa: Causas) => {
    setCausaSelecionada(causa);
    setOpen(true);
  };

  const handleApprove = async () => {
    if (!causaSelecionada) return;
    try {
      await aprovarCausa(causaSelecionada.idCausa);
      showAlert("Causa aprovada com sucesso!", "success");
      handleCloseModal();
      await loadCausas(); // atualiza a lista
    } catch (err: any) {
      showAlert(err.message || "Erro ao aprovar causa.", "error");
    }
  };

  const handleDecline = async () => {
    if (!causaSelecionada) return;
    try {
      await rejeitarCausa(causaSelecionada.idCausa);
      showAlert("Causa recusada com sucesso.", "success");
      handleCloseModal();
      await loadCausas(); // atualiza a lista
    } catch (err: any) {
      showAlert(err.message || "Erro ao recusar causa.", "error");
    }
  };

  return (
    <>
      <Alert message={message} type={type} show={show} onClose={hideAlert} />

      <div className="p-4">
        <div className="flex p-4 bg-[#FFF7ED] justify-between">
          <h1 className="text-2xl font-semibold">Solicitações de Causas</h1>
          <SolicitarCausa />
        </div>

        <div className="bg-[#FFF7ED] min-h-screen p-6">
          <div className="space-y-4">
            <CausasTable causas={causas} onClick={handleOpenModal} />
          </div>
        </div>

        {causaSelecionada && (
          <CausaModalAdm
            causa={causaSelecionada}
            open={open}
            onClose={handleCloseModal}
            handleApv={handleApprove}
            handleDcl={handleDecline}
          />
        )}
      </div>
    </>
  );
}
