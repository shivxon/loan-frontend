import { Component, PLATFORM_ID, inject, signal } from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';

@Component({
  selector: 'app-cookie-consent',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cookie-consent.html',
  styleUrl: './cookie-consent.scss'
})
export class CookieConsentComponent {
  private readonly platformId = inject(PLATFORM_ID);
  isVisible = signal(false);

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      const hasAccepted = localStorage.getItem('cookiesAccepted');
      if (!hasAccepted) {
        this.isVisible.set(true);
      }
    }
  }

  acceptCookies() {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('cookiesAccepted', 'true');
      this.isVisible.set(false);
    }
  }
}
