import { ProductFilterResponse } from '../Product/ProductFilterResponse';

export type ChatMessageResponse = {
  message: string;
  conversationId: string;
  products?: ProductFilterResponse[];
};
