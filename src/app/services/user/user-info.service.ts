import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';
import {ApiResponse} from '../../types/Api/ApiResponse';

export interface UserInfoResponse {
  id: number;
  fullName: string;
  name?: string; // Alias para fullName
  cpf: string;
  email: string;
  phoneNumber: string;
  active: boolean;
  gender: string;
  role: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserInfoService {
  private baseUrl = 'http://localhost:8080/api';
  private platformId = inject(PLATFORM_ID);
  private isBrowser: boolean;

  private currentUserSubject = new BehaviorSubject<UserInfoResponse | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  /**
   * Busca informações do usuário atual
   * Usa endpoint diferente baseado na role
   */
  getCurrentUser(): Observable<UserInfoResponse> {
    // Decide qual endpoint usar baseado na role armazenada ou tenta ambos
    return this.fetchUserInfo();
  }

  private fetchUserInfo(): Observable<UserInfoResponse> {
    // Tenta buscar como client primeiro (funciona para admin também segundo sua resposta)
    return this.http.get<ApiResponse<UserInfoResponse>>(`${this.baseUrl}/client/me`).pipe(
      map(response => {
        if (!response.success || !response.data) {
          throw new Error(response.message || 'Erro ao buscar informações do usuário');
        }

        const userData = {
          ...response.data,
          name: response.data.fullName
        };

        return userData;
      }),
      tap(user => {
        console.log('[UserInfoService] Usuário carregado:', user);
        this.currentUserSubject.next(user);
      }),
      catchError(error => {
        console.error('[UserInfoService] Erro ao buscar usuário:', error);
        this.clearUser();
        throw error;
      })
    );
  }

  getCurrentUserValue(): UserInfoResponse | null {
    return this.currentUserSubject.value;
  }

  clearUser(): void {
    this.currentUserSubject.next(null);
  }

  isAdmin(): boolean {
    const user = this.currentUserSubject.value;
    return user?.role === 'ADMIN';
  }

  isClient(): boolean {
    const user = this.currentUserSubject.value;
    return user?.role === 'CLIENT' || user?.role === 'CUSTOMER';
  }
}
