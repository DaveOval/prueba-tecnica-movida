import { api } from '../api';

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

const WAREHOUSES_ENDPOINT = 'warehouse';

export const updateWarehouse = async (id: string, data: UpdateWarehouseFormData) => {
  if (!data) {
    throw new Error('All fields are required');
  }

  const response = await api.patch(`${WAREHOUSES_ENDPOINT}/${id}`, { ...data, _id: id });
  return response.data;
}; 