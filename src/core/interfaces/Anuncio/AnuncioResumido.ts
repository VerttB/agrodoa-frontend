import { Produto } from "../Produto";

export interface AnuncioResumido{
    idAnuncio: string,
    titulo: string,
    nomeArquivoFoto: string,
    produto: Produto
}