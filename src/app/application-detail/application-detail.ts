import { Component, PLATFORM_ID, inject, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';
import {
  LoanApplicationsService,
  TrackingResponse,
} from '../loan-application/loan-applications.service';

@Component({
  selector: 'app-application-detail',
  imports: [RouterLink],
  templateUrl: './application-detail.html',
  styleUrl: './application-detail.scss',
})
export class ApplicationDetailComponent {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly route = inject(ActivatedRoute);
  private readonly loanApplicationsService = inject(LoanApplicationsService);

  protected readonly loading = signal(true);
  protected readonly error = signal('');
  protected readonly application = signal<TrackingResponse | null>(null);

  protected readonly statusSteps = [
    { key: 'submitted', label: 'Submitted' },
    { key: 'review', label: 'Under Review' },
    { key: 'approved', label: 'Approved' },
  ];

  constructor() {
    this.route.paramMap.pipe(takeUntilDestroyed()).subscribe((params) => {
      const refNumber = params.get('referenceNumber');
      if (refNumber && isPlatformBrowser(this.platformId)) {
        this.fetchApplication(refNumber);
      }
    });
  }

  protected statusClass(status: string): string {
    const map: Record<string, string> = {
      submitted: 'status-submitted',
      review: 'status-review',
      approved: 'status-approved',
      rejected: 'status-rejected',
      faulted: 'status-faulted',
    };
    return map[status] ?? 'status-submitted';
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

  protected stepReached(stepKey: string): boolean {
    const app = this.application();
    if (!app) return false;
    const order = ['submitted', 'review', 'approved'];
    const currentIndex = order.indexOf(app.status);
    const stepIndex = order.indexOf(stepKey);
    if (currentIndex === -1 || stepIndex === -1) return false;
    return stepIndex <= currentIndex;
  }

  protected formatDate(dateStr: string): string {
    if (!dateStr) return '—';
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  }

  private fetchApplication(referenceNumber: string): void {
    this.loading.set(true);
    this.error.set('');
    this.loanApplicationsService.trackApplication(referenceNumber).subscribe({
      next: (response) => {
        this.application.set(response);
        this.loading.set(false);
      },
      error: () => {
        this.error.set(
          'Unable to load application details. Please check the reference number and try again.',
        );
        this.loading.set(false);
      },
    });
  }
}
