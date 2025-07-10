"use client"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Usuario } from "@/core/interfaces/Usuario"
import { useFetch } from "@/hooks/useFetch"

export const UserTable = () => {
  const {data: usuario, loading} = useFetch<Usuario[]>("http://localhost:8080/usuarios")
  if(!usuario) return <p>n achei</p>
  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead>Nome</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Local</TableHead>
            <TableHead>Tipo</TableHead>
            <TableHead className="text-right">Telefone</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {usuario.map((u) => (
            <TableRow key={u.id}>
              <TableCell>
                <div className="flex items-center gap-3">
                  {/* <img
                    className="rounded-full"
                    src={}
                    width={40}
                    height={40}
                    alt={item.name}
                  /> */}
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
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <p className="text-muted-foreground mt-4 text-center text-sm">
        Table with images
      </p>
    </div>
  )
}
