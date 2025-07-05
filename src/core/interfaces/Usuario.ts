import { Local } from "./Local";


export interface Usuario {
  id:string,
  tipo:string,
  nome: string;
  email: string;
  cpfOuCnpj: string;
  telefone: string;
  nomeArquivoFoto: string;
  tipoUsuario: string;
  local: Local;
}
