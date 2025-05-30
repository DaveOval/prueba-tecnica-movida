import { api } from '../api';

const PRODUCTS_ENDPOINT = 'product';

export const deleteProduct = async (id: string) => {
  const response = await api.delete(`${PRODUCTS_ENDPOINT}/${id}`);
  return response.data;
}; 