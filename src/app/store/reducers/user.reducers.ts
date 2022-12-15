import { UserState } from '../models/user.model';
import { Action, createReducer, on } from '@ngrx/store';
import { fromUserActions } from '../actions';

export const initialUserState: UserState = {
  users: [],
};
export const userFeatureKey: string = 'user';

const userReducer = createReducer(
  initialUserState,
  on(fromUserActions.fetchUserSuccess, (state: UserState, data: UserState) => ({
    ...data,
  }))
);

export function reducer(state: UserState | undefined, action: Action): any {
  return userReducer(state, action);
}
