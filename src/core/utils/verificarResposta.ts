export async function verificaResposta(res: Response) {
  if (res.status === 204) {
    return null; 
  }

  if (res.ok) {
    try {
      return await res.json();
    } catch {
      return null;
    }
  }

  let errorMessage = `Erro ${res.status} - ${res.statusText}`;
  try {
    const errorData = await res.json();
    errorMessage = errorData.message || JSON.stringify(errorData);
  } catch {
    try {
      const errorText = await res.text();
      if (errorText) errorMessage = errorText;
    } catch {
      
    }
  }

  throw new Error(errorMessage);
}
