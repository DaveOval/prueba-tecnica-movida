import { api } from '../api';

const WAREHOUSES_ENDPOINT = 'warehouse';

export const deleteWarehouse = async (id: string) => {
  const response = await api.delete(`${WAREHOUSES_ENDPOINT}/${id}`);
  return response.data;
}; 