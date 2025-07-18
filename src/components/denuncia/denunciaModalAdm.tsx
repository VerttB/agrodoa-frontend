"use client";

import { Button } from "../ui/button";
import { Modal } from "../ui/Modal";
import { Input } from "../ui/input";
import { Denuncia } from "@/core/interfaces/Denuncia";
import { Alert } from "../ui/alert";
import { useAlert } from "@/hooks/useAlert";

interface DenunciaModalAdmProps {
  denuncia: Denuncia;
  open: boolean;
  onClose: () => void;
  handleApv: () => Promise<void>;
  handleDcl: () => Promise<void>;
}

export const DenunciaModalAdm = ({
  denuncia,
  open,
  onClose,
  handleApv,
  handleDcl,
}: DenunciaModalAdmProps) => {
  const { show, message, type, showAlert, hideAlert } = useAlert();

  return (
    <>
      <Alert message={message} type={type} show={show} onClose={hideAlert} />
      <Modal.Root open={open} onOpenChange={(o) => !o && onClose()}>
        <Modal.Header title="Análise de Denúncia" onClose={onClose} />
        <Modal.Content className="min-w-[640px] space-y-4">
          <Input label="Motivo" value={denuncia.motivo} readOnly className="w-full bg-white" />
          <Input label="Denunciante" value={denuncia.denunciante} readOnly className="w-full bg-white" />
          <Input label="Denunciado" value={denuncia.denunciado} readOnly className="w-full bg-white" />
          <Input label="Status" value={denuncia.status} readOnly className="w-full bg-white" />
          <Modal.Actions>
            <Button onClick={handleApv} className="px-4 py-1">
              Aprovar
            </Button>
            <Button onClick={handleDcl} className="px-4 py-1">
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
