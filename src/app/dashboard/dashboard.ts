import { Component, PLATFORM_ID, computed, effect, inject, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { InfoTabsComponent } from '../shared/info-tabs/info-tabs.component';
import { AuthService } from '../auth/auth.service';

import { LOAN_PRODUCTS } from '../loan-products/loan-products.data';
import {
  LoanApplicationsService,
  LoanApplicationSummary,
} from '../loan-application/loan-applications.service';
import { DASHBOARD_JOURNEY, DASHBOARD_STATS } from './dashboard.data';
import { DASHBOARD_TABS } from './dashboard.config';



@Component({
  selector: 'app-dashboard',
  imports: [RouterLink, InfoTabsComponent],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss'
})
export class DashboardComponent {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly authService = inject(AuthService);
  private readonly loanApplicationsService = inject(LoanApplicationsService);

  protected readonly activeTab = signal<string>('overview');
  protected readonly currentUser = this.authService.currentUser;
  protected readonly myApplications = signal<LoanApplicationSummary[]>([]);
  protected readonly loadingApplications = signal(false);

  protected readonly quickStats = DASHBOARD_STATS;

  protected readonly loanProducts = LOAN_PRODUCTS;

  protected readonly journey = DASHBOARD_JOURNEY;

  protected readonly tabs = DASHBOARD_TABS;



  constructor() {
    // Handle tab selection from query params globally
    this.route.queryParamMap.pipe(takeUntilDestroyed()).subscribe((params) => {
      const tab = params.get('tab');
      if (tab) {
        this.activeTab.set(tab);
      }
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


}
