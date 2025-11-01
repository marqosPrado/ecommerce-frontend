import {OrderItemRequest} from '../../OrderItem/Request/OrderItemRequest';

export type PurchaseRequest = {
  orderItem: OrderItemRequest[],
  addressId: number,
  creditCardId: number[],
  voucher?: string
}
