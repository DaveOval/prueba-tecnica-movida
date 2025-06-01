import { useState, useCallback } from 'react';
import {
  getStockById,
  updateStock,
} from '../../services/stock/getStockService';

interface EditStockFormData {
  warehouse_id: string;
  location_code: string;
  batch_number: string;
  expiry_date: string;
  serial_number: string;
  quantity: number;
  reserved_quantity: number;
  available_quantity: number;
  status: string;
}

export const useEditStock = (id: string) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getStockAction = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await getStockById(id);
      return response;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  const updateStockAction = useCallback(
    async (data: EditStockFormData) => {
      setIsLoading(true);
      setError(null);
      try {
        // Convert the form data to match the API's expected format
        const updateData = {
          ...data,
          warehouse_id: { _id: data.warehouse_id }, // Convert string ID to object with _id
        };
        const response = await updateStock(id, updateData);
        return response;
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    [id]
  );

  return { isLoading, error, getStockAction, updateStockAction };
};
