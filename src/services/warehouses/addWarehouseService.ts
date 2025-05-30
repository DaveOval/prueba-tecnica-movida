import { api } from '../api';

interface AddWarehouseFormData {
  warehouse_name: string;
  warehouse_code: string;
  square_meters: number;
  aisle_count: number;
  racks_per_aisle: number;
  levels_per_rack: number;
  Default: boolean;
  status: string;
}

const WAREHOUSES_ENDPOINT = 'warehouse/warehouse';

export const addWarehouse = async (data: AddWarehouseFormData) => {
  if (!data) {
    throw new Error('All fields are required');
  }

  const response = await api.post(`${WAREHOUSES_ENDPOINT}`, data);
  return response.data;
}; 