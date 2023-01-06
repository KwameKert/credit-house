import { createAction, props } from '@ngrx/store';
import { Widget } from '../../core/models/dashboard/dashboard.model';

export const GET_GENDER_STATS = '[Dashboard Page] Fetch gender stats';
export const GET_GENDER_STATS_SUCCESS =
  '[Dashboard Page] Fetch gender stats successful';
export const GET_SECTOR_STATS = '[Dashboard Page] Fetch sector stats';
export const GET_SECTOR_STATS_SUCCESS =
  '[Dashboard Page] Fetch sector stats successful';
export const GET_EDUCATION_STATS = '[Dashboard Page] Fetch education stats';
export const GET_EDUCATION_STATS_SUCCESS =
  '[Dashboard Page] Fetch education stats successful';
export const GET_INACTIVE_STATS = '[Dashboard Page] Fetch inactive stats';
export const GET_INACTIVE_STATS_SUCCESS =
  '[Dashboard Page] Fetch inactive stats successful';
export const GET_ACTIVE_STATS = '[Dashboard Page] Fetch active stats';
export const GET_ACTIVE_STATS_SUCCESS =
  '[Dashboard Page] Fetch active stats successful';

export const getGenderStat = createAction(GET_GENDER_STATS);
export const getGenderStatSuccess = createAction(
  GET_GENDER_STATS_SUCCESS,
  props<{ data: Widget[] }>()
);

export const getEducationStat = createAction(GET_EDUCATION_STATS);
export const getEducationStatSuccess = createAction(
  GET_EDUCATION_STATS_SUCCESS,
  props<{ data: Widget[] }>()
);

export const getSectorStat = createAction(GET_SECTOR_STATS);
export const getSectorStatSuccess = createAction(
  GET_SECTOR_STATS_SUCCESS,
  props<{ data: Widget[] }>()
);

export const getActiveStat = createAction(GET_ACTIVE_STATS);
export const getActiveStatSuccess = createAction(
  GET_ACTIVE_STATS_SUCCESS,
  props<{ data: number }>()
);

export const getInactiveStat = createAction(GET_INACTIVE_STATS);
export const getInactiveStatSuccess = createAction(
  GET_INACTIVE_STATS_SUCCESS,
  props<{ data: number }>()
);
