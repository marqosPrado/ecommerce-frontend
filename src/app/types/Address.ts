export type Address = {
  id?: number;
  typeResidence: string;
  typePlace: string;
  street: string;
  number: number;
  neighborhood: string;
  cep: string;
  city: string;
  stateId: number;
  country: string;
  observations?: string;
};
