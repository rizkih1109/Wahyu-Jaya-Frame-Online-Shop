import axios from "axios";

export const api = axios.create({
  baseURL: 'http://localhost:3000/api/',
  timeout: 1000
})

export const setToken = (token: string) => {
    api.interceptors.request.use((config) => {
        config.headers.Authorization = `Bearer ${token}`
        return config;
    })
};