import { createAction, props } from '@ngrx/store';
import {
  LoginRequest,
  LoginResponse,
} from '../../core/models/authentication/auth.model';
import { AuthState } from '../models/auth.model';

export const USER_LOGIN = '[Login Page] Login';
export const USER_LOGIN_SUCESS = '[Login Page] Login Success';
export const USER_LOGIN_FAILURE = '[Login Page] Login Failure';

export const login = createAction(USER_LOGIN, props<LoginRequest>());

export const loginSuccess = createAction(USER_LOGIN_SUCESS, props<AuthState>());

export const loginFailure = createAction(USER_LOGIN_FAILURE);
