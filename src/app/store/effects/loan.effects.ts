import { Injectable } from '@angular/core';
import { LoanService } from '../../core/services/loan.service';
import { fromLoanActions } from '../actions';
import { LoanPage } from 'src/app/core/models/loan/loan.model';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { concatMap, map, withLatestFrom } from 'rxjs';
import { RootState } from '../models/root.model';
import { fromLoanSelectors } from '../selectors';
import { addCustomer } from '../actions/customer.actions';

@Injectable()
export class LoanEffects {
  constructor(
    private actions$: Actions,
    private loanService: LoanService,
    private store: Store<RootState>
  ) {}

  fetchLoans$ = createEffect((): any =>
    this.actions$.pipe(
      ofType(fromLoanActions.fetchLoans),
      concatMap((request) => {
        return this.loanService.fetchLoans(request.data).pipe(
          map((response: LoanPage) => {
            return fromLoanActions.fetchLoanSuccess({
              data: response,
            });
          })
        );
      })
    )
  );

  addLoan$ = createEffect((): any =>
    this.actions$.pipe(
      ofType(fromLoanActions.addLoan),
      withLatestFrom(this.store.select(fromLoanSelectors.selectLoanPagination)),
      concatMap(([request, pagination]) => {
        return this.loanService.createLoan(request).pipe(
          map(() => {
            return fromLoanActions.fetchLoans({
              data: { size: pagination.size, page: pagination.page },
            });
          })
        );
      })
    )
  );

  uploadLoans$ = createEffect((): any =>
    this.actions$.pipe(
      ofType(fromLoanActions.uploadLoans),
      withLatestFrom(this.store.select(fromLoanSelectors.selectLoanPagination)),
      concatMap(([request, pagination]) => {
        return this.loanService.uploadLoans(request.data).pipe(
          map(() => {
            return fromLoanActions.fetchLoans({
              data: pagination,
            });
          })
        );
      })
    )
  );
}
