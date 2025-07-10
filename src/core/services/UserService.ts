
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
