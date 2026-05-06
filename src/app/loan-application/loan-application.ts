import { Component, PLATFORM_ID, inject, signal } from '@angular/core';
import { NgTemplateOutlet, isPlatformBrowser } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import {
  findLoanProduct,
  LoanApplicationField,
  LoanProduct,
  LOAN_PRODUCTS,
} from '../loan-products/loan-products.data';
import { AuthService } from '../auth/auth.service';
import { LoanProductsService } from '../loan-products/loan-products.service';
import { LoanApplicationsService } from './loan-applications.service';
import { Store } from '@ngrx/store';
import * as LoanActions from './state/loan.actions';
import { selectDraft } from './state/loan.selectors';

@Component({
  selector: 'app-loan-application',
  imports: [FormsModule, NgTemplateOutlet, RouterLink],
  templateUrl: './loan-application.html',
  styleUrl: './loan-application.scss'
})
export class LoanApplicationComponent {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly authService = inject(AuthService);
  private readonly loanProductsService = inject(LoanProductsService);
  private readonly loanApplicationsService = inject(LoanApplicationsService);
  private readonly store = inject(Store);

  protected readonly loanProduct = signal<LoanProduct>(LOAN_PRODUCTS[0]);
  protected readonly submitted = signal(false);
  protected readonly applicationSaved = signal(false);
  protected readonly referenceNumber = signal('');
  protected readonly isSaving = signal(false);
  protected readonly saveError = signal('');
  protected termsAccepted = false;

  protected readonly applicantFields: LoanApplicationField[] = [
    {
      name: 'fullName',
      label: 'Applicant full name',
      type: 'text',
      placeholder: 'Enter full name',
      required: true,
    },
    {
      name: 'phoneNumber',
      label: 'Phone number',
      type: 'tel',
      placeholder: '10 digit mobile number',
      required: true,
    },
    {
      name: 'email',
      label: 'Email address',
      type: 'email',
      placeholder: 'Enter email address',
      required: true,
    },
    // {
    //   name: 'panNumber',
    //   label: 'PAN number',
    //   type: 'text',
    //   placeholder: 'ABCDE1234F',
    //   required: true,
    // },
    // {
    //   name: 'aadhaarNumber',
    //   label: 'Aadhaar number',
    //   type: 'text',
    //   placeholder: '12 digit Aadhaar number',
    // },
    {
      name: 'dateOfBirth',
      label: 'Date of birth',
      type: 'date',
      placeholder: 'Select date of birth',
      required: true,
    },
  ];

  protected readonly financialFields: LoanApplicationField[] = [
    {
      name: 'loanAmount',
      label: 'Required loan amount',
      type: 'number',
      placeholder: 'Enter amount',
      required: true,
    },
    {
      name: 'preferredTenure',
      label: 'Preferred tenure',
      type: 'select',
      placeholder: 'Select tenure',
      required: true,
      options: ['12 months', '24 months', '36 months', '48 months', '60 months', '84 months', '120 months', '180 months', '240 months'],
    },
    {
      name: 'employmentType',
      label: 'Employment type',
      type: 'select',
      placeholder: 'Select employment type',
      required: true,
      options: ['Salaried', 'Self-employed', 'Business owner', 'Student', 'Retired'],
    },
    {
      name: 'monthlyIncome',
      label: 'Monthly income',
      type: 'number',
      placeholder: 'Enter monthly income',
      required: true,
    },
    {
      name: 'existingEmi',
      label: 'Existing EMI',
      type: 'number',
      placeholder: 'Enter existing EMI if any',
    },
  ];

  protected readonly addressFields: LoanApplicationField[] = [
    {
      name: 'city',
      label: 'City',
      type: 'text',
      placeholder: 'Enter city',
      required: true,
    },
    {
      name: 'state',
      label: 'State',
      type: 'text',
      placeholder: 'Enter state',
      required: true,
    },
    {
      name: 'pincode',
      label: 'Pincode',
      type: 'text',
      placeholder: '6 digit pincode',
      required: true,
    },
    {
      name: 'address',
      label: 'Current address',
      type: 'textarea',
      placeholder: 'Enter complete current address',
      required: true,
    },
  ];

  protected formData: Record<string, string> = {
    fullName: '',
    phoneNumber: '',
    email: '',
    // panNumber: '',
    // aadhaarNumber: '',
    dateOfBirth: '',
    loanAmount: '',
    preferredTenure: '',
    employmentType: '',
    monthlyIncome: '',
    existingEmi: '',
    city: '',
    state: '',
    pincode: '',
    address: '',
  };

  constructor() {
    this.route.paramMap.pipe(takeUntilDestroyed()).subscribe((params) => {
      const product = findLoanProduct(params.get('loanType'));

      if (!product) {
        void this.router.navigate(['/loans']);
        return;
      }

      this.loanProduct.set(product);
      // this.ensureProductFields(product);
      this.prefillLoggedInUser();

      // Dispatch load draft from API
      this.store.dispatch(LoanActions.loadDraft());

      // Listen for draft changes
      this.store.select(selectDraft).pipe(takeUntilDestroyed()).subscribe((draft) => {
        if (draft && draft.loanType === product.slug) {
          this.formData = { ...this.formData, ...draft.formData };
        }
      });

      this.submitted.set(false);
      this.applicationSaved.set(false);
      this.saveError.set('');

      if (isPlatformBrowser(this.platformId)) {
        this.loanProductsService.findBySlug(product.slug).subscribe({
          next: (backendProduct) => {
            this.loanProduct.set(backendProduct);
            // this.ensureProductFields(backendProduct);
          },
          error: () => {
            this.loanProduct.set(product);
          },
        });
      }
    });
  }

