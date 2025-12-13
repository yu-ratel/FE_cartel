import { getRecentProductList, getProductList, getProductDetail } from './products.api';
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

export const useProductDetail = (id: number) => {
  return useQuery({
    queryKey: ['productDetail', id],
    queryFn: () => getProductDetail(id),
    initialData: {
      id: 0,
      name: '',
      category: 'CHEESE',
      stock: 0,
      price: 0,
      description: '',
      detailDescription: '',
      images: [],
      rating: 0,
    },
  });
};
