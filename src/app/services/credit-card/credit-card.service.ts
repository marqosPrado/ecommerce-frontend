import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {CreditCard} from '../../types/Payment/CreditCard';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CreditCardService {
  private baseUrl: string = 'http://localhost:8080/api/credit-card'

  constructor(private http: HttpClient) {
  }

  registerCreditCard(creditCard: CreditCard): Observable<CreditCard> {
    const url = `${this.baseUrl}/client/new`;
    return this.http.post<CreditCard>(url, creditCard)
  }

  getCreditCards(): Observable<CreditCard[]> {
    const url = `${this.baseUrl}/client/get`;
    const cartoes = this.http.get<CreditCard[]>(url)
    console.log('cartões', cartoes);
    return cartoes;
  }
}
