import { useState } from "react";
import { getWarehousesList } from "../services";

interface Warehouse {
  name: string;
  location: string;
  description: string;
}

export const useGetWarehouses = () => {
  const [warehouses, setWarehouses] = useState<Warehouse[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getWarehouses = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const data = await getWarehousesList();
      setWarehouses(data);
    } catch (err: any) {
      setError(err?.response?.data?.message || err.message || "Error al obtener las bodegas");
    } finally {
      setIsLoading(false);
    }
  };

  return { warehouses, getWarehouses, isLoading, error };
};
