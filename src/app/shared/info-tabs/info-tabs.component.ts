import { Component, Input, Output, EventEmitter, signal, computed, effect } from '@angular/core';
import { InfoTab } from './info-tabs.types';

@Component({
  selector: 'app-info-tabs',
  standalone: true,
  templateUrl: './info-tabs.component.html',
  styleUrl: './info-tabs.component.scss'
})
export class InfoTabsComponent {
  @Input({ required: true }) tabs: InfoTab[] = [];
  @Input() set activeTabId(id: string | null | undefined) {
    if (id && this.tabs.some(t => t.id === id)) {
      this.activeTab.set(id);
    }
  }

  @Output() tabChange = new EventEmitter<string>();

  protected readonly activeTab = signal<string>('');

  protected readonly activeTabContent = computed(() => {
    return this.tabs.find((tab) => tab.id === this.activeTab()) ?? this.tabs[0];
  });

  protected readonly loanAmount = signal(50000);
  protected readonly tenureMonths = signal(36);
  protected readonly interestRate = signal(11.5);

  protected readonly monthlyEmi = computed(() => {
    const monthlyRate = this.interestRate() / 12 / 100;
    const months = this.tenureMonths();
    const principal = this.loanAmount();

    if (monthlyRate === 0) {
      return Math.round(principal / months);
    }

    const multiplier = Math.pow(1 + monthlyRate, months);
    return Math.round((principal * monthlyRate * multiplier) / (multiplier - 1));
  });

  protected readonly totalPayable = computed(
    () => this.monthlyEmi() * this.tenureMonths(),
  );

  protected readonly totalInterest = computed(
    () => this.totalPayable() - this.loanAmount()
  );

  protected readonly interestPercentage = computed(() => {
    const total = this.totalPayable();
    if (total === 0) return 0;
    return (this.totalInterest() / total) * 100;
  });

  constructor() {
    effect(() => {
      // Set initial tab if none selected
      if (!this.activeTab() && this.tabs?.length > 0) {
        this.activeTab.set(this.tabs[0].id);
      }
    }, { allowSignalWrites: true });
  }

  protected selectTab(tabId: string): void {
    this.activeTab.set(tabId);
    this.tabChange.emit(tabId);
    
    if (tabId === 'faq') {
      const tab = this.activeTabContent();
      if (tab?.faqs?.length) {
        this.addFaqSchema(tab.faqs);
      }
    }
  }

  addFaqSchema(faqs: { question: string; answer: string }[]) {
    if (typeof document === 'undefined') return;
    const existing = document.querySelectorAll('script[type="application/ld+json"]');
    existing.forEach(el => el.remove());

    const schema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": faqs.map(faq => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer
        }
      }))
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(schema);

    document.head.appendChild(script);
  }

  protected updateLoanAmount(event: Event): void {
    this.loanAmount.set(Number((event.target as HTMLInputElement).value));
  }

  protected updateTenure(event: Event): void {
    this.tenureMonths.set(Number((event.target as HTMLInputElement).value));
  }

  protected updateInterest(event: Event): void {
    this.interestRate.set(Number((event.target as HTMLInputElement).value));
  }

  protected formatCurrency(value: number): string {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(value);
  }
}
