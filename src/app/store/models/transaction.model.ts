import { Pagination } from 'src/app/shared/components/generic-table/generc-table.model';
import { Transaction } from '../../core/models/transaction/transaction.model';

export interface TransactionState {
  transactions: Transaction[];
  transactionTotal: number;
  pagination: Pagination;
  transactionLoading: boolean;
}
