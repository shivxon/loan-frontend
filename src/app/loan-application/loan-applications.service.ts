import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { API_BASE_URL } from '../api/api.config';
import { AuthService } from '../auth/auth.service';

export interface CreateLoanApplicationRequest {
  loanType: string;
  applicant: Record<string, string>;
  financial: Record<string, string>;
  productDetails: Record<string, string>;
  address: Record<string, string>;
  consentAccepted: boolean;
}

export interface CreateLoanApplicationResponse {
  referenceNumber: string;
  status: string;
  loanTitle: string;
  submittedAt: string;
}

@Injectable({
  providedIn: 'root',
})
export class LoanApplicationsService {
  private readonly http = inject(HttpClient);
  private readonly apiBaseUrl = inject(API_BASE_URL);
  private readonly authService = inject(AuthService);

  createApplication(
    request: CreateLoanApplicationRequest,
  ): Observable<CreateLoanApplicationResponse> {
    return this.http.post<CreateLoanApplicationResponse>(
      `${this.apiBaseUrl}/applications`,
      request,
      { headers: this.authService.authHeaders() },
    );
  }
}
