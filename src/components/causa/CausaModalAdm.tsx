"use client";

import { Button } from "../ui/button";
import { Modal } from "../ui/Modal";
import { Input } from "../ui/input";
import Image from "next/image";
import { Causas } from "@/core/interfaces/Causas";
import { imgValidate } from "@/core/utils/imageValidate";
import { useAlert } from "@/hooks/useAlert";
import { Alert } from "../ui/alert";

interface CausaModalAdmProps {
  causa: Causas;
  open: boolean;
  onClose: () => void;
  handleApv: () => Promise<void>; // nova prop
  handleDcl: () => Promise<void>; // nova prop
}

export const CausaModalAdm = ({
  causa,
  open,
  onClose,
  handleApv,
  handleDcl,
}: CausaModalAdmProps) => {
  const { show, message, type, showAlert, hideAlert } = useAlert();

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
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Descrição
            </label>
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
            <Button onClick={handleApv}  className="px-4 py-1">
              Aprovar
            </Button>
            <Button onClick={handleDcl}  className="px-4 py-1">
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
