import { AnuncioResumido } from "./Anuncio/AnuncioResumido";
import { Avaliacao } from "./Avaliacao";
import { Local } from "./Local";
import { Usuario } from "./Usuario";

export interface UsuarioCompleto{
    idUser:string,
    nome: string,
    email: string,
    cpfOuCnpj: string,
    telefone: string,
    tipoUsuario: string,
    local: Local
    anunciosPostados: AnuncioResumido[]
    avaliacoes: Avaliacao[]
}