import { getRole } from "@/lib/helpers/getRole";
import SideBar from "../components/merchantLayout/SideBar";
import Header from "../components/merchantLayout/Header";

export default async function page({
  children,
}: {
  children: React.ReactNode;
}) {
  const role = await getRole();

  return (
    <div className="flex min-h-screen">
      <SideBar role={role} />
      <main className="flex flex-col w-full bg-gray-100">
        <Header />
        {children}
      </main>
    </div>
  );
}
