import { HttpClient, HttpHeaders } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';
import { Injectable, PLATFORM_ID, computed, inject, signal } from '@angular/core';
import { Observable, catchError, finalize, map, of, shareReplay, tap, throwError } from 'rxjs';
import { API_BASE_URL } from '../api/api.config';

export interface AuthUser {
  id?: string;
  phoneNumber: string;
  fullName?: string;
  mode: 'login' | 'signup';
  loggedInAt: string;
  accessToken: string;
  refreshToken: string;
  sessionId: string;
  sessionExpiresAt: string;
}

export interface PhoneAuthRequest {
  phoneNumber: string;
  fullName?: string;
  mode: 'login' | 'signup';
}

export interface PhoneOtpResponse {
  message: string;
  expiresAt?: string;
  devOtp?: string;
}

export interface VerifyPhoneOtpRequest extends PhoneAuthRequest {
  otp: string;
}

interface AuthSessionResponse {
  user: {
    _id?: string;
    phoneNumber: string;
    fullName?: string;
    mode: 'login' | 'signup';
    loggedInAt: string;
  };
  accessToken: string;
  refreshToken: string;
  sessionId: string;
  sessionExpiresAt: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly apiBaseUrl = inject(API_BASE_URL);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly storageKey = 'shivam-loans-auth-user';
  private readonly refreshLeadTimeMs = 5 * 60 * 1000;
  private readonly user = signal<AuthUser | null>(this.readStoredUser());
  private refreshTimeoutId: ReturnType<typeof setTimeout> | null = null;
  private refreshInFlight$: Observable<AuthUser> | null = null;

  readonly currentUser = this.user.asReadonly();
  readonly isAuthenticated = computed(() => this.user() !== null);

  constructor() {
    this.scheduleSessionRefresh();
  }

  requestPhoneOtp(request: PhoneAuthRequest): Observable<PhoneOtpResponse> {
    return this.http
      .post<PhoneOtpResponse>(`${this.apiBaseUrl}/auth/phone/send-otp`, request);
  }

  verifyPhoneOtp(request: VerifyPhoneOtpRequest): Observable<AuthUser> {
    return this.http
      .post<AuthSessionResponse>(`${this.apiBaseUrl}/auth/phone/verify-otp`, request)
      .pipe(
        map((response) => this.mapAuthResponse(response)),
        tap((user) => this.setUser(user)),
      );
  }

  authenticatePhone(request: VerifyPhoneOtpRequest): Observable<AuthUser> {
    return this.verifyPhoneOtp(request);
  }

  refreshSession(): Observable<AuthUser> {
    if (this.refreshInFlight$) {
      return this.refreshInFlight$;
    }

    const refreshToken = this.user()?.refreshToken;

    if (!refreshToken) {
      return throwError(() => new Error('Refresh token is missing.'));
    }

    this.refreshInFlight$ = this.http
      .post<AuthSessionResponse>(`${this.apiBaseUrl}/auth/session/refresh`, {
        refreshToken,
      })
      .pipe(
        map((response) => this.mapAuthResponse(response)),
        tap((user) => this.setUser(user)),
        finalize(() => {
          this.refreshInFlight$ = null;
        }),
        shareReplay({ bufferSize: 1, refCount: false }),
      );

    return this.refreshInFlight$;
  }

  ensureActiveSession(): Observable<boolean> {
    const user = this.user();

    if (!user) {
      return of(false);
    }

    if (this.sessionIsExpired(user.sessionExpiresAt)) {
      this.clearStoredUser();
      return of(false);
    }

    if (!this.sessionNeedsRefresh(user.sessionExpiresAt)) {
      return of(true);
    }

    return this.refreshSession().pipe(
      map(() => true),
      catchError(() => {
        this.clearStoredUser();
        return of(false);
      }),
    );
  }

