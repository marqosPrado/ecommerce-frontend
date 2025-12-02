import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Client } from '../types/Client';
import { Address } from '../types/Address';
import { CreditCard } from '../types/Payment/CreditCard';
import { ApiResponse } from '../types/Api/ApiResponse';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  private baseUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  registerClient(clientData: Client) {
    return this.http.post<Client>(`${this.baseUrl}/client/register`, clientData);
  }

  getCurrentClient(): Observable<Client> {
    return this.http.get<ApiResponse<any>>(`${this.baseUrl}/api/client/me`).pipe(
      switchMap(response => {
        if (!response.success || !response.data) {
          throw new Error(response.message || 'Erro ao buscar cliente');
        }
        return this.getClientById(response.data.id);
      })
    );
  }

  getClientById(clientId: number): Observable<Client> {
    return this.http.get<any>(`${this.baseUrl}/client/${clientId}/all`).pipe(
      map(response => {
        // ClientResponseCompleteDto vem diretamente, sem wrapper
        return {
          id: clientId,
          fullName: response.fullName,
          phoneNumber: response.phoneNumber,
          gender: response.gender,
          email: response.email,
          cpf: response.cpf,
          birthDate: response.birthDate,
          addresses: response.addresses || [],
          creditCards: response.creditCards || []
        } as Client;
      })
    );
  }

  updateClientBasicData(clientId: number, clientData: Partial<Client>) {
    return this.http.put<any>(`${this.baseUrl}/client/${clientId}/basic-update`, clientData);
  }

  registerNewAddress(clientId: number, address: Address) {
    return this.http.post(`${this.baseUrl}/client/${clientId}/address/new`, address);
  }

  updateAddress(clientId: number, addressId: number, address: Address) {
    return this.http.put(`${this.baseUrl}/client/${clientId}/address/${addressId}/update`, address);
  }

  registerNewCreditCard(clientId: number, card: CreditCard) {
    return this.http.post(`${this.baseUrl}/client/${clientId}/credit-card/new`, card);
  }

  removeCreditCard(clientId: number, card: CreditCard) {
    return this.http.delete<void>(`${this.baseUrl}/client/${clientId}/credit-card/${card.id}/remove`);
  }
}
