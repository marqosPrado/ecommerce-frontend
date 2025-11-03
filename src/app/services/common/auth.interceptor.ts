import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import {Authentication} from '../authentication/authentication';


export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(Authentication);
  const router = inject(Router);
  const token = authService.getToken();

  const publicUrls = [
    '/api/auth/login',
    '/api/auth/register',
    '/api/products'
  ];

  console.log(req.url)
  const isPublicUrl = publicUrls.some(url => req.url.includes(url));

  if (isPublicUrl || !token) {
    return next(req);
  }

  const clonedRequest = req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`
    }
  });

  console.log(`Cloned Request ${clonedRequest.headers}`)

  return next(clonedRequest).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401 || error.status === 403) {
        console.warn('Token inválido ou expirado. Redirecionando para login...');
        authService.logout();
        router.navigate(['/login']);
      }

      return throwError(() => error);
    })
  );
};
