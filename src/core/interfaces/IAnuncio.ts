export interface IAnuncio{
    id: number,
    titulo:string,
    acao: "Doação" | "Venda",
    entrega_pelo_fornecedor:boolean,
    cidade_idcidade:number,
    anunciante_conta_idconta:number,
    produto_idproduto:number,
}