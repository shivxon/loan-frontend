import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TeamComponent } from '../shared/team/team.component';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [RouterLink, TeamComponent],
  templateUrl: './about.html',
  styleUrl: './about.scss',
})
export class AboutComponent {
  protected readonly stats = [
    { value: '20+', label: 'Years of Service' },
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
      description: 'Fast approvals with a fully digital, smooth application process.',
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
}
