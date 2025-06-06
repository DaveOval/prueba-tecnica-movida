import { api } from '../api';

const PRODUCTS_ENDPOINT = 'product';

export const getProducts = async () => {
  const response = await api.get(`${PRODUCTS_ENDPOINT}`);

  return response.data;
};

export const getProductsList = async () => {
  const response = await api.get(`${PRODUCTS_ENDPOINT}/list`);
  return response.data.products;
};
