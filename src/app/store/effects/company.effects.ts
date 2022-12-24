import { Injectable } from '@angular/core';
import { CompanyService } from '../../core/services/company.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { RootState } from '../models/root.model';
import { fromCompanyActions } from '../actions';
import { CompanyPage } from '../../core/models/company/company.model';
import { concatMap, map, withLatestFrom } from 'rxjs';
import { fromCompanySelectors } from '../selectors';

@Injectable({
  providedIn: 'root',
})
export class CompanyEffects {
  constructor(
    private actions$: Actions,
    private companyService: CompanyService,
    private store: Store<RootState>
  ) {}

  fetchCompanies$ = createEffect((): any =>
    this.actions$.pipe(
      ofType(fromCompanyActions.fetchCompanies),
      concatMap((request) => {
        return this.companyService.fetchCompanies(request.data).pipe(
          map((response: CompanyPage) => {
            return fromCompanyActions.fetchCompaniesSuccess({ data: response });
          })
        );
      })
    )
  );

  addCompany$ = createEffect((): any =>
    this.actions$.pipe(
      ofType(fromCompanyActions.addCompany),
      withLatestFrom(
        this.store.select(fromCompanySelectors.selectCompanyPagination)
      ),
      concatMap(([request, pagination]) => {
        return this.companyService.createCompany(request).pipe(
          map(() => {
            return fromCompanyActions.fetchCompanies({
              data: { size: pagination.size, page: pagination.page },
            });
          })
        );
      })
    )
  );

  updateCompany$ = createEffect((): any =>
    this.actions$.pipe(
      ofType(fromCompanyActions.updateCompany),
      withLatestFrom(
        this.store.select(fromCompanySelectors.selectCompanyPagination)
      ),
      concatMap(([request, pagination]) => {
        return this.companyService.updateCompany(request).pipe(
          map(() => {
            return fromCompanyActions.fetchCompanies({
              data: { size: pagination.size, page: pagination.page },
            });
          })
        );
      })
    )
  );
}