  protected updateField(field: LoanApplicationField, value: string): void {
    let nextValue = String(value ?? '');

    if (field.name === 'phoneNumber') {
      nextValue = nextValue.replace(/\D/g, '').slice(0, 10);
    }

    if (field.name === 'pincode') {
      nextValue = nextValue.replace(/\D/g, '').slice(0, 6);
    }

    if (field.name === 'panNumber') {
      nextValue = nextValue.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 10);
    }

    if (field.name === 'aadhaarNumber') {
      nextValue = nextValue.replace(/\D/g, '').slice(0, 12);
    }

    this.formData[field.name] = nextValue;
    this.store.dispatch(LoanActions.saveDraft({
      loanType: this.loanProduct().slug,
      formData: this.formData
    }));
  }

  protected isFieldInvalid(field: LoanApplicationField): boolean {
    return this.submitted() && !this.isFieldValid(field);
  }

  protected fieldError(field: LoanApplicationField): string {
    if (field.required && !this.formData[field.name]?.trim()) {
      return `${field.label} is required.`;
    }

    if (field.name === 'phoneNumber') {
      return 'Enter a valid 10 digit Indian mobile number.';
    }

    if (field.name === 'email') {
      return 'Enter a valid email address.';
    }

    if (field.name === 'panNumber') {
      return 'Enter a valid PAN number.';
    }

    if (field.name === 'aadhaarNumber') {
      return 'Enter a valid 12 digit Aadhaar number.';
    }

    if (field.name === 'pincode') {
      return 'Enter a valid 6 digit pincode.';
    }

    return `Enter a valid ${field.label.toLowerCase()}.`;
  }

  protected saveApplication(): void {
    this.submitted.set(true);
    this.saveError.set('');

    if (!this.formIsValid()) {
      return;
    }

    this.isSaving.set(true);
    this.loanApplicationsService
      .createApplication({
        loanType: this.loanProduct().slug,
        applicant: this.collectFieldValues(this.applicantFields),
        financial: this.collectFieldValues(this.financialFields),
        // productDetails: this.collectFieldValues(this.loanProduct().applicationFields),
        address: this.collectFieldValues(this.addressFields),
        consentAccepted: this.termsAccepted,
      })
      .subscribe({
        next: (response) => {
          this.isSaving.set(false);
          this.referenceNumber.set(response.referenceNumber);
          this.applicationSaved.set(true);
          this.store.dispatch(LoanActions.clearDraft());
          globalThis.scrollTo({ top: 0, behavior: 'smooth' });
        },
        error: (error: { error?: { message?: string } }) => {
          this.isSaving.set(false);
          this.saveError.set(
            error.error?.message ?? 'Unable to submit application right now.',
          );
        },
      });
  }

  protected formIsValid(): boolean {
    const allFields = [
      ...this.applicantFields,
      ...this.financialFields,
      ...this.addressFields,
      // ...this.loanProduct().applicationFields,
    ];

    return allFields.every((field) => this.isFieldValid(field)) && this.termsAccepted;
  }

  // private ensureProductFields(product: LoanProduct): void {
  //   for (const field of product.applicationFields) {
  //     this.formData[field.name] ??= '';
  //   }
  // }

  private prefillLoggedInUser(): void {
    const currentUser = this.authService.currentUser();

    if (!currentUser) {
      return;
    }

    if (!this.formData['phoneNumber']) {
      this.formData['phoneNumber'] = currentUser.phoneNumber;
    }

    if (!this.formData['fullName'] && currentUser.fullName) {
      this.formData['fullName'] = currentUser.fullName;
    }
  }

  private collectFieldValues(fields: LoanApplicationField[]): Record<string, string> {
    return fields.reduce<Record<string, string>>((values, field) => {
      values[field.name] = this.formData[field.name] ?? '';
      return values;
    }, {});
  }

  private isFieldValid(field: LoanApplicationField): boolean {
    const value = this.formData[field.name]?.trim() ?? '';

    if (!field.required && !value) {
      return true;
    }

    if (field.required && !value) {
      return false;
    }

    if (field.name === 'phoneNumber') {
      return /^[6-9]\d{9}$/.test(value);
    }

    if (field.name === 'email') {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    }

    if (field.name === 'panNumber') {
      return /^[A-Z]{5}[0-9]{4}[A-Z]$/.test(value);
    }

    if (field.name === 'aadhaarNumber') {
      return /^\d{12}$/.test(value);
    }

    if (field.name === 'pincode') {
      return /^\d{6}$/.test(value);
    }

    if (field.type === 'number') {
      return Number(value) > 0;
    }

    return true;
  }
}
