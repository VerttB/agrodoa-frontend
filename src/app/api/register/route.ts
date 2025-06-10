import { NextResponse } from "next/server";


export async function POST(req: Request) {
    const body = await req.json();

    const { email, password, confirmPassword, cpfCnpj, phone } = body;

    // Regra básica (você já valida com Zod no client, mas repetimos no server)
    if (password !== confirmPassword) {
      return NextResponse.json({ error: "Senhas não coincidem" }, { status: 400 });
    }
  
    console.log(`Usuário ${email} logado`)


    console.log("Usuário registrado:", { email, cpfCnpj, phone });

    return NextResponse.json({ message: "Usuário cadastrado com sucesso!" });
}