import Image from "next/image";

export default function Card({bColor, tColor, img, type, value} : {bColor: string, tColor: string, img: string, type: string, value: string}) {
    return (
        <div className={`bg-white rounded-md border-l-4 shadow-md ${bColor}`}>
            <div className="py-5">
                <div className="mx-5">
                    <div className="flex flex-row items-center justify-between">
                        <div className="col mr-2">
                            <div className={`text-xs font-bold text-uppercase mb-1 ${tColor} `}>
                                {type}
                            </div>
                            <div className="h5 mb-0 font-bold">
                                {value}
                            </div>
                        </div>
                        <div className="col-auto size-11">
                            <Image className="object-contain" src={`/${img}.png`} alt="img" width={100} height={100} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}