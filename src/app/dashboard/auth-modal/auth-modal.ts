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
  private _isOpen = false;

  @Input()
  set isOpen(value: boolean) {
    if (value && !this._isOpen) {
      this.resetForm();
    }

    this._isOpen = value;
  }

  get isOpen(): boolean {
    return this._isOpen;
  }

  @Input() mode: AuthMode = 'login';

  @Output() closed = new EventEmitter<void>();
  @Output() modeChange = new EventEmitter<AuthMode>();
  @Output() authenticated = new EventEmitter<AuthSuccess>();

  protected fullName = '';
  protected phoneNumber = '';
  protected consentAccepted = false;
  protected submitted = false;
  protected otpSubmitted = false;
  protected otpSent = false;
  protected otpCode = '';
  protected readonly isSubmitting = signal(false);
  protected readonly backendError = signal('');
  protected readonly otpRequestMessage = signal('');
  protected readonly devOtp = signal('');

  protected get title(): string {
    if (this.otpSent) {
      return 'Verify Your Phone Number';
    }

    return this.mode === 'login' ? 'Sign In To Your Account' : 'Create Your Account';
  }

  protected get actionLabel(): string {
    if (this.otpSent) {
      return 'Verify OTP';
    }

    return this.mode === 'login' ? 'Login with OTP' : 'Sign up with OTP';
  }

  protected get normalizedPhone(): string {
    return this.phoneNumber.replace(/\D/g, '');
  }

  protected get phoneIsValid(): boolean {
    return /^[6-9]\d{9}$/.test(this.normalizedPhone);
  }

  protected get normalizedOtp(): string {
    return this.otpCode.replace(/\D/g, '');
  }

  protected get otpIsValid(): boolean {
    return /^\d{6}$/.test(this.normalizedOtp);
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
    this.resetOtpStep();
    this.modeChange.emit(mode);
  }

  protected normalizePhone(value: string): void {
    this.phoneNumber = value.replace(/\D/g, '').slice(0, 10);
  }

  protected normalizeOtp(value: string): void {
    this.otpCode = value.replace(/\D/g, '').slice(0, 6);
  }

  protected submit(): void {
    if (this.otpSent) {
      this.verifyOtp();
      return;
    }

    this.requestOtp();
  }

  protected resendOtp(): void {
    this.requestOtp();
  }

  protected editPhoneNumber(): void {
    this.resetOtpStep();
  }

  private requestOtp(): void {
    this.submitted = true;
    this.backendError.set('');

    if (!this.formIsValid) {
      return;
    }

    this.isSubmitting.set(true);
    this.authService
      .requestPhoneOtp({
        phoneNumber: this.normalizedPhone,
        fullName: this.fullName.trim() || undefined,
        mode: this.mode,
      })
      .subscribe({
        next: (response) => {
          this.isSubmitting.set(false);
          this.otpSent = true;
          this.otpSubmitted = false;
          this.otpCode = '';
          this.otpRequestMessage.set(
            response.message || `OTP sent to +91 ${this.normalizedPhone}.`,
          );
          this.devOtp.set(response.devOtp ?? '');
        },
        error: (error: { error?: { message?: string } }) => {
          this.isSubmitting.set(false);
          this.backendError.set(
            error.error?.message ?? 'Unable to send OTP right now.',
          );
        },
      });
  }

  private verifyOtp(): void {
    this.otpSubmitted = true;
    this.backendError.set('');

    if (!this.otpIsValid) {
      return;
    }

    this.isSubmitting.set(true);
    this.authService
      .verifyPhoneOtp({
        phoneNumber: this.normalizedPhone,
        fullName: this.fullName.trim() || undefined,
        mode: this.mode,
        otp: this.normalizedOtp,
      })
      .subscribe({
        next: () => {
          this.isSubmitting.set(false);
          this.authenticated.emit({
            phoneNumber: this.normalizedPhone,
            fullName: this.fullName.trim() || undefined,
            mode: this.mode,
          });
        },
        error: (error: { error?: { message?: string } }) => {
          this.isSubmitting.set(false);
          this.backendError.set(
            error.error?.message ?? 'Unable to verify OTP right now.',
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

  private resetOtpStep(): void {
    this.otpSent = false;
    this.otpSubmitted = false;
    this.otpCode = '';
    this.otpRequestMessage.set('');
    this.devOtp.set('');
    this.backendError.set('');
  }

  private resetForm(): void {
    this.fullName = '';
    this.phoneNumber = '';
    this.consentAccepted = false;
    this.submitted = false;
    this.isSubmitting.set(false);
    this.resetOtpStep();
  }
}
