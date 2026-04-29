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

  // ✅ Attach token if needed
  let modifiedRequest = request;

  if (
    isApiRequest &&
    !isAuthRequest &&
    accessToken &&
    !request.headers.has('Authorization')
  ) {
    modifiedRequest = addAuthHeader(request, accessToken);
  }

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
            setHeaders: { 'x-retry': 'true' },
          });

          return next(addAuthHeader(retryRequest, user.accessToken));
        }),
        catchError((refreshError: unknown) => {
          authService.clearLocalSession();
          return throwError(() => refreshError);
        }),
      );
    }),
  );
};

function addAuthHeader(
  request: HttpRequest<unknown>,
  accessToken: string,
) {
  return request.clone({
    setHeaders: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
}