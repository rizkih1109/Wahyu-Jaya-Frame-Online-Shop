import { api } from "@/lib/api"

export const fetchLoadproducts = async (input: Params) => {
    try {
        const { data } = await api.get('/products', { params: input })
        if(data.error) throw data.error
        return data
    } catch (error) {
        throw error
    }
}

export const fetchGetProduct = async (id: number | string) => {
    try {
        const { data } = await api.get(`/products/${id}`)
        if(data.error) throw data.error
        return data
    } catch (error) {
        throw error
    }
}

export const fetchCreateProduct = async (input: FormDataEntryValue) => {
    try {
        const { data } = await api.post('/products', input)
        if(data.error) throw data.error
        return data
    } catch (error) {
        throw error
    }
}

export const fetchUpdateProduct = async (id: number, input: FormDataEntryValue) => {
    try {
        const { data } = await api.put(`/products/${id}`, input)
        if(data.error) throw data.error
        return data
    } catch (error) {
        throw error
    }
}

export const fetchDeleteProduct = async (id: number | string) => {
    try {
        await api.delete(`/products/${id}`)
    } catch (error) {
        throw error
    }
}