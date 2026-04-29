export type DashboardTabId =
    | 'overview'
    | 'features'
    | 'eligibility'
    | 'documents'
    | 'emi'
    | 'fees'
    | 'reviews'
    | 'faq';

export interface DashboardTab {
    id: DashboardTabId;
    label: string;
    eyebrow: string;
    title: string;
    description: string;
    points: string[];
    metrics: { value: string; label: string }[];
}