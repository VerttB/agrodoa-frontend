export interface IUser {
  id: string,
  nome: string,
  senha: string,
  cpf_ou_cnpj?: string,
  tipo: "beneficiario" | "fornecedor" | "hibrido",
  voluntario: boolean,
  telefone: string,
  cidade: string,
  foto: URL,
}
