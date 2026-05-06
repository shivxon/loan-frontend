import { Component, inject, signal, OnInit, OnDestroy, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { findLoanProduct, LoanProduct } from '../loan-products/loan-products.data';
import { AuthService } from '../auth/auth.service';
import { getLoanFaqs } from './loan-faqs';
import { InfoTabsComponent } from '../shared/info-tabs/info-tabs.component';
import { InfoTab } from '../shared/info-tabs/info-tabs.types';
import { getBankOffersForLoan } from '../shared/banks.data';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-loan-details',
  standalone: true,
  imports: [InfoTabsComponent],
  templateUrl: './loan-details.html',
  styleUrl: './loan-details.scss'
})
export class LoanDetailsComponent implements OnInit, OnDestroy {
  private platformId = inject(PLATFORM_ID);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private authService = inject(AuthService);
  private destroy$ = new Subject<void>();

  slug: string | null = null;
  product: LoanProduct | null = null;
  faqs: any[] = [];
  loanTabs = signal<InfoTab[]>([]);
  activeTabId = signal<string>('overview');

  bannerImages: Record<string, string> = {
    'personal-loan': 'personal-loan.png',
    'home-loan': 'home-loan.png',
    'business-loan': 'business-loan.png',
    'gold-loan': 'gold-loan.png',
    'car-loan': 'car-loan.png',
    'education-loan': 'education-loan.png'
  };

  ngOnInit(): void {
    this.route.paramMap
      .pipe(takeUntil(this.destroy$))
      .subscribe(params => {
        const slug = params.get('loanType');

        if (!slug) return;

        console.log('Route changed →', slug);

        this.slug = slug;
        this.loadLoanData();
      });
  }

  private loadLoanData() {
    this.product = findLoanProduct(this.slug) ?? null;
    this.faqs = getLoanFaqs(this.slug);
    this.initializeTabs();

    if (isPlatformBrowser(this.platformId)) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  get bannerImage(): string {
    if (this.slug && this.bannerImages[this.slug]) {
      return this.bannerImages[this.slug];
    }
    return 'default-loan.png';
  }

  private initializeTabs(): void {
    if (!this.product) {
      this.loanTabs.set([]);
      return;
    }

    const tabs: InfoTab[] = [
      {
        id: 'overview',
        label: 'Overview',
        eyebrow: `${this.product.title} Overview`,
        title: `Understand your ${this.product.title}`,
        description: this.product.longDescription || this.product.description,
        points: [
          `Maximum loan amount: ${this.product.maxAmount}`,
          `Flexible tenure up to ${this.product.tenure}`,
          `Attractive interest rates starting at ${this.product.rate}`
        ],
        metrics: [
          { value: this.product.maxAmount, label: 'Max Amount' },
          { value: this.product.tenure, label: 'Tenure' },
          { value: this.product.rate, label: 'Interest' },
        ]
      },
      {
        id: 'features',
        label: 'Features',
        eyebrow: 'Key Features',
        title: 'Explore the benefits',
        description: 'Highlights of this loan tailored for you.',
        points: [
          'Instant profile review with partner banks',
          // 'Paperless application journey',
          'Fast approval and disbursal'
        ],
        metrics: [
          { value: '24-48h', label: 'Approval time' },
          { value: 'Zero', label: 'Hidden charges' },
        ]
      },
      {
        id: 'eligibility',
        label: 'Eligibility',
        eyebrow: 'Eligibility Criteria',
        title: 'Check if you qualify',
        description: 'Ensure you meet the standard requirements before applying.',
        points: [
          'Minimum salary ₹15,000',
          'Age between 21–60 years',
          'Stable income source'
        ],
        metrics: [
          { value: '21+', label: 'Minimum age' },
          { value: '25k', label: 'Monthly income' },
          { value: '650+', label: 'Helpful score' },
        ],
      },
      {
        id: 'documents',
        label: 'Documents',
        eyebrow: 'Required Documents',
        title: 'What you need to apply',
        description: 'Keep these documents handy for a smooth process.',
        points: this.product.documents,
        metrics: [
          { value: 'PAN', label: 'Identity' },
          { value: '3 mo', label: 'Statements' },
          { value: 'OTP', label: 'Mobile proof' },
        ],
      },
      {
        id: 'emi',
        label: 'EMI Calculator',
        eyebrow: 'EMI Estimate',
        title: 'Calculate your monthly EMI',
        description: 'Estimate your monthly repayment before you apply for the loan.',
        // bankOffers: getBankOffersForLoan(this.slug || 'personal-loan')
      },
      {
        id: 'faq',
        label: "FAQ's",
        eyebrow: 'Common questions',
        title: 'Frequently Asked Questions',
        description: 'Answers to common queries about this loan product.',
        faqs: this.faqs
      }
    ];

    this.loanTabs.set(tabs);
    this.activeTabId.set('overview'); // Reset to overview on loan change
  }

  proceedToApply() {
    if (!this.authService.isLoggedIn()) {
      void this.router.navigate([], { queryParams: { modal: 'login', redirect: `/apply/${this.slug}` } });
      return;
    }

    void this.router.navigate(['/apply', this.slug]);
  }
}