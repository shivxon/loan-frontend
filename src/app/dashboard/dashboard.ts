import { Component, PLATFORM_ID, computed, effect, inject, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { AuthModalComponent, AuthMode, AuthSuccess } from './auth-modal/auth-modal';
import { LOAN_PRODUCTS } from '../loan-products/loan-products.data';
import {
  LoanApplicationsService,
  LoanApplicationSummary,
} from '../loan-application/loan-applications.service';
import { DASHBOARD_JOURNEY, DASHBOARD_STATS } from './dashboard.data';
import { DASHBOARD_TABS } from './dashboard.config';

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
  private readonly platformId = inject(PLATFORM_ID);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly authService = inject(AuthService);
  private readonly loanApplicationsService = inject(LoanApplicationsService);

  protected readonly activeTab = signal<DashboardTabId>('overview');
  protected readonly authModalOpen = signal(false);
  protected readonly authMode = signal<AuthMode>('login');
  protected readonly pendingRedirect = signal<string | null>(null);
  protected readonly currentUser = this.authService.currentUser;
  protected readonly myApplications = signal<LoanApplicationSummary[]>([]);
  protected readonly loadingApplications = signal(false);

  protected readonly loanAmount = signal(50000);
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

  protected readonly quickStats = DASHBOARD_STATS;

  protected readonly loanProducts = LOAN_PRODUCTS;

  protected readonly journey = DASHBOARD_JOURNEY;

  protected readonly tabs = DASHBOARD_TABS;

  protected readonly activeTabContent = computed(
    () => this.tabs.find((tab) => tab.id === this.activeTab()) ?? this.tabs[0],
  );

  constructor() {
    // Handle modal from query params
    this.route.queryParamMap.pipe(takeUntilDestroyed()).subscribe((params) => {
      const modal = params.get('modal');

      if (modal !== 'login' && modal !== 'signup') {
        return;
      }

      this.pendingRedirect.set(params.get('redirect'));
      this.openAuth(modal);
    });

    // ✅ React to auth state properly
    if (isPlatformBrowser(this.platformId)) {
      effect(() => {
        if (this.authService.isLoggedIn()) {
          this.loadMyApplications();
        }
      });
    }
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
    this.loadMyApplications();

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

  protected formatDate(dateStr: string): string {
    if (!dateStr) return '—';
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  }

  protected statusLabel(status: string): string {
    const map: Record<string, string> = {
      submitted: 'Submitted',
      review: 'Under Review',
      approved: 'Approved',
      rejected: 'Rejected',
      faulted: 'Needs Attention',
    };
    return map[status] ?? status;
  }

  private loadMyApplications(): void {
    if (!this.authService.isLoggedIn()) return;
    this.loadingApplications.set(true);
    this.loanApplicationsService.getMyApplications().subscribe({
      next: (apps) => {
        this.myApplications.set(apps);
        this.loadingApplications.set(false);
      },
      error: () => {
        this.loadingApplications.set(false);
      },
    });
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
