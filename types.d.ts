declare interface User {
    id: number
    email: string
    password: string
    userName: string
    phone: string
    role: string
    address: string
    refreshToken: string
    accessToken: string
}

declare interface formData {
    email: string
    password: string
    repassword?: string
    userName?: string
    phone?: string
    address?: string
}

declare interface FormCredentialProps {
    type: "login" | "account" | "profile";
}