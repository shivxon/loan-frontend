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
        },
        {
            question: 'What is the maximum amount I can borrow?',
            answer: 'Depending on your income and repayment capacity, you can borrow up to ₹40-50 Lakhs.',
        },
        {
            question: 'Are there any hidden charges?',
            answer: 'Processing fees (usually 1-3%) and documentation charges are common. We ensure full transparency.',
        },
        {
            question: 'Can I close my loan early?',
            answer: 'Yes, most banks allow foreclosure after 6-12 EMIs, though some charges may apply.',
        },
        {
            question: 'Which bank offers the lowest personal loan interest rate in 2024?',
            answer: 'Public sector banks like SBI and Bank of Baroda currently offer some of the lowest rates starting from 10.50%. HDFC and ICICI also have competitive rates for elite customers.',
        },
        {
            question: 'How to get a 5 Lakh personal loan with low EMI?',
            answer: 'For a 5 Lakh loan, choosing a longer tenure of 60 months can bring your EMI down to approx ₹10,700 at 10.5% interest.',
        },
        {
            question: 'Can I get a personal loan in Bangalore or Hyderabad easily?',
            answer: 'Yes, as major IT hubs, these cities have high lender density. Tech employees in Bangalore and Hyderabad often get preferential rates and faster digital approvals.',
        },
        {
            question: 'Is it possible to get a personal loan for 10 Lakhs if my salary is 50k?',
            answer: 'Yes, usually banks lend up to 15-20 times your monthly salary. With a 50k salary, a 10 Lakh loan is highly feasible if you have no other existing debts.',
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
        },
        {
            question: 'Can I get a loan for a used car?',
            answer: 'Yes, pre-owned car loans are available, though interest rates are slightly higher than new cars.',
        },
        {
            question: 'What documents are needed for a car loan?',
            answer: 'ID proof, Address proof, Income proof (Salary slips/ITR), and Proforma Invoice from the dealer.',
        },
        {
            question: 'Does the car need to be insured?',
            answer: 'Yes, comprehensive insurance is mandatory for the entire loan tenure.',
        },
        {
            question: 'Which is the best bank for car loans in Mumbai or Delhi?',
            answer: 'HDFC Bank, ICICI Bank, and Axis Bank are leaders in major metros, offering instant tie-ups with dealerships for spot approvals.',
        },
        {
            question: 'What is the EMI for a 10 Lakh car loan?',
            answer: 'For 10 Lakhs at 8.5% interest for 7 years, the EMI would be approximately ₹15,800 per month.',
        },
        {
            question: 'Can I get a car loan with 7% interest?',
            answer: 'While rare, some festive offers or EV-specific (Green) car loans from banks like SBI can offer rates close to 7.5-8%.',
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
        },
        {
            question: 'Who can be a co-applicant?',
            answer: 'Spouses, parents, or siblings can usually be co-applicants to increase loan eligibility.',
        },
        {
            question: 'What is PMAY subsidy?',
            answer: 'Pradhan Mantri Awas Yojana offers interest subsidies to eligible first-time home buyers.',
        },
        {
            question: 'Is property insurance necessary?',
            answer: 'Yes, lenders require property insurance to protect against fire and natural calamities.',
        },
        {
            question: 'Can I get a loan for home renovation?',
            answer: 'Yes, home improvement or renovation loans are available at similar rates to home loans.',
        },
        {
            question: 'How to get the cheapest home loan in Chennai or Pune?',
            answer: 'Compare LIC HFL, SBI, and HDFC. Metros like Pune and Chennai have many competitive local housing finance companies as well.',
        },
        {
            question: 'What is the EMI for a 50 Lakh home loan for 20 years?',
            answer: 'At an 8.5% interest rate, the EMI for 50 Lakhs would be approximately ₹43,391 per month.',
        },
        {
            question: 'Can I get a 1 Crore home loan if my family income is 2 Lakhs per month?',
            answer: 'Yes, with a 2 Lakh monthly income, you can easily qualify for a 1 Crore loan, as your EMI will be around 45% of your take-home pay.',
        }
    ],

    'business-loan': [
        {
            question: 'What is the eligibility for a business loan?',
            answer: 'Your business should be at least 2-3 years old with stable turnover and profitable ITRs.',
        },
        {
            question: 'Do I need to provide collateral?',
            answer: 'Unsecured business loans up to ₹50 Lakhs are available without collateral. Larger amounts may require security.',
        },
        {
            question: 'What is the maximum loan amount?',
            answer: 'Unsecured loans up to ₹1 Crore and secured loans up to ₹10-20 Crores are possible.',
        },
        {
            question: 'How is the interest rate determined?',
            answer: 'Based on business vintage, credit score, annual turnover, and industry type.',
        },
        {
            question: 'Can a startup get a business loan?',
            answer: 'Startups can apply under specific government schemes like Mudra or Startup India.',
        },
        {
            question: 'What are the required documents?',
            answer: 'KYC, Business proof, 12-month bank statements, and 2-3 years of audited financials.',
        },
        {
            question: 'Best banks for business loans in Ahmedabad or Surat?',
            answer: 'Banks like ICICI and Kotak Mahindra have strong presence in industrial hubs like Ahmedabad and Surat, offering tailored trade and manufacturing loans.',
        },
        {
            question: 'Can I get an unsecured business loan of 25 Lakhs?',
            answer: 'Yes, if your business shows a healthy turnover and good repayment history, multiple lenders can offer 25-30 Lakhs without any security.',
        },
        {
            question: 'What is the lowest interest rate for MSME loans?',
            answer: 'Under CGTMSE or SIDBI schemes, interest rates can be as low as 8.5% to 9.5% for eligible small businesses.',
        }
    ],

    'gold-loan': [
        {
            question: 'How much loan can I get against my gold?',
            answer: 'Lenders typically offer up to 75% of the market value of your gold (LTV).',
        },
        {
            question: 'What kind of gold is accepted?',
            answer: '18K to 24K gold jewelry and coins are accepted. Bullion is usually not accepted.',
        },
        {
            question: 'What is the processing time?',
            answer: 'Gold loans are the fastest, often disbursed within 30-60 minutes.',
        },
        {
            question: 'Do I need a high CIBIL score for a gold loan?',
            answer: 'No, since it is a secured loan, credit score requirements are very lenient.',
        },
        {
            question: 'What are the repayment options?',
            answer: 'You can pay monthly interest, bullet repayment (principal + interest at end), or regular EMIs.',
        },
        {
            question: 'Is my gold safe?',
            answer: 'Yes, your gold is kept in highly secure, insured bank vaults.',
        },
        {
            question: 'Where can I get the lowest gold loan interest rate in Kolkata or Jaipur?',
            answer: 'Muthoot Finance, Manappuram, and banks like Canara Bank offer very competitive rates in these regions.',
        },
        {
            question: 'Can I get a 10 Lakh gold loan instantly?',
            answer: 'Yes, as long as you have the required quantity of gold (approx 250-300 grams of 22K gold), you can get 10 Lakhs in under an hour.',
        }
    ],

    'education-loan': [
        {
            question: 'Does the loan cover living expenses?',
            answer: 'Yes, education loans cover tuition fees, books, equipment, and hostel/living expenses.',
        },
        {
            question: 'Is a co-applicant mandatory?',
            answer: 'Yes, a parent or guardian must usually be a co-borrower/guarantor.',
        },
        {
            question: 'What is the moratorium period?',
            answer: 'It is a "holiday period" during the course plus 6-12 months before you start repaying EMIs.',
        },
        {
            question: 'Can I get a loan for studies abroad?',
            answer: 'Yes, loans for international universities are a major part of education financing.',
        },
        {
            question: 'What is the maximum loan amount?',
            answer: 'Up to ₹15-20 Lakhs for studies in India and ₹1 Crore+ for studies abroad.',
        },
        {
            question: 'Is there any tax benefit?',
            answer: 'Yes, interest paid on education loans is deductible under Section 80E of the Income Tax Act.',
        },
        {
            question: 'Best banks for study abroad loans in Chandigarh or Kochi?',
            answer: 'HDFC Credila and SBI Global Ed-Vantage are very popular in these regions for students heading to Canada, USA, or UK.',
        },
        {
            question: 'Can I get an education loan of 40 Lakhs without collateral?',
            answer: 'Yes, for premier institutes (IIT/IIM/Top Ivy League), many banks offer up to 40-50 Lakhs without any collateral.',
        }
    ],

    'general': [
        {
            question: 'Does applying for a loan guarantee approval?',
            answer: 'No, loan approval depends on your income, credit profile, and lender policy.',
        },
        {
            question: 'How is the final interest rate determined?',
            answer: 'The rate is determined by your CIBIL score, monthly income, employment stability, and the lender\'s specific criteria.',
        },
        {
            question: 'Is my data secure with Elite Finance?',
            answer: 'Yes, we use bank-grade encryption and strictly follow data privacy laws to keep your information safe.',
        },
        {
            question: 'What happens after I submit my application?',
            answer: 'Our loan experts review your profile and match you with the best bank offers. You will receive a callback or notification within 24 hours.',
        },
        {
            question: 'Are there any charges for using this platform?',
            answer: 'No, Elite Finance is a free platform for customers to compare and apply for loans.',
        },
        {
            question: 'What is the minimum CIBIL score required for most loans?',
            answer: 'A score of 700 or above is considered good, though some lenders accept 650+ for secured loans.',
        },
        {
            question: 'Can I apply for multiple loans at once?',
            answer: 'It is recommended to apply for one at a time to avoid multiple hard inquiries on your credit report.',
        },
        {
            question: 'How do I track my application status?',
            answer: 'You can track it directly from your dashboard after logging in with your mobile number.',
        },
        {
            question: 'What documents are universally required?',
            answer: 'PAN Card, Aadhaar Card, and latest 6-month bank statements are usually required for all loan types.',
        }
    ]

};


export function getLoanFaqs(slug: string | null): LoanFAQ[] {
    if (!slug) return [];
    return LOAN_FAQS[slug] ?? [];
}