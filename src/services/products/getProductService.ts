import { api } from '../api';

interface Product {
  _id: string;
  name: string;
  description: string;
  category: string;
  unit_of_measure: string;
  barcode: string;
  is_batch_tracked: boolean;
  is_expiry_tracked: boolean;
  min_stock_level: number;
  max_stock_level: number;
  default_location: string;
  supplier_id: string;
  price: number;
  created_at: string;
  updated_at: string;
  __v: number;
}

const PRODUCTS_ENDPOINT = 'product';

export const getProduct = async (id: string) => {
  const response = await api.get<Product>(`${PRODUCTS_ENDPOINT}/${id}`);
  return response.data;
}; 