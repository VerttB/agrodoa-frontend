"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { LoadingSpin } from "../ui/loadingComponent";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Causas } from "@/core/interfaces/Causas";
import { imgValidate } from "@/core/utils/imageValidate";
import Image from "next/image";
import { getCausasAguardando } from "@/core/services/CausaService";

export const CausasTable = ({ onClick }: { onClick: (causa: Causas) => void }) => {
  const [causas, setCausas] = useState<Causas[] | null>(null);

  useEffect(() => {
    const handleGetUser = async () => {
      const data = await getCausasAguardando();
      setCausas(data);
    };
    handleGetUser();
  }, []);

  if (causas === null) return <LoadingSpin />;

  if (causas.length === 0) {
    return (
      <div className="flex h-screen justify-center items-center text-gray-500 text-lg">
        Nenhuma causa aguardando aprovação
      </div>
    );
  }

  return (
    <div className="flex h-screen justify-center">
      <div className="w-full">
        <Table className="shadow-2xl">
          <TableHeader className="bg-accent text-center text-xl py-2">
            <TableRow>
              <TableHead className="rounded-tl-2xl">Nome</TableHead>
              <TableHead>Prazo</TableHead>
              <TableHead>Responsável</TableHead>
              <TableHead>Meta Voluntários</TableHead>
              <TableHead>Data</TableHead>
              <TableHead className="rounded-tr-2xl">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="rounded-md p-2">
            {causas.map((c, i) => (
              <TableRow
                className="hover:bg-secondary-light odd:bg-secondary-light/30 odd:hover:bg-muted/50 text-xl"
                key={`${c.idCausa}${i}`}
              >
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Image
                      className="rounded-full"
                      src={imgValidate(c.nomeArquivoFoto)}
                      width={52}
                      height={92}
                      alt={c.nome}
                    />
                    <div>
                      <div className="font-medium">{c.nome}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>{c.prazo.toString()}</TableCell>
                <TableCell>{c.contaCriadora.nome || "Adm"}</TableCell>
                <TableCell>{c.metaVoluntarios}</TableCell>
                <TableCell>{c.dataCriacao.toString()}</TableCell>
                <TableCell>
                  <Button variant="secondary" onClick={() => onClick(c)}>
                    Ver Detalhes
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
