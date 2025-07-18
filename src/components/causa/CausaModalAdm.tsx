"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import { Modal } from "../ui/Modal";
import { Input } from "../ui/input";
import Image from "next/image";
import { Causas } from "@/core/interfaces/Causas";
import { imgValidate } from "@/core/utils/imageValidate";
import { aprovarCausa, rejeitarCausa } from "@/core/services/CausaService";
import { useAlert } from "@/hooks/useAlert";
import { Alert } from "../ui/alert";
import { useRouter } from "next/navigation";
interface CausaModalAdmProps {
  causa: Causas;
  open: boolean;
  onClose: () => void;
}

export const CausaModalAdm = ({ causa, open, onClose }: CausaModalAdmProps) => {
  const [loading, setLoading] = useState(false);
  const { show, message, type, showAlert, hideAlert } = useAlert();
  const router = useRouter();
  const handleApprove = async () => {
    try {
      setLoading(true);
      await aprovarCausa(causa.idCausa);
      showAlert("Causa aprovada com sucesso!", "success");
      router.refresh();
      onClose();
    } catch (err: any) {
      showAlert(err.message || "Erro ao aprovar causa.", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleRefuse = async () => {
    try {
      setLoading(true);
      const sucess = await rejeitarCausa(causa.idCausa);
      showAlert("Causa recusada com sucesso.", "success");
      router.refresh();
      onClose();
    } catch (err: any) {
      showAlert(err.message || "Erro ao recusar causa.", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Alert message={message} type={type} show={show} onClose={hideAlert} />
      <Modal.Root open={open} onOpenChange={(o) => !o && onClose()}>
        <Modal.Header title="Solicitação de Causa" onClose={onClose} />
        <Modal.Content className="min-w-[640px]">
          <Input
            label="Nome da Causa"
            placeholder="Insira o nome da causa"
            className="w-full bg-white"
            value={causa.nome}
            readOnly
          />
          <Input
            label="Prazo (data limite)"
            type="date"
            value={new Date(causa.prazo).toISOString().split("T")[0]}
            className="w-full bg-white"
            readOnly
          />
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Descrição</label>
            <textarea
              value={causa.descricao}
              className="min-h-[100px] w-full rounded border border-gray-300 bg-white p-2"
              readOnly
            />
          </div>
          <div className="relative w-full h-64 my-2">
            <Image
              fill
              alt="Foto da causa"
              className="object-cover rounded"
              src={imgValidate(causa.nomeArquivoFoto)}
            />
          </div>
          <Modal.Actions>
            <Button onClick={handleApprove} disabled={loading} className="px-4 py-1" type="submit">
              Aprovar
            </Button>
            <Button onClick={handleRefuse} disabled={loading} className="px-4 py-1" type="submit">
              Recusar
            </Button>
            <Button className="px-4 py-1" variant="outlined" onClick={onClose}>
              Fechar
            </Button>
          </Modal.Actions>
        </Modal.Content>
      </Modal.Root>
    </>
  );
};
