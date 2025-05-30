import { useCallback, useState } from 'react';
import { getWarehouses } from '../../services/warehouses/getWarehousesService';
import { AxiosError } from 'axios';

interface Warehouse {
  _id: string;
  warehouse_name: string;
  warehouse_code: string;
  square_meters: number;
  aisle_count: number;
  racks_per_aisle: number;
  levels_per_rack: number;
  Default: boolean;
  status: string;
  created_at: string;
  updated_at: string;
  __v: number;
}

interface WarehousesResponse {
  bodegas: Warehouse[];
}

export const useGetWarehouses = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [warehouses, setWarehouses] = useState<WarehousesResponse | null>(null);

  const getWarehousesAction = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await getWarehouses();
      setWarehouses(response);
      return response;
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      const errorMessage =
        axiosError?.response?.data?.message ||
        axiosError?.message ||
        'Error al obtener los almacenes';
      setError(errorMessage);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    isLoading,
    error,
    warehouses,
    getWarehousesAction,
  };
}; 