import { useCallback, useState } from 'react';
import { getWarehouseList } from '../../services/warehouses/getWarehousesService';
import { AxiosError } from 'axios';

interface Warehouse {
  id: string;
  warehouses: string;
}

export const useGetWarehousesList = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [warehousesList, setWarehousesList] = useState<Warehouse[] | null>(
    null
  );

  const getWarehousesListAction = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await getWarehouseList();
      setWarehousesList(response as unknown as Warehouse[]);
      return response;
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      const errorMessage =
        axiosError?.response?.data?.message ||
        axiosError?.message ||
        'Error al obtener la lista de almacenes';
      setError(errorMessage);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    isLoading,
    error,
    warehousesList,
    getWarehousesListAction,
  };
};
