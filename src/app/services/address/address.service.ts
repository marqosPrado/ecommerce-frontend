import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Address} from '../../types/Address';
import {delay, Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AddressService {
  private baseUrl: string = 'http://localhost:8080/address'

  constructor(private http: HttpClient) {
  }

  // TODO: Implementar quando tiver o backend
  registerAddress(address: Address) {
    // const url = `${this.baseUrl}/register`;
    // return this.http.post<Address>(url, address)
    const mockCreatedAddress: Address = {
      ...address,
      id: 99,
      isMain: true
    };

    return of(mockCreatedAddress).pipe(delay(500));
  }

  // TODO: Implementar quando tiver o backend
  getAddresses(): Observable<Address[]> {
    // const url = `${this.baseUrl}/`;
    return of([
      {
        id: 1,
        typeResidence: 'CASA',
        typePlace: 'RUA',
        street: 'Rua das Palmeiras',
        number: 125,
        neighborhood: 'Jardim das Flores',
        cep: '04567-890',
        city: 'São Paulo',
        stateId: 25,
        country: 'Brasil',
        observations: 'Casa branca com portão azul',
        isMain: true
      },
      {
        id: 2,
        typeResidence: 'APARTAMENTO',
        typePlace: 'AVENIDA',
        street: 'Avenida Atlântica',
        number: 2300,
        neighborhood: 'Copacabana',
        cep: '22070-001',
        city: 'Rio de Janeiro',
        stateId: 19,
        country: 'Brasil',
        observations: 'Bloco B, apto 702, condomínio Atlântico',
        isMain: false
      }
    ]);
  }
}
