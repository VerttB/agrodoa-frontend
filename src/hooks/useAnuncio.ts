import { useFetch } from "./useFetch";

export function useAnuncio<T = unknown>(id?:string) {

  const url = id ? `/api/anuncios/${id}` : `/api/anuncios`
  console.log(url)
 return useFetch<T>(url)
}
