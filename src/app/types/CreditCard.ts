export enum CreditCardTypes {
  MASTER_CARD = 'MASTER_CARD',
  VISA = 'VISA',
  ELO = 'ELO'
}

export type CreditCard = {
  id: number,
  cardNumber: string;
  printedCardName: string;
  validity: string;
  cardFlag: CreditCardTypes;
  securityCode: string;
  surname: string;
  isMain: boolean;
}
