import { http } from '@/utils/http';
import type { ProductListResponse } from './products.type';

export const getRecentProductList = async (): Promise<ProductListResponse['recentProducts']> => {
  const response = await http.get<ProductListResponse>('/api/recent/product/list');

  return response.recentProducts;
};
