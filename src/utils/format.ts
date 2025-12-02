import type { CurrencyType } from '@/lib/types';

export const formatCurrencyPrice = (price: number, currency: CurrencyType): string => {
  if (currency === 'USD') {
    return `$ ${price.toLocaleString('en-US')}`;
  }

  return `${price.toLocaleString('ko-KR')} 원`;
};
