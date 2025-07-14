import { AnuncioQueryParams } from "@/core/interfaces/QueryParams/AnuncioQueryParams";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

function buildQueryString(params: object): string {
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

  if (!res.ok) {
    throw new Error("Erro ao buscar anúncios");
  }

  return await res.json();
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

  if (!res.ok) {
    throw new Error("Erro ao buscar anúncios");
  }

  return await res.json();
}

export async function criarAnuncio(anuncio: any) {
  const res = await fetch("http://localhost:8080/anuncios/criar_anuncio", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(anuncio),
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error("Erro ao criar Anúncio");
  }
  return await res.json();
}

export async function salvarAnuncio(id: string) {
  const res = await fetch(`http://localhost:8080/anuncios/${id}/salvar`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error("Erro ao salvar Anúncio");
  }
  return await res.json();
}

export async function getAnunciosSalvos() {
  const res = await fetch(
    `http://localhost:8080/usuarios/meu_perfil/meus_salvos`,
    {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    },
  );

  if (!res.ok) {
    throw new Error("Erro ao pegar anuncios salvos");
  }
  return await res.json();
}

export async function getAnunciosEmNegociacao() {
  const res = await fetch(
    `http://localhost:8080/usuarios/meu_perfil/minhas_negociacoes`,
    {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    },
  );

  if (!res.ok) {
    throw new Error("Erro ao pegar anuncios em negociacao");
  }
  return await res.json();
}

export async function cancelarAnuncio(idAnuncio: string) {
  const res = await fetch(
    `http://localhost:8080/anuncios/${idAnuncio}/cancelar`,
    {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(idAnuncio),
    },
  );

  if (!res.ok) {
    throw new Error("Erro ao cancelar anuncios");
  }
  return await res.json();
}
