import { api } from '../api';

interface AddStockFormData {
  product_id: string;
  warehouse_id: string;
  location_code: string;
  batch_number: string;
  expiry_date: string;
  serial_number: string;
  quantity: number;
  reserved_quantity: number;
  available_quantity: number;
  last_movement_date: string;
  status: string;
}

const STOCK_ENDPOINT = 'stock';

export const addStock = async (data: AddStockFormData) => {
  if (!data) {
    throw new Error('All fields are required');
  }

  const response = await api.post(`${STOCK_ENDPOINT}`, data);
  return response.data;
}; 