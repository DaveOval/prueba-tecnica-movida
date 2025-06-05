import { api } from '../api';

interface UpdateProductFormData {
  name: string;
  description: string;
  category: string;
  unit_of_measure: string;
  unidad_base: string;
  unidad_logistica: string;
  factor_conversion: number;
  barcode: string;
  is_batch_tracked: boolean;
  is_expiry_tracked: boolean;
  min_stock_level: number;
  max_stock_level: number;
  default_location: string;
  supplier_id: string;
  price: number;
  status: string;
}

const PRODUCTS_ENDPOINT = 'product';

export const updateProduct = async (
  id: string,
  data: UpdateProductFormData
) => {
  if (!data) {
    throw new Error('All fields are required');
  }

  const response = await api.patch(`${PRODUCTS_ENDPOINT}/${id}`, {
    ...data,
    _id: id,
  });
  return response.data;
};
