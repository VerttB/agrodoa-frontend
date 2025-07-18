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

const negociacoes: Negociacao[] = [
  {
    idNegociacao: "NEG001",
    idAnuncio: "ANUN005",
    pedinte: "João Silva",
    quantidade: 2,
    anuncioNome: "Cesta Básica para Família",
    fotoBeneficiario: "example.com/joao_silva.jpg"
  },
  {
    idNegociacao: "NEG002",
    idAnuncio: "ANUN012",
    pedinte: "Maria Oliveira",
    quantidade: 1,
    anuncioNome: "Kit Material Escolar Infantil",
    fotoBeneficiario: "example.com/maria_oliveira.jpg"
  },
  {
    idNegociacao: "NEG003",
    idAnuncio: "ANUN008",
    pedinte: "Pedro Costa",
    quantidade: 3,
    anuncioNome: "Cobertores Térmicos",
    fotoBeneficiario: "example.com/pedro_costa.jpg"
  },
  {
    idNegociacao: "NEG004",
    idAnuncio: "ANUN005",
    pedinte: "Ana Souza",
    quantidade: 1,
    anuncioNome: "Cesta Básica para Família",
    fotoBeneficiario: "example.com/ana_souza.jpg"
  },
  {
    idNegociacao: "NEG005",
    idAnuncio: "ANUN015",
    pedinte: "Carlos Pereira",
    quantidade: 5,
    anuncioNome: "Brinquedos Educativos",
    fotoBeneficiario: "example.com/carlos_pereira.jpg"
  }
];

interface VerNegociantesProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  anuncioId: string;
}

export const VerNegociantes = ({ anuncioId, onOpenChange, open }: VerNegociantesProps) => {
  const [negociacoesList, setNegociacoesList] = useState<Negociacao[]>([]);
  const [error, setError] = useState("");

  const carregarNegociacoes = async () => {
    try {
      //const data = await getNegociacoes(anuncioId);
      setNegociacoesList(negociacoes);
      setError("");
    } catch (e) {
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
      await carregarNegociacoes();
    } catch (e) {
      console.error("Erro ao aprovar:", e);
      setError("Erro ao aprovar a negociação.");
    }
  };

  const handleRecusar = async (id: string) => {
    try {
      await recusarNegociacao(id);
      await carregarNegociacoes();
    } catch (e) {
      console.error("Erro ao recusar:", e);
      setError("Erro ao recusar a negociação.");
    }
  };

  return (
    <Modal.Root open={open} onOpenChange={onOpenChange}>
      <Modal.Header title="Solicitações" onClose={() => onOpenChange(false)} />
      <Modal.Content>
        {error && (
          <div className="text-center text-red-600 font-semibold mb-4">{error}</div>
        )}

        <Table className="shadow-2xl">
          <TableHeader className="bg-accent text-center text-xl py-2 ">
            <TableRow>
              <TableHead className="rounded-tl-2xl">Nome</TableHead>
              <TableHead>Quantidade</TableHead>
              <TableHead className="text-center">Anúncio</TableHead>
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
      </Modal.Content>
    </Modal.Root>
  );
};
