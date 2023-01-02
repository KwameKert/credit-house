import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { TransactionService } from '../../core/services/transaction.service';
import { RootState } from '../models/root.model';
import { Store } from '@ngrx/store';
import { fromTransactionActions } from '../actions';
import { concatMap, map, withLatestFrom } from 'rxjs';
import {
  Transaction,
  TransactionsPage,
} from 'src/app/core/models/transaction/transaction.model';
import { addCustomer } from '../actions/customer.actions';
import { fromTransactionSelectors } from '../selectors';

@Injectable()
export class TransactionEffect {
  constructor(
    private actions$: Actions,
    private transactionService: TransactionService,
    private store: Store<RootState>
  ) {}

  fetchTransactions$ = createEffect((): any =>
    this.actions$.pipe(
      ofType(fromTransactionActions.fetchTransactions),
      concatMap((request) => {
        return this.transactionService.fetchTransactions(request.data).pipe(
          map((response: TransactionsPage) => {
            return fromTransactionActions.fetchTransactionSuccess({
              data: response,
            });
          })
        );
      })
    )
  );

  addTransaction$ = createEffect((): any =>
    this.actions$.pipe(
      ofType(fromTransactionActions.addTransaction),
      withLatestFrom(
        this.store.select(fromTransactionSelectors.selectTransactionPagination)
      ),
      concatMap(([request, pagination]) => {
        return this.transactionService.addTransaction(request).pipe(
          map(() => {
            return fromTransactionActions.fetchTransactions({
              data: { size: pagination.size, page: pagination.page },
            });
          })
        );
      })
    )
  );

  uploadTransactions$ = createEffect((): any =>
    this.actions$.pipe(
      ofType(fromTransactionActions.uploadTransactions),
      withLatestFrom(
        this.store.select(fromTransactionSelectors.selectTransactionPagination)
      ),
      concatMap(([request, pagination]) => {
        return this.transactionService.uploadTransactions(request.data).pipe(
          map(() => {
            return fromTransactionActions.fetchTransactions({
              data: pagination,
            });
          })
        );
      })
    )
  );
}
