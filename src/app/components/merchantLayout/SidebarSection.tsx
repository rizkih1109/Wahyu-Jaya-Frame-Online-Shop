import SidebarItem from "./SidebarItem";

export default function SidebarSection({title, items} : SideBarSectionsProps) {
    return (
        <div className="mt-8">
            <h2 className="text-xs font-semibold text-white/70 uppercase tracking-wider px-4 mb-2">
                {title}
            </h2>
            <div className="flex flex-col gap-1">
                {items.map((item) => (
                    <SidebarItem key={item.href} name={item.name} href={item.href}/>
                ))}
            </div>
        </div>
    )
}