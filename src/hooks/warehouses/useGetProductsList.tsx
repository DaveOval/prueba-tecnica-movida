import { useCallback, useState } from 'react';
import { getProductsList } from '../../services/products/getProductsService';
import { AxiosError } from 'axios';

interface Product {
  id: string;
  name: string;
}

export const useGetProductsList = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [productsList, setProductsList] = useState<Product[] | null>(null);

  const getProductsListAction = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await getProductsList();
      setProductsList(response as unknown as Product[]);
      return response;
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      const errorMessage =
        axiosError?.response?.data?.message ||
        axiosError?.message ||
        'Error al obtener la lista de productos';
      setError(errorMessage);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    isLoading,
    error,
    productsList,
    getProductsListAction,
  };
};
