import { AuthState } from './auth.model';
import { UserState } from './user.model';
import { CustomerState } from './customer.model';

export interface RootState {
  auth: AuthState;
  user: UserState;
  customer: CustomerState;
}
