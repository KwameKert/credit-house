import { Action, createReducer, on } from '@ngrx/store';
import { fromDashboardActions } from '../actions';
import { DashboardState } from '../models/dashboard.model';

export const initialDashboardState: DashboardState = {
  inactive: 0,
  active: 0,
  gender: [],
  sector: [],
  education: [],
};

export const dashboardFeatureKey: string = 'dashboard';

const dashboardReducer = createReducer(
  initialDashboardState,
  on(
    fromDashboardActions.getGenderStatSuccess,
    (state: DashboardState, { data }) => ({
      ...state,
      gender: data,
    })
  ),
  on(
    fromDashboardActions.getEducationStatSuccess,
    (state: DashboardState, { data }) => ({
      ...state,
      education: data,
    })
  ),

  on(
    fromDashboardActions.getSectorStatSuccess,
    (state: DashboardState, { data }) => ({
      ...state,
      sector: data,
    })
  ),
  on(
    fromDashboardActions.getActiveStatSuccess,
    (state: DashboardState, { data }) => ({
      ...state,
      active: data,
    })
  ),
  on(
    fromDashboardActions.getInactiveStatSuccess,
    (state: DashboardState, { data }) => ({
      ...state,
      inactive: data,
    })
  )
);

export function reducer(
  state: DashboardState | undefined,
  action: Action
): any {
  return dashboardReducer(state, action);
}
