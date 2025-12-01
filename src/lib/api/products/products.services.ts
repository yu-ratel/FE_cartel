import { getRecentProductList } from './products.api';
import { useQuery } from '@tanstack/react-query';

export const useRecentProductList = () => {
  const { data: recentProducts } = useQuery({
    queryKey: ['recentProductList'],
    queryFn: getRecentProductList,
  });

  return recentProducts;
};
