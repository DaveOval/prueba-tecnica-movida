import { api } from "./api";

interface Warehouse {
    name: string;
    location: string;
    description: string;
}

const WAREHOUSES_ENDPOINT = "/warehouses";

export const getWarehousesList = async () => {
    const response = await api.get(WAREHOUSES_ENDPOINT);
    return response.data;
}

export const createWarehouse = async (warehouse: Warehouse) => {
    const response = await api.post(WAREHOUSES_ENDPOINT, warehouse);
    return response.data;
}

