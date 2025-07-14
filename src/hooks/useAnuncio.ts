import { useFetch } from "./useFetch";

export function useAnuncio<T = unknown>(id?: string) {
  const url = id
    ? `http://localhost:8080/anuncios/${id}`
    : `http://localhost:8080/anuncios/`;
  console.log(url);
  return useFetch<T>(url);
}
