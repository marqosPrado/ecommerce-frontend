import {Observable} from 'rxjs';
import {ApiResponse} from '../../types/Api/ApiResponse';
import {ContentPageable} from '../../types/Pagination/ContentPageable';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';

export interface ExchangeRequestItem {
  orderItemId: number;
  productName: string;
  quantity: number;
  unitPrice: number;
  subTotal: number;
}

export interface ExchangeRequestResponse {
  id: number;
  exchangeNumber: string;
  purchaseOrderNumber: string;
  clientId: number;
  clientName: string;
  exchangeType: 'EXCHANGE' | 'RETURN';
  exchangeStatus: string;
  items: ExchangeRequestItem[];
  reason?: string;
  exchangeValue: number;
  voucherGenerated?: string;
  requestedAt?: string;
  processedAt?: string;
  itemsReceivedAt?: string;
  completedAt?: string;
  adminNotes?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ExchangeRequestService {
  private baseUrl = 'http://localhost:8080/api/exchange';

  constructor(private http: HttpClient) {
  }

  getAll(page: number = 0, size: number = 10, status?: string): Observable<ApiResponse<ContentPageable<ExchangeRequestResponse[]>>> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    if (status) {
      params = params.set('status', status);
    }

    return this.http.get<ApiResponse<ContentPageable<ExchangeRequestResponse[]>>>(`${this.baseUrl}/all`, {params});
  }

  getById(exchangeId: number): Observable<ApiResponse<ExchangeRequestResponse>> {
    return this.http.get<ApiResponse<ExchangeRequestResponse>>(`${this.baseUrl}/${exchangeId}`);
  }

  approve(exchangeId: number): Observable<ApiResponse<ExchangeRequestResponse>> {
    return this.http.patch<ApiResponse<ExchangeRequestResponse>>(
      `${this.baseUrl}/${exchangeId}/approve`,
      {}
    );
  }

  reject(exchangeId: number): Observable<ApiResponse<ExchangeRequestResponse>> {
    return this.http.patch<ApiResponse<ExchangeRequestResponse>>(
      `${this.baseUrl}/${exchangeId}/reject`,
      {}
    );
  }

  markInTransit(exchangeId: number): Observable<ApiResponse<ExchangeRequestResponse>> {
    return this.http.patch<ApiResponse<ExchangeRequestResponse>>(
      `${this.baseUrl}/${exchangeId}/in-transit`,
      {}
    );
  }

  confirmItemsReceived(exchangeId: number): Observable<ApiResponse<ExchangeRequestResponse>> {
    return this.http.patch<ApiResponse<ExchangeRequestResponse>>(
      `${this.baseUrl}/${exchangeId}/items-receive`,
      {}
    );
  }

  complete(exchangeId: number): Observable<ApiResponse<ExchangeRequestResponse>> {
    return this.http.patch<ApiResponse<ExchangeRequestResponse>>(
      `${this.baseUrl}/${exchangeId}/complete`,
      {}
    );
  }

  createExchangeRequest(payload: {
    purchaseOrder: number;
    orderItensId: number[];
    exchangeType: 'EXCHANGE' | 'RETURN';
  }): Observable<ApiResponse<ExchangeRequestResponse>> {
    return this.http.post<ApiResponse<ExchangeRequestResponse>>(
      this.baseUrl,
      payload
    );
  }
}
