import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { CustomerService } from '../../core/services/customer.service';
import { fromCustomerActions, fromUserActions } from '../actions';
import { concatMap, map, withLatestFrom } from 'rxjs';
import {
  Customer,
  CustomersPage,
} from '../../core/models/customer/customer.model';
import { Store } from '@ngrx/store';
import { RootState } from '../models/root.model';
import { fromCustomerSelectors } from '../selectors';

@Injectable()
export class CustomerEffects {
  constructor(
    private actions$: Actions,
    private customerService: CustomerService,
    private store: Store<RootState>
  ) {}

  fetchCustomers$ = createEffect((): any =>
    this.actions$.pipe(
      ofType(fromCustomerActions.fetchCustomers),
      concatMap((request) => {
        return this.customerService.fetchCustomers(request.data).pipe(
          map((response: CustomersPage) => {
            return fromCustomerActions.fetchCustomersSuccess({
              data: response,
            });
          })
        );
      })
    )
  );

  getCustomerById$ = createEffect((): any =>
    this.actions$.pipe(
      ofType(fromCustomerActions.getCustomerById),
      concatMap((action) => {
        return this.customerService.getCustomerById(action.payload).pipe(
          map((response: Customer) => {
            return fromCustomerActions.getCustomersSuccess({
              customer: response,
            });
          })
        );
      })
    )
  );

  addCustomer$ = createEffect((): any =>
    this.actions$.pipe(
      ofType(fromCustomerActions.addCustomer),
      concatMap((request) => {
        return this.customerService.createCustomer(request).pipe(
          map(() => {
            return fromCustomerActions.addCustomerSuccess();
          })
        );
      })
    )
  );

  uploadCustomers$ = createEffect((): any =>
    this.actions$.pipe(
      ofType(fromCustomerActions.uploadCustomers),
      withLatestFrom(
        this.store.select(fromCustomerSelectors.selectCustomerPagination)
      ),
      concatMap(([request, pagination]) => {
        return this.customerService.uploadCustomers(request.data).pipe(
          map(() => {
            return fromCustomerActions.fetchCustomers({ data: pagination });
          })
        );
      })
    )
  );
}
