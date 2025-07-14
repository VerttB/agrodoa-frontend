"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import { Modal } from "../ui/Modal";
import { cancelarAnuncio } from "@/core/services/AnuncioService";
import { useRouter } from "next/navigation";
interface CancelarAnuncioProps {
  id: string;
  titulo: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const CancelarAnuncioModal = ({
  id,
  titulo,
  open,
  onOpenChange,
}: CancelarAnuncioProps) => {
  const router = useRouter();
  const [inputNome, setInputNome] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const isNomeValido = inputNome.trim() === titulo.trim();
  console.log(id);
  const handleConfirmar = async () => {
    if (!isNomeValido) {
      setError("O nome digitado não corresponde ao título do anúncio.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      await cancelarAnuncio(id);
      alert("Anúncio cancelado com sucesso.");
      onOpenChange(false);
      setInputNome("");
      router.refresh();
    } catch (e: any) {
      setError(e.message || "Erro ao cancelar o anúncio.");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setInputNome("");
    setError(null);
    onOpenChange(false);
  };

  return (
    <Modal.Root open={open} onOpenChange={handleClose}>
      <Modal.Header title="Cancelar Anúncio" onClose={handleClose} />
      <Modal.Content className="min-w-[640px]">
        <div className="flex flex-col gap-2">
          <h2>
            Digite o nome completo do anúncio que deseja excluir no campo abaixo
            para prosseguir com o cancelamento.
          </h2>
          <p className="text-sm text-gray-600">
            Essa ação não poderá ser desfeita.
          </p>
          <p className="font-bold">{titulo}</p>
          <input
            type="text"
            className="mt-2 rounded border px-3 py-2"
            placeholder="Digite o nome do anúncio aqui"
            value={inputNome}
            onChange={(e) => setInputNome(e.target.value)}
            disabled={loading}
          />
          {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
        </div>
        <Modal.Actions className="mt-4 justify-end">
          <Button
            onClick={handleConfirmar}
            disabled={!isNomeValido || loading}
            className="px-4 py-2"
          >
            {loading ? "Cancelando..." : "Confirmar"}
          </Button>
          <Button
            onClick={handleClose}
            variant="outlined"
            className="px-4 py-2"
          >
            Fechar
          </Button>
        </Modal.Actions>
      </Modal.Content>
    </Modal.Root>
  );
};
