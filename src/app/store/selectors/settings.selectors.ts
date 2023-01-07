import { createFeatureSelector, createSelector } from '@ngrx/store';
import { LoanState } from '../models/loan.model';

import * as fromStore from '../reducers/setting.reducers';
import { SettingState } from '../models/setting.model';

const settingSelector = createFeatureSelector<SettingState>(
  fromStore.settingFeatureKey
);

export const selectIssues = createSelector(
  settingSelector,
  (state: SettingState) => state.issues
);

export const selectIssuesTotal = createSelector(
  settingSelector,
  (state: SettingState) => state.issuesTotal
);
