import {CreditCardSummaryResponse} from './CreditCardSummaryResponse';
import {VoucherSummaryResponse} from '../../Voucher/Response/VoucherSummaryResponse';
import {ExchangeVoucherSummary} from '../../ExchangeVoucher/exchange-voucher-summary.type';

export type PaymentResponse = {
  credit_card: CreditCardSummaryResponse[],
  exchange_vouchers: ExchangeVoucherSummary[],
  voucher: VoucherSummaryResponse
}
