import { getProductList } from './products.api';
import { useQuery } from '@tanstack/react-query';

export const useProductList = () => {
  const { data: products } = useQuery({
    queryKey: ['productList'],
    queryFn: getProductList,
  });

  return products;
};
