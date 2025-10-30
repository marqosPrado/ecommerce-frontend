import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ApiResponse} from '../../types/Api/ApiResponse';

export type LoginRequest = {
  email: string,
  password: string,
}

export type LoginResponse = {
  token: string
}

@Injectable({
  providedIn: 'root'
})
export class Authentication {
  private readonly TOKEN_KEY: string = 'auth_token';
  private baseUrl: string = 'http://localhost:8080/';

  constructor(private http: HttpClient) {
  }

  login(request: LoginRequest) {
    return this.http.post<ApiResponse<LoginResponse>>(this.baseUrl + 'api/auth/login', request);
  }

  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  setToken(token: string) {
    localStorage.setItem(this.TOKEN_KEY, token);
  }
}
