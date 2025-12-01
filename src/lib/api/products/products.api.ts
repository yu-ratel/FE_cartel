import { http } from '@/utils/http';
import type { ProductListResponse } from './products.type';

export const getProductList = async (): Promise<ProductListResponse['recentProducts']> => {
  const response = await http.get<ProductListResponse>('/api/product/list');

  return response.recentProducts;
};
