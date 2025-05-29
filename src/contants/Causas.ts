import { ICausas } from "@/interfaces/ICausas";

export const causas: ICausas[] = [
  {
    id: "1",
    nome: "Cesta Solidária",
    descricao:
      "Ajude famílias em situação de vulnerabilidade com alimentos básicos.",
    meta: 1000,
    arrecadado: 250,
    prazo: new Date("2025-06-30"),
    responsavelId: "u001",
  },
  {
    id: "2",
    nome: "Refeitório Popular",
    descricao: "Construa um refeitório para pessoas em situação de rua.",
    meta: 5000,
    arrecadado: 4200,
    prazo: new Date("2025-07-15"),
    responsavelId: "u002",
  },
  {
    id: "3",
    nome: "Combate à Fome Infantil",
    descricao: "Distribuição de refeições nutritivas para crianças carentes.",
    meta: 20000,
    arrecadado: 20000,
    prazo: new Date("2025-08-01"),
    responsavelId: "u003",
  },
  {
    id: "4",
    nome: "Apoio a Agricultores",
    descricao: "Fortaleça pequenos produtores em regiões afetadas pela seca.",
    meta: 8000,
    arrecadado: 1800,
    prazo: new Date("2025-09-10"),
    responsavelId: "u004",
  },
  {
    id: "5",
    nome: "Merenda Escolar Rural",
    descricao: "Melhore a alimentação escolar em comunidades do campo.",
    meta: 12000,
    arrecadado: 6500,
    prazo: new Date("2025-10-05"),
    responsavelId: "u005",
  },
];
