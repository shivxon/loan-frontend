import { HttpClient, HttpHeaders } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';
import { Injectable, PLATFORM_ID, computed, inject, signal } from '@angular/core';
import { Observable, map, tap } from 'rxjs';
import { API_BASE_URL } from '../api/api.config';

export interface AuthUser {
  id?: string;
  phoneNumber: string;
  fullName?: string;
  mode: 'login' | 'signup';
  loggedInAt: string;
  accessToken: string;
}

export interface PhoneAuthRequest {
  phoneNumber: string;
  fullName?: string;
  mode: 'login' | 'signup';
}

interface PhoneAuthResponse {
  user: {
    _id?: string;
    phoneNumber: string;
    fullName?: string;
    mode: 'login' | 'signup';
    loggedInAt: string;
  };
  accessToken: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly apiBaseUrl = inject(API_BASE_URL);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly storageKey = 'shivam-loans-auth-user';
  private readonly user = signal<AuthUser | null>(this.readStoredUser());

  readonly currentUser = this.user.asReadonly();
  readonly isAuthenticated = computed(() => this.user() !== null);

  authenticatePhone(request: PhoneAuthRequest): Observable<AuthUser> {
    return this.http
      .post<PhoneAuthResponse>(`${this.apiBaseUrl}/auth/phone`, request)
      .pipe(
        map((response) => ({
          id: response.user._id,
          phoneNumber: response.user.phoneNumber,
          fullName: response.user.fullName,
          mode: response.user.mode,
          loggedInAt: response.user.loggedInAt,
          accessToken: response.accessToken,
        })),
        tap((user) => this.setUser(user)),
      );
  }

  authHeaders(): HttpHeaders {
    const accessToken = this.user()?.accessToken;
    return accessToken
      ? new HttpHeaders({ Authorization: `Bearer ${accessToken}` })
      : new HttpHeaders();
  }

  logout(): void {
    this.user.set(null);

    if (this.isBrowser()) {
      localStorage.removeItem(this.storageKey);
    }
  }

  isLoggedIn(): boolean {
    return this.isAuthenticated();
  }

  private setUser(user: AuthUser): void {
    this.user.set(user);
    this.writeStoredUser(user);
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

      if (!user.phoneNumber || !user.accessToken) {
        localStorage.removeItem(this.storageKey);
        return null;
      }

      return user as AuthUser;
    } catch {
      localStorage.removeItem(this.storageKey);
      return null;
    }
  }

  private writeStoredUser(user: AuthUser): void {
    if (this.isBrowser()) {
      localStorage.setItem(this.storageKey, JSON.stringify(user));
    }
  }

  private isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }
}
