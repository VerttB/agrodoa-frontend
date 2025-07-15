"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useFetch } from "@/hooks/useFetch";
import { useRouter } from "next/navigation";
import { UsuarioDropdown } from "./usuarioDropdown";
import { UsuarioCompleto } from "@/core/interfaces/UsuarioCompleto";
import { LoadingSpin } from "../ui/loadingComponent";

export const UserTable = () => {
  const {data: usuario, loading} = useFetch<UsuarioCompleto[]>("http://localhost:8080/usuarios")

  const router = useRouter();

  if (!usuario) return <LoadingSpin/>;
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="w-1/2">
        <Table className="border-1 border-black shadow-2xl">
          <TableHeader className="bg-accent rounded-t-full">
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Local</TableHead>
              <TableHead>Tipo</TableHead>
              <TableHead>Telefone</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="bg-neutral rounded-md p-2">
            {usuario.map((u) => (
              <TableRow
                className="hover:bg-secondary-light cursor-pointer"
                key={u.idUser}
              >
                <TableCell>
                  <div className="flex items-center gap-3">
                    <img
                      className="rounded-full"
                      src={
                        "https://images.unsplash.com/photo-1533929736458-ca588d08c8be?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                      }
                      width={40}
                      height={40}
                      alt={u.nome}
                    />
                    <div>
                      <div className="font-medium">{u.nome}</div>
                      {/* <span className="text-muted-foreground mt-0.5 text-xs">
                      {item.username}
                    </span> */}
                    </div>
                  </div>
                </TableCell>
                <TableCell>{u.email}</TableCell>
                <TableCell>{`${u.local.estado} - ${u.local.cidade}`}</TableCell>
                <TableCell>{u.tipoUsuario}</TableCell>
                <TableCell className="text-right">{u.telefone}</TableCell>
                <TableCell>
                  <UsuarioDropdown usuario={u}></UsuarioDropdown>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
