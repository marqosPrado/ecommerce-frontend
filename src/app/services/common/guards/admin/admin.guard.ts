import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import {Authentication} from '../../../authentication/authentication';

export const adminGuard: CanActivateFn = (route, state) => {
  const authService = inject(Authentication);
  const router = inject(Router);

  const token = authService.getToken();

  if (!token) {
    console.warn('Usuário não autenticado. Redirecionando para login...');
    router.navigate(['/login'], {
      queryParams: { returnUrl: state.url }
    });
    return false;
  }

  try {
    const tokenPayload = JSON.parse(atob(token.split('.')[1]));
    const isAdmin = tokenPayload.authorities === 'ROLE_ADMIN' || tokenPayload.isAdmin === true;

    if (!isAdmin) {
      console.warn('Acesso negado. Apenas administradores podem acessar esta área.');
      router.navigate(['/']);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Erro ao validar token:', error);
    authService.logout();
    router.navigate(['/login']);
    return false;
  }
};
