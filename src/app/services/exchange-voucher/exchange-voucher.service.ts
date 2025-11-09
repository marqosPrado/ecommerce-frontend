import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { ExchangeVoucherSummary } from "../../types/ExchangeVoucher/exchange-voucher-summary.type";
import { ContentPageable } from "../../types/Pagination/ContentPageable";
import { ApiResponse } from "../../types/Api/ApiResponse";

@Injectable({
    providedIn: 'root'
  })
export class ExchangeVoucherService {
    private baseUrl = "http://localhost:8080/api/exchange-voucher";
    
    constructor(private http: HttpClient) {}

    getExchangeVouchers(page: number = 0, size: number = 5): Observable<ApiResponse<ContentPageable<ExchangeVoucherSummary[]>>> {
        const params = new HttpParams()
            .set('page', page.toString())
            .set('size', size.toString());

        return this.http.get<ApiResponse<ContentPageable<ExchangeVoucherSummary[]>>>(this.baseUrl, { params });
    }
}