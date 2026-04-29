export type DashboardTabId =
    | 'overview'
    | 'features'
    | 'eligibility'
    | 'documents'
    | 'emi'
    | 'fees'
    | 'reviews'
    | 'faq';

export interface DashboardFAQ {
    question: string;
    answer: string;
    open?: boolean; // for accordion UI
}

export interface DashboardTab {
    id: DashboardTabId;
    label: string;
    eyebrow: string;
    title: string;
    description: string;

    // 👇 keep for non-FAQ tabs
    points?: string[];

    // 👇 NEW (for FAQ tab)
    faqs?: DashboardFAQ[];

    metrics: { value: string; label: string }[];
}