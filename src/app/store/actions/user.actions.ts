import { createAction, props } from '@ngrx/store';
import { CreateUser, User } from 'src/app/core/models/user/user.model';
import { UserState } from '../models/user.model';

export const USER_FETCH = '[User Page] Fetch users';
export const USER_ADD = '[User Page] Add user';
export const USER_EDIT = '[User Page] Edit user';
export const USER_FETCH_SUCCESS = '[User Page] Fetch user succes';
export const USER_ADD_SUCCESS = '[User Page] Add user succes';

export const fetchUsers = createAction(USER_FETCH);
export const fetchUserSuccess = createAction(
  USER_FETCH_SUCCESS,
  props<UserState>()
);
export const addUser = createAction(USER_ADD, props<CreateUser>());

export const editUser = createAction(USER_EDIT, props<CreateUser>());
export const addUserSuccess = createAction(USER_ADD_SUCCESS);
