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
  const { data: gradePointList } = useQuery({
    queryKey: ['gradePointList'],
    queryFn: getGradePointList,
  });

  return gradePointList;
};
