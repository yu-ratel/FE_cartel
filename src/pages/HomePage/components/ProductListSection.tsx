import { Counter, SubGNB, Text } from '@/ui-lib';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Box, Grid, styled } from 'styled-system/jsx';
import ProductItem from '../components/ProductItem';
import { useProductList } from '@/lib/api/products';
import { useExchangeRate } from '@/lib/api/common';
import type { Product } from '@/lib/types/products';
import { useCurrencyContext } from '@/providers/CurrencyProvider';
import { convertCurrencyPrice } from '@/utils/calculate';
import { formatCurrencyPrice } from '@/utils/format';
import { useShoppingCartController } from '@/hooks/useShoppingCart';

function ProductListSection() {
  const [currentTab, setCurrentTab] = useState('all');
  const navigate = useNavigate();
  const productList = useProductList();
  const { currency } = useCurrencyContext();
  const exchangeRate = useExchangeRate();
  const { addItem, removeItem, readItemCount, isItemMoreThanStock, isItemLessThanStock } = useShoppingCartController();

  const handleClickProduct = (productId: number) => {
    navigate(`/product/${productId}`);
  };

  return (
    <styled.section bg="background.01_white">
      <Box css={{ px: 5, pt: 5, pb: 4 }}>
        <Text variant="H1_Bold">판매중인 상품</Text>
      </Box>
      <SubGNB.Root value={currentTab} onValueChange={details => setCurrentTab(details.value)}>
        <SubGNB.List>
          <SubGNB.Trigger value="all">전체</SubGNB.Trigger>
          <SubGNB.Trigger value="cheese">치즈</SubGNB.Trigger>
          <SubGNB.Trigger value="cracker">크래커</SubGNB.Trigger>
          <SubGNB.Trigger value="tea">티</SubGNB.Trigger>
        </SubGNB.List>
      </SubGNB.Root>
      <Grid gridTemplateColumns="repeat(2, 1fr)" rowGap={9} columnGap={4} p={5}>
        {productList.data.map(product => (
          <ProductItem.Root key={product.id} onClick={() => handleClickProduct(product.id)}>
            <ProductItem.Image src={product.images[0]} alt={product.name} />
            <ProductItem.Info title={product.name} description={product.description} />
            <ProductItem.Meta>
              <ProductItem.MetaLeft>
                <ProductItem.Rating rating={product.rating} />
                <ProductItem.Price>
                  {formatCurrencyPrice(convertCurrencyPrice(product.price, currency, exchangeRate.data), currency)}
                </ProductItem.Price>
              </ProductItem.MetaLeft>
              <ProductItemFreeTag product={product} />
            </ProductItem.Meta>
            <Counter.Root>
              <Counter.Minus onClick={() => removeItem(product.id)} disabled={isItemLessThanStock(product)} />
              <Counter.Display value={readItemCount(product)} />
              <Counter.Plus onClick={() => addItem(product)} disabled={isItemMoreThanStock(product)} />
            </Counter.Root>
          </ProductItem.Root>
        ))}
      </Grid>
    </styled.section>
  );
}

export default ProductListSection;

function ProductItemFreeTag({ product }: { product: Product }) {
  const category = product.category;

  switch (category) {
    case 'CHEESE':
      return;
    case 'CRACKER':
      return product.isGlutenFree && <ProductItem.FreeTag type="gluten" />;
    case 'TEA':
      return product.isCaffeineFree && <ProductItem.FreeTag type="caffeine" />;
    default:
      category satisfies never;
  }
}
