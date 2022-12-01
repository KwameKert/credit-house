import { User } from 'src/app/core/models/user/user.model';

export interface AuthState {
  isLoggingIn: boolean;
  isAuthenticated: boolean;
  token?: string;
  user?: User;
}
