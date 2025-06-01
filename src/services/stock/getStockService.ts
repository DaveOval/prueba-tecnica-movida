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
}

interface Stock {
  _id: string;
  product_id: string | null;
  warehouse_id: Warehouse;
  location_code: string;
  batch_number: string;
  expiry_date: string;
  serial_number: string;
  quantity: number;
  reserved_quantity: number;
  available_quantity: number;
  last_movement_date: string;
  status: string;
  created_at: string;
  updated_at: string;
}

interface StockResponse {
  message: string;
  stock: Stock[];
}

interface SingleStockResponse {
  message: string;
  stock: Stock;
}

interface StockUpdate {
  warehouse_id?: { _id: string };
  location_code?: string;
  batch_number?: string;
  expiry_date?: string;
  serial_number?: string;
  quantity?: number;
  reserved_quantity?: number;
  available_quantity?: number;
  status?: string;
}

const STOCK_ENDPOINT = 'stock';

export const getStock = async () => {
  const response = await api.get<StockResponse>(STOCK_ENDPOINT);
  return response.data;
};

export const getStockById = async (id: string) => {
  const response = await api.get<SingleStockResponse>(
    `${STOCK_ENDPOINT}/${id}`
  );
  return response.data;
};

export const updateStock = async (id: string, data: StockUpdate) => {
  const response = await api.patch<SingleStockResponse>(
    `${STOCK_ENDPOINT}/${id}`,
    data
  );
  return response.data;
};
