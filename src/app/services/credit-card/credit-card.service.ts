import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {CreditCard, CreditCardTypes} from '../../types/CreditCard';
import {delay, Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CreditCardService {
  private baseUrl: string = 'http://localhost:8080/creditcard'

  constructor(private http: HttpClient) {
  }

  registerCreditCard(creditCard: CreditCard) {
    const mockCreditCard: CreditCard = {
      ...creditCard,
      id: Math.floor(Math.random() * 10000) + 100
    }
    return of(mockCreditCard).pipe(delay(600));
  }

  getCreditCards(): Observable<CreditCard[]> {
    return of([
      {
        id: 3,
        number: '1234567890123456',
        printedName: 'MARCOS V. F. PRADO',
        cardFlag: CreditCardTypes.MASTER_CARD,
        securityCode: '985',
        isMain: true,
      },
      {
        id: 4,
        number: '9876543210987654',
        printedName: 'LILIAN F. L. PRADO',
        cardFlag: CreditCardTypes.VISA,
        securityCode: '998',
        isMain: false,
      }
    ]);
  }
}
