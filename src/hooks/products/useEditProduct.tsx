import { useCallback, useState } from 'react';
import { getProduct } from '../../services/products/getProductService';
import { updateProduct } from '../../services/products/updateProductService';
import { AxiosError } from 'axios';
import toast from 'react-hot-toast';

interface UpdateProductFormData {
  name: string;
  description: string;
  category: string;
  unit_of_measure: string;
  barcode: string;
  is_batch_tracked: boolean;
  is_expiry_tracked: boolean;
  min_stock_level: number;
  max_stock_level: number;
  default_location: string;
  supplier_id: string;
  price: number;
}

export const useEditProduct = (id: string) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [product, setProduct] = useState<UpdateProductFormData | null>(null);

  const getProductAction = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await getProduct(id);
      setProduct(response);
      return response;
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      const errorMessage =
        axiosError?.response?.data?.message ||
        axiosError?.message ||
        'Error al obtener el producto';
      setError(errorMessage);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  const updateProductAction = useCallback(async (data: UpdateProductFormData) => {
    setIsLoading(true);
    setError(null);
    const loadingToast = toast.loading('Actualizando producto...');

    try {
      await updateProduct(id, data);
      toast.dismiss(loadingToast);
      toast.success('Producto actualizado correctamente');
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      const errorMessage =
        axiosError?.response?.data?.message ||
        axiosError?.message ||
        'Error al actualizar el producto';
      setError(errorMessage);
      toast.dismiss(loadingToast);
      toast.error(errorMessage);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  return {
    isLoading,
    error,
    product,
    getProductAction,
    updateProductAction,
  };
}; 