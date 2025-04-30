import { useState } from "react";
import { createWarehouse } from "../services";

interface Warehouse {
    name: string;
    location: string;
    description: string;
}

export const useSaveWarehouses = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    const saveWarehouse = async (warehouse: Warehouse) => {
        setIsLoading(true);
        setError(null);
        setSuccess(null);

        try {
            await createWarehouse(warehouse);
        } catch (error) {
            setError(error as string || "Error al crear la bodega");
        } finally {
            setIsLoading(false);
        }
    }

    return { saveWarehouse, isLoading, error, success };
}