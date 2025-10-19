import {ProductSummaryResponse} from '../../Product/Response/ProductSummaryResponse';

export type OrderItemResponse = {
  id: number,
  product: ProductSummaryResponse,
  quantity: number,
  unit_price: number,
  subtotal: number,
}
