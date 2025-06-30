import { IUser } from "@/core/interfaces/IUser";
import { cookies } from "next/headers";

export async function getMockUserFromCookies() {
  const cookieStore = cookies();
  const raw = (await cookieStore).get("mockUser")?.value;

  if (!raw) return null;

  try {
    return JSON.parse(raw) as IUser
  } catch {
    return null;
  }
}
