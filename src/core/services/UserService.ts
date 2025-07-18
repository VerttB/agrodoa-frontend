import { verificaResposta } from "../utils/verificarResposta";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

export async function getUsuarios() {
  const res = await fetch(`${BASE_URL}/usuarios`, {
    method: "GET",
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error("Erro ao buscar usuarios");
  }

  return res.json();
}

export async function loginUsuario(email: string, senha: string) {
  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      senha,
    }),
    credentials: "include",
  });
  
  if (!res.ok) throw new Error("Credenciais inválidas");
  const data = await res.json();
  console.log(data)
  return data;
}

export async function getUsuarioAutenticado() {}

export async function cadastroUsuario(data: any) {
  const res = await fetch(`${BASE_URL}/usuarios/cadastrar_usuario`, {
    method: "POST",
    body: data,
    credentials: "include"
  });

  if (!res.ok) {
    const error = await res
      .json()
      .catch(() => ({ message: "Erro ao cadastrar" }));
    throw new Error(error.body.message || "Erro ao realizar cadastro");
  }

  return res.json();
}

export async function verPerfil() {
  const res = await fetch(`${BASE_URL}/usuarios/meu_perfil`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  if (!res.ok) throw new Error("Não foi possível encontrar o usuário");
  return await res.json();
}

export async function verOutroPerfil(id: string) {
  const res = await fetch(`${BASE_URL}/usuarios/ver_perfil/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) throw new Error("Não foi possível encontrar o usuário");
  return await res.json();
}

export async function deslogar() {
  const res = await fetch(`${BASE_URL}/auth/logout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  if (!res.ok) throw new Error("Não foi deslogar  o usuário");

  const contentType = res.headers.get("content-type");

  if (
    res.status === 204 ||
    !contentType ||
    !contentType.includes("application/json")
  ) {
    return;
  }
  return await res.json();
}


export async function denunciar(data:any,id:string) {
  const res = await fetch(`${BASE_URL}/usuarios/ver_perfil/${id}/denunciar`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
    credentials: "include",
  });

  if (!res.ok){
    console.log(await res.json())
    throw new Error("Não foi denunciar  o usuário");
  }

  const contentType = res.headers.get("content-type");

  if (
    res.status === 204 ||
    !contentType ||
    !contentType.includes("application/json")
  ) {
    return;
  }
  return await res.json();
}

export async function avaliar(data:any,id:string) {
  const res = await fetch(`${BASE_URL}/usuarios/ver_perfil/${id}/avaliar`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
    credentials: "include",
  });

  if (!res.ok){
    console.log(await res.json())
    throw new Error("Não foi avaliar o usuário");
  }

  const contentType = res.headers.get("content-type");

  if (
    res.status === 204 ||
    !contentType ||
    !contentType.includes("application/json")
  ) {
    return;
  }
  return await res.json();
}

export async function getDenuncias() {
  const res = await fetch(`${BASE_URL}/denuncias`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

 return  await verificaResposta(res)
}

export async function denunciaAprovar(idDenuncia:string) {
  const res = await fetch(`${BASE_URL}/denuncias/${idDenuncia}/aprovar`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

 return  await verificaResposta(res)
}

export async function denunciaRecusar(idDenuncia:string) {
  const res = await fetch(`${BASE_URL}/denuncias/${idDenuncia}/reprovar`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

 return  await verificaResposta(res)
}



