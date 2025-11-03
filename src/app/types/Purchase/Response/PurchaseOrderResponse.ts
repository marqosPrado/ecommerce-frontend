import {OrderItemResponse} from '../../OrderItem/Response/OrderItemResponse';
import {ShippingAddressResponse} from '../../Address/Response/ShippingAddressResponse';
import {PaymentResponse} from '../../Payment/Response/PaymentResponse';
import {PricingResponse} from '../../Pricing/Response/PricingResponse';

export type PurchaseOrderResponse = {
  id: number,
  order_number: number,
  order_status: OrderStatusResponse,
  created_at: string,
  updated_at: string,
  items: OrderItemResponse[],
  shipping_address: ShippingAddressResponse,
  payment: PaymentResponse,
  pricing: PricingResponse
}

export type PurchaseOrderSummaryResponse = {
  id: number,
  order_number: string,
  order_status: OrderStatusResponse,
  created_at: string,
  updated_at: string,
  client_name: string,
}

export type OrderStatusResponse = {
  code: string,
  displayName: string,
  description: string,
}
