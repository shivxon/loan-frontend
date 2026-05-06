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
import { formatLoanType } from './utils/format.util';

export const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    title: 'Elite Finance Dashboard',
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
    title: (route) => {
      const formatted = formatLoanType(route.params['loanType']);
      return `${formatted} – Interest Rates, Eligibility | Elite Finance`;
    },
  },
  {
    path: 'loan/:loanType/faqs',
    loadComponent: () => import('./loan-details/loan-faq-page/loan-faq-page').then(m => m.LoanFaqPageComponent),
    title: (route) => {
      const formatted = formatLoanType(route.params['loanType']);
      return `${formatted} FAQs | Elite Finance`
    },

  },

  {
    path: 'faqs',
    loadComponent: () =>
      import('./loan-details/loan-faq-page/loan-faq-page')
        .then(m => m.LoanFaqPageComponent),
    title: 'Frequently Asked Questions',
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
    path: 'reviews',
    loadComponent: () => import('./reviews/reviews.component').then(m => m.ReviewsComponent),
    title: 'Customer Reviews — Elite Finance',
  },
  {
    path: 'contact',
    loadComponent: () => import('./contact/contact').then(m => m.ContactComponent),
    title: 'Contact Us — Elite Finance',
  },
  {
    path: 'about',
    component: AboutComponent,
    title: 'About Us — Elite Finance',
  },
  {
    path: 'privacy-policy',
    component: PrivacyPolicyComponent,
    title: 'Privacy Policy — Elite Finance',
  },
  {
    path: 'terms',
    component: TermsConditionsComponent,
    title: 'Terms and Conditions — Elite Finance',
  },
  {
    path: '**',
    redirectTo: '',
  },
];
