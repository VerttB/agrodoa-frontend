import { Local } from "./Local";
import { Usuario } from "./Usuario";

export interface UsuarioCompleto extends Usuario{
    idUser:string,
    local: Local
}