import { BankOffer } from './info-tabs/info-tabs.types';

export const ALL_INDIAN_BANKS: BankOffer[] = [
  { id: 'sbi', bankName: 'SBI', interestRate: 8.4, bankLogo: 'https://www.google.com/s2/favicons?sz=64&domain=sbi.co.in' },
  { id: 'hdfc', bankName: 'HDFC Bank', interestRate: 8.5, bankLogo: 'https://www.google.com/s2/favicons?sz=64&domain=hdfcbank.com' },
  { id: 'icici', bankName: 'ICICI Bank', interestRate: 8.75, bankLogo: 'https://www.google.com/s2/favicons?sz=64&domain=icicibank.com' },
  { id: 'axis', bankName: 'Axis Bank', interestRate: 9.0, bankLogo: 'https://www.google.com/s2/favicons?sz=64&domain=axisbank.com' },
  { id: 'kotak', bankName: 'Kotak Mahindra', interestRate: 8.8, bankLogo: 'https://www.google.com/s2/favicons?sz=64&domain=kotak.com' },
  { id: 'pnb', bankName: 'PNB', interestRate: 8.9, bankLogo: 'https://www.google.com/s2/favicons?sz=64&domain=pnbindia.in' },
  { id: 'bob', bankName: 'Bank of Baroda', interestRate: 8.85, bankLogo: 'https://www.google.com/s2/favicons?sz=64&domain=bankofbaroda.in' },
  { id: 'canara', bankName: 'Canara Bank', interestRate: 8.95, bankLogo: 'https://www.google.com/s2/favicons?sz=64&domain=canarabank.com' },
  { id: 'union', bankName: 'Union Bank', interestRate: 9.1, bankLogo: 'https://www.google.com/s2/favicons?sz=64&domain=unionbankofindia.co.in' },
  { id: 'idfc', bankName: 'IDFC FIRST', interestRate: 9.5, bankLogo: 'https://www.google.com/s2/favicons?sz=64&domain=idfcfirstbank.com' },
  { id: 'indusind', bankName: 'IndusInd Bank', interestRate: 9.5, bankLogo: 'https://www.google.com/s2/favicons?sz=64&domain=indusind.com' },
  { id: 'yes', bankName: 'Yes Bank', interestRate: 9.75, bankLogo: 'https://www.google.com/s2/favicons?sz=64&domain=yesbank.in' },
  { id: 'rbl', bankName: 'RBL Bank', interestRate: 10.25, bankLogo: 'https://www.google.com/s2/favicons?sz=64&domain=rblbank.com' },
  { id: 'federal', bankName: 'Federal Bank', interestRate: 9.4, bankLogo: 'https://www.google.com/s2/favicons?sz=64&domain=federalbank.co.in' },
  { id: 'southindian', bankName: 'South Indian Bank', interestRate: 9.6, bankLogo: 'https://www.google.com/s2/favicons?sz=64&domain=southindianbank.com' },
  { id: 'standard', bankName: 'Standard Chartered', interestRate: 8.9, bankLogo: 'https://www.google.com/s2/favicons?sz=64&domain=sc.com' },
  { id: 'hsbc', bankName: 'HSBC Bank', interestRate: 8.8, bankLogo: 'https://www.google.com/s2/favicons?sz=64&domain=hsbc.co.in' },
  { id: 'dbs', bankName: 'DBS Bank', interestRate: 9.1, bankLogo: 'https://www.google.com/s2/favicons?sz=64&domain=dbs.com' }
];

export function getBankOffersForLoan(loanSlug: string): BankOffer[] {
  // Accuracy check for 2026 real-world starting rates
  let multiplier = 1.0;
  if (loanSlug.includes('home')) multiplier = 0.85; // Home loans are 7.5% - 8.5%
  if (loanSlug.includes('personal')) multiplier = 1.25; // Personal loans are 10.5% - 15%
  if (loanSlug.includes('business')) multiplier = 1.4; // Business loans are 12% - 18%
  if (loanSlug.includes('gold')) multiplier = 1.05; // Gold loans around 9% - 11%

  return ALL_INDIAN_BANKS.map(bank => ({
    ...bank,
    interestRate: Number((bank.interestRate * multiplier).toFixed(2))
  }));
}
