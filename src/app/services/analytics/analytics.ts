import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {ApiResponse} from '../../types/Api/ApiResponse';
import {DashboardResponse} from '../../types/Analytics/dashboard.type';
import {Observable} from 'rxjs';
import {SalesChartResponse} from '../../types/Analytics/sales-chart-response.type';

@Injectable({
  providedIn: 'root'
})
export class Analytics {
  private baseUrl: string = 'http://localhost:8080/api/analytics'

  constructor(private http: HttpClient) {
  }

  getBasicDataInformation(): Observable<ApiResponse<DashboardResponse>> {
    return this.http.get<ApiResponse<DashboardResponse>>(this.baseUrl)
  }

  getSalesVolume(
    startDate: string,
    endDate: string,
    filterType: string
  ): Observable<ApiResponse<SalesChartResponse>> {
    const params = new HttpParams()
      .set('startDate', startDate)
      .set('endDate', endDate)
      .set('filterType', filterType);

    return this.http.get<ApiResponse<SalesChartResponse>>(
      `${this.baseUrl}/sales-volume`,
      { params }
    );
  }
}
