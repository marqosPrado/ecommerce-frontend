import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Client} from '../types/Client';
import {Address} from '../types/Address';
import {CreditCard} from '../types/Payment/CreditCard';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  private apiUrl = 'http://localhost:8080/api/auth'

  constructor(private http: HttpClient) {}

  registerClient(clientData: Client) {
    return this.http.post<Client>(`${this.apiUrl}/register`, clientData)
  }

  getClientById(clientId: number) {
    return this.http.get<Client>(`${this.apiUrl}/${clientId}/all`)
  }

  updateClientBasicData(clientId: number, clientData: Partial<Client>) {
    return this.http.put<Client>(`${this.apiUrl}/${clientId}/basic-update`, clientData);
  }

  registerNewAddress(clientId: number, address: Address) {
    return this.http.post(`${this.apiUrl}/${clientId}/address/new`, address);
  }

  registerNewCreditCard(clientId: number, card: CreditCard) {
    return this.http.post(`${this.apiUrl}/${clientId}/credit-card/new`, card);
  }

  removeCreditCard(clientId: number, card: CreditCard) {
    return this.http.delete<void>(`${this.apiUrl}/${clientId}/credit-card/${card.id}/remove`);
  }

  updateAddress(clientId: number, addressId: number, address: Address) {
    return this.http.put(`${this.apiUrl}/${clientId}/address/${addressId}/update`, address);
  }

}
