import { DashboardTab } from './dashboard.types';

export const DASHBOARD_TABS: DashboardTab[] = [
    {
        id: 'overview',
        label: 'Overview',
        eyebrow: 'Personal loan overview',
        title: 'A faster dashboard for every loan decision',
        description:
            'Track loan options, eligibility, documents, repayments, and reviews from one clean workspace built for quick action.',
        points: [
            'Compare multiple lenders without repeating your details.',
            'See approval status, document readiness, and next steps in one place.',
            'Start with phone OTP and continue the application whenever you return.',
        ],
        metrics: [
            { value: '10Cr', label: 'Popular loan size' },
            { value: '11.5%', label: 'Sample rate' },
            { value: '36 mo', label: 'Preferred tenure' },
        ],
    },
    // 👇 keep rest as-is (just paste)
];