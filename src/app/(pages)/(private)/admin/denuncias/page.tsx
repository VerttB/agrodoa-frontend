"use client";

import { useEffect, useState } from "react";
import { Denuncia } from "@/core/interfaces/Denuncia";
import { getDenuncias } from "@/core/services/UserService";
import { denunciaAprovar, denunciaRecusar } from "@/core/services/UserService";
import { DenunciaTable } from "@/components/denuncia/denunciaTable";
import { DenunciaModalAdm } from "@/components/denuncia/denunciaModalAdm";
import { useAlert } from "@/hooks/useAlert";
import { Alert } from "@/components/ui/alert";

export default function DenunciasAdmin() {
  const [open, setOpen] = useState(false);
  const [denunciaSelecionada, setDenunciaSelecionada] = useState<Denuncia | null>(null);
  const [denuncias, setDenuncias] = useState<Denuncia[]>([]);
  const { show, message, type, showAlert, hideAlert } = useAlert();

  const loadDenuncias = async () => {
    try {
      const data = await getDenuncias();
      setDenuncias(data);
    } catch (err: any) {
      showAlert(err.message || "Erro ao carregar denúncias.", "error");
    }
  };

  useEffect(() => {
    loadDenuncias();
  }, []);

  const handleOpenModal = (denuncia: Denuncia) => {
    setDenunciaSelecionada(denuncia);
    setOpen(true);
  };

  const handleCloseModal = () => {
    setDenunciaSelecionada(null);
    setOpen(false);
  };

  const handleApprove = async () => {
    if (!denunciaSelecionada) return;
    try {
      await denunciaAprovar(denunciaSelecionada.idDenuncia);
      showAlert("Denúncia aprovada com sucesso!", "success");
      handleCloseModal();
      await loadDenuncias();
    } catch (err: any) {
      showAlert(err.message || "Erro ao aprovar denúncia.", "error");
    }
  };

  const handleDecline = async () => {
    if (!denunciaSelecionada) return;
    try {
      await denunciaRecusar(denunciaSelecionada.idDenuncia);
      showAlert("Denúncia recusada com sucesso.", "success");
      handleCloseModal();
      await loadDenuncias();
    } catch (err: any) {
      showAlert(err.message || "Erro ao recusar denúncia.", "error");
    }
  };

  return (
    <>
      <Alert message={message} type={type} show={show} onClose={hideAlert} />

      <div className="p-4">
        <div className="flex p-4 bg-[#FFF7ED] justify-between">
          <h1 className="text-2xl font-semibold">Denúncias</h1>
        </div>

        <div className="bg-[#FFF7ED] min-h-screen p-6">
          <div className="space-y-4">
            <DenunciaTable denuncias={denuncias} onClick={handleOpenModal} />
          </div>
        </div>

        {denunciaSelecionada && (
          <DenunciaModalAdm
            denuncia={denunciaSelecionada}
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
