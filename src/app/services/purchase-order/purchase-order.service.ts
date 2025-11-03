import { Injectable } from '@angular/core';
import { PurchaseRequest } from '../../types/Purchase/Request/PurchaseRequest';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ApiResponse } from '../../types/Api/ApiResponse';
import { PurchaseOrderResponse } from '../../types/Purchase/Response/PurchaseOrderResponse';
import { Observable } from 'rxjs';
import { ContentPageable } from '../../types/Pagination/ContentPageable';

@Injectable({
  providedIn: 'root'
})
export class PurchaseOrderService {
  private baseUrl: string = 'http://localhost:8080/api/orders';

  constructor(private http: HttpClient) {}

  registerNewPurchaseOrder(purchaseOrder: PurchaseRequest): Observable<ApiResponse<PurchaseOrderResponse>> {
    return this.http.post<ApiResponse<PurchaseOrderResponse>>(this.baseUrl, purchaseOrder);
  }

  getAllPurchaseOrders(page: number = 0, size: number = 10): Observable<ApiResponse<ContentPageable<PurchaseOrderResponse[]>>> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    return this.http.get<ApiResponse<ContentPageable<PurchaseOrderResponse[]>>>(this.baseUrl, { params });
  }

  getAllSummaryPurchaseOrder(page: number = 0, size: number = 10): Observable<ApiResponse<ContentPageable<PurchaseOrderResponse[]>>> {
    const url = `${this.baseUrl}/all`;
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    return this.http.get<ApiResponse<ContentPageable<PurchaseOrderResponse[]>>>(url, { params });
  }

  approveOrder(orderId: number): Observable<ApiResponse<PurchaseOrderResponse>> {
    return this.http.patch<ApiResponse<PurchaseOrderResponse>>(`${this.baseUrl}/${orderId}/approve`, {});
  }

  markInTransit(orderId: number): Observable<ApiResponse<PurchaseOrderResponse>> {
    return this.http.patch<ApiResponse<PurchaseOrderResponse>>(`${this.baseUrl}/${orderId}/in-transit`, {});
  }

  markDelivered(orderId: number): Observable<ApiResponse<PurchaseOrderResponse>> {
    return this.http.patch<ApiResponse<PurchaseOrderResponse>>(`${this.baseUrl}/${orderId}/delivered`, {});
  }
}
