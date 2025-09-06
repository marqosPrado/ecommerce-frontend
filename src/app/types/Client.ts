import {Address} from './Address';
import {CreditCard} from './CreditCard';

export type Client = {
  fullName: string;
  cpf: string;
  gender: string;
  birthDate: string;
  phone: string;
  email: string;
  password: string;
  addresses: Address[];
  creditCards: CreditCard[];
};
