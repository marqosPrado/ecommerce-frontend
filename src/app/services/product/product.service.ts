import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ProductSummaryResponse} from '../../types/Product/Response/ProductSummaryResponse';
import {ContentPageable} from '../../types/Pagination/ContentPageable';
import {ApiResponse} from '../../types/Api/ApiResponse';


@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private baseUrl: string = 'http://localhost:8080/'

  constructor(private http: HttpClient) {}

  getAll(): Observable<ApiResponse<ContentPageable<ProductSummaryResponse[]>>> {
    return this.http.get<ApiResponse<ContentPageable<ProductSummaryResponse[]>>>(
      `${this.baseUrl}api/products`,
      {
        params: {
          min_price: 1000.00,
          max_price: 30000.00,
          page: 0,
          size: 10
        }
      }
    );
  }

  getById(id: number) {
    return this.http.get<ApiResponse<Product>>(`${this.baseUrl}api/products/${id}`, {})
  }

  getIARecommendation(): Observable<ApiResponse<ProductSummaryResponse[]>> {
    return this.http.get<ApiResponse<ProductSummaryResponse[]>>(`${this.baseUrl}api/product-recommendation/recommend`)
  }
}
