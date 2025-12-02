import type { CurrencyType } from '@/lib/types';

export const convertCurrencyPrice = (
  price: number,
  currency: CurrencyType,
  exchangeRate: { [key in CurrencyType]: number }
): number => {
  if (currency === 'USD') {
    return price;
  }

  return Math.round(price * exchangeRate[currency]);
};
