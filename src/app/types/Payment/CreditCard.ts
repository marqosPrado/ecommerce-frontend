export enum CreditCardTypes {
  MASTERCARD = 'MASTERCARD',
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
