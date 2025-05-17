import { useState } from 'react';
import { createWarehouse } from '../services';

interface Warehouse {
  name: string;
  location: string;
  description: string;
}

export const useSaveWarehouses = () => {
  const [isLoading, setIsLoading] = useState(false);

  const saveWarehouse = async (warehouse: Warehouse) => {
    setIsLoading(true);

    try {
      await createWarehouse(warehouse);
      return { success: 'Bodega agregada correctamente' };
    } catch {
      return { error: 'Error al crear la bodega' };
    } finally {
      setIsLoading(false);
    }
  };

  return { saveWarehouse, isLoading };
};
