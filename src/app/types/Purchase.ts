import {Address} from './Address';
import {CreditCard} from './CreditCard';

export type Purchase = {
  id?: string;
  date: string;
  items: PurchaseItem[];
  address: Address;
  creditCard: CreditCard;
  totalValue: number;
  status?: PurchaseStatus;
};

export type PurchaseItem = {
  product: Product;
  quantity: number;
};

export enum PurchaseStatus {
  PENDING = 'PENDENTE',
  PROCESSING = 'PROCESSANDO',
  CONFIRMED = 'CONFIRMADO',
  SHIPPED = 'ENVIADO',
  DELIVERED = 'ENTREGUE',
  CANCELLED = 'CANCELADO'
}
