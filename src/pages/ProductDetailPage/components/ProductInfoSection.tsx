import { Button, Counter, RatingGroup, Spacing, Text } from '@/ui-lib';
import { Box, Divider, Flex, Stack, styled } from 'styled-system/jsx';
import { useShoppingCartController } from '@/hooks/useShoppingCart';
import type { Product } from '@/lib/types/products';
import { useCurrencyContext } from '@/providers/CurrencyProvider';
import { useExchangeRate } from '@/lib/api/common';
import Tag, { type TagType } from '@/ui-lib/components/tag';
import { convertCurrencyPrice } from '@/utils/calculate';
import { formatCurrencyPrice } from '@/utils/format';

type ProductInfoSectionProps = {
  product: Product;
};

function ProductInfoSection({ product }: ProductInfoSectionProps) {
  const { addItem, removeItem, readItemCount, isItemMoreThanStock, isItemLessThanStock } = useShoppingCartController();
  const { id, name, category, rating, price, stock } = product;
  const { currency } = useCurrencyContext();
  const exchangeRate = useExchangeRate();

  return (
    <styled.section css={{ bg: 'background.01_white', p: 5 }}>
      {/* 상품 정보 */}
      <Box>
        <Stack gap={2}>
          <Tag type={category.toLowerCase() as TagType} />
          <Text variant="B1_Bold">{name}</Text>
          <RatingGroup value={rating} readOnly label={`${rating.toFixed(1)}`} />
        </Stack>
        <Spacing size={4} />
        <Text variant="H1_Bold">
          {formatCurrencyPrice(convertCurrencyPrice(price, currency, exchangeRate.data), currency)}
        </Text>
      </Box>

      <Spacing size={5} />

      {/* 재고 및 수량 조절 */}
      <Flex justify="space-between" alignItems="center">
        <Flex alignItems="center" gap={2}>
          <Text variant="C1_Medium">재고</Text>
          <Divider orientation="vertical" color="border.01_gray" h={4} />
          <Text variant="C1_Medium" color="secondary.02_orange">
            {stock}EA
          </Text>
        </Flex>
        <Counter.Root>
          <Counter.Minus onClick={() => removeItem(id)} disabled={isItemLessThanStock(product)} />
          <Counter.Display value={readItemCount(product)} />
          <Counter.Plus onClick={() => addItem(product)} disabled={isItemMoreThanStock(product)} />
        </Counter.Root>
      </Flex>

      <Spacing size={5} />

      {/* 장바구니 버튼 */}
      <Button fullWidth color="primary" size="lg">
        장바구니
      </Button>
    </styled.section>
  );
}

export default ProductInfoSection;
