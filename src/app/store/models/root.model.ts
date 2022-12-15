import { AuthState } from './auth.model';
import { UserState } from './user.model';

export interface RootState {
  auth: AuthState;
  user: UserState;
}
