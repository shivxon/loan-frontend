import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { findLoanProduct } from '../loan-products/loan-products.data';
import { AuthService } from '../auth/auth.service';
import { getLoanFaqs } from './loan-faqs';
import { InfoTabsComponent } from '../shared/info-tabs/info-tabs.component';
import { InfoTab } from '../shared/info-tabs/info-tabs.types';
import { getBankOffersForLoan } from '../shared/banks.data';

@Component({
  selector: 'app-loan-details',
  standalone: true,
  imports: [InfoTabsComponent],
  templateUrl: './loan-details.html',
  styleUrl: './loan-details.scss'
})
export class LoanDetailsComponent {

  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private authService = inject(AuthService);
  slug = this.route.snapshot.paramMap.get('loanType');
  faqs = getLoanFaqs(this.slug);

  product = findLoanProduct(this.slug);

  loanTabs: InfoTab[] = [];
  activeTabId = signal<string>('overview');

  bannerImages: Record<string, string> = {
    'personal-loan': 'personal-loan.png',
    'home-loan': 'home-loan.png',
    'business-loan': 'business-loan.png',
    'gold-loan': 'gold-loan.png',
    'car-loan': 'car-loan.png',
    'education-loan': 'education-loan.png'
  };

  get bannerImage(): string {
    if (this.slug && this.bannerImages[this.slug]) {
      return this.bannerImages[this.slug];
    }
    return 'default-loan.png';
  }

  constructor() {
    if (this.product) {
      this.loanTabs = [
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
            'Paperless application journey',
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
          bankOffers: getBankOffersForLoan(this.slug || 'personal-loan')
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
    }
  }

  proceedToApply() {
    if (!this.authService.isLoggedIn()) {
      void this.router.navigate([], { queryParams: { modal: 'login', redirect: `/apply/${this.slug}` } });
      return;
    }

    void this.router.navigate(['/apply', this.slug]);
  }
}