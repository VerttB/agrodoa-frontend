export interface IAnuncio{
    id: number,
    titulo:string,
    acao: "Doação" | "Venda",
    entrega_pelo_fornecedor:boolean,
    produto_idproduto:number,
    cidade_idcidade:number,
    anunciante_conta_idconta:number,
}