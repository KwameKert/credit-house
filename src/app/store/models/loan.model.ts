import { Pagination } from 'src/app/shared/components/generic-table/generc-table.model';
import { Loan } from '../../core/models/loan/loan.model';

export interface LoanState {
  loans: Loan[];
  loanTotal: number;
  pagination: Pagination;
  loanLoading: boolean;
}
