export async function criarProduto(produto: any) {
  const res = await fetch(
    "http://localhost:8080/anuncios/criar_anuncio/criar_produto",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(produto),
      credentials: "include",
    },
  );

  if (!res.ok) throw new Error("Não foi possível criar o produto");

  return await res.json();
}
