export type LoanFieldType = 'date' | 'email' | 'number' | 'select' | 'tel' | 'text' | 'textarea';

export interface LoanApplicationField {
  name: string;
  label: string;
  type: LoanFieldType;
  placeholder: string;
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
  badge: string;
  documents: string[];
  applicationFields: LoanApplicationField[];
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
  },
];

export function findLoanProduct(slug: string | null): LoanProduct | undefined {
  return LOAN_PRODUCTS.find((product) => product.slug === slug);
}
