import { InfoTab } from '../shared/info-tabs/info-tabs.types';

export const DASHBOARD_TABS: InfoTab[] = [
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
    {
        id: 'features',
        label: 'Features',
        eyebrow: 'Loan features',
        title: 'Flexible offers matched to your profile',
        description:
            'Give customers a polished place to review interest ranges, tenure choices, approval speed, and repayment flexibility.',
        points: [
            'Instant profile review with partner banks and NBFCs.',
            'Tenures from 12 to 60 months with transparent monthly repayment.',
            'Paperless application journey with status nudges.',
        ],
        metrics: [
            { value: '12-60', label: 'Month tenure' },
            { value: '0', label: 'Branch visits' },
            { value: '15+', label: 'Lender partners' },
        ],
    },
    {
        id: 'eligibility',
        label: 'Eligibility',
        eyebrow: 'Eligibility checks',
        title: 'Know whether a customer is ready to apply',
        description:
            'A clear eligibility section keeps the journey focused before the user enters the full application flow.',
        points: [
            'Age between 21 and 60 years.',
            'Stable salary or business income with bank statement proof.',
            'Valid PAN, address proof, and active Indian mobile number.',
        ],
        metrics: [
            { value: '21+', label: 'Minimum age' },
            { value: '25k', label: 'Monthly income' },
            { value: '650+', label: 'Helpful score' },
        ],
    },
    {
        id: 'documents',
        label: 'Documents',
        eyebrow: 'Document checklist',
        title: 'Keep document readiness visible',
        description:
            'The dashboard makes it easy to understand what is pending before moving a lead to lender verification.',
        points: [
            'PAN card and Aadhaar or passport for identity.',
            'Salary slips, ITR, or business proof based on employment type.',
            'Recent bank statements for income and repayment assessment.',
        ],
        metrics: [
            { value: 'PAN', label: 'Identity' },
            { value: '3 mo', label: 'Statements' },
            { value: 'OTP', label: 'Mobile proof' },
        ],
    },
    {
        id: 'emi',
        label: 'EMI Calculator',
        eyebrow: 'EMI estimate',
        title: 'Estimate monthly payments before applying',
        description:
            'Move amount, tenure, and interest rate to show a realistic monthly repayment before a customer submits details.',
        points: [
            'Interactive amount and tenure inputs.',
            'Clear monthly EMI and total payable output.',
            'Use the estimate to guide the customer into signup.',
        ],
        metrics: [],
    },
    {
        id: 'fees',
        label: 'Fees & Charges',
        eyebrow: 'Transparent costs',
        title: 'Show important charges early',
        description:
            'Give customers a direct view of processing fees, late charges, foreclosure rules, and taxes before they commit.',
        points: [
            'Processing fee generally ranges from 1% to 3% of loan amount.',
            'Late payment charges depend on lender policy.',
            'GST and statutory charges apply where applicable.',
        ],
        metrics: [
            { value: '1-3%', label: 'Processing fee' },
            { value: '0-5%', label: 'Foreclosure range' },
            { value: 'GST', label: 'As applicable' },
        ],
    },
    {
        id: 'reviews',
        label: 'Reviews',
        eyebrow: 'Customer reviews',
        title: 'Build confidence with visible service quality',
        description:
            'Use a compact review tab to highlight approval experience, support quality, and clarity of repayment information.',
        points: [
            'Customers value a quick callback after OTP verification.',
            'Clear document requests reduce application drop-off.',
            'EMI visibility helps users choose responsible loan sizes.',
        ],
        metrics: [
            { value: '4.8', label: 'Service rating' },
            { value: '50k+', label: 'Monthly users' },
            { value: '92%', label: 'Digital completion' },
        ],
    },
    {
        id: 'faq',
        label: "FAQ's",
        eyebrow: 'Common questions',
        title: 'Answer the questions that slow users down',
        description:
            'A practical FAQ tab can reduce support calls while keeping the user inside the loan journey.',
        // points: [
        //     'Applying does not guarantee approval from a lender.',
        //     'Final rate depends on income, bureau score, and lender policy.',
        //     'OTP login keeps the application connected to the customer mobile number.',
        // ],

        faqs: [
            {
                question: 'Does applying for a loan guarantee approval?',
                answer: 'No, loan approval depends on your income, credit profile, and lender policy.',
                open: true
            },
            {
                question: 'What is minimum salary for personal loan?',
                answer: 'Most lenders require ₹15,000–₹25,000 monthly income.'
            },
            {
                question: 'How quickly can I get a loan approved?',
                answer: 'Loan approval typically takes 24–48 hours.'
            },
            {
                question: 'How is loan eligibility calculated?',
                answer: 'It depends on your income, existing EMIs, and employment stability.'
            }
        ],

        metrics: [
            { value: 'OTP', label: 'Login method' },
            { value: '24x7', label: 'Dashboard access' },
            { value: 'PDF', label: 'Offer docs' },
        ],
    },
];