import { Component, OnInit, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-terms-conditions',
  standalone: true,
  templateUrl: './terms-conditions.html',
  styleUrl: './terms-conditions.scss'
})
export class TermsConditionsComponent implements OnInit {
  private title = inject(Title);
  private meta = inject(Meta);

  ngOnInit() {
    this.title.setTitle('Terms and Conditions | Shivam Loans');
    this.meta.updateTag({ name: 'description', content: 'Read the terms and conditions for using Shivam Loans services. Understand your rights and responsibilities.' });
    this.addJsonLd();
  }

  private addJsonLd() {
    if (typeof document === 'undefined') return;
    const schema = {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Terms and Conditions - Shivam Loans",
      "description": "Legal terms for using Shivam Loans services.",
      "publisher": {
        "@type": "Organization",
        "name": "Shivam Loans"
      },
      "dateModified": new Date().toISOString()
    };
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(schema);
    document.head.appendChild(script);
  }
}
