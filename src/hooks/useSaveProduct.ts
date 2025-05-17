import { useState } from 'react';
import { createProduct } from '../services';

interface Product {
  name: string;
  SKU: string;
  stock: number;
  package_number: number;
  provider: string;
  registration_date: string;
  warehouse_location: string;
}

export const useSavePorduct = () => {
  const [isLoading, setIsLoading] = useState(false);

  const saveProduct = async (product: Product) => {
    setIsLoading(true);

    try {
      await createProduct(product);
      return { success: 'Producto creado correctamente' };
    } catch {
      return { error: 'Error al crear el producto' };
    } finally {
      setIsLoading(false);
    }
  };

  return { saveProduct, isLoading };
};
