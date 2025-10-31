import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ApiResponse } from '../../types/Api/ApiResponse';

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
  private platformId = inject(PLATFORM_ID);
  private isBrowser: boolean;
  private readonly TOKEN_KEY: string = 'auth_token';
  private baseUrl: string = 'http://localhost:8080/';

  constructor(private http: HttpClient) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  login(request: LoginRequest) {
    return this.http.post<ApiResponse<LoginResponse>>(this.baseUrl + 'api/auth/login', request);
  }

  logout(): void {
    if (this.isBrowser) {
      try {
        localStorage.removeItem(this.TOKEN_KEY);
      } catch (error) {
        console.error('Error removing token from localStorage:', error);
      }
    }
  }

  getToken(): string | null {
    if (this.isBrowser) {
      try {
        return localStorage.getItem(this.TOKEN_KEY);
      } catch (error) {
        console.error('Error getting token from localStorage:', error);
        return null;
      }
    }
    return null;
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  setToken(token: string): void {
    if (this.isBrowser) {
      try {
        localStorage.setItem(this.TOKEN_KEY, token);
      } catch (error) {
        console.error('Error setting token in localStorage:', error);
      }
    }
  }
}
