import { api } from "./api";

interface Product {
    name: string;
    SKU: string;
    stock: number;
    package_number: number;
    provider: string;
    registration_date: string;
    warehouse_location: string;
}

const PRODUCTS_ENDPOINT = "ingresos";

export const createProduct = async (product: Product) => {
    const response = await api.post(PRODUCTS_ENDPOINT, product);
    return response.data;
}

export const getProductsList = async () => {
    const response = await api.get(PRODUCTS_ENDPOINT);
    return response.data;
}
