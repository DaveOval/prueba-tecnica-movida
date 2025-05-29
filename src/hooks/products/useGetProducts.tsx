import { useCallback, useState } from 'react';
import { getProducts } from '../../services/products/getProductsService';
import { AxiosError } from 'axios';

export const useGetProducts = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [products, setProducts] = useState([]);

  const getProductsAction = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await getProducts();
      setProducts(response);
      return response;
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      const errorMessage =
        axiosError?.response?.data?.message ||
        axiosError?.message ||
        'Error al obtener los productos';
      setError(errorMessage);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    isLoading,
    error,
    products,
    getProductsAction,
  };
};
