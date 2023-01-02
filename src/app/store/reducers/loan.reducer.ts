import { Action, createReducer, on } from '@ngrx/store';
import { fromLoanActions } from '../actions';
import { LoanState } from '../models/loan.model';

export const initialLoanState: LoanState = {
  loans: [],
  loanTotal: 0,
  pagination: {
    page: 0,
    size: 10,
  },
  loanLoading: false,
};
export const loanFeatureKey: string = 'loan';

const loanReducer = createReducer(
  initialLoanState,
  on(fromLoanActions.paginateLoan, (state: LoanState, { data }) => ({
    ...state,
    pagination: {
      page: data.page,
      size: data.size,
    },
  })),
  on(fromLoanActions.fetchLoanSuccess, (state: LoanState, { data }) => ({
    ...state,
    loans: data.loan_transactions,
    loanTotal: data.total,
  }))
);

export function reducer(state: LoanState | undefined, action: Action): any {
  return loanReducer(state, action);
}
