import { getExchangeRate, getGradePointList } from './common.api';
import { useQuery } from '@tanstack/react-query';

export const useExchangeRate = () => {
  return useQuery({
    queryKey: ['exchangeRate'],
    queryFn: getExchangeRate,
    initialData: {
      KRW: 1,
      USD: 1,
    },
  });
};

export const useGradePointList = () => {
  return useQuery({
    queryKey: ['gradePointList'],
    queryFn: async () => {
      await new Promise(res => setTimeout(res, 3000000));
      return getGradePointList();
    },
    initialData: [
      {
        type: 'EXPLORER',
        minPoint: 0,
      },
    ],
  });
};
