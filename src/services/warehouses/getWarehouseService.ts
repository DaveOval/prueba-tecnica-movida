import { api } from '../api';

interface Warehouse {
  _id: string;
  warehouse_name: string;
  warehouse_code: string;
  square_meters: number;
  aisle_count: number;
  racks_per_aisle: number;
  levels_per_rack: number;
  Default: boolean;
  status: string;
  created_at: string;
  updated_at: string;
  __v: number;
}

const WAREHOUSES_ENDPOINT = 'warehouse';

export const getWarehouse = async (id: string) => {
  const response = await api.get<Warehouse>(`${WAREHOUSES_ENDPOINT}/${id}`);
  return response.data;
}; 