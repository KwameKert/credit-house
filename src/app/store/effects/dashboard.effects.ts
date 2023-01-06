import { Injectable } from '@angular/core';
import { DashboardService } from '../../core/services/dashboard.service';
import { fromDashboardActions } from '../actions';
import { Widget } from '../../core/models/dashboard/dashboard.model';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { concatMap, map } from 'rxjs';
import { RootState } from '../models/root.model';

@Injectable({
  providedIn: 'root',
})
export class DashboardEffects {
  constructor(
    private actions$: Actions,
    private dashboardService: DashboardService,
    private store: Store<RootState>
  ) {}

  getGender$ = createEffect((): any =>
    this.actions$.pipe(
      ofType(fromDashboardActions.getGenderStat),
      concatMap(() => {
        return this.dashboardService.getGender().pipe(
          map((response: Widget[]) => {
            return fromDashboardActions.getGenderStatSuccess({
              data: response,
            });
          })
        );
      })
    )
  );

  getEducation$ = createEffect((): any =>
    this.actions$.pipe(
      ofType(fromDashboardActions.getEducationStat),
      concatMap(() => {
        return this.dashboardService.getEducation().pipe(
          map((response: Widget[]) => {
            return fromDashboardActions.getEducationStatSuccess({
              data: response,
            });
          })
        );
      })
    )
  );

  getSector$ = createEffect((): any =>
    this.actions$.pipe(
      ofType(fromDashboardActions.getSectorStat),
      concatMap(() => {
        return this.dashboardService.getSector().pipe(
          map((response: Widget[]) => {
            return fromDashboardActions.getSectorStatSuccess({
              data: response,
            });
          })
        );
      })
    )
  );

  getInactive$ = createEffect((): any =>
    this.actions$.pipe(
      ofType(fromDashboardActions.getInactiveStat),
      concatMap(() => {
        return this.dashboardService.getInactive().pipe(
          map((response: number) => {
            return fromDashboardActions.getInactiveStatSuccess({
              data: response,
            });
          })
        );
      })
    )
  );

  getActive$ = createEffect((): any =>
    this.actions$.pipe(
      ofType(fromDashboardActions.getActiveStat),
      concatMap(() => {
        return this.dashboardService.getActive().pipe(
          map((response: number) => {
            return fromDashboardActions.getActiveStatSuccess({
              data: response,
            });
          })
        );
      })
    )
  );
}
