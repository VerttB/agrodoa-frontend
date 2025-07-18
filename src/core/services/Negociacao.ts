import { verificaResposta } from "../utils/verificarResposta";

export async function iniciarNegociacao(idAnuncio: string, quantidade:number) {
    const res = await fetch(`http://localhost:8080/anuncios/${idAnuncio}/iniciar_negociacao`,
      {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        credentials: "include",
        body: JSON.stringify({quantidade})
      }
    )

     if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || JSON.stringify(errorData));
    }

    return await res.json();
}

export async function getNegociacoes(idAnuncio: string) {
    const res = await fetch(`http://localhost:8080/anuncios/${idAnuncio}/negociacoes/listar`,
      {
        method: "GET",
        headers: {"Content-Type": "application/json"},
        credentials: "include",
      }
    )

   return await verificaResposta(res)
}

export async function aprovarNegociacao(idAnuncio:string,idNegociacao: string) {
    const res = await fetch(`http://localhost:8080/anuncios/${idAnuncio}/negociacoes/${idNegociacao}/aceitar`,
      {
        method: "PATCH",
        credentials: "include",
      }
    )

   return verificaResposta(res)
}

export async function recusarNegociacao(idAnuncio: string, idNegociacao: String) {
    const res = await fetch(`http://localhost:8080/anuncios/${idAnuncio}/negociacoes/${idNegociacao}/cancelar`,
      {
        method: "PATCH",
        credentials: "include",
      }
    )

    if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || JSON.stringify(errorData));
        }

    return await res.json();
}