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
import { causasTeste } from "@/app/(pages)/(private)/admin/causas/page";
import Image from "next/image";

export const CausasTable = ({onClick}:{onClick: (causa:Causas) => void}) => {
  const [ causas, setCausas] = useState<Causas[]>([])
  useEffect(() => {
    const handleGetUser = async () => {
      //const data = await getCausas();
      setCausas(causasTeste)
    }
    handleGetUser()
  },[])
  if (!causas) return <LoadingSpin/>;
  return (
    <div className="flex h-screen justify-center">
      <div className="w-full">
        <Table className="shadow-2xl">
          <TableHeader className="bg-accent text-center text-xl py-2 ">
            <TableRow>
              <TableHead className="rounded-tl-2xl">Nome</TableHead>
              <TableHead>Prazo</TableHead>
              <TableHead>Responsável</TableHead>
              <TableHead>Descrição</TableHead>
              <TableHead>Tipo</TableHead>
              <TableHead className="rounded-tr-2xl">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className=" rounded-md p-2">
            {causas.map((c,i) => (
              <TableRow
                className="hover:bg-secondary-light odd:bg-secondary-light/30 odd:hover:bg-muted/50 text-xl"
                key={`${c.idCausa}${i}`}
              >
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Image
                      className="rounded-full"
                      src={
                        imgValidate(c.nomeArquivoFoto)
                      }
                      width={52}
                      height={92}
                      alt={c.nome}
                    />
                    <div>
                      <div className="font-medium">{c.nome}</div>
                      {/* <span className="text-muted-foreground mt-0.5 text-xs">
                      {item.username}
                    </span> */}
                    </div>
                  </div>
                </TableCell>
                <TableCell>{c.prazo.toDateString()}</TableCell>
                <TableCell>{c.prazo.toDateString()}</TableCell>
                <TableCell>{c.nome}</TableCell>
                <TableCell>{c.nome}</TableCell>
                <TableCell>
                  <Button variant="secondary" onClick={() => onClick(c)}>Ver Detalhes</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
