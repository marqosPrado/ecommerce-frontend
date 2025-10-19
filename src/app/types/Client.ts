import {Address} from './Address';
import {CreditCard} from './Payment/CreditCard';

export type Client = {
  id?: number;
  fullName: string;
  cpf: string;
  gender: string;
  birthDate: string;
  phoneNumber: string;
  email: string;
  active?: boolean;
  credit?: number;
  addresses: Address[];
  creditCards: CreditCard[];
};

export enum Gender {
  MALE = 'MASCULINO',
  FEMALE = 'FEMININO',
}
