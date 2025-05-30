import { useCallback, useState } from 'react';
import { deleteWarehouse } from '../../services/warehouses/deleteWarehouseService';
import { AxiosError } from 'axios';
import toast from 'react-hot-toast';

export const useDeleteWarehouse = (onSuccess?: () => void) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const deleteWarehouseAction = useCallback(async (id: string) => {
    setIsLoading(true);
    setError(null);
    const loadingToast = toast.loading('Eliminando almacén...');

    try {
      await deleteWarehouse(id);
      toast.dismiss(loadingToast);
      toast.success('Almacén eliminado correctamente');
      onSuccess?.();
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      const errorMessage =
        axiosError?.response?.data?.message ||
        axiosError?.message ||
        'Error al eliminar el almacén';
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
    deleteWarehouseAction,
  };
}; 