import { Component, inject, OnInit, OnDestroy, signal, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { getLoanFaqs } from '../loan-faqs';
import { findLoanProduct } from '../../loan-products/loan-products.data';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-loan-faq-page',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="faq-page-container">
      <div class="faq-header">
        <nav class="breadcrumbs">
          <a routerLink="/">Home</a>
          <span>/</span>
          <a [routerLink]="['/loan', slug()]">{{ product().title }}</a>
          <span>/</span>
          <span>FAQ's</span>
        </nav>
        <h1>{{ product().title }} - Frequently Asked Questions</h1>
        <p>Everything you need to know about our {{ product().title }} product.</p>
      </div>

      <div class="faq-grid">
        <div class="faq-list">
          @for (faq of faqs(); track faq.question) {
            <div class="faq-item" [class.open]="faq.open">
              <div class="faq-q" (click)="faq.open = !faq.open">
                <span>{{ faq.question }}</span>
                <span class="icon">{{ faq.open ? '−' : '+' }}</span>
              </div>
              @if (faq.open) {
                <div class="faq-a">
                  {{ faq.answer }}
                </div>
              }
            </div>
          }
        </div>

        <aside class="faq-cta">
          <div class="cta-card">
            <h3>Still have questions?</h3>
            <p>Our loan experts are here to help you choose the right plan.</p>
            <a routerLink="/contact" class="primary-button">Contact Support</a>
          </div>
        </aside>
      </div>
    </div>
  `,
  styles: [`
    .faq-page-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 60px 24px;
    }

    .faq-header {
      margin-bottom: 48px;
      text-align: center;

      h1 {
        font-size: 42px;
        color: #17243a;
        margin: 24px 0 12px;
      }

      p {
        font-size: 18px;
        color: #64748b;
      }
    }

    .breadcrumbs {
      display: flex;
      justify-content: center;
      gap: 12px;
      font-size: 14px;
      font-weight: 700;
      
      a { color: #1f5fae; text-decoration: none; }
      span { color: #94a3b8; }
    }

    .faq-grid {
      display: grid;
      grid-template-columns: 1fr 340px;
      gap: 40px;
    }

    .faq-list {
      display: grid;
      gap: 16px;
    }

    .faq-item {
      background: #ffffff;
      border: 1px solid #e2e8f0;
      border-radius: 16px;
      overflow: hidden;
      transition: all 0.3s ease;

      &.open {
        border-color: #1f5fae;
        box-shadow: 0 10px 30px rgba(31, 95, 174, 0.08);
      }
    }

    .faq-q {
      padding: 24px 32px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      cursor: pointer;
      font-weight: 800;
      color: #17243a;
      font-size: 18px;

      .icon {
        font-size: 24px;
        color: #1f5fae;
      }
    }

    .faq-a {
      padding: 0 32px 24px;
      color: #475569;
      line-height: 1.7;
      font-size: 16px;
    }

    .cta-card {
      background: linear-gradient(135deg, #1f5fae 0%, #2b70c9 100%);
      padding: 32px;
      border-radius: 24px;
      color: #ffffff;
      text-align: center;
      position: sticky;
      top: 120px;

      h3 { font-size: 24px; margin-bottom: 12px; }
      p { margin-bottom: 24px; opacity: 0.9; line-height: 1.5; }

      .primary-button {
        display: inline-block;
        background: #ffffff;
        color: #1f5fae;
        padding: 14px 28px;
        border-radius: 12px;
        font-weight: 800;
        text-decoration: none;
        transition: all 0.3s ease;

        &:hover { transform: translateY(-2px); box-shadow: 0 10px 20px rgba(0,0,0,0.1); }
      }
    }

    @media (max-width: 920px) {
      .faq-grid { grid-template-columns: 1fr; }
      .faq-header h1 { font-size: 32px; }
    }
  `]
})
export class LoanFaqPageComponent implements OnInit, OnDestroy {
  private platformId = inject(PLATFORM_ID);
  private route = inject(ActivatedRoute);
  private destroy$ = new Subject<void>();

  slug = signal<string>('general');
  product = signal<any>({ title: 'Shivam Loans', description: 'General FAQ\'s' });
  faqs = signal<any[]>([]);

  ngOnInit(): void {
    this.route.paramMap.pipe(takeUntil(this.destroy$)).subscribe(params => {
      const loanType = params.get('loanType') || 'general';
      this.slug.set(loanType);
      this.product.set(findLoanProduct(loanType) || { title: 'Shivam Loans', description: 'General FAQ\'s' });
      this.faqs.set(getLoanFaqs(loanType));
      if (isPlatformBrowser(this.platformId)) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
