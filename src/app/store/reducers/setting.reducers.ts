import { createReducer, on, Action } from '@ngrx/store';
import { fromSettingsActions } from '../actions';
import { SettingState } from '../models/setting.model';

export const initialSettingState: SettingState = {
  issues: [],
  issuesTotal: 0,
};
export const settingFeatureKey: string = 'setting';

const settingReducer = createReducer(
  initialSettingState,
  on(
    fromSettingsActions.fetchIssuesSuccess,
    (state: SettingState, { data }) => ({
      ...state,
      issues: data.issues,
      issuesTotal: data.total,
    })
  )
);

export function reducer(state: SettingState | undefined, action: Action): any {
  return settingReducer(state, action);
}
