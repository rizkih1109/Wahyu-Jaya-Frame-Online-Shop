import { api } from "@/lib/api";

export const load = () => api.get('stores')