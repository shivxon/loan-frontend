export type LoanFieldType = 'date' | 'email' | 'number' | 'select' | 'tel' | 'text' | 'textarea';

export interface LoanApplicationField {
  name: string;
  label: string;
  type: LoanFieldType;
  placeholder?: string;
  required?: boolean;
  options?: string[];
}

export interface LoanProduct {
  slug: string;
  title: string;
  shortName: string;
  description: string;
  maxAmount: string;
  tenure: string;
  rate: string;
  badge?: string;
  documents: string[];
  applicationFields: LoanApplicationField[];
  longDescription?: string;
}

export const LOAN_PRODUCTS: LoanProduct[] = [
  {
    slug: 'personal-loan',
    title: 'Personal Loan',
    shortName: 'Personal',
    description: 'For weddings, travel, medical needs, debt consolidation, and urgent expenses.',
    maxAmount: '₹25L',
    tenure: '12-60 months',
    rate: '10.5% onwards',
    badge: 'Fastest approval',
    documents: ['PAN card', 'Aadhaar or address proof', 'Salary slips or income proof', 'Bank statement'],
    applicationFields: [
      {
        name: 'companyName',
        label: 'Company or employer name',
        type: 'text',
        placeholder: 'Example: Shivam Infotech',
        required: true,
      },
      {
        name: 'salaryAccountBank',
        label: 'Salary account bank',
        type: 'text',
        placeholder: 'Example: HDFC Bank',
        required: true,
      },
    ],
    longDescription: 'A Personal Loan is a multi-purpose, unsecured loan facility that individuals can avail themselves of to meet various financial needs, such as weddings, travel, medical emergencies, or debt consolidation. Unlike secured loans, it does not require any collateral or security, making it a quick and accessible option for urgent expenses based on the borrower’s income and credit profile.',
  },
  {
    slug: 'home-loan',
    title: 'Home Loan',
    shortName: 'Home',
    description: 'For buying, constructing, or renovating a residential property.',
    maxAmount: '₹5Cr',
    tenure: '5-30 years',
    rate: '8.4% onwards',
    badge: 'Long tenure',
    documents: ['PAN card', 'Property papers', 'Income proof', 'Bank statement'],
    applicationFields: [
      {
        name: 'propertyCity',
        label: 'Property city',
        type: 'text',
        placeholder: 'Enter property city',
        required: true,
      },
      {
        name: 'propertyValue',
        label: 'Estimated property value',
        type: 'number',
        placeholder: 'Enter property value',
        required: true,
      },
      {
        name: 'propertyStatus',
        label: 'Property status',
        type: 'select',
        placeholder: 'Select property status',
        required: true,
        options: ['Ready to move', 'Under construction', 'Plot purchase', 'Renovation'],
      },
    ],
    longDescription: 'A Home Loan is a secured loan facility offered by banks and Housing Finance Companies for purchasing, constructing, renovating, or extending an existing residential property. The loan is backed by the underlying property till the loan repayment. In case of default by the borrower, the lender has the legal right to take the concerned property into possession and then auction it to recover the unpaid loan amount.',
  },
  {
    slug: 'business-loan',
    title: 'Business Loan',
    shortName: 'Business',
    description: 'For working capital, stock purchase, equipment, expansion, and cash flow support.',
    maxAmount: '₹75L',
    tenure: '12-84 months',
    rate: '13% onwards',
    badge: 'Collateral-free options',
    documents: ['PAN card', 'GST certificate', 'ITR or financials', 'Current account statement'],
    applicationFields: [
      {
        name: 'businessName',
        label: 'Business name',
        type: 'text',
        placeholder: 'Enter registered business name',
        required: true,
      },
      {
        name: 'annualTurnover',
        label: 'Annual turnover',
        type: 'number',
        placeholder: 'Enter annual turnover',
        required: true,
      },
      {
        name: 'gstNumber',
        label: 'GST number',
        type: 'text',
        placeholder: 'Enter GST number',
        required: true,
      },
    ],
    longDescription: 'A Business Loan is a dedicated credit facility provided to entrepreneurs, SMEs, and large enterprises to fund business operations, expansion, equipment purchase, or working capital needs. These loans can be either secured or unsecured, depending on the amount and tenure, and are designed to help businesses maintain healthy cash flow and achieve growth milestones.',
  },
  {
    slug: 'car-loan',
    title: 'Car Loan',
    shortName: 'Car',
    description: 'For new car, used car, or balance transfer applications.',
    maxAmount: '₹1Cr',
    tenure: '12-84 months',
    rate: '8.75% onwards',
    badge: 'New and used cars',
    documents: ['PAN card', 'Address proof', 'Income proof', 'Vehicle quotation'],
    applicationFields: [
      {
        name: 'vehicleType',
        label: 'Vehicle type',
        type: 'select',
        placeholder: 'Select vehicle type',
        required: true,
        options: ['New car', 'Used car', 'Electric vehicle', 'Balance transfer'],
      },
      {
        name: 'vehicleModel',
        label: 'Vehicle model',
        type: 'text',
        placeholder: 'Example: Hyundai Creta',
        required: true,
      },
      {
        name: 'onRoadPrice',
        label: 'On-road price',
        type: 'number',
        placeholder: 'Enter on-road price',
        required: true,
      },
    ],
    longDescription: 'A Car Loan is a vehicle financing solution designed to help you purchase a new or used car without paying the full amount upfront. The car itself serves as collateral for the loan. Borrowers repay the loan in fixed monthly installments over a set tenure, after which the ownership is fully transferred and all liens are removed from the vehicle registration.',
  },
  {
    slug: 'education-loan',
    title: 'Education Loan',
    shortName: 'Education',
    description: 'For higher education in India or abroad, including tuition and living expenses.',
    maxAmount: '₹1.5Cr',
    tenure: 'Up to 15 years',
    rate: '9.5% onwards',
    badge: 'India and abroad',
    documents: ['PAN card', 'Admission letter', 'Fee structure', 'Co-applicant income proof'],
    applicationFields: [
      {
        name: 'courseName',
        label: 'Course name',
        type: 'text',
        placeholder: 'Example: MBA',
        required: true,
      },
      {
        name: 'institutionName',
        label: 'Institution name',
        type: 'text',
        placeholder: 'Enter institution or university',
        required: true,
      },
      {
        name: 'studyCountry',
        label: 'Study country',
        type: 'text',
        placeholder: 'Example: India, USA, Canada',
        required: true,
      },
    ],
    longDescription: 'An Education Loan is a specialized financial product designed to help students pursue higher education in India or abroad. It covers tuition fees, books, equipment, and living expenses. These loans often feature a moratorium period, allowing students to start repayment only after completing their course and securing employment, thus easing the financial burden on families.',
  },
  {
    slug: 'gold-loan',
    title: 'Gold Loan',
    shortName: 'Gold',
    description: 'For quick secured loans against gold ornaments with simple documentation.',
    maxAmount: 'As per gold value',
    tenure: '3-36 months',
    rate: '9% onwards',
    badge: 'Secured loan',
    documents: ['PAN card', 'Address proof', 'Gold valuation', 'Bank details'],
    applicationFields: [
      {
        name: 'goldWeight',
        label: 'Approximate gold weight',
        type: 'number',
        placeholder: 'Enter weight in grams',
        required: true,
      },
      {
        name: 'goldPurity',
        label: 'Gold purity',
        type: 'select',
        placeholder: 'Select gold purity',
        required: true,
        options: ['18K', '20K', '22K', '24K'],
      },
      {
        name: 'branchCity',
        label: 'Preferred branch city',
        type: 'text',
        placeholder: 'Enter branch city',
        required: true,
      },
    ],
    longDescription: 'A Gold Loan is an instant secured loan facility where you can borrow money by pledging your gold ornaments or coins as collateral. The loan amount is usually a percentage of the market value of the gold. It is one of the fastest ways to get funds with minimal documentation and attractive interest rates, as the underlying asset reduces the lender’s risk.',
  },
  {
    slug: 'loan-against-property',
    title: 'Loan Against Property',
    shortName: 'Property',
    description: 'For large-ticket needs backed by residential, commercial, or industrial property.',
    maxAmount: '₹10Cr',
    tenure: '5-20 years',
    rate: '9.25% onwards',
    badge: 'High-value funding',
    documents: ['PAN card', 'Property ownership proof', 'Income proof', 'Bank statement'],
    applicationFields: [
      {
        name: 'propertyType',
        label: 'Property type',
        type: 'select',
        placeholder: 'Select property type',
        required: true,
        options: ['Residential', 'Commercial', 'Industrial', 'Plot'],
      },
      {
        name: 'mortgagePropertyValue',
        label: 'Estimated property value',
        type: 'number',
        placeholder: 'Enter property value',
        required: true,
      },
      {
        name: 'propertyAddress',
        label: 'Property address',
        type: 'textarea',
        placeholder: 'Enter complete property address',
        required: true,
      },
    ],
    longDescription: 'Loan Against Property (LAP) is a high-value secured loan where you mortgage your existing residential, commercial, or industrial property to unlock its market value. It is an ideal solution for long-term funding requirements like business expansion, child’s education, or debt consolidation, offering lower interest rates compared to unsecured loans due to the high-value security provided.',
  },
  {
    slug: 'working-capital-finance',
    title: 'Working Capital Finance',
    shortName: 'Working Capital',
    description: 'Keep your business operations running smoothly with flexible funding options like CC, OD, and invoice financing.',
    maxAmount: '₹5Cr', // more realistic for most SMEs
    tenure: '12 months (renewable)',
    rate: '10% onwards',
    badge: 'Business funding',

    documents: [
      'PAN card (business/owner)',
      'Aadhaar card',
      'GST certificate',
      'Business registration proof',
      'Bank statements (last 6–12 months)',
      'ITR (last 2–3 years)',
      'Balance sheet & P&L',
      'GST returns',
    ],

    applicationFields: [
      {
        name: 'businessType',
        label: 'Business type',
        type: 'select',
        placeholder: 'Select business type',
        required: true,
        options: ['Proprietorship', 'Partnership', 'Private Limited', 'LLP'],
      },
      {
        name: 'annualTurnover',
        label: 'Annual turnover',
        type: 'number',
        placeholder: 'Enter yearly turnover',
        required: true,
      },
      {
        name: 'loanType',
        label: 'Type of working capital',
        type: 'select',
        placeholder: 'Select facility',
        required: true,
        options: ['Cash Credit', 'Overdraft', 'Invoice Funding', 'Short-term Loan'],
      },
      {
        name: 'requiredAmount',
        label: 'Required loan amount',
        type: 'number',
        placeholder: 'Enter required amount',
        required: true,
      },
      {
        name: 'businessVintage',
        label: 'Business vintage (years)',
        type: 'number',
        placeholder: 'How many years in business?',
        required: true,
      },
      {
        name: 'existingLoans',
        label: 'Existing loans (if any)',
        type: 'textarea',
        placeholder: 'Mention existing loans or liabilities',
        required: false,
      },
    ],
    longDescription: 'Working Capital Finance is a short-term funding solution designed to help businesses manage their daily operational expenses and bridge the gap between accounts payable and accounts receivable. It includes facilities like Cash Credit, Overdraft, and Invoice Financing, allowing businesses to maintain smooth operations even during seasonal fluctuations or growth phases.',
  },
  {
    "slug": "cash-credit",
    "title": "Cash Credit",
    "shortName": "CC",
    "description": "Flexible working capital limit against stock and receivables.",
    "maxAmount": "₹5Cr",
    "tenure": "12 months (renewable)",
    "rate": "10% onwards",
    "badge": "Popular",
    "documents": [
      "PAN card",
      "Aadhaar card",
      "GST certificate",
      "Bank statements",
      "ITR (2–3 years)",
      "Stock statements",
      "Debtors list"
    ],
    "applicationFields": [
      {
        "name": "annualTurnover",
        "label": "Annual turnover",
        "placeholder": "Enter turnover",
        "type": "number",
        "required": true
      },
      {
        "name": "stockValue",
        "label": "Current stock value",
        "placeholder": "Enter stock value",
        "type": "number",
        "required": true
      },
      {
        "name": "debtorValue",
        "label": "Receivables value",
        "placeholder": "Enter receivables value",
        "type": "number",
        "required": true
      }
    ],
    longDescription: 'Cash Credit (CC) is a flexible working capital facility provided to businesses against the security of their current assets like stock and receivables. It allows businesses to withdraw funds up to a sanctioned limit to meet their day-to-day requirements, with interest charged only on the daily balance utilized, making it a highly cost-effective financing tool.',
  },
  {
    "slug": "overdraft",
    "title": "Overdraft",
    "shortName": "OD",
    "description": "Withdraw funds as needed with interest charged only on usage.",
    "maxAmount": "₹3Cr",
    "tenure": "12 months (renewable)",
    "rate": "10.5% onwards",
    "badge": "Flexible",
    "documents": [
      "PAN card",
      "Aadhaar card",
      "Bank statements",
      "ITR",
      "Financial statements"
    ],
    "applicationFields": [
      {
        "name": "bankingTurnover",
        "label": "Monthly banking turnover",
        "placeholder": 'Enter turnover',
        "type": "number",
        "required": true
      },
      {
        "name": "existingLimit",
        "label": "Existing OD/CC limit",
        "placeholder": 'Enter limit',
        "type": "number",
        "required": false
      }
    ],
    longDescription: 'An Overdraft (OD) facility is a financial arrangement that allows account holders to withdraw more money than they actually have in their bank account, up to a specified limit. It is an excellent tool for managing unexpected expenses or seasonal cash flow gaps, as interest is only calculated on the amount overdrawn and for the exact duration of the usage.',
  },
  {
    "slug": "term-loan",
    "title": "Term Loan",
    "shortName": "Term Loan",
    "description": "Fixed tenure loan for business expansion and capital expenditure.",
    "maxAmount": "₹10Cr",
    "tenure": "1–10 years",
    "rate": "9.5% onwards",
    "badge": "Growth funding",
    "documents": [
      "PAN card",
      "Aadhaar card",
      "ITR",
      "Balance sheet",
      "Bank statements",
      "Project report"
    ],
    "applicationFields": [
      {
        "name": "loanPurpose",
        "label": "Purpose of loan",
        "placeholder": "Enter purpose of loan",
        "type": "textarea",
        "required": true
      },
      {
        "name": "requiredAmount",
        "label": "Loan amount",
        "placeholder": "Enter loan amount",
        "type": "number",
        "required": true
      }
    ],
    longDescription: 'A Term Loan is a fixed-tenure credit facility typically used for long-term investments like business expansion, purchasing machinery, or other capital expenditures. The loan is repaid in regular installments (EMIs) over a predetermined period, offering businesses a stable and predictable repayment schedule to match their projected growth and cash flows.',
  },
  {
    "slug": "construction-finance",
    "title": "Construction Finance",
    "shortName": "Construction",
    "description": "Funding for real estate and construction projects.",
    "maxAmount": "₹20Cr",
    "tenure": "2–5 years",
    "rate": "11% onwards",
    "badge": "Project funding",
    "documents": [
      "PAN card",
      "Aadhaar card",
      "Project plan",
      "Land ownership documents",
      "Approvals & licenses",
      "Cost estimation"
    ],
    "applicationFields": [
      {
        "name": "projectType",
        "label": "Project type",
        "placeholder": "Select project type",
        "type": "select",
        "required": true,
        "options": ["Residential", "Commercial", "Mixed-use"]
      },
      {
        "name": "projectCost",
        "label": "Total project cost",
        "placeholder": "Enter project cost",
        "type": "number",
        "required": true
      },
      {
        "name": "landOwned",
        "label": "Do you own the land?",
        "placeholder": "Select Yes or No",
        "type": "select",
        "required": true,
        "options": ["Yes", "No"]
      }
    ],
    longDescription: 'Construction Finance is a specialized funding solution designed for real estate developers and construction companies to finance the development of residential, commercial, or mixed-use projects. The loan is typically disbursed in stages based on the progress of construction, helping developers manage project costs and timelines efficiently until completion.',
  }
];

export function findLoanProduct(slug: string | null): LoanProduct | undefined {
  return LOAN_PRODUCTS.find((product) => product.slug === slug);
}
