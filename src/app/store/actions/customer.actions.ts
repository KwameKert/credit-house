import { createAction, props } from '@ngrx/store';
import { Customer } from '../../core/models/customer/customer.model';

export const CUSTOMER_FETCH = '[Customer Page] Fetch customers';
export const CUSTOMER_ADD = '[Customer Page] Add customer';
export const CUSTOMER_ADD_SUCCESS = '[Customer Page] Add customer Success';
export const CUSTOMER_RESET_SAVED = '[Customer Page] Reset customer saved';
export const CUSTOMER_FETCH_SUCCESS = '[Customer Page] Fetch customer success';
export const CUSTOMER_GET = '[Customer Page] Get customer';
export const CUSTOMER_UPLOAD = '[Customer Page] Upload bulk customers';
export const CUSTOMER_UPLOAD_SUCCESS =
  '[Customer Page] Upload bulk customers success';
export const CUSTOMER_GET_SUCCESS = '[Customer Page] Get customer success';

export const addCustomer = createAction(CUSTOMER_ADD, props<Customer>());
export const uploadCustomers = createAction(
  CUSTOMER_UPLOAD,
  props<{ data: any }>()
);
export const uploadCustomersSuccess = createAction(CUSTOMER_UPLOAD_SUCCESS);
export const addCustomerSuccess = createAction(CUSTOMER_ADD_SUCCESS);
export const resetCustomerSaved = createAction(CUSTOMER_RESET_SAVED);
export const fetchCustomers = createAction(CUSTOMER_FETCH);
export const fetchCustomersSuccess = createAction(
  CUSTOMER_FETCH_SUCCESS,
  props<{ customers: Customer[] }>()
);

export const getCustomersSuccess = createAction(
  CUSTOMER_GET_SUCCESS,
  props<{ customer: Customer }>()
);

export const getCustomerById = createAction(
  CUSTOMER_GET,
  props<{ payload: string }>()
);
