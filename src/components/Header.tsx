import Image from "next/image";

export default function Header() {
    return (
        <div className="flex flex-row py-5 px-20 sticky top-0 bg-white shadow z-10">
            <div className="pr-16"><Image alt="wahyu_logo.png" src={'/wahyu_logo.png'} width={150} height={40} /></div>
            <div className="grow">
                <div className="px-2 flex flex-row items-center gap-3 border border-black rounded-md w-auto h-[40px]">
                    <Image alt="search_logo.png" src="/search_logo.png" width={24} height={24} />
                    <input className="w-full focus:outline-0" placeholder="Search here" />
                </div>
            </div>
            <div className="flex flex-row items-center gap-1 pr-8 pl-16">
                <Image alt="bars.png" src="/bars.png" width={24} height={24} />
                <Image alt="bell.png" src="/bell.png" width={24} height={24} />
            </div>
            <div className="flex items-center gap-3 border-l-2 border-black pl-8">
                <p>name</p>
                <Image className="rounded-full size-10" alt="user.png" src="/user-tie-solid.svg" width={52} height={52} />
            </div>
        </div>
    )
}