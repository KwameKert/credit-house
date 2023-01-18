import { createFeatureSelector, createSelector } from '@ngrx/store';
import { DashboardState } from '../models/dashboard.model';

import * as fromStore from '../reducers/dashboard.reducers';

const dashboardSelector = createFeatureSelector<DashboardState>(
  fromStore.dashboardFeatureKey
);

export const selectActive = createSelector(
  dashboardSelector,
  (state: DashboardState) => state.active
);

export const selectInactive = createSelector(
  dashboardSelector,
  (state: DashboardState) => state.inactive
);

export const selectGender = createSelector(
  dashboardSelector,
  (state: DashboardState) => state.gender
);

export const selectEducation = createSelector(
  dashboardSelector,
  (state: DashboardState) => state.education
);

export const selectSector = createSelector(
  dashboardSelector,
  (state: DashboardState) => state.sector
);
