import { createAction, props } from '@ngrx/store';
import {
  Customer,
  CustomersPage,
} from '../../core/models/customer/customer.model';
import { Pagination } from 'src/app/shared/components/generic-table/generc-table.model';

export const CUSTOMER_FETCH = '[Customer Page] Fetch customers';
export const CUSTOMER_ADD = '[Customer Page] Add customer';
export const CUSTOMER_SEARCH = '[Customer Page] Search customer';
export const CUSTOMER_SEARCH_SUCCESS =
  '[Customer Page] Search customer success';
export const CUSTOMER_ADD_SUCCESS = '[Customer Page] Add customer Success';
export const CUSTOMER_RESET_SAVED = '[Customer Page] Reset customer saved';
export const CUSTOMER_FETCH_SUCCESS = '[Customer Page] Fetch customer success';
export const CUSTOMER_GET = '[Customer Page] Get customer';
export const CUSTOMER_UPLOAD = '[Customer Page] Upload bulk customers';
export const CUSTOMER_UPLOAD_SUCCESS =
  '[Customer Page] Upload bulk customers success';
export const CUSTOMER_GET_SUCCESS = '[Customer Page] Get customer success';
export const CUSTOMER_PAGINATION = '[Customer Page] Add customer pagination';

export const addCustomer = createAction(CUSTOMER_ADD, props<Customer>());
export const uploadCustomers = createAction(
  CUSTOMER_UPLOAD,
  props<{ data: any }>()
);
export const addCustomerSuccess = createAction(CUSTOMER_ADD_SUCCESS);
export const resetCustomerSaved = createAction(CUSTOMER_RESET_SAVED);
export const fetchCustomers = createAction(
  CUSTOMER_FETCH,
  props<{ data: Pagination }>()
);

export const fetchCustomersSuccess = createAction(
  CUSTOMER_FETCH_SUCCESS,
  props<{ data: CustomersPage }>()
);

export const getCustomersSuccess = createAction(
  CUSTOMER_GET_SUCCESS,
  props<{ customer: Customer }>()
);

export const getCustomerById = createAction(
  CUSTOMER_GET,
  props<{ payload: string }>()
);

export const searchCustomerById = createAction(
  CUSTOMER_SEARCH,
  props<{ payload: string }>()
);

export const searchCustomerByIdSuccess = createAction(
  CUSTOMER_SEARCH_SUCCESS,
  props<{ customers: Customer[] }>()
);

export const paginateCustomer = createAction(
  CUSTOMER_PAGINATION,
  props<{ data: Pagination }>()
);
