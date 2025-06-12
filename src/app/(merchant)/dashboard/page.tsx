import { getRole } from "@/lib/helpers/getRole";

export default async function Page() {
    const role = await getRole();

  if(role === "OWNER") {
    return <p>Ini dashboard untuk owner</p>
  } else if (role === "ADMIN") {
    return <p>Ini dashboard untuk admin</p>
  } else if (role === "SELLER") {
    return <p>Ini dashboard untuk seller</p>
  }

}
