import { createFeatureSelector, createSelector } from '@ngrx/store';
import { LoanState } from '../models/loan.model';

import * as fromStore from '../reducers/loan.reducer';

const loanSelector = createFeatureSelector<LoanState>(fromStore.loanFeatureKey);

export const selectLoans = createSelector(
  loanSelector,
  (state: LoanState) => state.loans
);

export const selectLoanLoading = createSelector(
  loanSelector,
  (state: LoanState) => state.loanLoading
);

export const selectLoanTotal = createSelector(
  loanSelector,
  (state: LoanState) => state.loanTotal
);

export const selectLoanPagination = createSelector(
  loanSelector,
  (state: LoanState) => state.pagination
);
