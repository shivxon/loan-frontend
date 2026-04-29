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
    return this.calculateEmi(this.loanAmount(), this.interestRate(), this.tenureMonths());
  });

  protected readonly bankComparison = computed(() => {
    const tab = this.activeTabContent();
    const selected = this.selectedBanks();
    if (!tab?.bankOffers || selected.length === 0) return [];

    return tab.bankOffers
      .filter(offer => selected.includes(offer.id))
      .map(offer => {
        const emi = this.calculateEmi(this.loanAmount(), offer.interestRate, this.tenureMonths());
        return {
          ...offer,
          emi
        };
      });
  });

  private calculateEmi(principal: number, rate: number, months: number): number {
    const monthlyRate = rate / 12 / 100;
    if (monthlyRate === 0) return Math.round(principal / months);
    const multiplier = Math.pow(1 + monthlyRate, months);
    return Math.round((principal * monthlyRate * multiplier) / (multiplier - 1));
  }

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

  protected readonly reviewIndex = signal(0);

  constructor() {
    effect(() => {
      // Set initial tab if none selected
      if (!this.activeTab() && this.tabs?.length > 0) {
        this.activeTab.set(this.tabs[0].id);
      }
    });

    effect(() => {
      // Reset review index when active tab changes
      if (this.activeTab()) {
        this.reviewIndex.set(0);
      }
    });
  }

  protected nextReview(): void {
    const reviews = this.activeTabContent()?.reviews;
    if (reviews?.length) {
      this.reviewIndex.set((this.reviewIndex() + 1) % reviews.length);
    }
  }

  protected prevReview(): void {
    const reviews = this.activeTabContent()?.reviews;
    if (reviews?.length) {
      this.reviewIndex.set((this.reviewIndex() - 1 + reviews.length) % reviews.length);
    }
  }

  protected setReview(index: number): void {
    this.reviewIndex.set(index);
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

  protected readonly selectedBanks = signal<string[]>([]);
  protected readonly isBankModalOpen = signal(false);
  protected readonly bankSearchTerm = signal('');

  protected readonly filteredBanks = computed(() => {
    const term = this.bankSearchTerm().toLowerCase();
    const tab = this.activeTabContent();
    if (!tab?.bankOffers) return [];
    return tab.bankOffers.filter(b => b.bankName.toLowerCase().includes(term));
  });

  protected openBankModal(): void {
    this.isBankModalOpen.set(true);
  }

  protected closeBankModal(): void {
    this.isBankModalOpen.set(false);
    this.bankSearchTerm.set('');
  }

  protected selectBankFromModal(bank: any): void {
    this.toggleBank(bank);
    this.closeBankModal();
  }

  protected toggleBank(bank: any): void {
    const current = this.selectedBanks();
    if (current.includes(bank.id)) {
      this.selectedBanks.set([]);
    } else {
      this.selectedBanks.set([bank.id]);
      this.interestRate.set(bank.interestRate);
    }
  }

  protected updateLoanAmount(event: Event): void {
    this.loanAmount.set(Number((event.target as HTMLInputElement).value));
  }

  protected updateTenure(event: Event): void {
    this.tenureMonths.set(Number((event.target as HTMLInputElement).value));
  }

  protected updateInterest(event: Event): void {
    this.interestRate.set(Number((event.target as HTMLInputElement).value));
    this.selectedBanks.set([]); // Clear selections on manual adjustment
  }

  protected formatCurrency(value: number): string {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(value);
  }
}
