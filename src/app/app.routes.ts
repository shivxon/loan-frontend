import { Routes } from '@angular/router';
import { authGuard } from './auth/auth.guard';
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
    path: '**',
    redirectTo: '',
  },
];
