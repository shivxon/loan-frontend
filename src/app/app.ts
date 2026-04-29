import { Component, inject, signal } from '@angular/core';
import { RouterOutlet, ActivatedRoute, Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { HeaderComponent } from './core/header/header';
import { FooterComponent } from './core/footer/footer';
import { AuthModalComponent, AuthMode, AuthSuccess } from './dashboard/auth-modal/auth-modal';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, FooterComponent, AuthModalComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  protected readonly authModalOpen = signal(false);
  protected readonly authMode = signal<AuthMode>('login');
  protected readonly pendingRedirect = signal<string | null>(null);

  constructor() {
    // Handle modal from query params globally
    this.route.queryParamMap.pipe(takeUntilDestroyed()).subscribe((params) => {
      const modal = params.get('modal');

      if (modal !== 'login' && modal !== 'signup') {
        if (this.authModalOpen()) {
          this.authModalOpen.set(false);
        }
        return;
      }

      this.pendingRedirect.set(params.get('redirect'));
      this.authMode.set(modal);
      this.authModalOpen.set(true);
    });
  }

  protected closeAuth(): void {
    this.authModalOpen.set(false);
    this.clearAuthQueryParams();
  }

  protected setAuthMode(mode: AuthMode): void {
    this.authMode.set(mode);
  }

  protected handleAuthenticated(_authSuccess: AuthSuccess): void {
    this.authModalOpen.set(false);

    const redirectUrl = this.pendingRedirect();
    this.pendingRedirect.set(null);

    if (redirectUrl?.startsWith('/')) {
      void this.router.navigateByUrl(redirectUrl);
      return;
    }

    this.clearAuthQueryParams();
  }

  private clearAuthQueryParams(): void {
    void this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        modal: null,
        redirect: null,
      },
      queryParamsHandling: 'merge',
      replaceUrl: true,
    });
  }
}
