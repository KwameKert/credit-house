import { Customer } from '../../core/models/customer/customer.model';

export interface CustomerState {
  customers: Customer[];
  customer: Customer;
  customersLoading: boolean;
  customerSaved: boolean;
}
