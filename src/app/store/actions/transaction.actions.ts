import { createAction, props } from '@ngrx/store';
import {
  CreateTransaction,
  TransactionsPage,
} from 'src/app/core/models/transaction/transaction.model';
import { Pagination } from 'src/app/shared/components/generic-table/generc-table.model';
import { Transaction } from '../../core/models/transaction/transaction.model';

export const TRANSACTION_FETCH = '[Transaction Page] Fetch transactions';
export const TRANSACTION_ADD = '[Transaction Page] Add transaction';
export const TRANSACTION_UPLOAD = '[Transaction Page] Upload transaction';
export const TRANSACTION_FETCH_SUCCESS =
  '[Transaction Page] Fetch transaction succes';
export const TRANSACTION_ADD_SUCCESS =
  '[Transaction Page] Add transaction succes';
export const TRANSACTION_PAGINATION =
  '[Transaction Page] Add transaction pagination';

export const fetchTransactions = createAction(
  TRANSACTION_FETCH,
  props<{ data: Pagination }>()
);

export const paginateTransaction = createAction(
  TRANSACTION_PAGINATION,
  props<{ data: Pagination }>()
);

export const fetchTransactionSuccess = createAction(
  TRANSACTION_FETCH_SUCCESS,
  props<{ data: TransactionsPage }>()
);
export const addTransaction = createAction(
  TRANSACTION_ADD,
  props<CreateTransaction>()
);

export const uploadTransactions = createAction(
  TRANSACTION_UPLOAD,
  props<{ data: any }>()
);

export const addTransactionSuccess = createAction(TRANSACTION_ADD_SUCCESS);
