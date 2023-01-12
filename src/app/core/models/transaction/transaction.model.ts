export interface Transaction {
  id: string;
  customerId: string;
  accountNumber: string;
  transactionDate: string;
  transactionType: number | string;
}

export interface CreateTransaction {
  id: string;
  customerId: string;
  accountNumber: string;
  transactionDate: Date;
  transactionType: string;
  transactionId: string;
  companyCode: string;
}

export interface TransactionsPage {
  savings_transaction: Transaction[];
  total: number;
}
