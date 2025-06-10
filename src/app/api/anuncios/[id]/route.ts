import { NextResponse } from "next/server";

export async function GET(){
    console.log("Testando")
    return NextResponse.json(
        {
    "id": 105,
    "titulo": "Maçãs Fuji crocantes - oferta especial",
    "acao": "Venda",
    "entrega_pelo_fornecedor": true,
    "cidadeId": 5,
    "cidadeNome": "Itabuna",
    "anuncianteId": 205,
    "anuncianteNome": "Pedro Costa",
    "produto": {
      "idproduto": 5,
      "nome": "Maçã Fuji",
      "quantidade": 75,
      "data_validade": "2025-07-05T00:00:00.000Z",
      "preco_unidade": 1.3
    },
    "dataExpiracao": "2025-07-04T00:00:00.000Z",
    "foto": "https://api.agrodoa.com/imagens/anuncios/105.jpg"
  },{
    status:200
  }

    )

}