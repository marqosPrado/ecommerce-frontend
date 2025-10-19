import {Injectable} from '@angular/core';
import {PurchaseRequest} from '../../types/Purchase/Request/PurchaseRequest';
import {HttpClient} from '@angular/common/http';
import {ApiResponse} from '../../types/Api/ApiResponse';
import {PurchaseOrderResponse} from '../../types/Purchase/Response/PurchaseOrderResponse';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PurchaseOrderService {
  private baseUrl: string = 'http://localhost:8080/api/orders';

  constructor(private http: HttpClient) {
  }

  registerNewPurchaseOrder(purchaseOrder: PurchaseRequest): Observable<ApiResponse<PurchaseOrderResponse>> {
    return this.http.post<ApiResponse<PurchaseOrderResponse>>(this.baseUrl, purchaseOrder);
  }
}
