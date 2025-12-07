import { getRecentProductList } from './products.api';
import { useQuery } from '@tanstack/react-query';

export const useRecentProductList = () => {
  return useQuery({
    queryKey: ['recentProductList'],
    queryFn: getRecentProductList,
    initialData: [],
  });
};
