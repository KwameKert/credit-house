import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TransactionState } from '../models/transaction.model';

import * as fromStore from '../reducers/transaction.reducer';

const transactionSelector = createFeatureSelector<TransactionState>(
  fromStore.transactionFeatureKey
);

export const selectTransactions = createSelector(
  transactionSelector,
  (state: TransactionState) => state.transactions
);

export const selectTransactionLoading = createSelector(
  transactionSelector,
  (state: TransactionState) => state.transactionLoading
);

export const selectTransactionTotal = createSelector(
  transactionSelector,
  (state: TransactionState) => state.transactionTotal
);

export const selectTransactionPagination = createSelector(
  transactionSelector,
  (state: TransactionState) => state.pagination
);
