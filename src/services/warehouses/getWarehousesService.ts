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

interface WarehousesResponse {
  bodegas: Warehouse[];
}

interface WarehouseListResponse {
  warehouses: Warehouse[];
}

const WAREHOUSES_ENDPOINT = 'warehouse';

export const getWarehouses = async () => {
  const response = await api.get<WarehousesResponse>(WAREHOUSES_ENDPOINT);
  return response.data;
};

export const getWarehouseList = async () => {
  const response = await api.get<WarehouseListResponse>(
    `${WAREHOUSES_ENDPOINT}/list`
  );
  return response.data.warehouses;
};
