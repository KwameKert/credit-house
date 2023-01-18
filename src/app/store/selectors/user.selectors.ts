import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserState } from '../models/user.model';

import * as fromStore from '../reducers/user.reducers';

const userSelector = createFeatureSelector<UserState>(fromStore.userFeatureKey);

export const selectUsers = createSelector(
  userSelector,
  (state: UserState) => state.users
);

export const selectUserCount = createSelector(
  userSelector,
  (state: UserState) => state.userTotal
);

export const selectUserPagination = createSelector(
  userSelector,
  (state: UserState) => state.pagination
);
