import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-about',
  imports: [RouterLink],
  templateUrl: './about.html',
  styleUrl: './about.scss',
})
export class AboutComponent {
  protected readonly stats = [
    { value: '10+', label: 'Years of Service' },
    { value: '1K+', label: 'Happy Customers' },
    { value: '₹50Cr+', label: 'Loans Disbursed' },
    { value: '15+', label: 'Lending Partners' },
  ];

  protected readonly values = [
    {
      icon: '🔒',
      title: 'Trust & Security',
      description: 'Your data is encrypted and handled with the highest security standards.',
    },
    {
      icon: '⚡',
      title: 'Speed & Efficiency',
      description: 'Fast approvals with a fully digital, paperless application process.',
    },
    {
      icon: '🤝',
      title: 'Customer First',
      description: 'Dedicated support team available to guide you at every step.',
    },
    {
      icon: '📊',
      title: 'Transparency',
      description: 'Clear terms, no hidden charges, and upfront fee disclosure.',
    },
  ];

  protected readonly team = [
    { name: 'Shivam Vashishtha', role: 'Founder & CEO', initials: 'SV' },
    { name: 'Vinay Vashishtha', role: 'Head of Operations', initials: 'VV' },

  ];
}
