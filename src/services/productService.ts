import { api } from './api';

interface Product {
  _id: string;
  name: string;
  SKU: string;
  stock: number;
  package_number: number;
  provider: string;
  warehouse_location: string;
  registration_date: string;
  __v: number;
}

const PRODUCTS_ENDPOINT = 'stock';

export const updateProductStock = async (
  productId: string,
  stock: number
): Promise<Product> => {
  const response = await api.put(`${PRODUCTS_ENDPOINT}/${productId}`, {
    stock,
  });

  return response.data;
};
