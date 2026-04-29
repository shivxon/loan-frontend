import { Routes } from '@angular/router';
import { authGuard } from './auth/auth.guard';
import { AboutComponent } from './about/about';
import { ApplicationDetailComponent } from './application-detail/application-detail';
import { DashboardComponent } from './dashboard/dashboard';
import { LoanApplicationComponent } from './loan-application/loan-application';
import { LoanProductsComponent } from './loan-products/loan-products';

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
    path: '**',
    redirectTo: '',
  },
];
