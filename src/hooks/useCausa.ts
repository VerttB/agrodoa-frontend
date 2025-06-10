import { useFetch } from "./useFetch";

export function useCausa<T = unknown>(id?:string) {

const url = id ? `/api/causas/${id}` : `/api/causas`


 return useFetch<T>(url)
}
