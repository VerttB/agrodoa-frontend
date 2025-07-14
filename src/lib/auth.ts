import { Usuario } from "@/core/interfaces/Usuario";
import { cookies } from "next/headers";

export async function getMockUserFromCookies(): Promise<Usuario | null> {
  const cookieStore = await cookies();
  const raw = cookieStore.get("mockUser")?.value;

  if (!raw) return null;

  try {
    return JSON.parse(raw) as Usuario;
  } catch {
    return null;
  }
}
