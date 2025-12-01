import { getExchangeRate, getGradePointList } from './common.api';
import { useQuery } from '@tanstack/react-query';

export const useExchangeRate = () => {
  const { data: exchangeRate } = useQuery({
    queryKey: ['exchangeRate'],
    queryFn: getExchangeRate,
  });

  return exchangeRate;
};

export const useGradePointList = () => {
  const { data: gradePointList } = useQuery({
    queryKey: ['gradePointList'],
    queryFn: getGradePointList,
  });

  return gradePointList;
};
