import {CreditCardSummaryResponse} from './CreditCardSummaryResponse';
import {VoucherSummaryResponse} from '../../Voucher/Response/VoucherSummaryResponse';

export type PaymentResponse = {
  credit_card: CreditCardSummaryResponse,
  voucher: VoucherSummaryResponse
}
