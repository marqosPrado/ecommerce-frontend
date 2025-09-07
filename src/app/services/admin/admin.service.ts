import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Gender} from '../../types/Client';
import {Page} from '../../types/Page';
import {Observable} from 'rxjs';


export type ClientFilter = {
  id?: string;
  fullName: string;
  cpf: string;
  email: string;
  phoneNumber: string;
  gender: Gender;
  active: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private baseUrl: string = 'http://localhost:8080/admin/client';

  constructor(
    private http: HttpClient,
  ) {
  }

  getClients(filter: Partial<ClientFilter>, page: number, size: number): Observable<Page<ClientFilter>> {
    const url = `${this.baseUrl}/search`;
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    Object.keys(filter).forEach((key) => {
      const k = key as keyof ClientFilter;
      const value = filter[k];

      if (value !== null && value !== '' && value !== undefined) {
        params = params.set(k, value.toString());
      }
    });

    return this.http.get<Page<ClientFilter>>(url, { params });
  }
}
