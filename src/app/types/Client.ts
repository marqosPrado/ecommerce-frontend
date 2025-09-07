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
  active?: boolean;
  credit?: number;
  addresses: Address[];
  creditCards: CreditCard[];
};

export enum Gender {
  MALE = 'MASCULINO',
  FEMALE = 'FEMININO',
}
