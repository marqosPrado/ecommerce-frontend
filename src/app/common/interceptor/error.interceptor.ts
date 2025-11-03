import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import {Authentication} from '../../services/authentication/authentication';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(
    private router: Router,
    private messageService: MessageService,
    private authService: Authentication
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        return this.handleError(error);
      })
    );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'Ocorreu um erro inesperado';
    let errorSummary = 'Erro';

    // Erro de rede ou servidor não acessível
    if (error.error instanceof ErrorEvent) {
      console.error('[ErrorInterceptor] Erro de rede:', error.error.message);
      errorSummary = 'Erro de Conexão';
      errorMessage = 'Não foi possível conectar ao servidor. Verifique sua conexão.';
      this.showError(errorSummary, errorMessage);
      return throwError(() => error);
    }

    // Erros HTTP do servidor
    switch (error.status) {
      case 400:
        errorSummary = 'Requisição Inválida';
        errorMessage = this.extractErrorMessage(error) || 'Os dados enviados são inválidos.';
        this.showError(errorSummary, errorMessage, 'warn');
        break;

      case 401:
        errorSummary = 'Não Autorizado';
        errorMessage = 'Sua sessão expirou. Por favor, faça login novamente.';
        this.showError(errorSummary, errorMessage, 'warn');
        this.handleUnauthorized();
        break;

      case 403:
        errorSummary = 'Acesso Negado';
        errorMessage = 'Você não tem permissão para acessar este recurso.';
        this.showError(errorSummary, errorMessage, 'error');
        this.router.navigate(['/']);
        break;

      case 404:
        errorSummary = 'Não Encontrado';
        errorMessage = this.extractErrorMessage(error) || 'O recurso solicitado não foi encontrado.';
        this.showError(errorSummary, errorMessage, 'warn');
        break;

      case 409:
        errorSummary = 'Conflito';
        errorMessage = this.extractErrorMessage(error) || 'Já existe um registro com estes dados.';
        this.showError(errorSummary, errorMessage, 'warn');
        break;

      case 422:
        errorSummary = 'Validação Falhou';
        errorMessage = this.extractErrorMessage(error) || 'Os dados fornecidos não são válidos.';
        this.showError(errorSummary, errorMessage, 'warn');
        break;

      case 500:
        errorSummary = 'Erro do Servidor';
        errorMessage = 'Erro interno do servidor. Tente novamente mais tarde.';
        this.showError(errorSummary, errorMessage);
        break;

      case 503:
        errorSummary = 'Serviço Indisponível';
        errorMessage = 'O servidor está temporariamente indisponível. Tente novamente em alguns instantes.';
        this.showError(errorSummary, errorMessage);
        break;

      default:
        if (error.status === 0) {
          errorSummary = 'Erro de Conexão';
          errorMessage = 'Não foi possível conectar ao servidor. Verifique sua conexão.';
        } else {
          errorMessage = this.extractErrorMessage(error) || `Erro ${error.status}: ${error.statusText}`;
        }
        this.showError(errorSummary, errorMessage);
    }

    console.error('[ErrorInterceptor] Erro HTTP:', {
      status: error.status,
      message: errorMessage,
      url: error.url,
      error: error.error
    });

    return throwError(() => error);
  }

  /**
   * Extrai mensagem de erro do backend
   */
  /**
   * Extrai mensagem de erro do backend
   */
  private extractErrorMessage(error: HttpErrorResponse): string | null {
    if (error.error) {
      // Tenta diferentes estruturas de resposta de erro

      // Estrutura ApiResponse do backend
      if (error.error.message) {
        return error.error.message;
      }

      // String direta
      if (typeof error.error === 'string') {
        try {
          // Tenta parsear se for JSON string
          const parsed = JSON.parse(error.error);
          if (parsed.message) return parsed.message;
        } catch {
          return error.error;
        }
      }

      // Outras estruturas comuns
      if (error.error.error) {
        return error.error.error;
      }
      if (error.error.detail) {
        return error.error.detail;
      }
      if (error.error.errorMessage) {
        return error.error.errorMessage;
      }
    }
    return null;
  }

  /**
   * Exibe mensagem de erro ao usuário
   */
  private showError(
    summary: string,
    detail: string,
    severity: 'success' | 'info' | 'warn' | 'error' = 'error'
  ): void {
    this.messageService.add({
      severity,
      summary,
      detail,
      life: 5000
    });
  }

  /**
   * Trata erro 401 (não autorizado)
   */
  private handleUnauthorized(): void {
    // Limpa token e redireciona para login
    this.authService.logout();
    this.router.navigate(['/login'], {
      queryParams: { returnUrl: this.router.url }
    });
  }
}
