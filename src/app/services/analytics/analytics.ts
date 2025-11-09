import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ApiResponse} from '../../types/Api/ApiResponse';
import {DashboardResponse} from '../../types/Analytics/dashboard.type';
import {Observable} from 'rxjs';

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
}
