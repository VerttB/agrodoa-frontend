
const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

export async function getUsuarios() {
  const res = await fetch(`${BASE_URL}/usuarios`, {
    cache: "no-store", 
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    throw new Error("Erro ao buscar usuarios");
  }

  return res.json();
}

export async function loginUsuario(email: string, senha: string) {
    const res = await fetch(`${BASE_URL}/auth/login`,{
      method: "POST",
      headers:{
        'Content-Type' : 'application/json',
      },
      body: JSON.stringify({
        email,
        senha
      })
    })

    if(res.ok) console.log(await res.json())
}