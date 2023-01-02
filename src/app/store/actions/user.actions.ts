import { createAction, props } from '@ngrx/store';
import { CreateUser } from 'src/app/core/models/user/user.model';
import { Pagination } from 'src/app/shared/components/generic-table/generc-table.model';
import { UsersPage } from '../../core/models/user/user.model';

export const USER_FETCH = '[User Page] Fetch users';
export const USER_ADD = '[User Page] Add user';
export const USER_EDIT = '[User Page] Edit user';
export const USER_FETCH_SUCCESS = '[User Page] Fetch user succes';
export const USER_ADD_SUCCESS = '[User Page] Add user succes';
export const USER_PAGINATION = '[User Page] Add user pagination';

export const fetchUsers = createAction(
  USER_FETCH,
  props<{ data: Pagination }>()
);

export const paginateUser = createAction(
  USER_PAGINATION,
  props<{ data: Pagination }>()
);
export const fetchUserSuccess = createAction(
  USER_FETCH_SUCCESS,
  props<{ data: UsersPage }>()
);
export const addUser = createAction(USER_ADD, props<CreateUser>());

export const editUser = createAction(USER_EDIT, props<CreateUser>());
export const addUserSuccess = createAction(USER_ADD_SUCCESS);
