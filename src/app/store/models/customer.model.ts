import { Pagination } from 'src/app/shared/components/generic-table/generc-table.model';
import { Customer } from '../../core/models/customer/customer.model';

export interface CustomerState {
  customers: Customer[];
  customer: Customer;
  customersLoading: boolean;
  customerSaved: boolean;
  customerTotal: number;
  pagination: Pagination;
}
