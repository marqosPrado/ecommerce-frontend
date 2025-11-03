import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { UserInfoService } from '../user/user-info.service';

interface LoginRequest {
  email: string;
  password: string;
}

interface UserData {
  id: number;
  fullName: string;
  cpf: string;
  email: string;
  phoneNumber: string;
  active: boolean;
  gender: string;
  role: string;
}

interface LoginData {
  token: string;
  refreshToken: string;
  type: string;
  user: UserData;
}

interface LoginResponse {
  success: boolean;
  message: string;
  data: LoginData;
  timestamp: string;
}

interface TokenPayload {
  sub: string;
  authorities: string | string[];
  exp: number;
  iat: number;
  userId?: number;
}

@Injectable({
  providedIn: 'root'
})
export class Authentication {
  private baseUrl = 'http://localhost:8080/api/auth';
  private tokenKey = 'auth_token';
  private refreshTokenKey = 'refresh_token';
  private platformId = inject(PLATFORM_ID);
  private isBrowser: boolean;

  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  constructor(
    private http: HttpClient,
    private router: Router,
    private userInfoService: UserInfoService
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);

    if (this.isBrowser) {
      this.isAuthenticatedSubject.next(this.hasToken());
      this.checkTokenValidity();
    }
  }

  login(email: string, password: string): Observable<LoginData> {
    const loginData: LoginRequest = { email, password };

    return this.http.post<LoginResponse>(`${this.baseUrl}/login`, loginData).pipe(
      map(response => {
        if (!response.success || !response.data) {
          throw new Error(response.message || 'Erro ao fazer login');
        }
        return response.data;
      }),
      tap(data => {
        console.log('[Auth] Resposta do login:', data);

        if (data.token) {
          this.setToken(data.token);

          // Salva o refresh token também
          if (data.refreshToken) {
            this.setRefreshToken(data.refreshToken);
          }

          this.isAuthenticatedSubject.next(true);

          // Carrega informações do usuário
          this.userInfoService.getCurrentUser().subscribe();

          console.log('[Auth] Login realizado com sucesso');
          console.log('[Auth] Usuário:', data.user);
        }
      })
    );
  }

  logout(): void {
    this.removeToken();
    this.removeRefreshToken();
    this.userInfoService.clearUser();
    this.isAuthenticatedSubject.next(false);
    console.log('[Auth] Logout realizado');
  }

  getToken(): string | null {
    if (!this.isBrowser) return null;
    return localStorage.getItem(this.tokenKey);
  }

  getRefreshToken(): string | null {
    if (!this.isBrowser) return null;
    return localStorage.getItem(this.refreshTokenKey);
  }

  private setToken(token: string): void {
    if (!this.isBrowser) return;
    localStorage.setItem(this.tokenKey, token);
  }

  private setRefreshToken(refreshToken: string): void {
    if (!this.isBrowser) return;
    localStorage.setItem(this.refreshTokenKey, refreshToken);
  }

  private removeToken(): void {
    if (!this.isBrowser) return;
    localStorage.removeItem(this.tokenKey);
  }

  private removeRefreshToken(): void {
    if (!this.isBrowser) return;
    localStorage.removeItem(this.refreshTokenKey);
  }

  private hasToken(): boolean {
    return !!this.getToken();
  }

  isTokenValid(): boolean {
    if (!this.isBrowser) return false;

    const token = this.getToken();
    if (!token) return false;

    try {
      const payload: TokenPayload = JSON.parse(atob(token.split('.')[1]));
      const now = Math.floor(Date.now() / 1000);
      return payload.exp > now;
    } catch (error) {
      console.error('[Auth] Erro ao validar token:', error);
      return false;
    }
  }

  private checkTokenValidity(): void {
    if (this.hasToken() && !this.isTokenValid()) {
      console.warn('[Auth] Token expirado detectado. Fazendo logout...');
      this.logout();
    }
  }

  getTokenPayload(): TokenPayload | null {
    if (!this.isBrowser) return null;

    const token = this.getToken();
    if (!token) return null;

    try {
      return JSON.parse(atob(token.split('.')[1]));
    } catch (error) {
      console.error('[Auth] Erro ao decodificar token:', error);
      return null;
    }
  }

  isAuthenticated(): boolean {
    if (!this.isBrowser) return false;
    return this.hasToken() && this.isTokenValid();
  }

  getUserId(): number | null {
    const payload = this.getTokenPayload();
    return payload?.userId || null;
  }

  getUsername(): string | null {
    const payload = this.getTokenPayload();
    return payload?.sub || null;
  }

  isAdmin(): boolean {
    const payload = this.getTokenPayload();
    if (!payload) return false;

    if (typeof payload.authorities === 'string') {
      return payload.authorities === 'ROLE_ADMIN';
    }

    if (Array.isArray(payload.authorities)) {
      return payload.authorities.includes('ROLE_ADMIN');
    }

    return false;
  }
}
