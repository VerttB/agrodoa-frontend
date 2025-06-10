import { IProduto } from "./IProduto";

export interface IAnuncio {
  id: number;
  titulo: string;
  acao: "Doação" | "Venda";
  entrega_pelo_fornecedor: boolean;
  cidadeId: number;
  cidadeNome?: string;
  anuncianteId: number;
  anuncianteNome: string;
  produto: IProduto;
  dataExpiracao: Date;
  foto: string; 
}
