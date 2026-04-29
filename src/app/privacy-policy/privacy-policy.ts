import { Component, OnInit, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-privacy-policy',
  standalone: true,
  templateUrl: './privacy-policy.html',
  styleUrl: './privacy-policy.scss'
})
export class PrivacyPolicyComponent implements OnInit {
  private title = inject(Title);
  private meta = inject(Meta);

  ngOnInit() {
    this.title.setTitle('Privacy Policy | Shivam Loans');
    this.meta.updateTag({ name: 'description', content: 'Learn how Shivam Loans collects, uses, and protects your personal information. Read our comprehensive Privacy Policy.' });
    this.addJsonLd();
  }

  private addJsonLd() {
    if (typeof document === 'undefined') return;
    const schema = {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Privacy Policy - Shivam Loans",
      "description": "Information on how Shivam Loans handles user data and privacy.",
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
