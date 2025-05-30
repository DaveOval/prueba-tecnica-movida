import { useCallback, useState } from 'react';
import { deleteProduct } from '../../services/products/deleteProductService';
import { AxiosError } from 'axios';
import toast from 'react-hot-toast';

export const useDeleteProduct = (onSuccess?: () => void) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const deleteProductAction = useCallback(async (id: string) => {
    setIsLoading(true);
    setError(null);
    const loadingToast = toast.loading('Eliminando producto...');

    try {
      await deleteProduct(id);
      toast.dismiss(loadingToast);
      toast.success('Producto eliminado correctamente');
      onSuccess?.();
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      const errorMessage =
        axiosError?.response?.data?.message ||
        axiosError?.message ||
        'Error al eliminar el producto';
      setError(errorMessage);
      toast.dismiss(loadingToast);
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, [onSuccess]);

  return {
    isLoading,
    error,
    deleteProductAction,
  };
}; 