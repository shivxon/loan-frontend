import {
  HttpErrorResponse,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, switchMap, throwError } from 'rxjs';
import { API_BASE_URL } from '../api/api.config';
import { AuthService } from './auth.service';

export const authInterceptor: HttpInterceptorFn = (request, next) => {
  const apiBaseUrl = inject(API_BASE_URL);
  const authService = inject(AuthService);

  const isApiRequest = request.url.startsWith(apiBaseUrl);
  const isAuthRequest = request.url.includes('/auth/');
  const accessToken = authService.accessToken();
  const alreadyRetried = request.headers.has('x-retry');

  // ✅ Attach token and ngrok skip header if needed
  let headers: Record<string, string> = {
    'ngrok-skip-browser-warning': 'true'
  };

  if (
    isApiRequest &&
    !isAuthRequest &&
    accessToken &&
    !request.headers.has('Authorization')
  ) {
    headers['Authorization'] = `Bearer ${accessToken}`;
  }

  const modifiedRequest = request.clone({ setHeaders: headers });

  return next(modifiedRequest).pipe(
    catchError((error: unknown) => {
      if (
        !(error instanceof HttpErrorResponse) ||
        error.status !== 401 ||
        !isApiRequest ||
        isAuthRequest ||
        alreadyRetried
      ) {
        return throwError(() => error);
      }
      return authService.refreshSession().pipe(
        switchMap((user) => {
          const retryRequest = request.clone({
            setHeaders: { 
              'x-retry': 'true',
              'ngrok-skip-browser-warning': 'true',
              'Authorization': `Bearer ${user.accessToken}`
            },
          });

          return next(retryRequest);
        }),
        catchError((refreshError: unknown) => {
          authService.clearLocalSession();
          return throwError(() => refreshError);
        }),
      );
    }),
  );
};
