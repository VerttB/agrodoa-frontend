export interface Causas {
  idCausa: string;
  nome: string;
  prazo: Date;
  descricao: string;
  nomeArquivoFoto: string;
  dataCriacao: Date,
  metaVoluntarios: number,
  voluntariosAtivos: number,
  contaCriadora: {
    idAnunciante: string,
    nome: string,
    email:string,
  }
}
