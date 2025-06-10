import { useFetch } from "./useFetch";

export function useAnuncio<T = unknown>(id?:string) {

  const url = id ? `api/anuncios/${id}` : `api/anuncios`

 return useFetch<T>(url)
}
