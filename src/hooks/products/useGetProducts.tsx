import { useCallback, useState } from 'react';
import { getProducts } from '../../services/products/getProductsService';
import { AxiosError } from 'axios';

interface Product {
  name: string;
  category: string;
  unit_of_measure: string;
  barcode: string;
  min_stock_level: number;
  max_stock_level: number;
  price: { $numberDecimal: string };
  status: string;
  created_at: string;
}

interface ProductsResponse {
  productos: Product[];
}

export const useGetProducts = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [products, setProducts] = useState<ProductsResponse | null>(null);

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
