import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Client } from '../types/Client';
import { Address } from '../types/Address';
import { CreditCard } from '../types/Payment/CreditCard';
import { ApiResponse } from '../types/Api/ApiResponse';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  private apiUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {}

  registerClient(clientData: Client) {
    return this.http.post<Client>(`${this.apiUrl}/auth/register`, clientData);
  }

  getCurrentClient(): Observable<Client> {
    return this.http.get<ApiResponse<Client>>(`${this.apiUrl}/client/me`).pipe(
      map(response => {
        if (!response.success || !response.data) {
          throw new Error(response.message || 'Erro ao buscar cliente');
        }
        return response.data;
      })
    );
  }

  getClientById(clientId: number): Observable<Client> {
    return this.http.get<ApiResponse<Client>>(`${this.apiUrl}/client/${clientId}`).pipe(
      map(response => {
        if (!response.success || !response.data) {
          throw new Error(response.message || 'Erro ao buscar cliente');
        }
        return response.data;
      })
    );
  }

  updateClientBasicData(clientId: number, clientData: Partial<Client>) {
    return this.http.put<Client>(`http://localhost:8080/client/${clientId}/basic-update`, clientData);
  }

  registerNewAddress(clientId: number, address: Address) {
    return this.http.post(`http://localhost:8080/client/${clientId}/address/new`, address);
  }

  registerNewCreditCard(clientId: number, card: CreditCard) {
    return this.http.post(`http://localhost:8080/client/${clientId}/credit-card/new`, card);
  }

  removeCreditCard(clientId: number, card: CreditCard) {
    return this.http.delete<void>(`${this.apiUrl}/client/${clientId}/credit-card/${card.id}/remove`);
  }

  updateAddress(clientId: number, addressId: number, address: Address) {
    return this.http.put(`${this.apiUrl}/client/${clientId}/address/${addressId}/update`, address);
  }
}
