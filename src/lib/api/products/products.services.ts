import { getRecentProductList, getProductList } from './products.api';
import { useQuery } from '@tanstack/react-query';

export const useRecentProductList = () => {
  return useQuery({
    queryKey: ['recentProductList'],
    queryFn: getRecentProductList,
    initialData: [],
  });
};

export const useProductList = () => {
  return useQuery({
    queryKey: ['productList'],
    queryFn: getProductList,
    initialData: [],
  });
};
