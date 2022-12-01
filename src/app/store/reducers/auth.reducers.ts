import { Action, createReducer, on } from '@ngrx/store';
import * as fromAuthActions from '../actions/auth.actions';
import { AuthState } from '../models/auth.model';

export const initialAuthState: AuthState = {
  isAuthenticated: false,
  isLoggingIn: false,
};

export const authFeatureKey: string = 'auth';

const authReducer = createReducer(
  initialAuthState,
  on(fromAuthActions.loginFailure, () => ({
    ...initialAuthState,
  })),
  on(fromAuthActions.loginSuccess, (state: AuthState, data: AuthState) => ({
    ...data,
    isLoggingIn: false,
  })),
  on(fromAuthActions.login, (state: AuthState) => ({
    ...state,
    isLoggingIn: true,
  }))
);

export function reducer(state: AuthState | undefined, action: Action): any {
  return authReducer(state, action);
}
