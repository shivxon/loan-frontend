import { Component, inject, signal, HostListener, HostBinding } from '@angular/core';
import { RouterLink, RouterLinkActive, Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.html',
  styleUrl: './header.scss'
})
export class HeaderComponent {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  protected readonly currentUser = this.authService.currentUser;
  
  isScrolled = signal(false);

  @HostBinding('class.is-scrolled') get scrolled() {
    return this.isScrolled();
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled.set(window.scrollY > 20);
  }

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
