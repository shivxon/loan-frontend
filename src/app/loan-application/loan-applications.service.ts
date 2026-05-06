import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { API_BASE_URL } from '../api/api.config';

export interface CreateLoanApplicationRequest {
  loanType: string;
  applicant: Record<string, string>;
  financial: Record<string, string>;
  // productDetails: Record<string, string>;
  address: Record<string, string>;
  consentAccepted: boolean;
}

export interface CreateLoanApplicationResponse {
  referenceNumber: string;
  status: string;
  loanTitle: string;
  submittedAt: string;
}

export interface LoanApplicationSummary {
  _id: string;
  referenceNumber: string;
  loanType: string;
  loanTitle: string;
  status: 'submitted' | 'review' | 'approved' | 'rejected' | 'faulted';
  faults: string[];
  createdAt: string;
  updatedAt: string;
}

export interface TrackingResponse {
  referenceNumber: string;
  status: string;
  faults: string[];
  loanType: string;
  loanTitle: string;
  userPhone: string;
  submittedAt: string;
  updatedAt: string;
}

@Injectable({
  providedIn: 'root',
})
export class LoanApplicationsService {
  private readonly http = inject(HttpClient);
  private readonly apiBaseUrl = inject(API_BASE_URL);

  createApplication(
    request: CreateLoanApplicationRequest,
  ): Observable<CreateLoanApplicationResponse> {
    return this.http.post<CreateLoanApplicationResponse>(
      `${this.apiBaseUrl}/applications`,
      request,
    );
  }

  getMyApplications(): Observable<LoanApplicationSummary[]> {
    return this.http.get<LoanApplicationSummary[]>(
      `${this.apiBaseUrl}/applications/mine`,
    );
  }

  trackApplication(referenceNumber: string): Observable<TrackingResponse> {
    return this.http.get<TrackingResponse>(
      `${this.apiBaseUrl}/tracking/${referenceNumber}`,
    );
  }

  saveDraft(loanType: string, formData: Record<string, string>): Observable<void> {
    return this.http.post<void>(`${this.apiBaseUrl}/applications/draft`, {
      loanType,
      formData,
    });
  }

  getDraft(): Observable<{ loanType: string; formData: Record<string, string> }> {
    return this.http.get<{ loanType: string; formData: Record<string, string> }>(
      `${this.apiBaseUrl}/applications/draft`,
    );
  }

  deleteDraft(): Observable<void> {
    return this.http.delete<void>(`${this.apiBaseUrl}/applications/draft`);
  }
}
