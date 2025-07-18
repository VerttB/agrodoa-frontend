import { CausaQueryParams } from "../interfaces/QueryParams/CausaQueryParams";
import { verificaResposta } from "../utils/verificarResposta";

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

export async function getCausas(params: CausaQueryParams = {}) {
  console.log(typeof params);
  const queryString = buildQueryString(params);
  const url = `${BASE_URL}/causas${queryString ? `?${queryString}` : ""}`;

  const res = await fetch(url, {
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include"
  });

   return await verificaResposta(res);
}

export async function getCausasAguardando(params: CausaQueryParams = {}) {
  console.log(typeof params);
  const queryString = buildQueryString(params);
  const url = `${BASE_URL}/causas?status=AGUARDANDO`;

  const res = await fetch(url, {
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include"
  });

   return await verificaResposta(res);
}

export async function criarCausa(data: any) {
  const res = await fetch(`${BASE_URL}/causas/criar_causa`, {
    cache: "no-store",
    method: "POST",
    credentials: "include",
    body: data,
  });

  return await verificaResposta(res);
}


export async function voluntariar(idCausa:string) {
  const res = await fetch(`${BASE_URL}/causas/${idCausa}/virar_voluntario`, {
    method: "POST",
    credentials: "include",
  });

  return await verificaResposta(res);
}

// export async function apoiar(idCausa:string) {
//   const res = await fetch(`${BASE_URL}/causas/${idCausa}/virar_voluntario`, {
//     method: "POST",
//     credentials: "include",
//   });

//   return await verificaResposta(res);
// }


export async function aprovarCausa(idCausa:string) {
  const res = await fetch(`${BASE_URL}/causas/${idCausa}/aprovar_criacao_causa`, {
    method: "PATCH",
    credentials: "include",
  });

  return await verificaResposta(res);
}

export async function rejeitarCausa(idCausa:string) {
  const res = await fetch(`${BASE_URL}/causas/${idCausa}/rejeitar_criacao_causa`, {
    method: "PATCH",
    credentials: "include",
  });

  return await verificaResposta(res);
}


export async function getCausasDisponiveis(params: CausaQueryParams = {}) {
  console.log(typeof params);
  const queryString = buildQueryString(params);
  const url = `${BASE_URL}/causas$statusCausa=DISPONIVEIS`;

  const res = await fetch(url, {
    cache: "no-store",
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include"
  });

   return await verificaResposta(res);
}

export async function getCausasVoluntarias(params: CausaQueryParams = {}) {
 
  const url = `${BASE_URL}/usuarios/meu_perfil/causas_voluntarias`;

  const res = await fetch(url, {
    cache: "no-store",
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include"
  });

   return await verificaResposta(res);
}

export async function getMinhasCausas() {
  
  const url = `${BASE_URL}/usuarios/meu_perfil/minhas_causas`;

  const res = await fetch(url, {
    cache: "no-store",
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include"
  });

   return await verificaResposta(res);
}