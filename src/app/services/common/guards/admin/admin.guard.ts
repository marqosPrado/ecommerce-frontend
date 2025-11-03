import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { Authentication } from '../../../authentication/authentication';
import { MessageService } from 'primeng/api';

interface TokenPayload {
  sub: string;
  authorities: string | string[];
  exp: number;
  iat: number;
  isAdmin?: boolean;
}

export const adminGuard: CanActivateFn = (route, state) => {
  const authService = inject(Authentication);
  const router = inject(Router);
  const messageService = inject(MessageService);

  const token = authService.getToken();

  if (!token) {
    console.warn('[AdminGuard] Token não encontrado. Redirecionando para login.');
    messageService.add({
      severity: 'warn',
      summary: 'Acesso Negado',
      detail: 'Você precisa estar autenticado para acessar esta área.',
      life: 4000
    });
    router.navigate(['/login'], {
      queryParams: { returnUrl: state.url }
    });
    return false;
  }

  try {
    const tokenPayload: TokenPayload = JSON.parse(atob(token.split('.')[1]));

    const now = Math.floor(Date.now() / 1000);
    if (tokenPayload.exp && tokenPayload.exp < now) {
      console.warn('[AdminGuard] Token expirado. Fazendo logout.');
      messageService.add({
        severity: 'warn',
        summary: 'Sessão Expirada',
        detail: 'Sua sessão expirou. Por favor, faça login novamente.',
        life: 4000
      });
      authService.logout();
      router.navigate(['/login'], {
        queryParams: { returnUrl: state.url }
      });
      return false;
    }

    const isAdmin = hasAdminRole(tokenPayload);

    if (!isAdmin) {
      console.warn('[AdminGuard] Acesso negado. Usuário não possui privilégios de administrador.');
      messageService.add({
        severity: 'error',
        summary: 'Acesso Negado',
        detail: 'Você não tem permissão para acessar esta área. Apenas administradores.',
        life: 5000
      });
      router.navigate(['/']);
      return false;
    }

    console.log('[AdminGuard] Acesso autorizado para:', tokenPayload.sub);
    return true;

  } catch (error) {
    console.error('[AdminGuard] Erro ao validar token:', error);
    messageService.add({
      severity: 'error',
      summary: 'Erro de Autenticação',
      detail: 'Token inválido ou corrompido. Por favor, faça login novamente.',
      life: 5000
    });
    authService.logout();
    router.navigate(['/login']);
    return false;
  }
};

function hasAdminRole(tokenPayload: TokenPayload): boolean {
  if (typeof tokenPayload.authorities === 'string') {
    return tokenPayload.authorities === 'ROLE_ADMIN';
  }

  if (Array.isArray(tokenPayload.authorities)) {
    return tokenPayload.authorities.includes('ROLE_ADMIN');
  }

  if (tokenPayload.isAdmin === true) {
    return true;
  }

  return false;
}
