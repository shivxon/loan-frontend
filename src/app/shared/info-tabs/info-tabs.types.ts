export interface Review {
  id: string;
  userName: string;
  userRole?: string;
  userAvatar?: string;
  rating: number;
  comment: string;
  date: string;
}

export interface BankOffer {
  id: string;
  bankName: string;
  bankLogo?: string;
  interestRate: number;
  processingFee?: string;
}

export interface InfoTab {
  id: string;
  label: string;
  eyebrow?: string;
  title?: string;
  description?: string;
  points?: string[];
  faqs?: { question: string; answer: string; open?: boolean }[];
  metrics?: { value: string; label: string }[];
  reviews?: Review[];
  bankOffers?: BankOffer[];
}
