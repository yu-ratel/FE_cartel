import { Flex, styled } from 'styled-system/jsx';
import { Spacing, Text } from '@/ui-lib';
import { useCurrencyContext } from '@/providers/CurrencyProvider';
import { useRecentProductList } from '@/lib/api/products';
import { useExchangeRate } from '@/lib/api/common';
import { convertCurrencyPrice } from '@/utils/calculate';
import { formatCurrencyPrice } from '@/utils/format';

function RecentPurchaseSection() {
  const { currency } = useCurrencyContext();
  const recentProducts = useRecentProductList();
  const exchangeRate = useExchangeRate();

  if (!recentProducts || !exchangeRate) {
    return <div>No products found</div>;
  }

  return (
    <styled.section css={{ px: 5, pt: 4, pb: 8 }}>
      <Text variant="H1_Bold">최근 구매한 상품</Text>

      <Spacing size={4} />

      <Flex
        css={{
          bg: 'background.01_white',
          px: 5,
          py: 4,
          gap: 4,
          rounded: '2xl',
        }}
        direction={'column'}
      >
        {recentProducts.map(product => (
          <Flex key={product.id} css={{ gap: 4 }}>
            <styled.img
              src={product.thumbnail}
              alt={product.name}
              css={{
                w: '60px',
                h: '60px',
                objectFit: 'cover',
                rounded: 'xl',
              }}
            />
            <Flex flexDir="column" gap={1}>
              <Text variant="B2_Medium">{product.name}</Text>
              <Text variant="H1_Bold">
                {formatCurrencyPrice(convertCurrencyPrice(product.price, currency, exchangeRate), currency)}
              </Text>
            </Flex>
          </Flex>
        ))}
      </Flex>
    </styled.section>
  );
}

export default RecentPurchaseSection;
