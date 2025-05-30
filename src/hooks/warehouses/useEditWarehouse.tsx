import { useCallback, useState } from 'react';
import { getWarehouse } from '../../services/warehouses/getWarehouseService';
import { updateWarehouse } from '../../services/warehouses/updateWarehouseService';
import { AxiosError } from 'axios';
import toast from 'react-hot-toast';

interface UpdateWarehouseFormData {
  warehouse_name: string;
  warehouse_code: string;
  square_meters: number;
  aisle_count: number;
  racks_per_aisle: number;
  levels_per_rack: number;
  Default: boolean;
  status: string;
}

export const useEditWarehouse = (id: string) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [warehouse, setWarehouse] = useState<UpdateWarehouseFormData | null>(null);

  const getWarehouseAction = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await getWarehouse(id);
      setWarehouse(response);
      return response;
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      const errorMessage =
        axiosError?.response?.data?.message ||
        axiosError?.message ||
        'Error al obtener el almacén';
      setError(errorMessage);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  const updateWarehouseAction = useCallback(async (data: UpdateWarehouseFormData) => {
    setIsLoading(true);
    setError(null);
    const loadingToast = toast.loading('Actualizando almacén...');

    try {
      await updateWarehouse(id, data);
      toast.dismiss(loadingToast);
      toast.success('Almacén actualizado correctamente');
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      const errorMessage =
        axiosError?.response?.data?.message ||
        axiosError?.message ||
        'Error al actualizar el almacén';
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
    warehouse,
    getWarehouseAction,
    updateWarehouseAction,
  };
}; 