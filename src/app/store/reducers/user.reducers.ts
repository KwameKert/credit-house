import { UserState } from '../models/user.model';
import { Action, createReducer, on } from '@ngrx/store';
import { fromUserActions } from '../actions';

export const initialUserState: UserState = {
  users: [],
  userTotal: 0,
  pagination: {
    page: 0,
    size: 0,
  },
};
export const userFeatureKey: string = 'user';

const userReducer = createReducer(
  initialUserState,
  on(fromUserActions.fetchUserSuccess, (state: UserState, { data }) => ({
    ...state,
    users: data.users,
    userTotal: data.total,
  })),
  on(fromUserActions.paginateUser, (state: UserState, { data }) => ({
    ...state,
    pagination: {
      page: data.page,
      size: data.size,
    },
  }))
);

export function reducer(state: UserState | undefined, action: Action): any {
  return userReducer(state, action);
}
