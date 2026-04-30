import { Routes } from '@angular/router';
import { authGuard } from './auth/auth.guard';
import { AboutComponent } from './about/about';
import { ApplicationDetailComponent } from './application-detail/application-detail';
import { DashboardComponent } from './dashboard/dashboard';
import { LoanApplicationComponent } from './loan-application/loan-application';
import { LoanProductsComponent } from './loan-products/loan-products';
import { LoanDetailsComponent } from './loan-details/loan-details';

import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy';
import { TermsConditionsComponent } from './terms-conditions/terms-conditions';

export const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    title: 'Shivam Loans Dashboard',
  },
  {
    path: 'loans',
    component: LoanProductsComponent,
    title: 'Choose Loan Type',
  },
  // ✅ NEW PAGE (NO AUTH)
  {
    path: 'loan/:loanType',
    component: LoanDetailsComponent,
    title: 'Loan Details',
  },
  {
    path: 'loan/:loanType/faqs',
    loadComponent: () => import('./loan-details/loan-faq-page/loan-faq-page').then(m => m.LoanFaqPageComponent),
    title: 'Loan FAQ\'s',
  },
  {
    path: 'apply/:loanType',
    component: LoanApplicationComponent,
    canActivate: [authGuard],
    title: 'Loan Application',
  },
  {
    path: 'application/:referenceNumber',
    component: ApplicationDetailComponent,
    canActivate: [authGuard],
    title: 'Application Details',
  },
  {
    path: 'about',
    component: AboutComponent,
    title: 'About Us — Shivam Loans',
  },
  {
    path: 'privacy-policy',
    component: PrivacyPolicyComponent,
    title: 'Privacy Policy — Shivam Loans',
  },
  {
    path: 'terms',
    component: TermsConditionsComponent,
    title: 'Terms and Conditions — Shivam Loans',
  },
  {
    path: '**',
    redirectTo: '',
  },
];
