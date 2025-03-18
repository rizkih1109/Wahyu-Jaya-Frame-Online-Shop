import Image from "next/image"

export default function MainLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div>
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
            <main className="bg-slateBg">{children}</main>
            <div className="bg-white">
                <div className="grid grid-cols-3 bg-gondawa p-16">
                    <div className="flex flex-col pr-28">
                        <Image alt="wahyu_logo.png" src={'/wahyu_logo.png'} width={300} height={150} />
                        <p className="text-justify">Wahyu Jaya Frame is on of the biggest market of frames in Bandung. We supply our products to several photo studios and traders</p>
                    </div>
                    <div className="col-span-2">
                        <ul className="flex flex-row grid grid-cols-5">
                            <nav>
                                <p className="border-b-2 border-black font-bold pb-2">Category</p>
                                <ul>
                                    <li>Frame Minimalis</li>
                                    <li>Frame Block</li>
                                    <li>Frame Ukir</li>
                                    <li>Lukisan</li>
                                    <li>Kaligrafi</li>
                                    <li>Jam Digital</li>
                                </ul>
                            </nav>
                            <nav>
                                <p className="border-b-2 border-black font-bold pb-2">Company</p>
                                <ul>
                                    <li>About Us</li>
                                    <li>Delivery</li>
                                    <li>Term & conditions</li>
                                </ul>
                            </nav>
                            <nav>
                                <p className="border-b-2 border-black font-bold pb-2">Acoount</p>
                                <ul>
                                    <li>Sign In</li>
                                    <li>View Cart</li>
                                    <li>Transaction List</li>
                                    <li>Payment</li>
                                </ul>
                            </nav>
                            <nav className="col-span-2">
                                <p className="border-b-2 border-black font-bold pb-2">Contact</p>
                                <ul>
                                    <li className="flex flex-row items-start gap-2">
                                        <Image className="object-contain size-5" src="/location-dot.png" alt="Location" width={16} height={16} />
                                        Jl. Ibrahim Adjie No. 323, Kb. Kangkung, Kec. Kiarcondong, Kota Bandung, Jawa Barat 40284
                                    </li>
                                    <li className="flex flex-row items-start gap-2">
                                        <Image className="object-contain size-5" src="/email.png" alt="Email" width={16} height={16} />
                                        wahyujayaframe@gmail.com
                                    </li>
                                    <li className="flex flex-row items-start gap-2">
                                        <Image className="object-contain size-5" src="/whatsapp.png" alt="WhatsApp" width={16} height={16} />
                                        081382756959
                                    </li>
                                    <li className="flex flex-row items-start gap-2">
                                        <Image className="object-contain size-5" src="/instagram.png" alt="Instagram" width={16} height={16} />
                                        Wahyu Jaya Frame
                                    </li>
                                    <li className="flex flex-row items-start gap-2">
                                        <Image className="object-contain size-5" src="/facebook.png" alt="Facebook" width={16} height={16} />
                                        Wahyu Jaya Frame
                                    </li>
                                </ul>
                            </nav>
                        </ul>
                    </div>
                </div>
                <p className="p-2 text-center text-gray-400 flex justify-center items-center">Copyrigth Ⓒ 2025 Wahyu Jaya Frame</p>
            </div>
        </div>
    )
}