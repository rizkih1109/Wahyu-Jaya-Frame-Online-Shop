"use client";

import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { loginAsync } from "@/lib/redux/user/userSlice";
import { useRouter } from "next/navigation";
import { RootState } from "@/lib/redux/store";
import FormFieldAuth from "../items/FormFieldAuth";

type FieldType = {
  label: string;
  name: string;
  type: string;
  autoComplete: string;
  required: boolean;
};


const LoginField = [
  {
    label: "Email",
    name: "email",
    type: "email",
    autoComplete: "email",
    required: true,
  },
  {
    label: "Password",
    name: "password",
    type: "password",
    autoComplete: "current-password",
    required: true,
  }, 
];

const AccountField = [
  ...LoginField,
  {
    label: "Repassword",
    name: "repassword",
    type: "password",
    autoComplete: "new-password",
    required: true,
  },
];

const ProfileField = [
  {
    label: "User Name",
    name: "userName",
    type: "text",
    autoComplete: "username",
    required: true,
  },
  {
    label: "Phone",
    name: "phone",
    type: "text",
    autoComplete: "tel",
    required: true,
  },
];

export default function FormCredential({ type }: FormCredentialProps) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    repassword: "",
    userName: "",
    phone: "",
  });

  const dispatch = useAppDispatch();
  const router = useRouter();
  const user = useAppSelector((state: RootState) => state.user.value);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  let FieldMapping : FieldType[]= [];
  if (type === "login") FieldMapping = LoginField;
  else if (type === "account") FieldMapping = AccountField;
  else if (type === "profile") FieldMapping = ProfileField;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await dispatch(loginAsync(formData));

    if (res?.payload?.role === "CUSTOMER") {
      router.push("/home");
    } else {
      router.push("/dashboard");
    }
  };

  useEffect(() => {
    if (user.role === "CUSTOMER") {
      router.push("/home");
    } else if (user.role) {
      router.push("/dashboard");
    }
  }, [user, router]);

  return (
    <form onSubmit={handleSubmit}>
      {FieldMapping.map(({ name, label, type, autoComplete, required }) => (
        <FormFieldAuth
          key={name}
          name={name}
          label={label}
          type={type}
          autoComplete={autoComplete}
          required={required}
          value={formData[name as keyof typeof formData] ?? ""}
          onChange={handleChange}
        />
      ))}

      <div className="flex justify-center mt-10">
        <button
          type="submit"
          className="bg-orangeMain py-3 px-10 rounded-3xl text-white text-sm"
        >
          {type === "login" ? "SIGN IN" : type === "account" ? "SIGN UP" : "CONTINUE"}
        </button>
      </div>
    </form>
  );
}
