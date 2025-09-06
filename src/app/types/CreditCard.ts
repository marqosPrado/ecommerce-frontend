export enum CreditCardTypes {
  MASTER_CARD = 'MASTERCARD',
  VISA = 'VISA',
  ELO = 'ELO'
}

export type CreditCard = {
  id?: number,
  number: string;
  printedName: string;
  cardFlag: CreditCardTypes;
  securityCode: string;
  isMain?: boolean;
}
