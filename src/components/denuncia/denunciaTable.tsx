"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Denuncia } from "@/core/interfaces/Denuncia";

interface Props {
  denuncias: Denuncia[];
  onClick: (denuncia: Denuncia) => void;
}

export const DenunciaTable = ({ denuncias, onClick }: Props) => {
  return (
    <div className="overflow-x-auto shadow-lg rounded-lg border border-gray-200">
      <Table className="min-w-full bg-white text-sm">
        <TableHeader className="bg-accent">
          <TableRow>
            <TableHead className="px-4 py-2">Motivo</TableHead>
            <TableHead className="px-4 py-2">Denunciante</TableHead>
            <TableHead className="px-4 py-2">Denunciado</TableHead>
            <TableHead className="px-4 py-2">Status</TableHead>
            <TableHead className="px-4 py-2 text-right">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {denuncias.map((d) => (
            <TableRow key={d.idDenuncia} className="hover:bg-secondary-light">
              <TableCell className="px-4 py-3">{d.motivo}</TableCell>
              <TableCell className="px-4 py-3">{d.denunciante}</TableCell>
              <TableCell className="px-4 py-3">{d.denunciado}</TableCell>
              <TableCell className="px-4 py-3">{d.status}</TableCell>
              <TableCell className="px-4 py-3 text-right">
                <button
                  onClick={() => onClick(d)}
                  className="text-sm text-blue-600 underline"
                >
                  Visualizar
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
