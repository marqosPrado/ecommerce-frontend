import {CreditCardSummaryResponse} from './CreditCardSummaryResponse';
import {VoucherSummaryResponse} from '../../Voucher/Response/VoucherSummaryResponse';

export type PaymentResponse = {
  creditCard: CreditCardSummaryResponse,
  voucher: VoucherSummaryResponse
}
