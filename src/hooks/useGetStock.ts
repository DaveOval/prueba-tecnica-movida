import { useState, useCallback } from 'react';
import { getProducts } from '../services';

interface Product {
  _id: string;
  name: string;
  SKU: string;
  stock: number;
  package_number: number;
  provider: string;
  warehouse_location: string;
  registration_date: string;
  __v: number;
}

export const useGetStock = () => {
  const [products, setProducts] = useState<Product[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getProductsList = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await getProducts();
      setProducts(response.productos);
    } catch {
      setError('Error al obtener los productos');
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { products, isLoading, error, getProductsList };
};
