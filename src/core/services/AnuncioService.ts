export async function getAnuncios(params: { nome?: string }) {
    const query = new URLSearchParams();
  
    if (params.nome) query.set("nome", params.nome);
  
    const res = await fetch(`http://localhost:8080/api/anuncios}`, {
      cache: "no-store",
    });
  
    if (!res.ok) throw new Error("Erro ao buscar anúncios");
  
    return res.json(); 
  }
  