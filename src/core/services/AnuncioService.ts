import { AnuncioQueryParams } from "@/core/interfaces/AnuncioQueryParams";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

function buildQueryString(params: Record<string, any>): string {
  const query = new URLSearchParams();

  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== null && value !== '') {
      query.set(key, String(value));
    }
  }

  return query.toString();
}

export async function getAnuncios(params: AnuncioQueryParams = {}) {
  const queryString = buildQueryString(params);
  const url = `${BASE_URL}/anuncios${queryString ? `?${queryString}` : ''}`;

  const res = await fetch(url, {
    cache: "no-store", 
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    throw new Error("Erro ao buscar anúncios");
  }

  return res.json();
}
