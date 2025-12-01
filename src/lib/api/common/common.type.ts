import type { CurrencyType, GradeType } from '@/lib/types';

export type ExchangeRateResponse = {
  exchangeRate: {
    [key in CurrencyType]: number;
  };
};

export type GradePointListResponse = {
  gradePointList: Array<{
    type: GradeType;
    minPoint: number;
  }>;
};
