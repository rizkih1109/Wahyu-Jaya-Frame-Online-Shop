import { cookies } from "next/headers";
import { checkToken } from "./util";
import { redirect } from "next/navigation";

export async function getRole(): Promise<Role> {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;

  if (!token) {
    redirect('/login')
  }

  const payload = checkToken(token);

  if (!payload || !payload.role) {
    redirect('/login')
  }

  return payload.role as Role;
}
