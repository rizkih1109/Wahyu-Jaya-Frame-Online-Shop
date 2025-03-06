"use client";

import Image from "next/image";
import FormCredential from "./FormCredential";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function FormBox() {
  const pathName = usePathname();

  const formType = pathName.includes("login")
    ? "login"
    : pathName.includes("register")
    ? "account"
    : "profile";

  // const onSubmit = (data: formData) => {
  //   console.log(data);
  // };

  return (
    <div className="p-10 m-2 w-96 rounded-xl border-solid border-gray-200 border bg-white shadow-2xl">
      <div>
        <Image
          src="/wahyu_logo.png"
          alt="Wahyu Jaya Frame Logo"
          width={114}
          height={33}
          className="mb-14"
        />
        {formType === 'login' && (
          <p className="text-gray-300 text-sm mb-4">Welcome Back!!!</p>
        )}
        <p className="mb-5 text-3xl font-medium">Sign In</p>
      </div>
      <FormCredential type={formType}/>
      <div className="flex flex-row justify-center mt-4 text-gray-400">
        <p>
          Don&apos;t have an account?
        </p>
        <Link 
        href={formType === 'login' ? "/register" : "login"}
        className="text-orangeMain ml-1"
         >
          {formType === 'login' ? "Sign Up" : "Sign In"}
        </Link>
      </div>
    </div>
  );
}
