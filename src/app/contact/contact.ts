import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './contact.html',
  styleUrl: './contact.scss'
})
export class ContactComponent {
  private readonly fb = inject(FormBuilder);
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);

  contactForm = this.fb.group({
    name: ['', Validators.required],
    phone: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    message: [''],
    isNotRobot: [false, Validators.requiredTrue]
  });

  isSubmitting = false;
  submitSuccess = false;

  constructor() {
    this.title.setTitle('Contact Us | Elite Finance');
    this.meta.updateTag({ name: 'description', content: 'Contact Elite Finance for the best home loans in Adelaide.' });
  }

  onSubmit() {
    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;
    
    // Simulate API call
    setTimeout(() => {
      this.isSubmitting = false;
      this.submitSuccess = true;
      this.contactForm.reset();
      
      setTimeout(() => {
        this.submitSuccess = false;
      }, 5000);
    }, 1500);
  }
}
