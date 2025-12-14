import { Spacing } from '@/ui-lib';
import ProductDetailSection from './components/ProductDetailSection';
import ProductInfoSection from './components/ProductInfoSection';
import RecommendationSection from './components/RecommendationSection';
import ThumbnailSection from './components/ThumbnailSection';
import { AsyncBoundary } from '@/ui-lib/components/AsyncBoundary';
import { useParams } from 'react-router';
import { useProductDetail } from '@/lib/api/products/products.services';

// 7. 상품에 맞는 추천 제품을 노출해주세요.
//     1. `추천 상품 아이디 목록`을 서버에서 불러와주세요.
//     2. 불러온 아이디와 같은 `상품목록 정보` 를 노출해주세요.
// 8. 서버에 문제가 있을경우 에러화면을 노출해주세요.

function ProductDetailPage() {
  const { id } = useParams();
  const productDetail = useProductDetail(Number(id));
  const { description, detailDescription, images } = productDetail.data;
  const isLoading = productDetail.isFetching;
  const isError = productDetail.isError;

  // 아쉬운점 -> currency 와 환율이 같은공간에서 관리하는게 좋을듯
  // 현재 환율은 컴포넌트 내부에서 관리하고 있지만, currency는 전역적으로 관리하고 있음
  // 이렇게 되면 환율이 변경될 때마다 컴포넌트를 리렌더링 해야 함
  // 환율은 전역적으로 관리하고 있는게 좋을듯

  // async boundary 와 관련해서 아쉬운점 -> 서스펜스 & 옵셔널

  return (
    <>
      <AsyncBoundary
        isLoading={isLoading}
        isError={isError}
        loadingFallback={<div>Loading...</div>}
        errorFallback={<div>Error...</div>}
      >
        <ThumbnailSection images={images} />
        <ProductInfoSection product={productDetail.data} />

        <Spacing size={2.5} />

        <ProductDetailSection description={description + '\n' + detailDescription} />

        <Spacing size={2.5} />
      </AsyncBoundary>
      <RecommendationSection />
    </>
  );
}

export default ProductDetailPage;
