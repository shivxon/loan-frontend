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
    this.title.setTitle('Privacy Policy | Elite Finance');
    this.meta.updateTag({ name: 'description', content: 'Learn how Elite Finance collects, uses, and protects your personal information. Read our comprehensive Privacy Policy.' });
    this.addJsonLd();
  }

  private addJsonLd() {
    if (typeof document === 'undefined') return;
    const schema = {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Privacy Policy - Elite Finance",
      "description": "Information on how Elite Finance handles user data and privacy.",
      "publisher": {
        "@type": "Organization",
        "name": "Elite Finance"
      },
      "dateModified": new Date().toISOString()
    };
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(schema);
    document.head.appendChild(script);
  }
}
