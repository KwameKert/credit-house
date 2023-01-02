import { Action, createReducer, on } from '@ngrx/store';
import { TransactionState } from '../models/transaction.model';
import { fromTransactionActions } from '../actions';
import { paginateCustomer } from '../actions/customer.actions';

export const initialTransactionState: TransactionState = {
  transactions: [],
  transactionTotal: 0,
  pagination: {
    page: 0,
    size: 10,
  },
  transactionLoading: false,
};
export const transactionFeatureKey: string = 'transaction';

const userReducer = createReducer(
  initialTransactionState,
  on(
    fromTransactionActions.paginateTransaction,
    (state: TransactionState, { data }) => ({
      ...state,
      pagination: {
        page: data.page,
        size: data.size,
      },
    })
  ),
  on(
    fromTransactionActions.fetchTransactionSuccess,
    (state: TransactionState, { data }) => ({
      ...state,
      transactions: data.savings_transaction,
      transactionTotal: data.total,
    })
  )
);

export function reducer(
  state: TransactionState | undefined,
  action: Action
): any {
  return userReducer(state, action);
}
