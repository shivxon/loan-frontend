export interface LoanFAQ {
    question: string;
    answer: string;
    open?: boolean;
}

export type LoanFAQMap = Record<string, LoanFAQ[]>;

export const LOAN_FAQS: LoanFAQMap = {

    'personal-loan': [
        {
            question: 'What is minimum salary for personal loan?',
            answer: 'Most lenders require ₹15,000–₹25,000 monthly income.',
        },
        {
            question: 'What is the minimum CIBIL score required?',
            answer: 'A score of 650+ improves approval chances, while 750+ gets better interest rates.',
        },
        {
            question: 'How fast can I get a personal loan?',
            answer: 'Loan approval usually takes 24–48 hours, sometimes within a few hours.',
        },
        {
            question: 'Can I get personal loan without salary slip?',
            answer: 'Yes, self-employed individuals can apply using ITR or bank statements.',
        }
    ],

    'car-loan': [
        {
            question: 'What is the maximum tenure for car loan?',
            answer: 'Car loans typically have tenure up to 5–7 years.',
        },
        {
            question: 'Can I get 100% car financing?',
            answer: 'Some lenders offer up to 100% on-road price financing depending on profile.',
        },
        {
            question: 'Is down payment required for car loan?',
            answer: 'Usually 10–20% down payment is required.',
        }
    ],

    'home-loan': [
        {
            question: 'What is maximum tenure for home loan?',
            answer: 'Home loans can go up to 20–30 years.',
        },
        {
            question: 'What is the interest rate for home loan?',
            answer: 'Interest rates usually start from 8% onwards depending on lender and profile.',
        },
        {
            question: 'Can I prepay home loan without charges?',
            answer: 'Most floating rate loans allow free prepayment.',
        }
    ]

};


export function getLoanFaqs(slug: string | null): LoanFAQ[] {
    if (!slug) return [];
    return LOAN_FAQS[slug] ?? [];
}