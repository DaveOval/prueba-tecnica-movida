import { api } from './api';

export interface Product {
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

export interface GetProductsResponse {
  message: string;
  productos: Product[];
}

const STOCK_ENDPOINT = 'stock';

export const getProducts = async (): Promise<GetProductsResponse> => {
  const response = await api.get<GetProductsResponse>(`${STOCK_ENDPOINT}`);
  return response.data;
};
