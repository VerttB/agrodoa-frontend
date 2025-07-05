import { cookies } from "next/headers";

export async function POST() {
  const mockUser = {
    id: "1",
    nome: "Ana Silva",
    senha: "senha123",
    email:"ana@gmail.com",
    cpf_ou_cnpj: "123.456.789-00",
    tipo: "fornecedor",
    voluntario: false,
    telefone: "(71) 99999-1111",
    cidade: "Salvador",
  };

  (await cookies()).set("mockUser", JSON.stringify(mockUser), {
    httpOnly: false, // enquanto é mock, pode ser acessado no client
    path: "/",
    maxAge: 60 * 60 * 24,
  });

  return new Response(JSON.stringify({ success: true }), { status: 200 });
}
