import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CustomerState } from '../models/customer.model';

import * as fromStore from '../reducers/customer.reducer';

const customerSelector = createFeatureSelector<CustomerState>(
  fromStore.customerFeatureKey
);

export const selectCustomers = createSelector(
  customerSelector,
  (state: CustomerState) => state.customers
);

export const selectCustomerSavedStatus = createSelector(
  customerSelector,
  (state: CustomerState) => state.customerSaved
);

export const selectCustomerUploadStatus = createSelector(
  customerSelector,
  (state: CustomerState) => state.customersLoading
);
