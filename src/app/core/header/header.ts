import { Component, inject, signal, computed, HostListener, HostBinding } from '@angular/core';
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
  protected readonly userInitials = computed(() => {
    const user = this.currentUser();
    if (!user || !user.fullName) return '';
    const parts = user.fullName.split(' ');
    if (parts.length >= 2) {
      return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    }
    return parts[0].slice(0, 2).toUpperCase();
  });
  
  isScrolled = signal(false);
  isMenuOpen = signal(false);

  @HostBinding('class.is-scrolled') get scrolled() {
    return this.isScrolled();
  }

  @HostBinding('class.menu-open') get menuOpen() {
    return this.isMenuOpen();
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled.set(window.scrollY > 20);
    if (this.isMenuOpen()) {
      this.isMenuOpen.set(false);
    }
  }

  protected toggleMenu(): void {
    this.isMenuOpen.update(v => !v);
  }

  protected logout(): void {
    this.isMenuOpen.set(false);
    this.authService.logout();
  }

  protected openAuth(mode: 'login' | 'signup'): void {
    this.isMenuOpen.set(false);
    void this.router.navigate([], {
      queryParams: { modal: mode },
      queryParamsHandling: 'merge'
    });
  }
}
