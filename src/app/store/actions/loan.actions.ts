import { createAction, props } from '@ngrx/store';

import { Pagination } from 'src/app/shared/components/generic-table/generc-table.model';
import { Loan, LoanPage } from '../../core/models/loan/loan.model';

export const LOAN_FETCH = '[Loan Page] Fetch loans';
export const LOAN_ADD = '[Loan Page] Add loan';
export const LOAN_UPLOAD = '[Loan Page] Upload loan';
export const LOAN_FETCH_SUCCESS = '[Loan Page] Fetch loan succes';
export const LOAN_ADD_SUCCESS = '[Loan Page] Add loan succes';
export const LOAN_PAGINATION = '[Loan Page] Add loan pagination';

export const fetchLoans = createAction(
  LOAN_FETCH,
  props<{ data: Pagination }>()
);

export const paginateLoan = createAction(
  LOAN_PAGINATION,
  props<{ data: Pagination }>()
);

export const fetchLoanSuccess = createAction(
  LOAN_FETCH_SUCCESS,
  props<{ data: LoanPage }>()
);
export const addLoan = createAction(LOAN_ADD, props<Loan>());

export const uploadLoans = createAction(LOAN_UPLOAD, props<{ data: any }>());

export const addLoanSuccess = createAction(LOAN_ADD_SUCCESS);
