import { useFetch } from "./useFetch";

export function useCausa<T = unknown>(id?: string) {
  const url = id ? `http://localhost:8080/causas/${id}` : `http://localhost:8080/causas`;

  return useFetch<T>(url);
}
