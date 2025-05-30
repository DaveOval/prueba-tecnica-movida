import { useCallback, useState } from 'react';
import { addStock } from '../../services/stock/addStockService';
import { AxiosError } from 'axios';

interface AddStockFormData {
  product_id: string;
  warehouse_id: string;
  location_code: string;
  batch_number: string;
  expiry_date: string;
  serial_number: string;
  quantity: number;
  reserved_quantity: number;
  available_quantity: number;
  last_movement_date: string;
  status: string;
}

export const useAddStock = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const addStockAction = useCallback(async (data: AddStockFormData) => {
    setIsLoading(true);
    setError(null);

    try {
      await addStock(data);
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      const errorMessage =
        axiosError?.response?.data?.message ||
        axiosError?.message ||
        'Error al agregar el stock';
      setError(errorMessage);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    isLoading,
    error,
    addStockAction,
  };
}; 