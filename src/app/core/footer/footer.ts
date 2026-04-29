import { Component, inject } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { LOAN_PRODUCTS } from '../../loan-products/loan-products.data';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './footer.html',
  styleUrl: './footer.scss'
})
export class FooterComponent {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  protected readonly currentUser = this.authService.currentUser;
  protected readonly loanProducts = LOAN_PRODUCTS;

  protected openAuth(mode: 'login' | 'signup'): void {
    void this.router.navigate([], {
      queryParams: { modal: mode },
      queryParamsHandling: 'merge'
    });
  }
}
