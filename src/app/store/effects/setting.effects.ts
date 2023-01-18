import { Injectable } from '@angular/core';
import { SettingService } from '../../core/services/setting.service';
import { fromSettingsActions } from '../actions';
import { IssuePage } from 'src/app/core/models/setting/issue.model';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { concatMap, map } from 'rxjs';

@Injectable()
export class SettingEffects {
  constructor(
    private actions$: Actions,
    private settingService: SettingService
  ) {}

  fetchIssues$ = createEffect((): any =>
    this.actions$.pipe(
      ofType(fromSettingsActions.fetchIssues),
      concatMap((request) => {
        return this.settingService.fetchIssues(request.data).pipe(
          map((response: IssuePage) => {
            return fromSettingsActions.fetchIssuesSuccess({
              data: response,
            });
          })
        );
      })
    )
  );
}
