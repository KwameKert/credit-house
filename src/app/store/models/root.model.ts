import { AuthState } from './auth.model';
import { UserState } from './user.model';
import { CustomerState } from './customer.model';
import { CompanyState } from './company.model';
import { TransactionState } from './transaction.model';
import { LoanState } from './loan.model';
import { DashboardState } from './dashboard.model';

export interface RootState {
  auth: AuthState;
  user: UserState;
  customer: CustomerState;
  company: CompanyState;
  transaction: TransactionState;
  loan: LoanState;
  dashboard: DashboardState;
}
