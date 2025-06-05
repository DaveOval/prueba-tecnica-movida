import { useState, useCallback } from 'react';
import { getWarehousesList } from '../services';

interface Warehouse {
  _id: string;
  name: string;
  location: string;
  description: string;
  __v: number;
  bodegas: Warehouse;
}

interface WarehousesResponse {
  bodegas: Warehouse[];
}

export const useGetWarehouses = () => {
  const [warehouses, setWarehouses] = useState<WarehousesResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getWarehouses = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getWarehousesList();
      setWarehouses(data);
    } catch {
      setError('Error al obtener las bodegas');
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { getWarehouses, isLoading, warehouses, error };
};
