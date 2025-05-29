import { api } from '../api';

interface AddProductFormData {
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
}

const PRODUCTS_ENDPOINT = 'product';

export const addProduct = async (data: AddProductFormData) => {
  if (!data) {
    throw new Error('All fields are required');
  }

  const response = await api.post(`${PRODUCTS_ENDPOINT}`, data);
  return response.data;
};
