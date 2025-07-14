import { Usuario } from "./Usuario";
import { Local } from "./Local";
import { Produto } from "./Produto";
import { StatusAnuncio } from "../enums/StatusAnuncio";
import { TipoAnuncio } from "../enums/TipoAnuncio";

export interface Anuncio {
  idAnuncio: string;
  titulo: string;
  nomeArquivoFoto: string;
  dataExpiracao: string;
  entregaPeloFornecedor: boolean;
  status: StatusAnuncio;
  tipo: TipoAnuncio;
  anunciante: Usuario;
  produto: Produto;
  local: Local;
}
