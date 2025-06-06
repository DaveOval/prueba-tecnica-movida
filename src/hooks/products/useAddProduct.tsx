import { useCallback, useState } from 'react';
import { addProduct } from '../../services/products/addProductService';
import { AxiosError } from 'axios';

interface AddProductFormData {
  name: string;
  description: string;
  category: string;
  unit_of_measure: string;
  unit_base: string;
  unit_logistic: string;
  factor_convertor: number;
  barcode: string;
  is_batch_tracked: boolean;
  is_expiry_tracked: boolean;
  min_stock_level: number;
  max_stock_level: number;
  default_location: string;
  supplier_id: string;
  price: number;
  status: string;
}

export const useAddProduct = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const addProductAction = useCallback(async (data: AddProductFormData) => {
    setIsLoading(true);
    setError(null);

    try {
      await addProduct(data);
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      const errorMessage =
        axiosError?.response?.data?.message ||
        axiosError?.message ||
        'Error al agregar el producto';
      setError(errorMessage);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    isLoading,
    error,
    addProductAction,
  };
};
