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
import { useRouter } from "next/navigation";
import { UsuarioDropdown } from "./usuarioDropdown";
const usuario: Usuario[] = [
  {
    id: "123e4567-e89b-12d3-a456-426614174000",
    tipo: "Fornecedor",
    nome: "João da Silva",
    email: "joao.silva@email.com",
    cpfOuCnpj: "123.456.789-00",
    telefone: "(11) 91234-5678",
    nomeArquivoFoto: "joao-foto.jpg",
    tipoUsuario: "Fornecedor",
    local: {
      cidade: "São Paulo",
      estado: "SP",
    },
  },
  {
    id: "223e4567-e89b-12d3-a456-426614174001",
    tipo: "Beneficiario",
    nome: "Maria Oliveira",
    email: "maria.oliveira@email.com",
    cpfOuCnpj: "987.654.321-00",
    telefone: "(71) 99876-5432",
    nomeArquivoFoto: "maria-foto.png",
    tipoUsuario: "Beneficiario",
    local: {
      cidade: "Salvador",
      estado: "BA",
    },
  },
  {
    id: "323e4567-e89b-12d3-a456-426614174002",
    tipo: "Administrador",
    nome: "Carlos Pereira",
    email: "carlos.pereira@email.com",
    cpfOuCnpj: "321.654.987-00",
    telefone: "(31) 98765-4321",
    nomeArquivoFoto: "carlos.jpg",
    tipoUsuario: "Administrador",
    local: {
      cidade: "Belo Horizonte",
      estado: "MG",
    },
  },
];

export const UserTable = () => {
//  const {data: usuario, loading} = useFetch<Usuario[]>("http://localhost:8080/usuarios")

  const router = useRouter()
  

  if(!usuario) return <p>n achei</p>
  return (
    <div className="flex justify-center items-center h-screen">

      <div className="w-1/2">
      <Table className=" shadow-2xl border-1 border-black">
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
        <TableBody className="bg-neutral p-2 rounded-md">
          {usuario.map((u) => (
            <TableRow className="hover:bg-secondary-light cursor-pointer" key={u.id}>
              <TableCell>
                <div className="flex items-center gap-3">
                  <img
                    className="rounded-full"
                    src={"https://images.unsplash.com/photo-1533929736458-ca588d08c8be?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"}
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
              <TableCell><UsuarioDropdown usuario={u}></UsuarioDropdown></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
    </div>
  )
}
