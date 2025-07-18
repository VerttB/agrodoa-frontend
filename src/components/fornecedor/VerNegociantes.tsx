"use client";

import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Modal } from "../ui/Modal";
import { Negociacao } from "@/core/interfaces/negociacao";
import { getNegociacoes, aprovarNegociacao, recusarNegociacao } from "@/core/services/Negociacao";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { imgValidate } from "@/core/utils/imageValidate";
import Image from "next/image";
import { useAlert } from "@/hooks/useAlert";
import { Alert } from "../ui/alert";

interface VerNegociantesProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  anuncioId: string;
}

export const VerNegociantes = ({ anuncioId, onOpenChange, open }: VerNegociantesProps) => {
  const [negociacoesList, setNegociacoesList] = useState<Negociacao[]>([]);
  const [error, setError] = useState("");
  const { show, showAlert, message, type, hideAlert} = useAlert()
  const carregarNegociacoes = async () => {
    try {
      const data = await getNegociacoes(anuncioId);
      setNegociacoesList(data);
      setError("");
    } catch (e:any) {
      setError("Não foi possível pegar as negociações");
    }
  };

  useEffect(() => {
    if (open) {
      carregarNegociacoes();
    }
  }, [anuncioId, open]);

  const handleAprovar = async (id: string) => {
    try {
      await aprovarNegociacao(id);
      showAlert("Negociação Aprovada Com Sucesso", "success")
      const data = await getNegociacoes(anuncioId);
      setNegociacoesList(data)

    } catch (e:any) {
     showAlert(e.message || "Ocorreu um erro ao aceitar a negociação", "error")
      console.error("Erro ao aprovar:", e);
      setError("Erro ao aprovar a negociação.");
    }
  };

  const handleRecusar = async (id: string) => {
    try {
      await recusarNegociacao(id);
      showAlert("Negociação Recusada Com Sucesso", "success")
      const data = await getNegociacoes(anuncioId);
      setNegociacoesList(data)

    } catch (e:any) {
     showAlert(e.message || "Ocorreu um erro ao recusar a negociação", "error")
      console.error("Erro ao recusar:", e);
      setError("Erro ao recusar a negociação.");
    }
  };

  return (
    <>
    
    <Alert message={message} type={type} show={show} onClose={hideAlert} />
    <Modal.Root open={open} onOpenChange={onOpenChange}>
      <Modal.Header title="Solicitações" onClose={() => onOpenChange(false)} />
      <Modal.Content className="min-w-[720px]">
        {negociacoesList ? <>
        {error && (
          <div className="text-center text-red-600 font-semibold mb-4">{error}</div>
        )}


        <Table className="shadow-2xl">
          <TableHeader className="bg-accent  text-xl py-2 ">
            <TableRow>
              <TableHead className="rounded-tl-2xl">Pedinte</TableHead>
              <TableHead>Nome do Anúncio</TableHead>
              <TableHead>Quantidade</TableHead>

              <TableHead className="rounded-tr-2xl">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="rounded-md p-2">
            {negociacoesList.map((n) => (
              <TableRow
                className="hover:bg-secondary-light odd:bg-secondary-light/30 odd:hover:bg-muted/50 text-xl"
                key={n.idNegociacao}
              >
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Image
                      className="rounded-full"
                      src={imgValidate(n.fotoBeneficiario)}
                      width={52}
                      height={52}
                      alt={n.pedinte}
                    />
                    <div className="font-medium">{n.pedinte}</div>
                  </div>
                </TableCell>
                <TableCell>{n.quantidade}</TableCell>
                <TableCell className="text-center">{n.anuncioNome}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button
                      variant="secondary"
                      onClick={() => handleAprovar(n.idNegociacao)}
                      className="bg-green-600 hover:bg-green-700 text-white"
                    >
                      Aprovar
                    </Button>
                    <Button
                      variant="primary"
                      onClick={() => handleRecusar(n.idNegociacao)}
                    >
                      Recusar
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <div className="flex justify-center mt-4 gap-2">
          <Button disabled>&lt;</Button>
          <Button disabled>&gt;</Button>
        </div>
        </> : <>
        
            <h2>Nenhum negociante encontrado</h2>
        </>}
      </Modal.Content>
    </Modal.Root>
    </>
  );
};