  authHeaders(): HttpHeaders {
    if (!this.isLoggedIn()) {
      return new HttpHeaders();
    }

    const accessToken = this.user()?.accessToken;
    return accessToken
      ? new HttpHeaders({ Authorization: `Bearer ${accessToken}` })
      : new HttpHeaders();
  }

  accessToken(): string | null {
    return this.isLoggedIn() ? (this.user()?.accessToken ?? null) : null;
  }

  logout(): void {
    const refreshToken = this.user()?.refreshToken;
    this.clearStoredUser();

    if (refreshToken) {
      this.http
        .post(`${this.apiBaseUrl}/auth/session/logout`, { refreshToken })
        .subscribe({ error: () => undefined });
    }
  }

  isLoggedIn(): boolean {
    const user = this.user();

    if (!user) {
      return false;
    }

    if (this.sessionIsExpired(user.sessionExpiresAt)) {
      this.clearStoredUser();
      return false;
    }

    return true;
  }

  clearLocalSession(): void {
    this.clearStoredUser();
  }

  private setUser(user: AuthUser): void {
    this.user.set(user);
    this.writeStoredUser(user);
    this.scheduleSessionRefresh();
  }

  private mapAuthResponse(response: AuthSessionResponse): AuthUser {
    return {
      id: response.user._id,
      phoneNumber: response.user.phoneNumber,
      fullName: response.user.fullName,
      mode: response.user.mode,
      loggedInAt: response.user.loggedInAt,
      accessToken: response.accessToken,
      refreshToken: response.refreshToken,
      sessionId: response.sessionId,
      sessionExpiresAt: response.sessionExpiresAt,
    };
  }

  private readStoredUser(): AuthUser | null {
    if (!this.isBrowser()) {
      return null;
    }

    const storedUser = localStorage.getItem(this.storageKey);

    if (!storedUser) {
      return null;
    }

    try {
      const user = JSON.parse(storedUser) as Partial<AuthUser>;

      if (
        !user.phoneNumber ||
        !user.accessToken ||
        !user.refreshToken ||
        !user.sessionId ||
        !user.sessionExpiresAt ||
        this.sessionIsExpired(user.sessionExpiresAt)
      ) {
        localStorage.removeItem(this.storageKey);
        return null;
      }

      return user as AuthUser;
    } catch {
      localStorage.removeItem(this.storageKey);
      return null;
    }
  }

  private clearStoredUser(): void {
    this.user.set(null);
    this.clearRefreshTimer();

    if (this.isBrowser()) {
      localStorage.removeItem(this.storageKey);
    }
  }

  private writeStoredUser(user: AuthUser): void {
    if (this.isBrowser()) {
      localStorage.setItem(this.storageKey, JSON.stringify(user));
    }
  }

  private scheduleSessionRefresh(): void {
    if (!this.isBrowser()) {
      return;
    }

    this.clearRefreshTimer();

    const user = this.user();

    if (!user) {
      return;
    }

    const expiresAt = Date.parse(user.sessionExpiresAt);

    if (!Number.isFinite(expiresAt)) {
      this.clearStoredUser();
      return;
    }

    const refreshDelay = Math.max(expiresAt - Date.now() - this.refreshLeadTimeMs, 0);

    this.refreshTimeoutId = setTimeout(() => {
      this.refreshSession().subscribe({
        error: () => this.clearStoredUser(),
      });
    }, refreshDelay);
  }

  private clearRefreshTimer(): void {
    if (this.refreshTimeoutId) {
      clearTimeout(this.refreshTimeoutId);
      this.refreshTimeoutId = null;
    }
  }

  private sessionIsExpired(expiresAt: string): boolean {
    const expiresAtTime = Date.parse(expiresAt);
    return !Number.isFinite(expiresAtTime) || expiresAtTime <= Date.now();
  }

  private sessionNeedsRefresh(expiresAt: string): boolean {
    const expiresAtTime = Date.parse(expiresAt);
    return (
      !Number.isFinite(expiresAtTime) ||
      expiresAtTime - Date.now() <= this.refreshLeadTimeMs
    );
  }

  private isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }
}
