import { AnuncioQueryParams } from "@/core/interfaces/QueryParams/AnuncioQueryParams";
import { verificaResposta } from "../utils/verificarResposta";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

function buildQueryString(params: Record<string, any>): string {
  const query = new URLSearchParams();

  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== null && value !== "") {
      query.set(key, String(value));
    }
  }

  return query.toString();
}

export async function getAnuncios(params: AnuncioQueryParams = {}) {
  console.log(typeof params);

  const queryString = buildQueryString(params);
  const url = `${BASE_URL}/anuncios${queryString ? `?${queryString}` : ""}`;

  const res = await fetch(url, {
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
    },
  });

 return await verificaResposta(res)
}

export async function getAnunciosUsuario(
  id: string,
  params: AnuncioQueryParams = {},
) {
  console.log(typeof params);

  const queryString = buildQueryString(params);
  const url = `${BASE_URL}/anuncios/usuario/${id}${queryString ? `?${queryString}` : ""}`;

  const res = await fetch(url, {
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    method: "GET",
  });

 return await verificaResposta(res)
}

export async function criarAnuncio(anuncio: any) {
  const res = await fetch(`${BASE_URL}/anuncios/criar_anuncio`, {
    method: "POST",
    body: anuncio,
    credentials: "include",
  });

  return await verificaResposta(res)
}

export async function salvarAnuncio(id: string) {
  const res = await fetch(`${BASE_URL}/anuncios/${id}/salvar`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
  });

  return await verificaResposta(res)
}

export async function getAnunciosSalvos() {
  const res = await fetch(
    `${BASE_URL}/usuarios/meu_perfil/meus_salvos`,
    {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    },
  );

  return await verificaResposta(res)
}

export async function getAnunciosEmNegociacao() {
  const res = await fetch(
    `${BASE_URL}/usuarios/meu_perfil/minhas_negociacoes`,
    {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    },
  );

 return await verificaResposta(res)
}

export async function cancelarAnuncio(idAnuncio: string) {
  const res = await fetch(
    `${BASE_URL}/anuncios/${idAnuncio}/cancelar`,
    {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ idAnuncio }),
    }
  );

  return await verificaResposta(res);
}




