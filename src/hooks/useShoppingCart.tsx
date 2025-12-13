import { useShoppingCart, useSetShoppingCart } from '@/providers/ShoppingCartProvider';
import { type Product } from '@/lib/types/products';

export const useShoppingCartController = () => {
  const { shoppingCart } = useShoppingCart();
  const { setShoppingCart } = useSetShoppingCart();

  const addItem = (product: Product): void => {
    setShoppingCart(prev => [...prev, product]);
  };

  const removeItem = (productId: number): void => {
    setShoppingCart(prev => {
      const findIndex = prev.map(item => item.id).lastIndexOf(productId);

      if (findIndex === -1) {
        return prev;
      }

      return [...prev.slice(0, findIndex), ...prev.slice(findIndex + 1)];
    });
  };

  const readItemCount = (product: Product): number => {
    return shoppingCart.filter(item => item.id === product.id).length;
  };

  const isItemMoreThanStock = (product: Product): boolean => {
    const productCount = readItemCount(product);
    return product.stock <= productCount;
  };

  const isItemLessThanStock = (product: Product): boolean => {
    const productCount = readItemCount(product);
    return productCount <= 0;
  };

  return { addItem, removeItem, readItemCount, isItemMoreThanStock, isItemLessThanStock };
};
