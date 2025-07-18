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
    const res = await fetch(`http://localhost:8080/anuncios/${idAnuncio}/listar_negociacoes`,
      {
        method: "GET",
        headers: {"Content-Type": "application/json"},
        credentials: "include",
      }
    )

    if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || JSON.stringify(errorData));
        }

    return await res.json();
}

export async function aprovarNegociacao(idNegociacao: string) {
    const res = await fetch(`http://localhost:8080/anuncios/${idNegociacao}/aceitar_negociacao`,
      {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        credentials: "include",
      }
    )

    if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || JSON.stringify(errorData));
        }

    return await res.json();
}

export async function recusarNegociacao(idNegociacao: String) {
    const res = await fetch(`http://localhost:8080/anuncios/${idNegociacao}/cancelar_negociacao`,
      {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        credentials: "include",
      }
    )

    if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || JSON.stringify(errorData));
        }

    return await res.json();
}