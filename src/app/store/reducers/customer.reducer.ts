import { CustomerState } from '../models/customer.model';
import { Action, createReducer, on } from '@ngrx/store';
import { fromCustomerActions } from '../actions';

export const initialCustomerState: CustomerState = {
  customers: [],
  customerSaved: false,
  customersLoading: false,
  customerTotal: 0,
  pagination: {
    page: 0,
    size: 5,
  },

  customer: {
    id: '',
    customerId: '',
    customerName: '',
    phoneNumber: '',
    idType: '',
    idNumber: '',
    dateOfBirth: '',
    educationalLevel: '',
    gender: '',
    maritalStatus: '',
    createdTime: '',
    companyCode: '',
  },
};

export const customerFeatureKey: string = 'customer';

const customerReducer = createReducer(
  initialCustomerState,
  on(
    fromCustomerActions.fetchCustomersSuccess,
    (state: CustomerState, { data }) => ({
      ...state,
      customers: data.customers,
      customerTotal: data.total,
      customersLoading: false,
    })
  ),
  on(fromCustomerActions.addCustomerSuccess, (state: CustomerState) => ({
    ...state,
    customerSaved: true,
  })),
  on(fromCustomerActions.resetCustomerSaved, (state: CustomerState) => ({
    ...state,
    customerSaved: false,
  })),
  on(fromCustomerActions.uploadCustomers, (state: CustomerState) => ({
    ...state,
    customersLoading: true,
  })),
  on(
    fromCustomerActions.paginateCustomer,
    (state: CustomerState, { data }) => ({
      ...state,
      pagination: {
        page: data.page,
        size: data.size,
      },
    })
  ),
  on(
    fromCustomerActions.getCustomersSuccess,
    (state: CustomerState, { customer }) => ({
      ...state,
      customer,
    })
  )
);

export function reducer(state: CustomerState | undefined, action: Action): any {
  return customerReducer(state, action);
}
