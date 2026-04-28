import { Component, computed, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { AuthModalComponent, AuthMode, AuthSuccess } from './auth-modal/auth-modal';
import { LOAN_PRODUCTS } from '../loan-products/loan-products.data';

type DashboardTabId =
  | 'overview'
  | 'features'
  | 'eligibility'
  | 'documents'
  | 'emi'
  | 'fees'
  | 'reviews'
  | 'faq';

interface DashboardTab {
  id: DashboardTabId;
  label: string;
  eyebrow: string;
  title: string;
  description: string;
  points: string[];
  metrics: { value: string; label: string }[];
}

@Component({
  selector: 'app-dashboard',
  imports: [AuthModalComponent, RouterLink],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss'
})
export class DashboardComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly authService = inject(AuthService);

  protected readonly activeTab = signal<DashboardTabId>('overview');
  protected readonly authModalOpen = signal(false);
  protected readonly authMode = signal<AuthMode>('login');
  protected readonly pendingRedirect = signal<string | null>(null);
  protected readonly currentUser = this.authService.currentUser;

  protected readonly loanAmount = signal(750000);
  protected readonly tenureMonths = signal(36);
  protected readonly interestRate = signal(11.5);

  protected readonly monthlyEmi = computed(() => {
    const monthlyRate = this.interestRate() / 12 / 100;
    const months = this.tenureMonths();
    const principal = this.loanAmount();

    if (monthlyRate === 0) {
      return Math.round(principal / months);
    }

    const multiplier = Math.pow(1 + monthlyRate, months);
    return Math.round((principal * monthlyRate * multiplier) / (multiplier - 1));
  });

  protected readonly totalPayable = computed(
    () => this.monthlyEmi() * this.tenureMonths(),
  );

  protected readonly quickStats = [
    { value: '24h', label: 'Fast approval' },
    { value: '25L', label: 'Max amount' },
    { value: '100%', label: 'Digital process' },
  ];

  protected readonly loanProducts = LOAN_PRODUCTS;

  protected readonly journey = [
    {
      step: '01',
      title: 'Apply',
      description: 'Share your basic details and mobile number.',
    },
    {
      step: '02',
      title: 'Verify',
      description: 'Confirm eligibility with OTP and document checks.',
    },
    {
      step: '03',
      title: 'Disburse',
      description: 'Choose an offer and receive funds in your account.',
    },
  ];

  protected readonly tabs: DashboardTab[] = [
    {
      id: 'overview',
      label: 'Overview',
      eyebrow: 'Personal loan overview',
      title: 'A faster dashboard for every loan decision',
      description:
        'Track loan options, eligibility, documents, repayments, and reviews from one clean workspace built for quick action.',
      points: [
        'Compare multiple lenders without repeating your details.',
        'See approval status, document readiness, and next steps in one place.',
        'Start with phone OTP and continue the application whenever you return.',
      ],
      metrics: [
        { value: '7.5L', label: 'Popular loan size' },
        { value: '11.5%', label: 'Sample rate' },
        { value: '36 mo', label: 'Preferred tenure' },
      ],
    },
    {
      id: 'features',
      label: 'Features',
      eyebrow: 'Loan features',
      title: 'Flexible offers matched to your profile',
      description:
        'Give customers a polished place to review interest ranges, tenure choices, approval speed, and repayment flexibility.',
      points: [
        'Instant profile review with partner banks and NBFCs.',
        'Tenures from 12 to 60 months with transparent monthly repayment.',
        'Paperless application journey with status nudges.',
      ],
      metrics: [
        { value: '12-60', label: 'Month tenure' },
        { value: '0', label: 'Branch visits' },
        { value: '15+', label: 'Lender partners' },
      ],
    },
    {
      id: 'eligibility',
      label: 'Eligibility',
      eyebrow: 'Eligibility checks',
      title: 'Know whether a customer is ready to apply',
      description:
        'A clear eligibility section keeps the journey focused before the user enters the full application flow.',
      points: [
        'Age between 21 and 60 years.',
        'Stable salary or business income with bank statement proof.',
        'Valid PAN, address proof, and active Indian mobile number.',
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
      eyebrow: 'Document checklist',
      title: 'Keep document readiness visible',
      description:
        'The dashboard makes it easy to understand what is pending before moving a lead to lender verification.',
      points: [
        'PAN card and Aadhaar or passport for identity.',
        'Salary slips, ITR, or business proof based on employment type.',
        'Recent bank statements for income and repayment assessment.',
      ],
      metrics: [
        { value: 'PAN', label: 'Identity' },
        { value: '3 mo', label: 'Statements' },
        { value: 'OTP', label: 'Mobile proof' },
      ],
    },
    {
      id: 'emi',
      label: 'EMI Calculator',
      eyebrow: 'EMI estimate',
      title: 'Estimate monthly payments before applying',
      description:
        'Move amount, tenure, and interest rate to show a realistic monthly repayment before a customer submits details.',
      points: [
        'Interactive amount and tenure inputs.',
        'Clear monthly EMI and total payable output.',
        'Use the estimate to guide the customer into signup.',
      ],
      metrics: [],
    },
    {
      id: 'fees',
      label: 'Fees & Charges',
      eyebrow: 'Transparent costs',
      title: 'Show important charges early',
      description:
        'Give customers a direct view of processing fees, late charges, foreclosure rules, and taxes before they commit.',
      points: [
        'Processing fee generally ranges from 1% to 3% of loan amount.',
        'Late payment charges depend on lender policy.',
        'GST and statutory charges apply where applicable.',
      ],
      metrics: [
        { value: '1-3%', label: 'Processing fee' },
        { value: '0-5%', label: 'Foreclosure range' },
        { value: 'GST', label: 'As applicable' },
      ],
    },
    {
      id: 'reviews',
      label: 'Reviews',
      eyebrow: 'Customer reviews',
      title: 'Build confidence with visible service quality',
      description:
        'Use a compact review tab to highlight approval experience, support quality, and clarity of repayment information.',
      points: [
        'Customers value a quick callback after OTP verification.',
        'Clear document requests reduce application drop-off.',
        'EMI visibility helps users choose responsible loan sizes.',
      ],
      metrics: [
        { value: '4.8', label: 'Service rating' },
        { value: '50k+', label: 'Monthly users' },
        { value: '92%', label: 'Digital completion' },
      ],
    },
    {
      id: 'faq',
      label: "FAQ's",
      eyebrow: 'Common questions',
      title: 'Answer the questions that slow users down',
      description:
        'A practical FAQ tab can reduce support calls while keeping the user inside the loan journey.',
      points: [
        'Applying does not guarantee approval from a lender.',
        'Final rate depends on income, bureau score, and lender policy.',
        'OTP login keeps the application connected to the customer mobile number.',
      ],
      metrics: [
        { value: 'OTP', label: 'Login method' },
        { value: '24x7', label: 'Dashboard access' },
        { value: 'PDF', label: 'Offer docs' },
      ],
    },
  ];

  protected readonly activeTabContent = computed(
    () => this.tabs.find((tab) => tab.id === this.activeTab()) ?? this.tabs[0],
  );

  constructor() {
    this.route.queryParamMap.pipe(takeUntilDestroyed()).subscribe((params) => {
      const modal = params.get('modal');

      if (modal !== 'login' && modal !== 'signup') {
        return;
      }

      this.pendingRedirect.set(params.get('redirect'));
      this.openAuth(modal);
    });
  }

  protected selectTab(tabId: DashboardTabId): void {
    this.activeTab.set(tabId);
  }

  protected openAuth(mode: AuthMode): void {
    this.authMode.set(mode);
    this.authModalOpen.set(true);
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

  protected logout(): void {
    this.authService.logout();
  }

  protected updateLoanAmount(event: Event): void {
    this.loanAmount.set(Number((event.target as HTMLInputElement).value));
  }

  protected updateTenure(event: Event): void {
    this.tenureMonths.set(Number((event.target as HTMLInputElement).value));
  }

  protected updateInterest(event: Event): void {
    this.interestRate.set(Number((event.target as HTMLInputElement).value));
  }

  protected formatCurrency(value: number): string {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(value);
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
