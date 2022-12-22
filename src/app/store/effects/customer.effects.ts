import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { CustomerService } from '../../core/services/customer.service';
import { fromCustomerActions, fromUserActions } from '../actions';
import { concatMap, map } from 'rxjs';
import { Customer } from '../../core/models/customer/customer.model';

@Injectable()
export class CustomerEffects {
  constructor(
    private actions$: Actions,
    private customerService: CustomerService
  ) {}

  fetchCustomers$ = createEffect((): any =>
    this.actions$.pipe(
      ofType(fromCustomerActions.fetchCustomers),
      concatMap(() => {
        return this.customerService.fetchCustomers().pipe(
          map((response: Customer[]) => {
            return fromCustomerActions.fetchCustomersSuccess({
              customers: response,
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
      concatMap((request: Customer) => {
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
      concatMap((request) => {
        console.log('request ', request);
        return this.customerService.uploadCustomers(request.data).pipe(
          map(() => {
            return fromCustomerActions.uploadCustomersSuccess();
          })
        );
      })
    )
  );
}
