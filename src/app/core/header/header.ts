import { Component, inject } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.scss'
})
export class HeaderComponent {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  protected readonly currentUser = this.authService.currentUser;

  protected logout(): void {
    this.authService.logout();
  }

  protected openAuth(mode: 'login' | 'signup'): void {
    void this.router.navigate([], {
      queryParams: { modal: mode },
      queryParamsHandling: 'merge'
    });
  }
}
