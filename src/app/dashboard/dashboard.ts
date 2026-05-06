import { Component, PLATFORM_ID, computed, effect, inject, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { take } from 'rxjs';
import { InfoTabsComponent } from '../shared/info-tabs/info-tabs.component';
import { AuthService } from '../auth/auth.service';

import { LOAN_PRODUCTS } from '../loan-products/loan-products.data';
import {
  LoanApplicationsService,
  LoanApplicationSummary,
} from '../loan-application/loan-applications.service';
import { DASHBOARD_JOURNEY, DASHBOARD_STATS } from './dashboard.data';
import { DASHBOARD_TABS } from './dashboard.config';
import { Store } from '@ngrx/store';
import { selectDraft } from '../loan-application/state/loan.selectors';
import * as LoanActions from '../loan-application/state/loan.actions';
import { TeamComponent } from '../shared/team/team.component';


@Component({
  selector: 'app-dashboard',
  imports: [RouterLink, InfoTabsComponent, TeamComponent],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss'
})
export class DashboardComponent {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly authService = inject(AuthService);
  private readonly loanApplicationsService = inject(LoanApplicationsService);
  private readonly store = inject(Store);

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
        // Scroll to dashboard section if tab is selected via URL
        if (isPlatformBrowser(this.platformId)) {
          setTimeout(() => {
            document.getElementById('dashboard')?.scrollIntoView({ behavior: 'smooth' });
          }, 100);
        }
      }
    });

    // ✅ React to auth state properly
    if (isPlatformBrowser(this.platformId)) {
      effect(() => {
        if (this.authService.isLoggedIn()) {
          this.loadMyApplications();
          this.store.dispatch(LoanActions.loadDraft());
        }
      });
    }
  }



  protected readonly isAllApplicationsModalOpen = signal(false);

  protected openAllApplicationsModal(): void {
    this.isAllApplicationsModalOpen.set(true);
  }

  protected closeAllApplicationsModal(): void {
    this.isAllApplicationsModalOpen.set(false);
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

  protected onTabChange(tabId: string): void {
    this.activeTab.set(tabId);
    void this.router.navigate([], {
      queryParams: { tab: tabId },
      queryParamsHandling: 'merge',
      replaceUrl: true
    });
  }

  protected handleContinue(): void {
    this.store.select(selectDraft).pipe(take(1)).subscribe((draft) => {
      if (!this.authService.isLoggedIn()) {
        void this.router.navigate([], {
          queryParams: {
            modal: 'login',
            redirect: draft ? `/apply/${draft.loanType}` : '/loans'
          },
          queryParamsHandling: 'merge'
        });
        return;
      }

      // 1. Resume draft if it exists in the NgRx store
      if (draft && draft.loanType) {
        void this.router.navigate(['/apply', draft.loanType]);
      } else {
        // 2. Fallback to All Loans page as requested
        void this.router.navigate(['/loans']);
      }
    });
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
