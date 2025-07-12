import { CausaQueryParams } from "../interfaces/QueryParams/CausaQueryParams";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

function buildQueryString(params: object): string {
  const query = new URLSearchParams();

  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== null && value !== '') {
      query.set(key, String(value));
    }
  }

  return query.toString();
}

export async function getCausas(params: CausaQueryParams = {}) {
  console.log(typeof(params))
  
  const queryString = buildQueryString(params);
  const url = `${BASE_URL}/causas${queryString ? `?${queryString}` : ''}`;

  const res = await fetch(url, {
    cache: "no-store", 
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    throw new Error("Erro ao buscar causas");
  }

  return res.json();
}

export async function criarCausa(data: any) {

   const res = await fetch(`${BASE_URL}/causas/criar_causa`, {
    cache: "no-store", 
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    credentials: "include",
    body: JSON.stringify(data)
  });

  if (!res.ok) {
    throw new Error("Erro ao criar causa causas");
  }

  return res.json();

}
