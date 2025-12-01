export enum CreditCardTypes {
  MASTERCARD = 'MASTERCARD',
  VISA = 'VISA',
  ELO = 'ELO'
}

export type CreditCard = {
  id?: number,
  number: string;
  printedName: string;
  cpf?: string;
  birthDate?: string;
  surname?: string;
  cardFlag: CreditCardTypes;
  securityCode: string;
  isMain?: boolean;
}
