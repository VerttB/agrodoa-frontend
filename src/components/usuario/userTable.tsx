"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useRouter } from "next/navigation";
import { UsuarioDropdown } from "./usuarioDropdown";
import { UsuarioCompleto } from "@/core/interfaces/UsuarioCompleto";
import { LoadingSpin } from "../ui/loadingComponent";
import { useEffect, useState } from "react";
import { getUsuarios } from "@/core/services/UserService";

export const UserTable = () => {
  const [usuario, setUsuario] = useState<UsuarioCompleto[]>([]);
  const router = useRouter();

  useEffect(() => {
    const handleGetUser = async () => {
      const data = await getUsuarios();
      setUsuario(data);
    };
    handleGetUser();
  }, []);

  if (!usuario.length) return <LoadingSpin />;

  return (
    <div className="w-full px-4 py-6">
      <div className="max-w-6xl mx-auto">
        <div className="overflow-x-auto shadow-lg rounded-lg border border-gray-200">
          <Table className="min-w-full bg-white text-sm">
            <TableHeader className="bg-accent">
              <TableRow>
                <TableHead className="whitespace-nowrap px-4 py-2">Nome</TableHead>
                <TableHead className="whitespace-nowrap px-4 py-2">Email</TableHead>
                <TableHead className="whitespace-nowrap px-4 py-2">Local</TableHead>
                <TableHead className="whitespace-nowrap px-4 py-2">Tipo</TableHead>
                <TableHead className="whitespace-nowrap px-4 py-2">Telefone</TableHead>
                <TableHead className="px-4 py-2"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {usuario.map((u) => (
                <TableRow
                  className="hover:bg-secondary-light"
                  key={u.idUser}
                >
                  <TableCell className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <img
                        className="rounded-full object-cover"
                        src="https://images.unsplash.com/photo-1533929736458-ca588d08c8be?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                        width={40}
                        height={40}
                        alt={u.nome}
                      />
                      <div>
                        <div className="font-medium">{u.nome}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="px-4 py-3">{u.email}</TableCell>
                  <TableCell className="px-4 py-3">
                    {`${u.local.estado} - ${u.local.cidade}`}
                  </TableCell>
                  <TableCell className="px-4 py-3">{u.tipoUsuario}</TableCell>
                  <TableCell className="px-4 py-3 text-right">{u.telefone}</TableCell>
                  <TableCell className="px-4 py-3 text-right">
                    <UsuarioDropdown usuario={u} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};
