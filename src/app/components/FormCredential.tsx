"use client";

import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../lib/redux/hooks";
import { RootState } from "../lib/redux/store";
import { loginAsync } from "../lib/redux/user/userSlice";
import { useRouter } from "next/navigation";
// import { useRouter } from "next/navigation";

export default function FormCredential({ type }: FormCredentialProps) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    repassword: "",
    userName: "",
    phone: "",
    address: "",
  });

  const dispatch = useAppDispatch();
  const router = useRouter();
  const user = useAppSelector((state: RootState) => state.user.value);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await dispatch(loginAsync(formData));
  };

  useEffect(() => {
    if (user.role) {

      console.log('User after login:', user);
      if (user.role === 'seller') {
        router.push("/dashboard");
      } else {
        router.push("/home");
      }
    }
  }, [user, router]);
  

  return (
    <form onSubmit={handleSubmit}>
      {type === "login" && (
        <>
          <label htmlFor="email" className="mb-2 text-sm">
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            autoComplete="email"
            required
            className="px-2 py-1 mb-3 min-w-full rounded-md bg-inputBg"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          ></input>
          <div className="flex flex-row justify-between items-center">
            <label htmlFor="password" className="mb-2 text-sm">
              Password
            </label>
            <p className="mb-2 text-sm text-gray-400">Forgot Password?</p>
          </div>
          <input
            type="password"
            name="password"
            id="password"
            autoComplete="current-password"
            className="px-2 py-1 mb-3 min-w-full rounded-md bg-inputBg"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
          ></input>
          <div className="flex justify-center mt-4">
            <button
              type="submit"
              className="bg-orangeMain py-3 px-10 rounded-3xl text-white text-sm "
            >
              SIGN IN
            </button>
          </div>
        </>
      )}

      {type === "account" && (
        <>
          <label htmlFor="email" className="mb-2 text-sm">
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            autoComplete="email"
            required
            className="px-2 py-1 mb-3 min-w-full rounded-md bg-inputBg"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          ></input>
          <label htmlFor="password" className="mb-2 text-sm">
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            autoComplete="current-password"
            className="px-2 py-1 mb-3 min-w-full rounded-md bg-inputBg"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
          ></input>
          <label htmlFor="repassword" className="mb-2 text-sm">
            Repassword
          </label>
          <input
            type="password"
            name="repassword"
            id="repassword"
            autoComplete="current-password"
            className="px-2 py-1 mb-3 min-w-full rounded-md bg-inputBg"
            value={formData.repassword}
            onChange={(e) =>
              setFormData({ ...formData, repassword: e.target.value })
            }
          ></input>
          <div className="flex justify-center mt-4">
            <button
              type="submit"
              className="bg-orangeMain py-3 px-10 rounded-3xl text-white text-sm "
            >
              SIGN UP
            </button>
          </div>
        </>
      )}

      {type === "profile" && (
        <>
          <label htmlFor="userName" className="mb-2 text-sm">
            User Name
          </label>
          <input
            type="text"
            name="userName"
            id="userName"
            autoComplete="userName"
            required
            className="px-2 py-1 mb-3 min-w-full rounded-md bg-inputBg"
            value={formData.userName}
            onChange={(e) =>
              setFormData({ ...formData, userName: e.target.value })
            }
          ></input>
          <div className="flex flex-row justify-between items-center">
            <label htmlFor="phone" className="mb-2 text-sm">
              Phone
            </label>
            <p className="mb-2 text-sm text-gray-400">Forgot Password?</p>
          </div>
          <input
            type="text"
            name="phone"
            id="phone"
            autoComplete="current-phone"
            className="px-2 py-1 mb-3 min-w-full rounded-md bg-inputBg"
            value={formData.phone}
            onChange={(e) =>
              setFormData({ ...formData, phone: e.target.value })
            }
          ></input>
          <label htmlFor="address" className="mb-2 text-sm">
            Address
          </label>
          <input
            type="text"
            name="address"
            id="address"
            autoComplete="address"
            className="px-2 py-1 mb-3 min-w-full rounded-md bg-inputBg"
            value={formData.address}
            onChange={(e) =>
              setFormData({ ...formData, address: e.target.value })
            }
          ></input>
          <div className="flex justify-center mt-4">
            <button
              type="submit"
              className="bg-orangeMain py-3 px-10 rounded-3xl text-white text-sm "
            >
              SIGN IN
            </button>
          </div>
        </>
      )}
    </form>
  );
}
