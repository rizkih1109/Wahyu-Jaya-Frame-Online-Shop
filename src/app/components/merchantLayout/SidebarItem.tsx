import Link from "next/link";

export default function SidebarItem({ name, href }: SideBarProps) {
  return (
    <Link
      href={href}
      className="flex items-center gap-3 px-4 py-2 text-sm rounded-md hover:bg-blue-500 hover:text-white transition-colors duration-200"
    >
      {name}
    </Link>
  );
}
