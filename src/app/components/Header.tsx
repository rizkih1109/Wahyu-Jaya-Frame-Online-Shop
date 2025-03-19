import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartShopping,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";

export default function Header() {
  return (
    <div className="flex flex-row justify-between bg-white h-20">
      <div className="basis-3/12 flex justify-center items-center">
        <Image
          src="/wahyu_logo.png"
          alt="Wahyu Jaya Frame Logo"
          width={114}
          height={33}
        />
      </div>
      <div className="basis-6/12 flex items-center">
        <div className="flex flex-row border border-solid border-black rounded-md py-1 px-3 w-4/5 items-center">
          <FontAwesomeIcon icon={faMagnifyingGlass} />
          <input
            placeholder="search here"
            className="ml-3 outline-none w-full"
          ></input>
        </div>
      </div>
      <div className="basis-3/12 flex justify-end items-center">
        <div className="mr-8 flex items-center">
          <FontAwesomeIcon icon={faCartShopping} className="size-6 mr-5" />
          <div className="border border-solid border-l-black h-10 mr-3"></div>
          <button className="py-1 px-3 bg-white text-orangeMain font-poppins rounded-md mx-1">Register</button>
          <button className="py-1 px-5 bg-orangeMain text-white font-poppins rounded-md mx-1">
            Log In
          </button>
        </div>
      </div>
    </div>
  );
}
