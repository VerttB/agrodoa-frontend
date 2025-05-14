export interface User {
  id: string;
  nome: string;
  senha: string;
  cpf?: string;
  cnpj?: string;
  tipo: "beneficiario" | "fornecedor" | "hibrido";
}
