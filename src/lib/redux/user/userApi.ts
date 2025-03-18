import { api } from "../../api";

export const login = (email: string, password: string) => api.post('users/auth/login', {
    email,
    password
})

export const account = (email: string, password: string, repassword: string) => api.post('users/auth/register', {
    email,
    password,
    repassword
})

export const profile = (userName: string, phone: string, address: string) => api.post('users/auth/register', {
    userName,
    phone,
    address
})