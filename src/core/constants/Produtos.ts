import { IProduto } from "../interfaces/IProduto";

export const produtos: IProduto[] = [
  {
    idproduto: 1,
    nome: "Tomate",
    quantidade: 100,
    data_validade: new Date("2025-07-15"),
    preco_unidade: 1.50
  },
  {
    idproduto: 2,
    nome: "Banana",
    quantidade: 80,
    data_validade: new Date("2025-06-20"),
    preco_unidade: 0.75
  },
  {
    idproduto: 3,
    nome: "Batata",
    quantidade: 200,
    data_validade: new Date("2025-08-01"),
    preco_unidade: 0.90
  },
  {
    idproduto: 4,
    nome: "Alface",
    quantidade: 50,
    data_validade: new Date("2025-06-18"),
    preco_unidade: 1.20
  },
  {
    idproduto: 5,
    nome: "Maçã",
    quantidade: 60,
    data_validade: new Date("2025-07-05"),
    preco_unidade: 1.00
  }
];
