export interface Loan {
  id: string;
  customerId: string;
  accountNumber: string;
  loanStarDate: string;
  loanEndDate: string;
  disbursedAmount: number;
  interestAmount: number;
  loanStatus: number | string;
  lastPaymentDate: string;
  sectors: string;
  companyCode: string;
}

export interface LoanPage {
  loan_transactions: Loan[];
  total: number;
}
