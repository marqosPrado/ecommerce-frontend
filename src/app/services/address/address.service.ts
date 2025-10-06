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
    const url = `${this.baseUrl}/client/1/new`;
    return this.http.post<Address>(url, address)
  }

  // TODO: Implementar quando tiver o backend
  getAddresses(): Observable<Address[]> {
    const url = `${this.baseUrl}/client/1/get`;
    return this.http.get<Address[]>(url)
  }
}
