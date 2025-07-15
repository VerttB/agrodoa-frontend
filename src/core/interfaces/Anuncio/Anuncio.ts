import { Usuario } from "../Usuario";
import { Local } from "../Local";
import { Produto } from "../Produto";
import { StatusAnuncio } from "../../enums/StatusAnuncio";
import { TipoAnuncio } from "../../enums/TipoAnuncio";
import { AnuncioResumido } from "./AnuncioResumido";
import { Anunciante } from "../Anunciante";

export interface Anuncio extends AnuncioResumido{
  dataExpiracao: string;
  entregaPeloFornecedor: boolean;
  status: StatusAnuncio; 
  tipo: TipoAnuncio;
  anunciante: Anunciante;
  local: Local;
}
