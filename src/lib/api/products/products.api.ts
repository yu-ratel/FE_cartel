import { http } from '@/utils/http';
import type { RecentProductListResponse, ProductListResponse } from './products.type';

export const getRecentProductList = async (): Promise<RecentProductListResponse['recentProducts']> => {
  const response = await http.get<RecentProductListResponse>('/api/recent/product/list');

  return response.recentProducts;
};

export const getProductList = async (): Promise<ProductListResponse['products']> => {
  const response = await http.get<ProductListResponse>('/api/product/list');

  return response.products;
};
