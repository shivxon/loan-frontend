import { Component, EventEmitter, HostListener, Input, Output, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../auth/auth.service';

export type AuthMode = 'login' | 'signup';

export interface AuthSuccess {
  phoneNumber: string;
  fullName?: string;
  mode: AuthMode;
}

@Component({
  selector: 'app-auth-modal',
  imports: [FormsModule],
  templateUrl: './auth-modal.html',
  styleUrl: './auth-modal.scss'
})
export class AuthModalComponent {
  private readonly authService = inject(AuthService);

  @Input() isOpen = false;
  @Input() mode: AuthMode = 'login';

  @Output() closed = new EventEmitter<void>();
  @Output() modeChange = new EventEmitter<AuthMode>();
  @Output() authenticated = new EventEmitter<AuthSuccess>();

  protected fullName = '';
  protected phoneNumber = '';
  protected consentAccepted = false;
  protected submitted = false;
  protected otpSent = false;
  protected readonly isSubmitting = signal(false);
  protected readonly backendError = signal('');

  protected get title(): string {
    return this.mode === 'login' ? 'Sign In To Your Account' : 'Create Your Account';
  }

  protected get actionLabel(): string {
    return this.mode === 'login' ? 'Login with OTP' : 'Sign up with OTP';
  }

  protected get normalizedPhone(): string {
    return this.phoneNumber.replace(/\D/g, '');
  }

  protected get phoneIsValid(): boolean {
    return /^[6-9]\d{9}$/.test(this.normalizedPhone);
  }

  protected get nameIsValid(): boolean {
    return this.mode === 'login' || this.fullName.trim().length >= 2;
  }

  protected get formIsValid(): boolean {
    return this.phoneIsValid && this.nameIsValid && this.consentAccepted;
  }

  protected switchMode(mode: AuthMode): void {
    this.mode = mode;
    this.submitted = false;
    this.otpSent = false;
    this.modeChange.emit(mode);
  }

  protected normalizePhone(value: string): void {
    this.phoneNumber = value.replace(/\D/g, '').slice(0, 10);
  }

  protected submit(): void {
    this.submitted = true;
    this.backendError.set('');

    if (!this.formIsValid) {
      return;
    }

    this.isSubmitting.set(true);
    this.authService
      .authenticatePhone({
        phoneNumber: this.normalizedPhone,
        fullName: this.fullName.trim() || undefined,
        mode: this.mode,
      })
      .subscribe({
        next: () => {
          this.isSubmitting.set(false);
          this.otpSent = true;
          this.authenticated.emit({
            phoneNumber: this.normalizedPhone,
            fullName: this.fullName.trim() || undefined,
            mode: this.mode,
          });
        },
        error: (error: { error?: { message?: string } }) => {
          this.isSubmitting.set(false);
          this.backendError.set(
            error.error?.message ?? 'Unable to verify phone right now.',
          );
        },
      });
  }

  protected close(): void {
    this.closed.emit();
  }

  protected onBackdropClick(event: MouseEvent): void {
    if (event.target === event.currentTarget) {
      this.close();
    }
  }

  @HostListener('document:keydown.escape')
  protected onEscape(): void {
    if (this.isOpen) {
      this.close();
    }
  }
}
