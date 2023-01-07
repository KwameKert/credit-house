import { createAction, props } from '@ngrx/store';
import { IssuePage } from 'src/app/core/models/setting/issue.model';
import { Pagination } from 'src/app/shared/components/generic-table/generc-table.model';

export const ISSUE_FETCH = '[Settings Page] Fetch issues by pagination';
export const ISSUE_FETCH_SUCCESS =
  '[Settings Page] Fetch issues by pagination success';

export const fetchIssues = createAction(
  ISSUE_FETCH,
  props<{ data: Pagination }>()
);

export const fetchIssuesSuccess = createAction(
  ISSUE_FETCH_SUCCESS,
  props<{ data: IssuePage }>()
);
