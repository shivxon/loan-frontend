import { isPlatformBrowser } from '@angular/common';
import { Component, PLATFORM_ID, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LOAN_PRODUCTS } from './loan-products.data';
import { LoanProductsService } from './loan-products.service';

@Component({
  selector: 'app-loan-products',
  imports: [RouterLink],
  templateUrl: './loan-products.html',
  styleUrl: './loan-products.scss'
})
export class LoanProductsComponent {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly loanProductsService = inject(LoanProductsService);

  protected readonly loanProducts = signal(LOAN_PRODUCTS);

  constructor() {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    this.loanProductsService.findAll().subscribe({
      next: (products) => {
        console.log('products========>',products)
        if (products.length > 0) {
          this.loanProducts.set(products);
        }
      },
      error: () => {
        this.loanProducts.set(LOAN_PRODUCTS);
      },
    });
  }
}
