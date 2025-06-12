import { sideBarMenus } from "@/app/constants/sideBarMenus";
import SidebarSection from "./SidebarSection";
import Image from "next/image";

export default function SideBar({ role }: { role: Role }) {
  const menu = sideBarMenus[role];

  return (
    <aside className="w-64 bg-blue-600 flex flex-col p-4 text-white sticky top-0 h-screen">
      <div className="flex justify-center items-center border-solid border-b border-white pb-5">
        <Image
          src="/merchant_logo.png"
          alt="Wahyu Jaya Frame Logo"
          width={114}
          height={33}
        />
      </div>
      <div className="flex justify-center items-center border-solid border-b border-white py-4">
        <p>Dashboard</p>
      </div>
      <div className="mt-4 flex-1">
        {menu.map((section) => (
          <SidebarSection
            key={section.section}
            title={section.section}
            items={section.items || []}
          />
        ))}
      </div>
    </aside>
  );
}
