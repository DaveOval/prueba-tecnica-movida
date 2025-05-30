import { useCallback, useState } from 'react';
import { addWarehouse } from '../../services/warehouses/addWarehouseService';
import { AxiosError } from 'axios';

interface AddWarehouseFormData {
  warehouse_name: string;
  warehouse_code: string;
  square_meters: number;
  aisle_count: number;
  racks_per_aisle: number;
  levels_per_rack: number;
  Default: boolean;
  status: string;
}

export const useAddWarehouse = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const addWarehouseAction = useCallback(async (data: AddWarehouseFormData) => {
    setIsLoading(true);
    setError(null);

    try {
      await addWarehouse(data);
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      const errorMessage =
        axiosError?.response?.data?.message ||
        axiosError?.message ||
        'Error al agregar el almacén';
      setError(errorMessage);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    isLoading,
    error,
    addWarehouseAction,
  };
}; 