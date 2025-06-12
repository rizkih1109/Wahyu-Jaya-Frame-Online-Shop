'use client'

import { faBell, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import DropAvatar from "./DropAvatar";

export default function Header() {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleDropdown(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current?.contains(event.target as Node)) setOpen(false);
    }

    document.addEventListener("mousedown", handleDropdown);

    return () => {
      document.removeEventListener("mousedown", handleDropdown);
    };
  }, []);

  return (
    <div className="flex flex-row justify-between items-center h-20 bg-white w-full py-4 px-8">
      <div className="flex flex-row border rounded-lg overflow-hidden w-full max-w-sm">
        <input
          className="flex-grow px-4 py-2 focus:outline-none bg-gray-100"
          placeholder="search for ..."
        ></input>
        <button className="px-3 py-2 bg-blue-600">
          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            className="text-white w-4 h-4"
          />
        </button>
      </div>
      <div className="flex items-center gap-4">
        <FontAwesomeIcon icon={faBell} className="text-black w-4 h-4" />
        <div className="border border-solid border-l-black h-10"></div>
        <div className="flex items-center gap-3 relative" ref={dropdownRef}>
          <p>Rizki Hidayatulloh</p>
          <button onClick={() => setOpen(!open)}>
            <Image
              src="/Defaultavatar.png"
              alt="Avatar"
              width={50}
              height={50}
              className="rounded-full object-cover"
            />
          </button>

          {open && <DropAvatar />}
        </div>
      </div>
    </div>
  );
}
